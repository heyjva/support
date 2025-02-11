import fs from "fs";
import Showdown from "showdown";

const showdown = new Showdown.Converter();

showdown.setFlavor("github");
showdown.addExtension({
  type: "output",
  filter: function (text, converter, options) {
    return text.replace(
      /src="\/static/g,
      'src="https://raw.githubusercontent.com/NabuCasa/support/refs/heads/main/static'
    );
  },
});

const CONSTANTS = {
  content: {
    dir: "./content",
    categoryMeta: "_category.md",
    sectionMeta: "_section.md",
  },
  theme: {
    dir: "./theme",
  },
};

const ZENDESK_API = {
  token: btoa(
    process.env.ZENDESK_API_USER + ":" + process.env.ZENDESK_API_TOKEN
  ),
  base: "https://nabucasa.zendesk.com/api/v2/help_center",
  category: {
    id: "/categories/{id}/translations/en-us",
  },
  section: {
    update: "/en-us/sections/{id}",
  },
  article: {
    update: "/articles/{id}/translations/en-us",
  },
};

function setParam(string, param, value) {
  return string.replace(`{${param}}`, value);
}

function parseFile(raw, path) {
  // split up the front matter and the content, return both
  let frontMatter = {};
  let content = "";

  const lines = raw.split("\n");
  let inFrontMatter = false;
  let frontMatterEnd = false;

  lines.forEach((line) => {
    if (line === "---" && !frontMatterEnd) {
      if (inFrontMatter) {
        frontMatterEnd = true;
      }
      inFrontMatter = !inFrontMatter;
    } else if (inFrontMatter) {
      // split : but only on the first one
      const split = line.split(":");
      const key = split.shift().trim();
      const value = split.join(":").trim();
      frontMatter[key] = value;
    } else {
      content += line + "\n";
    }
  });

  return {
    frontMatter,
    content,
    path,
  };
}

function addEditLink(path) {
  // path: ./content/green/getting-started/setting-up-the-device.md
  // Link to: https://github.com/NabuCasa/support/blob/main/content/green/getting-started/setting-up-the-device.md
  let newLink = path.replace(
    "./content",
    "https://github.com/NabuCasa/support/blob/main/content"
  );

  return `<a href="${newLink}" class="gh-edit" target="_blank">Edit this article on GitHub</a></p>`;
}
function updateArticle(article, section, category) {
  if (!article || !section || !category) return;

  if (!article.frontMatter.article_id) {
    console.log("Article does not have an ID, skipping");
    return;
  }

  if (!section.frontMatter.section_id) {
    console.log("Section does not have an ID, skipping");
    return;
  }

  if (!category.frontMatter.category_id) {
    console.log("Category does not have an ID, skipping");
    return;
  }

  let htmlContent = showdown.makeHtml(article.content);
  htmlContent += addEditLink(article.path);

  fetch(
    ZENDESK_API.base +
      setParam(
        ZENDESK_API.article.update,
        "id",
        article.frontMatter.article_id
      ),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ZENDESK_API.token}`,
      },
      body: JSON.stringify({
        body: htmlContent,
        title: article.frontMatter.name,
      }),
    }
  )
    .then((response) => {
      if (response.ok) {
        console.log(`Successfully updated article ${article.frontMatter.name}`);
      } else {
        console.error(`Failed to update article ${article.frontMatter.name}`);
        console.error(response);
      }
    })
    .catch((error) => {
      console.error(`Failed to update article ${article.frontMatter.name}`);
      console.error(error);
    });
}

function updateSection(section, category) {
  if (!section || !category) return;

  if (!section.frontMatter.section_id) {
    console.log("Section does not have an ID, skipping");
    return;
  }

  if (!category.frontMatter.category_id) {
    console.log("Category does not have an ID, skipping");
    return;
  }

  fetch(
    ZENDESK_API.base +
      setParam(
        ZENDESK_API.section.update,
        "id",
        section.frontMatter.section_id
      ),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ZENDESK_API.token}`,
      },
      body: JSON.stringify({
        section: {
          name: section.frontMatter.name,
          description: section.frontMatter.description,
          position: section.frontMatter.position,
        },
      }),
    }
  ).then((response) => {
    if (response.ok) {
      console.log(`Successfully updated section ${section.frontMatter.name}`);
    } else {
      console.error(`Failed to update section ${section.frontMatter.name}`);
      console.error(response);
    }
  });
}

function updateCategory(category) {
  if (!category) return;

  if (!category.frontMatter.category_id) {
    console.log("Category does not have an ID, skipping");
    return;
  }

  fetch(
    ZENDESK_API.base +
      setParam(ZENDESK_API.category.id, "id", category.frontMatter.category_id),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ZENDESK_API.token}`,
      },
      body: JSON.stringify({
        translation: {
          title: category.frontMatter.name,
          body: category.frontMatter.description,
          position: category.frontMatter.position,
        },
      }),
    }
  ).then((response) => {
    if (response.ok) {
      console.log(`Successfully updated category ${category.frontMatter.name}`);
    } else {
      console.error(`Failed to update category ${category.frontMatter.name}`);
      console.error(response);
    }
  });
}

let hierarchy = [];

fs.readdirSync(CONSTANTS.content.dir).forEach((category) => {
  if (category === "deploy.js") return; // Skip this file

  let categoryMeta = fs.readFileSync(
    `${CONSTANTS.content.dir}/${category}/${CONSTANTS.content.categoryMeta}`,
    "utf-8"
  );
  if (!categoryMeta) return;

  categoryMeta = parseFile(
    categoryMeta,
    `${CONSTANTS.content.dir}/${category}/${CONSTANTS.content.categoryMeta}`
  );
  hierarchy.push(
    `[C] ${categoryMeta.frontMatter.name} (${categoryMeta.frontMatter.category_id})`
  );

  updateCategory(categoryMeta);

  // Find sections
  fs.readdirSync(`${CONSTANTS.content.dir}/${category}`).forEach((section) => {
    const isDirectory = fs
      .lstatSync(`${CONSTANTS.content.dir}/${category}/${section}`)
      .isDirectory();

    if (section === CONSTANTS.content.sectionMeta || !isDirectory) return;

    let sectionMeta = fs.readFileSync(
      `${CONSTANTS.content.dir}/${category}/${section}/${CONSTANTS.content.sectionMeta}`,
      "utf-8"
    );
    if (!sectionMeta) return;

    sectionMeta = parseFile(
      sectionMeta,
      `${CONSTANTS.content.dir}/${category}/${section}/${CONSTANTS.content.sectionMeta}`
    );

    hierarchy.push(
      `[S] -- ${sectionMeta.frontMatter.name} (${sectionMeta.frontMatter.section_id})`
    );

    updateSection(sectionMeta, categoryMeta);

    // Find articles
    fs.readdirSync(`${CONSTANTS.content.dir}/${category}/${section}`).forEach(
      (articleF) => {
        const isDirectory = fs
          .lstatSync(
            `${CONSTANTS.content.dir}/${category}/${section}/${articleF}`
          )
          .isDirectory();

        if (isDirectory) return; // We can't have any further directories, so bail
        if (articleF === CONSTANTS.content.sectionMeta) return; // Skip the section meta file

        let article = fs.readFileSync(
          `${CONSTANTS.content.dir}/${category}/${section}/${articleF}`,
          "utf-8"
        );
        if (!article) return;

        let articleMeta = parseFile(
          article,
          `${CONSTANTS.content.dir}/${category}/${section}/${articleF}`
        );

        hierarchy.push(
          `[A] ---- ${articleMeta.frontMatter.name} (${articleMeta.frontMatter.article_id})`
        );

        updateArticle(articleMeta, sectionMeta, categoryMeta);
      }
    );
  });
});

console.log("Hierarchy:");
hierarchy.forEach((h) => console.log(h));
console.log("\n");
console.log("REST Status:");

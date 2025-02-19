import fs from "fs";

const ZENDESK_API = {
  token: btoa(
    process.env.ZENDESK_API_USER + ":" + process.env.ZENDESK_API_TOKEN
  ),
  base: "https://nabucasa.zendesk.com/api/v2/help_center",
  category: {
    update: "/en-us/categories/{id}",
    updateTranslation: "/categories/{id}/translations/en-us",
  },
  section: {
    update: "/en-us/sections/{id}",
    updateTranslation: "/sections/{id}/translations/en-us",
  },
  article: {
    update: "/en-us/articles/{id}",
    updateTranslation: "/articles/{id}/translations/en-us",
  },
};

const REQUIRED_FIELDS = {
  category: ["category_id", "name"],
  section: ["section_id", "name"],
  article: ["article_id", "name"],
};

function hasValidZendeskMeta(type, path) {
  // check if {path}/{type} exists
  let raw;
  if (type == "article") {
    if (!fs.existsSync(`./_site/${path}/index.html`)) return false;
    raw = fs.readFileSync(`./_site/${path}/index.html`, "utf8");
  } else {
    if (!fs.existsSync(`./_site/${path}/_${type}`)) return false;
    if (!fs.existsSync(`./_site/${path}/_${type}/index.html`)) return false;
    raw = fs.readFileSync(`./_site/${path}/_${type}/index.html`, "utf8");
  }

  // read first line
  let firstLine = raw.split("\n")[0];

  // check if first line is html comment
  if (!firstLine.startsWith("<!--")) return false;
  if (!firstLine.endsWith("-->")) return false;
  // remove html comment
  firstLine = firstLine.slice(4, -4).trim();
  // check if first line is valid json
  try {
    JSON.parse(firstLine);
  } catch (e) {
    return;
  }

  let meta = JSON.parse(firstLine);
  // check if first object key is zendesk
  if (!meta.zendesk) return false;

  // Check if type id exists
  if (!meta.zendesk[`${type}_id`]) return false;

  // Check if required fields exist
  for (let field of REQUIRED_FIELDS[type]) {
    if (!meta.zendesk[field]) return false;
  }

  return meta.zendesk;
}

function stripZendeskMeta(content) {
  let lines = content.split("\n");
  console.log(lines[0]);
  if (lines[0].startsWith("<!--") && lines[0].endsWith("-->")) {
    lines.shift();
  }
  return lines.join("\n");
}

let zendeskData = {};
let zendeskIds = {};

// Validation step
fs.readdirSync("./_site").forEach((category) => {
  // check for valid meta
  let cMeta = hasValidZendeskMeta("category", category);
  if (!cMeta) {
    console.log(`[C][\x1b[31m✘\x1b[0m] ${category} - Invalid meta`);
    return;
  }
  if (zendeskIds[cMeta.category_id]) {
    console.log(
      `[C][\x1b[31m✘\x1b[0m] ${category} - Duplicate category_id with ${
        zendeskIds[cMeta.category_id]
      }`
    );
    return;
  }
  console.log(`[C][\x1b[32m✔\x1b[0m] ${cMeta.name}`);

  zendeskData[category] = { meta: cMeta, sections: {} };
  zendeskIds[cMeta.category_id] = category;

  fs.readdirSync(`./_site/${category}`).forEach((section) => {
    if (section.startsWith("_")) return;

    // check for valid meta
    let sMeta = hasValidZendeskMeta("section", `${category}/${section}`);
    if (!sMeta) {
      console.log(`[S][\x1b[31m✘\x1b[0m] -- ${section} - Invalid meta`);
      return;
    }

    if (zendeskIds[sMeta.section_id]) {
      console.log(
        `[S][\x1b[31m✘\x1b[0m] -- ${section} - Duplicate section_id with ${
          zendeskIds[sMeta.section_id]
        }`
      );
      return;
    }

    console.log(`[S][\x1b[32m✔\x1b[0m] -- ${sMeta.name}`);

    zendeskData[category].sections[section] = { meta: sMeta, articles: {} };
    zendeskIds[sMeta.section_id] = `${category}/${section}`;

    fs.readdirSync(`./_site/${category}/${section}`).forEach((article) => {
      if (article.startsWith("_")) return;
      // check for valid meta
      let aMeta = hasValidZendeskMeta(
        "article",
        `${category}/${section}/${article}`
      );
      if (!aMeta) {
        console.log(`[A][\x1b[31m✘\x1b[0m] ---- ${article} - Invalid meta`);
        return;
      }

      if (zendeskIds[aMeta.article_id]) {
        console.log(
          `[A][\x1b[31m✘\x1b[0m] ---- ${article} - Duplicate article_id with ${
            zendeskIds[aMeta.article_id]
          }`
        );
        return;
      }

      console.log(`[A][\x1b[32m✔\x1b[0m] ---- ${aMeta.name}`);

      zendeskData[category].sections[section].articles[article] = {
        meta: aMeta,
      };
      zendeskIds[aMeta.article_id] = `${category}/${section}/${article}`;
    });
  });
  console.log("");
});

function deployCategory(category) {
  console.log(category.meta);
}

function deploySection(section) {
  console.log(section.meta);
}

function deployArticle(article) {
  console.log(article.meta);
}

// Deployment step
Object.keys(zendeskData).forEach((categoryKey) => {
  let category = zendeskData[categoryKey];
  deployCategory(category);

  Object.keys(zendeskData[categoryKey].sections).forEach((sectionKey) => {
    let section = zendeskData[categoryKey].sections[sectionKey];
    deploySection(section);

    Object.keys(zendeskData[categoryKey].sections[sectionKey].articles).forEach(
      (articleKey) => {
        let article =
          zendeskData[categoryKey].sections[sectionKey].articles[articleKey];
        deployArticle(article);
      }
    );
  });
});

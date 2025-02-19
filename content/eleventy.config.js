import path from "path";

export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("../_includes");
  eleventyConfig.setDataDirectory("../_data");

  eleventyConfig.addTransform(
    "replace-static-links",
    function (content, outputPath) {
      if (outputPath.endsWith(".html")) {
        return content.replace(
          /(href|src)="\/static/g,
          '$1="https://raw.githubusercontent.com/NabuCasa/support/refs/heads/static'
        );
      }
      return content;
    }
  );

  // Add ids to headings
  eleventyConfig.addTransform(
    "add-heading-ids",
    function (content, outputPath) {
      if (outputPath.endsWith(".html")) {
        return content.replace(
          /<h([1-6])>([^<]+)<\/h[1-6]>/g,
          function (match, level, text) {
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            return `<h${level} id="${id}">${text}</h${level}>`;
          }
        );
      }
      return content;
    }
  );

  eleventyConfig.addShortcode("zendeskData", function (zendeskFrontmatter) {
    return `<!-- ${JSON.stringify({ zendesk: zendeskFrontmatter })} -->`;
  });
}

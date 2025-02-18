export default async function (eleventyConfig) {
  // replace any links that start with /static and prepend with https://raw.githubusercontent.com/NabuCasa/support/refs/heads/main/
  // these could be markdown links or images
  eleventyConfig.addTransform(
    "replace-static-links",
    function (content, outputPath) {
      if (outputPath.endsWith(".html")) {
        return content.replace(
          /(href|src)="\/static/g,
          '$1="https://raw.githubusercontent.com/NabuCasa/support/refs/heads/main/static'
        );
      }
      return content;
    }
  );
}

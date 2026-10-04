/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public/": "/" });
  eleventyConfig.setServerOptions({ host: "127.0.0.1" });
  return {
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    dir: { input: "content", includes: "../_includes", output: "_site" },
  };
}

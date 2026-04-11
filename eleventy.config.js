/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  eleventyConfig.addFilter("navActive", (pageUrl, itemUrl) => {
    const p = (pageUrl || "/").replace(/\/$/, "") || "/";
    const i = (itemUrl || "/").replace(/\/$/, "") || "/";
    if (i === "/") return p === "/" || p === "";
    return p === i || p.startsWith(i + "/");
  });

  eleventyConfig.addFilter("sortEpisodesDesc", (episodes) => {
    if (!Array.isArray(episodes)) return [];
    return [...episodes].sort((a, b) => (b.episodeNumber || 0) - (a.episodeNumber || 0));
  });

  eleventyConfig.addFilter("sortPostsByDateDesc", (posts) => {
    if (!Array.isArray(posts)) return [];
    return [...posts].sort((a, b) => (b.date || 0) - (a.date || 0));
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  eleventyConfig.addFilter("dateIso", (dateObj) => {
    if (!dateObj) return "";
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return d.toISOString().slice(0, 10);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}

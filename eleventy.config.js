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

  eleventyConfig.addFilter("sortPostsByDateDesc", (posts) => {
    if (!Array.isArray(posts)) return [];
    return [...posts].sort((a, b) => (b.date || 0) - (a.date || 0));
  });

  /** Pinned posts first (e.g. welcome), then everyone else, newest first within each group */
  eleventyConfig.addFilter("sortPostsPinnedFirst", (posts) => {
    if (!Array.isArray(posts)) return [];
    const byDateDesc = (a, b) => (b.date || 0) - (a.date || 0);
    const pinned = posts.filter((p) => p.data?.pinned === true).sort(byDateDesc);
    const rest = posts.filter((p) => !p.data?.pinned).sort(byDateDesc);
    return [...pinned, ...rest];
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

  /* Dateline formatting — "WED 15 APR 2026" for the masthead plate.
     Locale-free so builds are deterministic; matches the broadcast/newspaper feel. */
  const DATELINE_DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const DATELINE_MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  /* Read date parts in UTC so bare YYYY-MM-DD front-matter dates don't
     drift back a day on machines west of UTC. */
  eleventyConfig.addFilter("dateline", (dateObj) => {
    if (!dateObj) return "";
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    if (isNaN(d.getTime())) return "";
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${DATELINE_DAYS[d.getUTCDay()]} ${day} ${DATELINE_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("datelineShort", (dateObj) => {
    if (!dateObj) return "";
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    if (isNaN(d.getTime())) return "";
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${day} ${DATELINE_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });

  /** Zero-padded issue number: 1 -> "001", 23 -> "023" */
  eleventyConfig.addFilter("issueNum", (n, width = 3) => {
    if (n == null) return "";
    return String(n).padStart(width, "0");
  });

  /** Latest dispatch date across posts (for homepage masthead).
      Falls back to now if no posts are published yet. */
  eleventyConfig.addFilter("latestPostDate", (posts) => {
    const ps = Array.isArray(posts) ? posts : [];
    const times = ps
      .map((p) => (p?.date ? new Date(p.date).getTime() : NaN))
      .filter((t) => !isNaN(t));
    if (!times.length) return new Date();
    return new Date(Math.max(...times));
  });

  /** A post's position in the posts collection (chronological, earliest = 1).
      Used to render "NO. 001" on archive rows + standalone post pages. */
  eleventyConfig.addFilter("postIssueNumber", (post, allPosts) => {
    if (!post || !Array.isArray(allPosts) || !allPosts.length) return 0;
    const sorted = [...allPosts].sort((a, b) => (a.date || 0) - (b.date || 0));
    const idx = sorted.findIndex((p) => p.url === post.url);
    return idx >= 0 ? idx + 1 : 0;
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

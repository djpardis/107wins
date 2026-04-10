module.exports = {
  layout: "layouts/post.njk",
  tags: "posts",
  eleventyComputed: {
    permalink(data) {
      return `/posts/${data.page.fileSlug}/`;
    },
  },
};

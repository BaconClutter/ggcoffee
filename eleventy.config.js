export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("**/*.css");
    eleventyConfig.addPassthroughCopy("./src/script.js");
    eleventyConfig.addPassthroughCopy("./src/img/");
    eleventyConfig.addPassthroughCopy({"./src/img/favicon/" : "/"});
    return {
      dir: {
        input: "src",
        output: "public",
      },
    };
  };
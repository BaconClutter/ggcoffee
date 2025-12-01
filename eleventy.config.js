import { RenderPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {

    eleventyConfig.addPlugin(RenderPlugin);

    eleventyConfig.addPassthroughCopy("**/*.css");
    eleventyConfig.addPassthroughCopy("./src/script.js");
    eleventyConfig.addPassthroughCopy("./src/img/");
    eleventyConfig.addPassthroughCopy({"./src/img/favicon/" : "/"});
    eleventyConfig.addPassthroughCopy("./src/robots.txt");
    eleventyConfig.addPassthroughCopy("./src/sitemap.xml");
    return {
      dir: {
        input: "src",
        output: "public",
      },
    };
  };
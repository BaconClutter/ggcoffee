import { RenderPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"

export default function (eleventyConfig) {

  eleventyConfig.addPlugin(RenderPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin,{
      formats: ["png", "webp", "svg"],
      widths: ["auto"],
    }
  );

  eleventyConfig.addFilter("stripImages", function(content) {
    // This regex looks for <img> tags and removes them
    const regex = /<img\b[^>]*>/gi;
    return content.replace(regex, '');
  });

  eleventyConfig.addPassthroughCopy("**/*.css");
  eleventyConfig.addPassthroughCopy("./src/script.js");
  // Special cases for images not handled by eleventy-image
  eleventyConfig.addPassthroughCopy("./src/img/*_icons.png");
  eleventyConfig.addPassthroughCopy("./src/img/roaster-logo_*.png");
  eleventyConfig.addPassthroughCopy("./src/img/roaster-logo_*.svg");
  eleventyConfig.addPassthroughCopy("./src/img/roaster-icon_*.svg");
  eleventyConfig.addPassthroughCopy("./src/img/external-link.svg");
  eleventyConfig.addPassthroughCopy("./src/img/dropdown-arrow.svg");
  eleventyConfig.addPassthroughCopy("./src/img/search-icon.svg");
  eleventyConfig.addPassthroughCopy("./src/img/brew-prism.svg");
  eleventyConfig.addPassthroughCopy("./src/img/brew-prism-hover.svg");
  // Special cases for images not handled by eleventy-image
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
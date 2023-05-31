const fs = require("fs-extra");
const glob = require("glob");
const path = require("path");
const matter = require("gray-matter");

module.exports = function (context, options) {
  return {
    name: "docusaurus-plugin-backlinks",
    extendCli(cli) {
      cli
        .command("backlinks")
        .description("Generate backlinks for all documents")
        .action(async () => {
          // Here you would implement the logic for generating backlinks.
          // This could be similar to the standalone script shown in the previous examples,
          // but instead of writing the result to a file, you would store it in memory,
          // so you can add the backlinks to the documents later.
          const backlinks = await generateLinks();
          return backlinks;
          // context.backlinks = backlinks;
        });
    },
    async loadContent() {
      // Generate or fetch your data here...
      const { links, backlinks } = await generateLinks(); // Assume you have this function
      const excerpts = await generateExcerpts();

      return { links, backlinks, excerpts };
    },
    async contentLoaded({ content, actions }) {
      // TODO: instead of setting global data, create a different static asset for each page
      // then it will be dynamically accessed https://docusaurus.io/docs/static-assets
      // current method is bad because content can get really big! and every page needs to load it
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

async function generateExcerpts(rootDir) {
  // Search for markdown files in the root directory and its subdirectories
  const files = glob.sync("{docs,blog}/**/*.md");

  const excerpts = {};

  for (const file of files) {
    const fileContent = await fs.readFile(file, "utf8");
    const { content, data } = matter(fileContent);
    const slug = await getSlugFromFile(file);
    excerpts[slug] = {
      "title": data?.title,
      "excerpt": content.slice(0, 500),
    };
  }

  return excerpts;
}

async function getSlugFromFile(file) {
  const fileContent = await fs.readFile(file, "utf8");
  const { data } = matter(fileContent);
  const slug = data?.["slug"];
  if (slug) {
    const filename = path.basename(file, path.extname(file));
    let dir = path.dirname(file);
    if (filename == "index") {
      dir = path.dirname(dir);
    }
    return path.join(`/${dir}`, slug);
  }
  return `/${file.replace(/\.md$/, "")}`;
}

async function generateLinks() {
  const files = glob.sync("{docs,blog}/**/*.md");
  const backlinks = {};
  const outlinks = {};

  for (const file of files) {
    const content = await fs.promises.readFile(file, "utf-8");
    const links = content.match(/\[([^\]]+)\]\(([^\)]+)\)/g) || [];
    const slug = await getSlugFromFile(file);

    outlinks[slug] = new Set();
    for (const link of links) {
      let target = link.match(/\(([^\)]+)\)/)[1];

      // ensures relative path
      if (!target.match(/^https*:\/\//)) {
        target = "/" + path
          .join(path.dirname(file), target);
        if (!backlinks[target]) {
          backlinks[target] = new Set();
        }

        // convert to relative path
        backlinks[target].add(slug);
        outlinks[slug].add(target);
      }
    }
  }

  // convert sets back to lists
  Object.keys(outlinks).forEach((k) => {
    outlinks[k] = [...outlinks[k]];
  });
  Object.keys(backlinks).forEach((k) => {
    backlinks[k] = [...backlinks[k]];
  });

  return { links: outlinks, backlinks };
}

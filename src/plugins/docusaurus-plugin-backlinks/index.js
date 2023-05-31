const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const matter = require('gray-matter');

module.exports = function(context, options) {
  return {
    name: 'docusaurus-plugin-backlinks',
    extendCli(cli) {
      cli
        .command('backlinks')
        .description('Generate backlinks for all documents')
        .action(async () => {
          // Here you would implement the logic for generating backlinks.
          // This could be similar to the standalone script shown in the previous examples,
          // but instead of writing the result to a file, you would store it in memory,
          // so you can add the backlinks to the documents later.
          const backlinks = await generateBacklinks();
          return backlinks;
          // context.backlinks = backlinks;
        });
    },
    async loadContent() {
      // Generate or fetch your data here...
      const backlinksData = await generateBacklinks(); // Assume you have this function
      const excerptsData = await generateExcerpts();

      return { backlinks: backlinksData, excerpts: excerptsData };
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

async function generateExcerpts(rootDir) {
  // Search for markdown files in the root directory and its subdirectories
  const files = glob.sync('{docs,blog}/**/*.md');

  const excerpts = {};

  for (const file of files) {
    const fileContent = await fs.readFile(file, 'utf8');
    const { content, data } = matter(fileContent);
    const slug = `/${file.replace(/\.md$/, '')}`
    excerpts[slug] = {
      'title': data?.title,
      'excerpt': content.slice(0, 500),
    }
  }

  return excerpts;
}


async function generateBacklinks() {
  const files = glob.sync('{docs,blog}/**/*.md');
  let backlinks = {};

  for (const file of files) {
    const content = await fs.promises.readFile(file, 'utf-8');
    const links = content.match(/\[([^\]]+)\]\(([^\)]+)\)/g) || [];

    for (const link of links) {
      let target = link.match(/\(([^\)]+)\)/)[1];

      // ensures relative path
      if (target.startsWith('.')) {
        target = `/${path.join(path.dirname(file), target)}` // convert target so its relative to root dir
        if (!backlinks[target]) {
          backlinks[target] = [];
        }

        // convert to relative path
        backlinks[target].push(`/${file.replace(/\.md$/, '')}`);
      }
    }
  }

  return backlinks;
}


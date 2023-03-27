import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getTags() {
  const posts = _getPosts();
  const tags = new Set();
  posts.forEach((post) => {
    post.frontMatter.tags.forEach((tag) => {
      tags.add(tag);
    });
  });
  return [...tags];
}

export function getPostsByTag(tag) {
  const posts = _getPosts(tag);
  return posts;
}

function _getPosts(tag = null) {
  const files = fs.readdirSync(path.join('posts'));
  const posts = [];
  files.filter((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    if (!!tag) {
      if (frontMatter.tags.indexOf(tag) !== -1) {
        posts.push({
          frontMatter,
          filename: filename.split('.')[0],
        });
      }
    } else {
      posts.push({
        frontMatter,
        filename: filename.split('.')[0],
      });
    }
  });
  return posts;
}

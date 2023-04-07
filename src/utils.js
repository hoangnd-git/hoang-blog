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
  let posts = _getPosts(tag);
  posts = posts.sort((a, b) => {
    if (convertDate(a.frontMatter.date) > convertDate(b.frontMatter.date)) return -1;
    else return 1;
  });
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

export function convertDate(date) {
  const [day, month, year] = date.split('-');
  return new Date(`${year}-${month}-${day}`);
}

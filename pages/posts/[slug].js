import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { Button } from '../../components';
import Link from 'next/link';

const components = { Button, SyntaxHighlighter };

export default function PostPage({ frontMatter: { title, tags }, mdxSource }) {
  return (
    <div className="blog-container">
      <h1>
        <span className="title">{title}</span>
      </h1>
      <MDXRemote {...mdxSource} components={components} />
      {tags.length > 0 && (
        <div className="tags">
          Tags:
          {tags.map((tag) => {
            return (
              <Link href={'/tags/' + tag} passHref>
                <span className="tag">{tag}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.mdx'),
    'utf-8'
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
}

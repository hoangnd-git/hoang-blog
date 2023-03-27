import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { Button } from '../../components';
import Link from 'next/link';
import Head from 'next/head';

const components = { Button, SyntaxHighlighter };

export default function PostPage({ frontMatter: { title, tags }, mdxSource }) {
  return (
    <>
      <div>
        <Head>
          <title>{`${title} | Jacky's Blog`}</title>
          <meta name="description" content="Welcome to my blog" />
          <meta property="og:title" content="Jacky's Blog" />
          <meta property="og:description" content="Welcome to my blog" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
      </div>
      <div className="blog-container">
        <h1>
          <span className="title">{title}</span>
        </h1>
        <MDXRemote {...mdxSource} components={components} />
        {tags.length > 0 && (
          <div className="tags">
            Tags:
            {tags.map((tag, index) => {
              return (
                <Link href={'/tags/' + tag} passHref key={index}>
                  <span className="tag">{tag}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
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

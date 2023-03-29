import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { Button } from '../../components';
import Link from 'next/link';
import Head from 'next/head';
import remarkGfm from 'remark-gfm';
import stringWidth from 'string-width';

import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const components = { Button, SyntaxHighlighter };

export default function PostPage({ frontMatter: { title, tags }, mdxSource }) {
  return (
    <>
      <div>
        <Head>
          <title>{`${title} | Hoang's Blog`}</title>
          <meta name="description" content={title} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={title} />
          <link rel="icon" href="/favicon.png" />
        </Head>
      </div>
      <div className="blog-container">
        <h1>
          <span className="title">{title}</span>
        </h1>
        <div className="markdown-body">
          <MDXRemote
            {...mdxSource}
            components={{
              ...components,
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomOneDarkReasonable}
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
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
  const mdxSource = await serialize(content, {
    scope: {},
    mdxOptions: {
      remarkPlugins: [[remarkGfm, { stringLength: stringWidth }]],
      rehypePlugins: [],
      format: 'mdx',
    },
    parseFrontmatter: false,
  });

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
}

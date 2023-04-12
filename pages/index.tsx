import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { convertDate } from '../src/utils';
import GoogleAnalytics from '../components/GoogleAnalytics';
import Head from 'next/head';

export default function Home({ posts }: any) {
  return (
    <>
      <Head>
        <title>Hoang&apos;s Blog</title>
        <meta name="description" content="Một chiếc blog nho nhỏ" />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:title" content="Hoang's Blog" />
        <meta property="og:description" content="Một chiếc blog nho nhỏ" />
        <meta name="keywords" content="nguyenhoang, blog, it"></meta>
        <meta name="author" content="Hoang Nguyen"></meta>
        {/* <meta
          name="google-site-verification"
          content="2sv7utYTeZ0DN0LfK10EIjz-paQ_f4mP84RWLmQqjs0"
        /> */}
        <link rel="icon" href="/favicon.png" />
      </Head>
      {process.env.NEXT_PUBLIC_G_ID ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_G_ID} />
      ) : null}
      <div className="infinity-blog">
        {posts.map((post: any, index: any) => (
          <div className="blog mb-3" key={index}>
            <div className="blog-content">
              <div className="content-text">
                {/* <span className="content-date">{post.frontMatter.date}</span> */}
                {post.tags}
              </div>
              <Link href={'/posts/' + post.slug} passHref>
                <div className="content-title">{post.frontMatter.title}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));

  let posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontMatter } = matter(markdownWithMeta);

    let tags = '';
    frontMatter.tags.forEach((e: string, index: number) => {
      if (index < frontMatter.tags.length - 1) {
        tags += e + ', ';
      } else {
        tags += e;
      }
    });

    return {
      frontMatter,
      tags,
      slug: filename.split('.')[0],
    };
  });

  posts = posts.sort((a, b) => {
    if (convertDate(a.frontMatter.date) > convertDate(b.frontMatter.date))
      return -1;
    else return 1;
  });

  return {
    props: {
      posts,
    },
  };
}

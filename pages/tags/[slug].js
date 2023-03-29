import Head from 'next/head';
import Link from 'next/link';
import { getPostsByTag, getTags } from '../../src/utils';

export default function TagPage({ posts, slug }) {
  return (
    <>
      <div>
        <Head>
          <title>{`${slug} | Hoang's Blog`}</title>
          <meta name="description" content="Welcome to my blog" />
          <meta property="og:title" content="Hoang's Blog" />
          <meta property="og:description" content="Welcome to my blog" />
          <link rel="icon" href="/favicon.png" />
        </Head>
      </div>
      <div className="blog-container">
        <h1>
          <span className="title">{slug}</span>
        </h1>
        <ul className="blogs-title">
          {posts.map((post, index) => {
            return (
              <li key={index}>
                <Link href={'/posts/' + post.filename} passHref>
                  {post.frontMatter.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const tags = getTags();
  const paths = tags.map((tag) => {
    return { params: { slug: tag } };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const posts = getPostsByTag(slug);

  return {
    props: { posts, slug },
  };
}

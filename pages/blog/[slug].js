import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'
import Link from 'next/link'
import Head from 'next/head'

export default function PostPage({ frontmatter, content }) {
  const { title, date, cover_image, keywords, excerpt } = frontmatter;
  return (
    <div style={{ padding: "32px 0px" }}>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords || ""}></meta>
        <meta name="description" content={excerpt}></meta>
      </Head>
      <div style={{ position: "fixed", bottom: "64px", right: "64px" }}>
        <Link href='/'>
          <a className='btn btn-back'>主页</a>
        </Link>
      </div>
      <div className='card card-page'>
        <h1 className='post-title'>{title}</h1>
        <div className='post-date'>发布于 {date}</div>
        <img src={cover_image} alt='' />
        <div className='post-body'>
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))
  const paths = files.filter((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )
    const { data: frontmatter } = matter(markdownWithMeta)
    return frontmatter.draft !== 'true'
  }).map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    }
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )
  const { data: frontmatter, content } = matter(markdownWithMeta)
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
    revalidate: 60
  }
}

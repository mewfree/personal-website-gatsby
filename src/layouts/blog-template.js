import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

export default function Template({
  data,
}) {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  return (
    <div>
      <Helmet>
        <title>{`${frontmatter.title} - Damien Gonot`}</title>
        <meta name="description" content={ excerpt } />
        <meta name="keywords" content={ frontmatter.tags.toString() } />
      </Helmet>
      <div>
        <Link to="/blog">{'<< Go back to all articles'}</Link>
      </div>
      <div className="has-text-centered">
        <h1 className="title is-3">{ frontmatter.title }</h1>
        <h2 className="subtitle is-6">{ frontmatter.date }</h2>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <br />
      <div className="tags">
        { frontmatter.tags.map(tag => <span className="tag">{ tag }</span>) }
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 300)
      frontmatter {
        date(formatString: "DD MMM YYYY")
        path
        title
        tags
      }
    }
  }
`

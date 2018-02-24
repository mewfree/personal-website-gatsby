import React from 'react'

export default function Template({
  data,
}) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <div>
      <div className="has-text-centered">
        <h1 className="title is-3">{ frontmatter.title }</h1>
        <h2 className="subtitle is-6">{ frontmatter.date }</h2>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "DD MMM YYYY")
        path
        title
      }
    }
  }
`

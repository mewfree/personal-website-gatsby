import React from 'react'
import PostLink from '../components/PostLink'

const Blog = ({ data: { allMarkdownRemark: { edges } } }) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <div className="has-text-centered">
      <h1>Blog articles</h1>
      <div>{ Posts }</div>
    </div>
  )
}

export default Blog

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "DD-MM-YYYY")
            path
            title
          }
        }
      }
    }
  }
`

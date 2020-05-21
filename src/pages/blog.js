import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import PostLink from '../components/PostLink'
import Layout from '../components/layout'

const Blog = ({ data: { allMarkdownRemark: { edges } } }) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      <div className="has-text-centered">
        <Helmet>
          <title>Blog - Damien Gonot</title>
          <meta name="description" content="Damien Gonot's blog" />
          <meta name="keywords" content="damien, gonot, damien gonot, blog, personal blog" />
        </Helmet>
        <h1>Blog articles</h1>
        <div>{ Posts }</div>
      </div>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
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

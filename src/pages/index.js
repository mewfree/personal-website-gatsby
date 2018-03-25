import React from 'react'
// import Link from 'gatsby-link'
import PostLink from '../components/PostLink'

const IndexPage = ({ data: { allMarkdownRemark: { edges } } }) => {
  const RecentPosts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <div>
      <h1>
        Introduction
      </h1>
      <p>
        All-in-one marketer & developer. Currently a User Acquisition Manager at Hopper, previously at Busbud.
      </p>
      <p>
        Proudly living in Montréal ❤️
      </p>
      <h1>
        Recent blog posts
      </h1>
      <p>
        { RecentPosts }
      </p>
      <h1>
        Projects I contributed to
      </h1>
      <ul>
        <li>
          <a href="https://github.com/kiasaki/ry-v02">ry, a basic modal text editor, written in Chicken Scheme</a>
        </li>
      </ul>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query RecentQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
    ) {
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

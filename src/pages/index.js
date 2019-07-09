import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import PostLink from '../components/PostLink'
import ProjectLink from '../components/ProjectLink'

const IndexPage = ({ data: { allMarkdownRemark: { edges }, site: { siteMetadata: { projects } } } }) => {
  const RecentPosts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  const Projects = projects
    .map(project => <ProjectLink key={project.title} project={project} />);

  return (
    <Layout>
      <h1>
        Introduction
      </h1>
      <p>
        Marketing automation specialist. Currently a User Acquisition Manager at Hopper, previously at Busbud.
      </p>
      <p>
        Living in Montréal ❤️
      </p>
      <h1>
        Most recent blog articles
      </h1>
      <div>
        { RecentPosts }
      </div>
      <h2>
        <Link to="/blog">See all articles</Link>
      </h2>
      <h1>
        Latest projects
      </h1>
      <div>
        { Projects }
      </div>
    </Layout>
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
    site {
      siteMetadata {
        projects {
          title,
          description,
          link
        }
      }
    }
  }
`

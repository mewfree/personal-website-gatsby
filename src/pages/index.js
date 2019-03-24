import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import PostLink from '../components/PostLink'

const IndexPage = ({ data: { allMarkdownRemark: { edges } } }) => {
  const RecentPosts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
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
        <Link to="/blog">See all articles</Link>
      </h1>
      <h1>
        Projects I contributed to
      </h1>
      <ul>
        <li>
          <a href="https://github.com/mewfree/youtube-dl-subscriptions">youtube-dl-subscriptions, a Python script to download YouTube videos from your subscription box</a>
        </li>
        <li>
          <a href="https://github.com/mewfree/gitart">gitart, a Racket script inspired by gitfiti to generate GitHub "contributions art"</a>
        </li>
        <li>
          <a href="https://github.com/mewfree/mileend-roulette">Mile End Roulette, a (random) way to suggest where to get eats & drinks in Mile End, Montréal</a>
        </li>
        <li>
          <a href="https://github.com/kiasaki/ry-v02">ry, a basic modal text editor, written in Chicken Scheme</a>
        </li>
      </ul>
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
  }
`

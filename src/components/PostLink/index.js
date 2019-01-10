import React from 'react'
import { Link } from 'gatsby'

const PostLink = ({ post }) => (
  <div className="post-link">
    <div className="is-size-3 has-text-weight-semibold">
      <Link to={ post.frontmatter.path }>
        { post.frontmatter.title }
      </Link>
    </div>
    <div>
      written on { post.frontmatter.date }
    </div>
  </div>
)

export default PostLink

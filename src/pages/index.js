import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1 className="title">
      Introduction
    </h1>
    <p>
      All-in-one marketer & developer. Currently a User Acquisition Manager at Hopper, previously at Busbud.
    </p>
    <p>
      Proudly living in Montréal ❤️
    </p>
    <Link to="/page-2/">
      Go to page 2
    </Link>
  </div>
)

export default IndexPage

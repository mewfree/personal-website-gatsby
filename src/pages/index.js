import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1 className="title">
      Hi everybody
    </h1>
    <p>
      My name is Damien Gonot.
    </p>
    <Link to="/page-2/">
      Go to page 2
    </Link>
  </div>
)

export default IndexPage

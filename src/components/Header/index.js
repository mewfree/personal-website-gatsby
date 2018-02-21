import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  <section className="hero is-primary">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          <Link to="/">
            Damien Gonot
          </Link>
        </h1>
        <h2 className="subtitle">
          Random thoughts
        </h2>
      </div>
    </div>
  </section>
)

export default Header

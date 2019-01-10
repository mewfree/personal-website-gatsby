import React from 'react'
import { Link } from 'gatsby'

const Header = () => (
  <section className="hero is-primary">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">
          <Link to="/">
            Damien Gonot
          </Link>
        </h1>
        <h2 className="subtitle">
          Personal blog
        </h2>
      </div>
    </div>
  </section>
)

export default Header

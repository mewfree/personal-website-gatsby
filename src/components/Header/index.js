import React from 'react'
import { Link } from 'gatsby'

const Header = () => (
  <section className="hero is-primary">
    <div className="hero-body">
      <div className="container has-text-centered">
        <Link to="/">
          <h1 className="title header-title">
              Damien Gonot
          </h1>
        </Link>
        <h2 className="subtitle">
          Personal blog
        </h2>
      </div>
    </div>
  </section>
)

export default Header

import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

const About = () => (
  <div>
    <Helmet>
      <title>About - Damien Gonot</title>
      <meta name="description" content="About Damien Gonot" />
      <meta name="keywords" content="damien, gonot, damien gonot, about, linkedin, github, contact" />
    </Helmet>
    <h1>
      About
    </h1>
    <p>
      <span className="icon">
        <i className="fab fa-linkedin" />
      </span>
      LinkedIn: <a href="https://www.linkedin.com/in/damiengonot">https://www.linkedin.com/in/damiengonot</a>
    </p>
    <p>
      <span className="icon">
        <i className="fab fa-github" />
      </span>
      GitHub: <a href="https://github.com/mewfree">https://github.com/mewfree</a>
    </p>
    <p>
      <span className="icon">
        <i className="fas fa-at" />
      </span>
      Email: damien.gonot@gmail.com
    </p>
    <h1>
      λ
    </h1>
  </div>
)

export default About

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import './index.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Damien Gonot"
      meta={[
        { name: 'description', content: `Damien Gonot's personal website (${new Date().getFullYear()})` },
        { name: 'keywords', content: 'damien, gonot, damien gonot, personal' },
      ]}
    />
    <Navbar />
    <Header />
    <section className="section">
      <div className="container">
        {children()}
      </div>
    </section>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

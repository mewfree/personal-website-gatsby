import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import './index.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
      <html lang="en" />
      <title>Damien Gonot</title>
      <meta name="description" content={`Damien Gonot's personal website (${new Date().getFullYear()})`} />
      <meta name="keywords" content="damien, gonot, damien gonot, personal" />
      <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js" />
    </Helmet>
    <Navbar />
    <Header />
    <section className="section">
      <div className="container">
        <div className="content">
          <div className="middle-col">
            { children }
          </div>
        </div>
      </div>
    </section>
  </div>
)

export default TemplateWrapper

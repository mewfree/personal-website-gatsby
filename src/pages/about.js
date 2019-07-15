import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

const About = () => (
  <Layout>
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
      Contact form
    </h1>
    <form name="contact" method="POST" data-netlify="true">
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">From</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded has-icons-left">
              <input className="input" type="text" name="name" placeholder="Name" />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control is-expanded has-icons-left">
              <input className="input" type="email" name="email" placeholder="Email" />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Message</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea className="textarea" name="message" placeholder="Leave a message" />
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label" />
        <div className="field-body">
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <h1>
      λ
    </h1>
  </Layout>
)

export default About

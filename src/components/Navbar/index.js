import React from 'react'
import Link, { withPrefix } from 'gatsby-link'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      burger_active: false
    };
  }

  render() {
    return(
      <nav className="navbar is-primary" role="navigation" aria-label="navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">DG</Link>

          <div
            className={this.state.burger_active ? "navbar-burger is-active" : "navbar-burger"}
            onClick={e => this.setState({burger_active: !this.state.burger_active})}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          className={this.state.burger_active ? "navbar-menu is-active" : "navbar-menu"}
          onClick={e => this.setState({burger_active: false})}
        >
          <div className="navbar-start">
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/blog">Blog</Link>
            <a className="navbar-item" href={withPrefix('/damiengonot_resume.pdf')} target="_blank">Résumé</a>
          </div>
          <div className="navbar-end">
            <Link className="navbar-item" to="/about">About</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar

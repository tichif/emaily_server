import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'still pending';
      case false:
        return 'logged';
      default:
        return 'logged in';
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='left brand-logo'>
            Emaily
          </Link>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);

import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
          <div className="container">

            <a className="navbar-brand fs-1 fw-bold" ><span className="text-danger">Img. Cap. </span>Gen.</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDark" aria-controls="navbarDark" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse show" id="navbarDark">
              <ul className="navbar-nav ms-auto mb-2 mb-xl-0 fs-5 ms-auto p-2 text-center">
                <li className="nav-item me-3">
                  <Link to='/' style={{ textDecoration: 'none' }}> <a class="nav-link" >Home</a></Link>
                </li>
                <li className="nav-item me-3">
                  <Link to='/about' style={{ textDecoration: 'none' }}> <a class="nav-link" >About</a></Link>
                </li>
                <li className="nav-item me-3">
                  <Link to='/contact' style={{ textDecoration: 'none' }}> <a class="nav-link" >Contact</a></Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}


export default Navbar;
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    return (
      <>
        <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
          <div class="container">

            <a class="navbar-brand fs-1 fw-bold" ><span class="text-danger">Img. Cap. </span>Gen.</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDark" aria-controls="navbarDark" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse show" id="navbarDark">
              <ul class="navbar-nav ms-auto mb-2 mb-xl-0 fs-5 ms-auto p-2 text-center">
                <li class="nav-item me-3">
                  <Link to='/' style={{ textDecoration: 'none' }}> <a class="nav-link" >Home</a></Link>
                </li>
                <li class="nav-item me-3">
                  <Link to='/about' style={{ textDecoration: 'none' }}> <a class="nav-link" >About</a></Link>
                </li>
                <li class="nav-item me-3">
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
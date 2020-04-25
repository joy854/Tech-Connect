import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import UserLink from './UserLink';
// import { UserContext } from "../context/user";
import PostLink from './PostLink';
import LoginLink from './LoginLink';
import SignedInUserLink from './SignedInUserLink';
export default function NavBar() {
  return (
    <nav
      class='navbar navbar-expand-sm bg-dark navbar-dark fixed-top'
      id='main-nav'
    >
      <div class='container'>
        <Link to='/' className='navbar-brand'>
          <img src={logo} alt='vintage tech logo' className='logo' />
        </Link>
        <button
          class='navbar-toggler'
          data-toggle='collapse'
          data-target='#navbarCollapse'
        >
          <span class='navbar-toggler-icon'></span>
        </button>
        <div class='collapse navbar-collapse' id='navbarCollapse'>
          <ul class='navbar-nav ml-auto'>
            <li class='nav-item'>
              <Link to='/' className='BUTTON_LAI nav-link'>
                Home
              </Link>
            </li>
            <li class='nav-item'>
              <Link to='/about' className='BUTTON_LAI nav-link'>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <UserLink />
            </li>
            <li className='nav-item '>
              <PostLink />
            </li>
            <li className='nav-item'>
              <SignedInUserLink />
            </li>
            <li className='nav-item'>
              <LoginLink />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

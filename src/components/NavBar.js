import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import UserLink from './UserLink';
// import { UserContext } from "../context/user";
import PostLink from './PostLink';
import LoginLink from './LoginLink';
export default function NavBar() {
  return (
    <nav
      class='navbar navbar-expand-sm bg-dark navbar-dark fixed-top'
      id='main-nav'
    >
      <div class='container'>
        <a href='index.html' class='navbar-brand'>
          <img src={logo} alt='vintage tech logo' className='logo' />
        </a>
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
              <Link to='/' class='nav-link'>
                Home
              </Link>
            </li>
            <li class='nav-item'>
              <Link to='/about' class='nav-link'>
                About
              </Link>
            </li>
            <li class='nav-item'>
              <UserLink />
            </li>
            <li class='nav-item'>
              <PostLink />
            </li>
            <li class='nav-item'>
              <LoginLink />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

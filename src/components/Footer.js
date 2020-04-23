import React from 'react';
import { FaFacebook, FaTwitter, FaSkype } from 'react-icons/fa';

import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <div>
      <footer id='main-footer' class='bg-dark'>
        <div class='container-fluid'>
          <div class='col text-center py-2'>
            <br />
            Copyright &copy;
            <span id='year'></span>
            &nbsp; &nbsp;
            <h3 style={{ display: 'inline-block' }}>TECH-Connect</h3>
            {/* <span style={{ float: 'right' }}> */}
            <Link to='/' style={{ padding: '0.5%', float: 'right' }}>
              <FaFacebook />
            </Link>
            <Link to='/' style={{ padding: '0.5%', float: 'right' }}>
              <FaTwitter />
            </Link>
            <Link to='/' style={{ padding: '0.5%', float: 'right' }}>
              <FaSkype />
            </Link>
            {/* </span> */}
            <p></p>
            <button
              class='BUTTON_LAI'
              data-toggle='modal'
              data-target='#contactModal'
            >
              Contact Us
            </button>
            <br />
          </div>
        </div>
      </footer>

      <div class='modal fade text-dark' id='contactModal'>
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title'>Contact Us</h5>
              <button class='close' data-dismiss='modal'>
                <span>&times;</span>
              </button>
            </div>
            <div class='modal-body'>
              <form>
                <div class='form-group'>
                  <label for='name'>Name</label>
                  <input type='text' class='form-control' />
                </div>
                <div class='form-group'>
                  <label for='email'>Email</label>
                  <input type='email' class='form-control' />
                </div>
                <div class='form-group'>
                  <label for='message'>Message</label>
                  <textarea class='form-control'></textarea>
                </div>
              </form>
            </div>
            <div class='modal-footer'>
              <button class='btn btn-primary btn-block'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

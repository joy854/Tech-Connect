import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';

export default function LoginLink() {
  const { user, userLogout } = React.useContext(UserContext);

  if (user.id) {
    return (
      <button
        className='btn nav-link'
        onClick={() => {
          userLogout();
        }}
      >
        Logout
      </button>
    );
  }
  return (
    <Link to='/login' class='nav-link'>
      Login
    </Link>
  );
}

import React from 'react';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom';
export default function PostLink() {
  const { user } = React.useContext(UserContext);
  if (user.id) {
    return (
      <Link to='/posts' class='nav-link BUTTON_LAI '>
        Posts
      </Link>
    );
  }
  return <div></div>;
}

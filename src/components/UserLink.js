import React from 'react';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom';
export default function UserLink() {
  const { user } = React.useContext(UserContext);
  if (user.id) {
    return (
      <Link to='/users' class='nav-link'>
        Users
      </Link>
    );
  }
  return <div></div>;
}

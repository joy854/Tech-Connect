import React from 'react';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom';
export default function SignedInUserLink() {
  const { user, userDetails } = React.useContext(UserContext);
  const url = `/users/${user.id}`;
  if (user.id) {
    return (
      <Link to={url} class='nav-link BUTTON_LAI '>
        {userDetails.fname}'s Profile
      </Link>
    );
  }
  return <div></div>;
}

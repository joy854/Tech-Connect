import React from 'react';
import { Link } from 'react-router-dom';
export default function SingleUserBrief({ user }) {
  const url = `/users/${user.id}`;
  return (
    <div class='row'>
      <div class='col-md-4 mid-container'>
        <img
          src={user.image}
          alt='No Profile Picture'
          className='img-profile'
        />
      </div>
      <div class='col-md-8 '>
        <h3>
          {user.fname} {user.lname}
        </h3>
        <h5>Education: {user.institute}</h5>
        <p>{user.bio}</p>
        <Link to={url} className='BUTTON_LAI'>
          View Profile
        </Link>
      </div>
    </div>
  );
}

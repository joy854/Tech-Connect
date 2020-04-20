import React from 'react';
import { UsersContext } from '../context/users';
import { UserContext } from '../context/user';
import { Redirect } from 'react-router-dom';
import SingleUserBrief from './SingleUserBrief';
export default function UserList() {
  const { users } = React.useContext(UsersContext);
  const { user } = React.useContext(UserContext);
  if (!user.id) return <Redirect to='/' />;
  return (
    <div className='section'>
      <h1 style={{ textAlign: 'center' }}>Users</h1>
      <div className='contain'>
        {users.map((user) => (
          <SingleUserBrief user={user} />
        ))}
      </div>
    </div>
  );
}

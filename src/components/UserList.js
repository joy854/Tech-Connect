import React from 'react';
import { UserContext } from '../context/user';
import { Redirect } from 'react-router-dom';
import SingleUserBrief from './SingleUserBrief';
import Filters from './Filters';
import { FilteredUserContext } from '../context/filteredusers';

export default function UserList() {
  const { user } = React.useContext(UserContext);
  const { filterUser } = React.useContext(FilteredUserContext);

  if (!user.id) return <Redirect to='/' />;
  return (
    <div className='section'>
      <h1 style={{ textAlign: 'center' }}>Search Users</h1>
      <Filters />
      <div className='contain'>
        {filterUser.map((user) => (
          <SingleUserBrief user={user} />
        ))}
      </div>
    </div>
  );
}

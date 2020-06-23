import React from 'react';
import { UserContext } from '../context/user';
import { Redirect } from 'react-router-dom';
import SingleUserBrief from './SingleUserBrief';
import Filters from './Filters';
import { FilteredUserContext } from '../context/filteredusers';

export default function UserList() {
  const { user, token } = React.useContext(UserContext);
  const { filterUser } = React.useContext(FilteredUserContext);

  const returnContent = () => {
    if (token) {
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
    } else return <Redirect to='/' />;
  };
  return <div>{returnContent()}</div>;
}

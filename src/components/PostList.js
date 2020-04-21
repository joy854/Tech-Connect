import React from 'react';
import { UsersContext, UsersProvider } from '../context/users';
import { UserContext } from '../context/user';
export default function PostList() {
  const { user } = React.useContext(UserContext);
  const { users, titles, followers, followBtn, unFollowBtn } = React.useContext(
    UsersContext
  );
  return <div></div>;
}

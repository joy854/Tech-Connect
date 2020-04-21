import React from 'react';
import { UsersContext, UsersProvider } from '../context/users';
import { UserContext } from '../context/user';
import PostItem from './PostItem';
import uuid from 'uuid/v4';
export default function PostList() {
  const { user, postsOfUser } = React.useContext(UserContext);
  const { users, titles, followers, followBtn, unFollowBtn } = React.useContext(
    UsersContext
  );

  return (
    <div>
      {postsOfUser.map((item) => {
        return <PostItem key={uuid()} />;
      })}
    </div>
  );
}

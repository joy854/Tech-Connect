import React from 'react';
import { UsersContext } from '../context/users';
import { UserContext } from '../context/user';
import { PostContext } from '../context/post';
import PostItem from './PostItem';
import uuid from 'uuid/v4';
export default function PostList() {
  const { postsOfUser, user } = React.useContext(UserContext);
  const { followers } = React.useContext(UsersContext);
  // const { users, titles, followers, followBtn, unFollowBtn } = React.useContext(
  //   UsersContext
  // );
  const returnPosts = () => {
    let ids = followers.filter((item) => {
      if (item.from_id === user.id) return item;
    });
    const newid = {
      from_id: user.id,
      to_id: user.id,
    };
    ids.push(newid);
    // console.log(ids);
    const newPost = postsOfUser.filter((post) => {
      let flag = 1,
        i;
      for (i = 0; i < ids.length; i++) {
        if (ids[i].to_id === post.id) {
          flag = 0;
        }
      }
      if (flag === 0) return post;
    });
    // console.log(newPost);

    const arr = newPost.map((item) => {
      return <PostItem key={uuid()} element={item} />;
    });
    return arr;
  };
  return <div>{returnPosts()}</div>;
}

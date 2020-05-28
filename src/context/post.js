import React from 'react';
import { UserContext } from './user';
import uuid from 'uuid/v4';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const PostContext = React.createContext();

// function getPostsFromLocalStorage() {
//   return localStorage.getItem('posts')
//     ? JSON.parse(localStorage.getItem('posts'))
//     : [];
// }

function PostProvider({ children }) {
  const { user, postsOfUser, setPostsOfUser, userDetails } = React.useContext(
    UserContext
  );

  const [text, setText] = React.useState('');
  const [url, setUrl] = React.useState('');
  // const [post_id, setPost_id] = React.useState(uuid());

  // const [id, setId] = React.useState(user.id);

  // const insertPost = async (e) => {
  //   e.preventDefault();
  //   console.log(id, post_id, text, url);
  //   let response = await fetch('http://localhost:3001/insertPost', {
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       text,
  //       url,
  //       id,
  //       post_id,
  //     }),
  //   })
  //     .then((newUser) => newUser.json())
  //     .then((item) => {
  //       const obj = {
  //         post_id,
  //       };
  //       return obj;
  //     })
  //     .catch((err) => console.log(err));
  //   return response;
  // };
  async function insertPost(post_id) {
    let id = user.id;
    if (!id) {
      // setPostsOfUser([]);
      return;
    }
    const response = await axios
      .post('https://guarded-woodland-97115.herokuapp.com/insertPost', {
        id,
        text,
        url,
        post_id,
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }

  const insertPostForUser = () => {
    const pid = uuid();
    const item = {
      id: user.id,
      content: text,
      post_url: url,
      image_url: userDetails.image,
      post_id: pid,
      username: userDetails.username,
      fname: userDetails.fname,
      lname: userDetails.lname,
    };

    setPostsOfUser([item, ...postsOfUser]);
    console.log('insert user', postsOfUser);
    insertPost(pid);
  };

  async function deletePost(postid) {
    let id = user.id;
    console.log(id, postid);
    if (!id) {
      // setPostsOfUser([]);
      return;
    }

    const response = await axios
      .post('https://guarded-woodland-97115.herokuapp.com/deletePost', {
        id,
        postid,
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }

  const deletePostForUser = (postid) => {
    const newArr = postsOfUser.filter((item) => {
      if (item.id !== userDetails.id || item.post_id !== postid) return item;
    });

    setPostsOfUser(newArr);
    console.log('delete user', postsOfUser);
    deletePost(postid);
  };

  const submitPost = async (e) => {
    // e.preventDefault();

    console.log(url, text);

    // const res = await insertPost();
    insertPostForUser();
    setText('');
    setUrl('');
    // console.log(res);
  };

  // React.useEffect(() => {
  //   getPosts(); //will result in error when user signs out
  //   console.log('posts', postsOfUser);
  // }, [user.id]);

  //   if (!user.id) return <Redirect to='/' />;

  const [showComments, setShowComments] = React.useState([]);
  const showCmnt = (owner_id, post_id) => {
    const newUser = {
      owner_id,
      post_id,
    };
    // console.log(showComments);
    // const newArr = showComments.filter((item) => {
    //   if (item.owner_id === owner_id && item.post_id === post_id) return item;
    // });
    setShowComments([...showComments, newUser]);
  };
  const hideCmnt = (owner_id, post_id) => {
    const newCmnt = showComments.filter((item) => {
      if (!(item.owner_id === owner_id && item.post_id === post_id))
        return item;
    });
    setShowComments(newCmnt);
  };

  return (
    <PostContext.Provider
      value={{
        text,
        showComments,
        showCmnt,
        hideCmnt,
        setText,
        url,
        setUrl,
        submitPost,
        deletePostForUser,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export { PostProvider, PostContext };

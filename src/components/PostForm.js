import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import PostList from './PostList';
import { Redirect } from 'react-router-dom';
import { PostContext } from '../context/post';
import { UserContext } from '../context/user';
import { UsersContext } from '../context/users';

import Error from '../pages/Error';
export default function PostForm() {
  const { text, url, setText, setUrl, submitPost } = React.useContext(
    PostContext
  );
  const {
    user,
    postsOfUser,
    setPostsOfUser,
    getComments,
    getPosts,
    getLikes,
    setAllLikes,
    visibleComments,
    setVisibleComments,
  } = React.useContext(UserContext);

  const { followers } = React.useContext(UsersContext);

  function getCommentsDetailFromLocalStorage() {
    return localStorage.getItem('comments')
      ? JSON.parse(localStorage.getItem('comments'))
      : [];
  }

  function getPostsDetailFromLocalStorage() {
    return localStorage.getItem('posts')
      ? JSON.parse(localStorage.getItem('posts'))
      : [];
  }

  function getLikesFromLocalStorage() {
    return localStorage.getItem('likes')
      ? JSON.parse(localStorage.getItem('likes'))
      : [];
  }

  React.useEffect(() => {
    getPosts(user.id); //will result in error when user signs out
    getLikes();
    getComments(user.id);
    if (window.performance) {
      if (performance.navigation.type === 1) {
        setPostsOfUser(getPostsDetailFromLocalStorage());
        setVisibleComments(getCommentsDetailFromLocalStorage());
        setAllLikes(getLikesFromLocalStorage());
        // alert('This page is reloaded');
      }
    }
    console.log('posts', postsOfUser);
    // console.log('comments', visibleComments);
  }, [followers, user.id]);

  // const [btnClick, setBtnClick] = React.useState(false);

  // const toggleBtnClick = () => {
  //   setBtnClick((prevMember) => {
  //     let isMember = !prevMember;
  //     return isMember;
  //   });
  // };

  // const funPostlist = () => {
  //   return <PostList />;
  // };

  // React.useEffect(() => {
  //   funPostlist();
  // }, [postsOfUser]);

  if (!user.id) return <Redirect to='/' />;
  return (
    <section className='section mid-container'>
      <form>
        <h1>Posts</h1>
        <div className='form-center'>
          <div className='form-group'>
            <p>
              <FaUserAlt /> Welcome to the Community!
            </p>
            {/* <input
              type='text'
              className='form-control'
              id='newpost'
              name='newpost'
              placeholder='Write Something Here....'
              value={singleSkill}
              onChange={handleSingleSkill}
            /> */}
            <textarea
              id='newpost'
              rows='10'
              cols='100'
              placeholder='Write Something Here....'
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            <p>
              <input
                type='text'
                className='form-control'
                id='url'
                name='url'
                placeholder='Enter Image Url (Optional)'
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </p>
          </div>
          <input
            type='button'
            className='BUTTON_LAI'
            value='Create Post'
            onClick={() => {
              submitPost();
              console.log(postsOfUser);
              // localStorage.setItem('posts', JSON.stringify(postsOfUser));

              // toggleBtnClick();
            }}
          />
          {/* <button
            className='btn btn-primary'
            onClick={() => {
              submitPost();
              // toggleBtnClick();
            }}
          >
            Create Post
          </button> */}
          {/* <MdSend className='btn-icon' /> */}

          {/* </button> */}
          {/* {funPostlist()} */}
          <PostList />
        </div>
      </form>
    </section>
  );
}

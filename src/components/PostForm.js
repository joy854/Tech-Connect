import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import PostList from './PostList';
import { Redirect } from 'react-router-dom';
import { PostContext } from '../context/post';
import { UserContext } from '../context/user';
import Error from '../pages/Error';
export default function PostForm() {
  const { text, url, setText, setUrl, submitPost } = React.useContext(
    PostContext
  );
  const { user, toggleInsertPostHelper } = React.useContext(UserContext);
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
                console.log(text);
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
                  console.log(url);
                }}
              />
            </p>
          </div>
          <input
            type='button'
            className='btn btn-primary'
            value='Create Post'
            onClick={() => {
              submitPost();
              toggleInsertPostHelper();
            }}
          />
          {/* <MdSend className='btn-icon' /> */}

          {/* </button> */}
          <PostList />
        </div>
      </form>
    </section>
  );
}

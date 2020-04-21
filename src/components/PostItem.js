import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import { PostContext } from '../context/post';

export default function PostItem({ element }) {
  const { user, toggleInsertPostHelper } = React.useContext(UserContext);
  const { deletePost } = React.useContext(PostContext);
  const postid = element.post_id;
  const urlOfPost = () => {
    if (element.post_url)
      return (
        <div className='img-post-div'>
          <img src={element.post_url} className='img-post' />
        </div>
      );
    return <div></div>;
  };
  return (
    <div className='post-item-container'>
      <div className=''>
        <img
          src={element.image_url}
          alt='No Profile Picture'
          className='img-profile-post'
        />
        &nbsp;&nbsp;&nbsp;
        <span>
          {element.fname} {element.lname}
        </span>
      </div>
      {/* <div> */}
      {urlOfPost()}

      <p>{element.content}</p>
      {/* <Link to={url} className='btn btn-primary'>
          View Profile
        </Link> */}
      {/* </div> */}
      <button className='btn btn-primary'>View Comments</button>
      {element.id === user.id && (
        <input
          type='button'
          onClick={() => {
            deletePost(postid);
            toggleInsertPostHelper();
          }}
          value='Delete Post'
          className='btn btn-danger'
          style={{ float: 'right' }}
        />
      )}
    </div>
  );
}

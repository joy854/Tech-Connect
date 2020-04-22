import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import { PostContext } from '../context/post';
import CommentItem from './CommentItem';
import CommentList from './CommentList';

export default function PostItem({ element }) {
  //   const { user, toggleInsertPostHelper } = React.useContext(UserContext);
  const { user, visibleComments } = React.useContext(UserContext);
  const [showComment, setShowComment] = React.useState(false);
  const { deletePostForUser } = React.useContext(PostContext);

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

  const toggleShowComment = () => {
    setShowComment((prevMember) => {
      let isMember = !prevMember;
      return isMember;
    });
  };

  return (
    <div className='post-item-container'>
      <div style={{ marginBottom: '0.5rem' }}>
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
        <input
          type='button'
          value='View Comments'
          className='btn btn-primary'
          onClick={toggleShowComment}
        />
        {element.id === user.id && (
          <input
            type='button'
            onClick={() => {
              deletePostForUser(postid);
              // toggleInsertPostHelper();
            }}
            value='Delete Post'
            className='btn btn-danger'
            style={{ float: 'right' }}
          />
        )}
      </div>
      {showComment && <CommentList post={element} />}
    </div>
  );
}

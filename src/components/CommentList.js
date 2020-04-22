import React from 'react';
import CommentItem from './CommentItem';
import { UserContext } from '../context/user';
import uuid from 'uuid/v4';
export default function CommentList({ post }) {
  const { userDetails, visibleComments } = React.useContext(UserContext);

  const returnComments = () => {
    const newList = visibleComments.filter((item) => {
      if (item.id === post.id && item.post_id === post.post_id) return item;
    });
    if (!newList.length) return <div>Empty</div>;
    const arr = newList.map((item) => {
      console.log(item);
      return <CommentItem key={uuid()} element={item} />;
    });
    return arr;
  };
  return (
    <div className=''>
      <div class='row'>
        <div class='col-md-2'>
          <img
            src={userDetails.image}
            alt='No Profile Picture'
            className='img-comment'
          />
          <div>
            {' '}
            {userDetails.fname} {userDetails.lname}
          </div>
        </div>

        <div class='col-md-8 '>
          <input type='text' placeholder='Enter your Comment!' />
        </div>

        <div class='col-md-2 '>
          <input type='button' className='btn btn-primary' value='Add' />
          {/* <Link to={url} className='btn btn-primary'>
          View Profile
        </Link> */}
        </div>
      </div>
      {returnComments()}
    </div>
  );
}

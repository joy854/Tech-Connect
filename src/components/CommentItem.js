import React from 'react';
import { UserContext } from '../context/user';
export default function CommentItem({ element }) {
  const { user, visibleComments, delCommentForUser } = React.useContext(
    UserContext
  );
  return (
    <div class='row'>
      <div class='col-md-2'>
        <img
          src={element.image}
          alt='No Profile Picture'
          className='img-comment'
        />
        <div>
          {' '}
          {element.fname} {element.lname}
          <br />
        </div>
      </div>
      <div class='col-md-8 '>
        <p>{element.content}</p>
        {/* <Link to={url} className='btn btn-primary'>
          View Profile
        </Link> */}
      </div>

      <div class='col-md-2 '>
        {user.id === element.commenter_id && (
          <input
            type='button'
            className='btn btn-danger'
            value='Delete'
            onClick={() =>
              delCommentForUser(element.id, element.comment_id, element.post_id)
            }
          />
        )}
        {/* <Link to={url} className='btn btn-primary'>
          View Profile
        </Link> */}
      </div>
    </div>
  );
}

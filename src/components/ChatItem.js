import React from 'react';

export default function ChatItem({ element }) {
  return (
    <div>
      <div class='row'>
        <div class='col-md-2'>
          <img
            src={element.image_from}
            alt='No Profile Picture'
            className='img-comment'
          />
          <div> {element.from_fname}</div>
        </div>

        <div class='col-md-10 '>
          <p>{element.msg}</p>
          {/* <Link to={url} className='btn btn-primary'>
      View Profile
    </Link> */}
        </div>
      </div>
    </div>
  );
}

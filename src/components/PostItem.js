import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import { PostContext } from '../context/post';
import CommentItem from './CommentItem';
import CommentList from './CommentList';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';

export default function PostItem({ element }) {
  //   const { user, toggleInsertPostHelper } = React.useContext(UserContext);
  const {
    user,
    visibleComments,
    showComment,
    toggleShowComment,
    allLikes,
    setAllLikes,
    insertLikeByUser,
    deleteLikeByUser,
    getLikes,
  } = React.useContext(UserContext);

  const { deletePostForUser } = React.useContext(PostContext);

  const likeState = () => {
    // console.log(allLikes);
    const newArr = allLikes.filter((item) => {
      // console.log(item);
      // console.log(item.curr_user_id, item.post_owner_id, item.post_id);
      // console.log(user.id, element.id, element.post_id);
      if (
        item.curr_user_id === user.id &&
        item.post_owner_id === element.id &&
        item.post_id === element.post_id
      )
        return item;
    });
    // console.log(newArr);
    if (newArr.length) return true;
    return false;
  };

  const entryCnt = () => {
    let cnt = 0;
    allLikes.map((item) => {
      if (item.post_owner_id === element.id && item.post_id === element.post_id)
        cnt++;
    });
    // console.log(element.id, element.post_id, cnt);
    return cnt;
  };
  const [likeUnlike, setLikeUnlike] = React.useState(likeState());
  const [likeCnt, setLikeCnt] = React.useState(entryCnt());

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
  const like = (e) => {
    e.preventDefault();
    console.log('like');
    setLikeUnlike(true);
    const item = {
      curr_user_id: user.id,
      post_owner_id: element.id,
      post_id: element.post_id,
    };
    setAllLikes([...allLikes, item]);
    setLikeCnt(1 + likeCnt);
    // console.log(allLikes, item, likeCnt);
    // console.log(likeCnt);
    insertLikeByUser(user.id, element.id, element.post_id);
  };
  const unlike = (e) => {
    e.preventDefault();
    // console.log('unlike');
    // console.log(likeCnt);
    setLikeUnlike(false);
    setLikeCnt(likeCnt - 1);
    const arr = allLikes.filter((item) => {
      if (
        item.curr_user_id !== user.id ||
        item.post_owner_id !== element.id ||
        item.post_id !== element.post_id
      )
        return item;
    });
    // console.log(arr, likeCnt);
    setAllLikes(arr);
    deleteLikeByUser(user.id, element.id, element.post_id);
  };
  const returnIcon = () => {
    if (likeUnlike)
      return (
        <span>
          <button
            onClick={unlike}
            className='btn-primary'
            style={{ transition: 'transform .3s ease-in' }}
          >
            <FaThumbsUp /> {likeCnt}{' '}
          </button>
        </span>
      );
    else
      return (
        <span>
          <button
            onClick={like}
            className='btn-primary'
            style={{ transition: '0.5s' }}
          >
            <FaRegThumbsUp />
            {likeCnt}{' '}
          </button>
        </span>
      );
  };

  // React.useEffect(() => {
  //   getLikes(); //will result in error when user signs out
  //   if (window.performance) {
  //     if (performance.navigation.type == 1) {
  //       setAllLikes(getLikesFromLocalStorage());
  //       // alert('This page is reloaded');
  //     }
  //   }
  // }, []);

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
        {/* {likeUnlike ? <span>liked</span> : <FaRegThumbsUp />} */}
        {returnIcon()}
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
              localStorage.setItem('comments', JSON.stringify(visibleComments));
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

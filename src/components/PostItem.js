import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import { PostContext } from '../context/post';
import CommentItem from './CommentItem';
import CommentList from './CommentList';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';

// function getShowCommentsFromLocalStorage() {
//   return localStorage.getItem('showcomment')
//     ? JSON.parse(localStorage.getItem('showcomment'))
//     : false;
// }

export default function PostItem({ element }) {
  //   const { user, toggleInsertPostHelper } = React.useContext(UserContext);
  const {
    user,
    visibleComments,
    allLikes,
    setAllLikes,
    insertLikeByUser,
    deleteLikeByUser,
    getLikes,
  } = React.useContext(UserContext);

  const {
    deletePostForUser,
    showComments,
    showCmnt,
    hideCmnt,
  } = React.useContext(PostContext);

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
  // const [showComment, setShowComment] = React.useState(
  //   getShowCommentsFromLocalStorage()
  // );

  const postid = element.post_id;

  // const toggleShowComment = () => {
  //   console.log(showComment);
  //   setShowComment((prevMember) => {
  //     let isMember = !prevMember;
  //     return isMember;
  //   });
  //   // localStorage.setItem('showcomment', JSON.stringify(!showComment));
  // };

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
    // console.log('like');
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
          <button onClick={unlike} className='BUTTON_LAI' style={{}}>
            <FaThumbsUp />
            &nbsp; Liked ({likeCnt}){' '}
          </button>
        </span>
      );
    else
      return (
        <span>
          <button onClick={like} className='BUTTON_LAI' style={{}}>
            <FaRegThumbsUp />
            &nbsp; Like ({likeCnt}){' '}
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

  const [cmnt, setCmnt] = React.useState(false);

  // const showCmnt = () => {
  //   const newUser = {
  //     owner_id: element.id,
  //     post_id: element.post_id,
  //   };
  //   setCmnt(true);
  //   // [...showComments, newUser]
  //   setShowComments(showComments);
  // };
  // const hideCmnt = (owner_id, post_id) => {
  //   setCmnt(false);
  //   // setShowComments(showComments);
  // };
  const getStatus = () => {
    const chckArr = showComments.filter((item) => {
      if (item.owner_id === element.id && item.post_id === element.post_id)
        return item;
    });
    if (chckArr.length) return true;
    return false;
  };
  const [cmntStatus, setCmntStatus] = React.useState(getStatus());

  const showHideCmnt = () => {
    // console.log(cmnt);
    if (!cmntStatus) {
      return (
        <input
          type='button'
          value='View Comments'
          className='BUTTON_LAI'
          onClick={() => {
            setCmntStatus(true);
            showCmnt(element.id, element.post_id);
            // console.log('show');
          }}
        />
      );
    } else {
      return (
        <input
          type='button'
          value='Hide Comments'
          className='BUTTON_LAI'
          onClick={() => {
            setCmntStatus(false);
            hideCmnt(element.id, element.post_id);
            // console.log('hide');
          }}
        />
      );
    }
  };

  const checkComment = () => {
    const chckArr = showComments.filter((item) => {
      if (item.owner_id === element.id && item.post_id === element.post_id)
        return item;
    });
    // console.log(chckArr, showComments); //if there are 2 posts then 2 chckarr will be printed 1 for each post
    if (chckArr.length) {
      // setCmnt(true);
      return <CommentList post={element} />;
    } else {
      // setCmnt(false);
      return <div></div>;
    }
  };

  return (
    <div
      className=' post-item-container'
      style={{ overflowWrap: 'break-word' }}
    >
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
        <br />
        <p>{element.content}</p>
        {/* <Link to={url} className='btn btn-primary'>
          View Profile
        </Link> */}
        {/* </div> */}
        {/* {likeUnlike ? <span>liked</span> : <FaRegThumbsUp />} */}
        {returnIcon()}
        {/* <div className='container-fluid'> */}
        <div className='row' style={{ border: 'none', padding: '0' }}>
          <div className='col-xs-6 col-sm-6 col-md-6 ' style={{}}>
            {showHideCmnt()}
          </div>
          <div className='del-btn col-xs-6 col-sm-6 col-md-6  ' style={{}}>
            {element.id === user.id && (
              <input
                type='button'
                onClick={() => {
                  deletePostForUser(postid);
                  // toggleInsertPostHelper();
                  // localStorage.setItem(
                  //   'comments',
                  //   JSON.stringify(visibleComments)
                  // );
                }}
                value='Delete Post'
                className=' BUTTON_NXY'
                // style={{ position: 'absolute', right: '1%' }}
              />
            )}
          </div>
        </div>
        {/* </div> */}
      </div>

      {checkComment()}
    </div>
  );
}

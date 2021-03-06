// user context
import React from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
// import { useHistory } from 'react-router-dom';
// const history = useHistory();
import { Redirect } from 'react-router-dom';

const UserContext = React.createContext();

// function getUserFromLocalStorage() {
//   return localStorage.getItem('user')
//     ? JSON.parse(localStorage.getItem('user'))
//     : { username: null, id: null };
// }
// function getUserDetailFromLocalStorage() {
//   return localStorage.getItem('detail')
//     ? JSON.parse(localStorage.getItem('detail'))
//     : { username: null, id: null };
// }

// function getCommentsDetailFromLocalStorage() {
//   return localStorage.getItem('comments')
//     ? JSON.parse(localStorage.getItem('comments'))
//     : [];
// }

// function getPostsDetailFromLocalStorage() {
//   return localStorage.getItem('posts')
//     ? JSON.parse(localStorage.getItem('posts'))
//     : [];
// }
function getTokenFromLocalStorage() {
  return localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : '';
}

function UserProvider({ children }) {
  // const [user, setUser] = React.useState(getUserFromLocalStorage());
  // const [userDetails, setUserDetails] = React.useState(
  //   getUserDetailFromLocalStorage()
  // );
  const [token, setToken] = React.useState(getTokenFromLocalStorage());
  const [user, setUser] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [userDetails, setUserDetails] = React.useState([]);
  const [postsOfUser, setPostsOfUser] = React.useState([]);
  const [visibleComments, setVisibleComments] = React.useState([]);
  const [allChats, setAllChats] = React.useState([]);
  const [chatText, setChatText] = React.useState('');
  const [height, setHeight] = React.useState(0);
  const [allLikes, setAllLikes] = React.useState([]);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      setHeight(window.pageYOffset);
    });
    return () => window.removeEventListener('scroll', () => {});
  });

  async function getLikes() {
    // let userid = user.id;
    // console.log(token);
    const response = await axios
      .get('https://guarded-woodland-97115.herokuapp.com/getLikes', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log('likes', res.data);
        // localStorage.setItem('likes', JSON.stringify(res.data));
        setAllLikes(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }

  async function insertLike(curr_user_id, post_owner_id, post_id) {
    const response = await axios
      .post(
        'https://guarded-woodland-97115.herokuapp.com/insertlike',
        {
          curr_user_id,
          post_owner_id,
          post_id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log('insert like', res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }
  const insertLikeByUser = (curr_user_id, post_owner_id, post_id) => {
    const item = {
      curr_user_id,
      post_owner_id,
      post_id,
    };
    // setAllLikes([item, ...allLikes]);
    insertLike(curr_user_id, post_owner_id, post_id);
  };

  async function deleteLike(curr_user_id, post_owner_id, post_id) {
    const response = await axios
      .post(
        'https://guarded-woodland-97115.herokuapp.com/deleteLike',
        {
          curr_user_id,
          post_owner_id,
          post_id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log('delete like', res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }
  const deleteLikeByUser = (curr_user_id, post_owner_id, post_id) => {
    deleteLike(curr_user_id, post_owner_id, post_id);
  };

  async function getPosts(userid) {
    // let userid = user.id;
    if (!userid) {
      // setPostsOfUser([]);
      return;
    }
    const response = await axios
      .post(
        'https://guarded-woodland-97115.herokuapp.com/getPosts',
        {
          userid,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log('posts', res.data);
        // localStorage.setItem('posts', JSON.stringify(res.data));
        setPostsOfUser(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }

  async function getComments(userid) {
    // let userid = user.id;
    if (!userid) {
      // setPostsOfUser([]);
      return;
    }
    const response = await axios
      .post(
        'https://guarded-woodland-97115.herokuapp.com/getComments',
        {
          userid,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log('comments', res.data);
        // localStorage.setItem('comments', JSON.stringify(res.data));
        setVisibleComments(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }

  async function getDetails(userid) {
    const response = await axios
      .post(
        'https://guarded-woodland-97115.herokuapp.com/getDetails',
        {
          userid,
        }
        // {
        //   headers: { authorization: `Bearer ${token}` },
        // }
      )
      .then((res) => {
        // console.log('user', res.data);
        // localStorage.setItem('detail', JSON.stringify(res.data));
        setUserDetails(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }

  async function getChats() {
    // let userid = user.id;
    const response = await axios
      .get('https://guarded-woodland-97115.herokuapp.com/getChats', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // localStorage.setItem('chats', JSON.stringify(res.data));
        setAllChats(res.data);
        // console.log('chats', res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }
  // const [toggleInsertPost, setToggleInsertPost] = React.useState(false);

  // const toggleInsertPostHelper = () => {
  //   setToggleInsertPost((prevMember) => {
  //     let isMember = !prevMember;
  //     return isMember;
  //   });
  // };

  // const addLike = () => {};
  // const dislike = () => {};

  async function delComment(id, comment_id, post_id) {
    // let userid = user.id;
    if (!id) {
      // setPostsOfUser([]);
      return;
    }
    const response = await axios
      .post(
        'https://guarded-woodland-97115.herokuapp.com/deleteComment',
        {
          id,
          comment_id,
          post_id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log('comments', res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }
  const delCommentForUser = (id, comment_id, post_id) => {
    const newComments = visibleComments.filter((item) => {
      if (
        id !== item.id ||
        comment_id !== item.comment_id ||
        post_id != item.post_id
      )
        return item;
    });
    console.log(newComments);
    setVisibleComments(newComments);
    delComment(id, comment_id, post_id);
  };

  async function addComment(
    username,
    fname,
    lname,
    commenter_id,
    id,
    post_id,
    image,
    content,
    comment_id
  ) {
    // let userid = user.id;
    if (!id) {
      // setPostsOfUser([]);
      return;
    }
    const response = await axios
      .post(
        'https://guarded-woodland-97115.herokuapp.com/insertComment',
        {
          username,
          fname,
          lname,
          commenter_id,
          id,
          post_id,
          image,
          content,
          comment_id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log('comments', res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }
  const addCommentForUser = (
    username,
    fname,
    lname,
    commenter_id,
    id,
    post_id,
    image,
    content
  ) => {
    let c_id = uuid();
    const newItem = {
      username,
      fname,
      lname,
      commenter_id,
      id,
      post_id,
      image,
      content,
      comment_id: c_id,
    };
    console.log(newItem);
    setVisibleComments([newItem, ...visibleComments]);
    addComment(
      username,
      fname,
      lname,
      commenter_id,
      id,
      post_id,
      image,
      content,
      c_id
    );
  };
  async function getAllUser() {
    const response = await axios
      .get('https://guarded-woodland-97115.herokuapp.com/users', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => console.log(error));
    return response;
  }
  async function insertChat(userid, newId) {
    const response = await axios
      .post(
        'https://guarded-woodland-97115.herokuapp.com/insertChat',
        {
          id_from: userDetails.id,
          id_to: userid,
          chat_id: newId,
          from_fname: userDetails.fname,
          to_fname: '',
          msg: chatText,
          image_from: userDetails.image,
          image_to: '',
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log('user', res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }

  const insertChatByUser = (id_to) => {
    const newId = uuid();
    const item = {
      id_from: userDetails.id,
      id_to,
      chat_id: newId,
      from_fname: userDetails.fname,
      to_fname: '',
      msg: chatText,
      image_from: userDetails.image,
      image_to: '',
    };
    setAllChats([item, ...allChats]);
    insertChat(id_to, newId);
  };

  const userLogin = (item) => {
    // getUserFromToken();

    setUser(item);
    getDetails(item.id);
    getPosts(item.id);
    getComments(item.id);
    getChats();
    getLikes();

    // console.log(item.id, item.username, userDetails);
    // console.log('posts', postsOfUser);
    // console.log('comments', visibleComments);
    // localStorage.setItem('user', JSON.stringify(item));
  };

  const userLogout = () => {
    setUser({ username: null, id: null });
    localStorage.removeItem('token');
    setToken('');
    return <Redirect to='/' />;

    // history.push('/');
    // return <Redirect to='/' />;
  };
  // const [alert, setAlert] = React.useState({
  //   show: false,
  //   msg: '',
  //   type: 'success',
  // });
  async function getUserFromToken() {
    const response = await axios
      .post('https://guarded-woodland-97115.herokuapp.com/getUserFromToken', {
        usertoken: token,
      })
      .then((res) => {
        userLogin(res.data);
      })
      .catch((error) => console.log(error));
    return response;
  }

  React.useEffect(() => {
    // getPosts(); //will result in error when user signs out
    // getComments();
    // console.log('posts', postsOfUser);
    // console.log('comments', visibleComments);
    if (token) {
      getAllUser();
      getUserFromToken();
    }
    // console.log('user.js');
  }, []);

  // const showAlert = ({ msg, type = 'success' }) => {
  //   setAlert({ show: true, msg, type });
  // };
  // const hideAlert = () => {
  //   setAlert({ ...alert, show: false });
  // };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        users,
        userDetails,
        userLogin,
        userLogout,
        postsOfUser,
        setPostsOfUser,
        visibleComments,
        setVisibleComments,
        getComments,
        getPosts,
        delCommentForUser,
        addCommentForUser,
        allChats,
        setAllChats,
        chatText,
        setChatText,
        insertChatByUser,
        getChats,
        getLikes,
        allLikes,
        setAllLikes,
        insertLikeByUser,
        deleteLikeByUser,
        // alert,
        // showAlert,
        // hideAlert,
        height,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };

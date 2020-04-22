// user context
import React from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// const history = useHistory();
import { Redirect } from 'react-router-dom';

const UserContext = React.createContext();

function getUserFromLocalStorage() {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { username: null, id: null };
}
function getUserDetailFromLocalStorage() {
  return localStorage.getItem('detail')
    ? JSON.parse(localStorage.getItem('detail'))
    : { username: null, id: null };
}

function UserProvider({ children }) {
  const [user, setUser] = React.useState(getUserFromLocalStorage());
  const [userDetails, setUserDetails] = React.useState(
    getUserDetailFromLocalStorage()
  );
  const [height, setHeight] = React.useState(0);
  const [postsOfUser, setPostsOfUser] = React.useState([]);
  const [visibleComments, setVisibleComments] = React.useState([]);

  async function getPosts(userid) {
    // let userid = user.id;
    if (!userid) {
      // setPostsOfUser([]);
      return;
    }
    const response = await axios
      .post('http://localhost:3001/getPosts', {
        userid,
      })
      .then((res) => {
        console.log('posts', res.data);
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
      .post('http://localhost:3001/getComments', {
        userid,
      })
      .then((res) => {
        console.log('comments', res.data);
        // localStorage.setItem('posts', JSON.stringify(res.data));
        setVisibleComments(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }

  async function getDetails(userid) {
    const response = await axios
      .post('http://localhost:3001/getDetails', {
        userid,
      })
      .then((res) => {
        console.log('user', res.data);
        localStorage.setItem('detail', JSON.stringify(res.data));
        setUserDetails(res.data);
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
  // React.useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     setHeight(window.pageYOffset);
  //   });
  //   return () => window.removeEventListener('scroll', () => {});
  // });

  // const addLike = () => {};
  // const dislike = () => {};

  const userLogin = (item) => {
    setUser(item);
    getDetails(item.id);
    getPosts(item.id);
    getComments(item.id);
    // console.log(item.id, item.username, userDetails);
    // console.log('posts', postsOfUser);
    // console.log('comments', visibleComments);
    localStorage.setItem('user', JSON.stringify(item));
  };

  const userLogout = () => {
    setUser({ username: null, id: null });
    localStorage.removeItem('user');
    // history.push('/');
    // return <Redirect to='/' />;
  };
  // const [alert, setAlert] = React.useState({
  //   show: false,
  //   msg: '',
  //   type: 'success',
  // });

  // React.useEffect(() => {
  //   getPosts(); //will result in error when user signs out
  //   getComments();
  //   console.log('posts', postsOfUser);
  //   console.log('comments', visibleComments);
  // }, [user]);
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
        userDetails,
        userLogin,
        userLogout,
        postsOfUser,
        setPostsOfUser,
        visibleComments,
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

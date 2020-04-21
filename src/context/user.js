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

function getPostsFromLocalStorage() {
  return localStorage.getItem('posts')
    ? JSON.parse(localStorage.getItem('posts'))
    : [];
}

function UserProvider({ children }) {
  const [user, setUser] = React.useState(getUserFromLocalStorage());
  const [height, setHeight] = React.useState(0);
  const [postsOfUser, setPostsOfUser] = React.useState(
    getPostsFromLocalStorage()
  );
  const [toggleInsertPost, setToggleInsertPost] = React.useState(false);

  const toggleInsertPostHelper = () => {
    setToggleInsertPost((prevMember) => {
      let isMember = !prevMember;
      return isMember;
    });
  };
  // React.useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     setHeight(window.pageYOffset);
  //   });
  //   return () => window.removeEventListener('scroll', () => {});
  // });

  // const addLike = () => {};
  // const dislike = () => {};

  const userLogin = (item) => {
    console.log(item.id, item.username);
    setUser(item);
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

  async function getPosts() {
    let userid = user.id;
    if (!userid) {
      // setPostsOfUser([]);
      return;
    }
    const response = await axios
      .post('http://localhost:3001/getPosts', {
        userid,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('posts', JSON.stringify(res.data));
        setPostsOfUser(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }

  React.useEffect(() => {
    getPosts(); //will result in error when user signs out
    console.log('posts', postsOfUser);
  }, [user, toggleInsertPost]);
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
        userLogin,
        userLogout,
        postsOfUser,
        toggleInsertPostHelper,
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

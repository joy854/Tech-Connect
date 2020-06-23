import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './user';
const UsersContext = React.createContext();

// function getUsersFromLocalStorage() {
//   return localStorage.getItem('users')
//     ? JSON.parse(localStorage.getItem('users'))
//     : [];
// }

// function getTitlesFromLocalStorage() {
//   return localStorage.getItem('titles')
//     ? JSON.parse(localStorage.getItem('titles'))
//     : [];
// }

// function getFollowersFromLocalStorage() {
//   return localStorage.getItem('followers')
//     ? JSON.parse(localStorage.getItem('followers'))
//     : [];
// }

function UsersProvider({ children }) {
  const { user, token } = React.useContext(UserContext);

  // const [users, setUsers] = React.useState(getUsersFromLocalStorage());
  // const [titles, setTitles] = React.useState(getTitlesFromLocalStorage());
  // const [followers, setFollowers] = React.useState(
  //   getFollowersFromLocalStorage()
  // );
  async function getAllUser() {
    const response = await axios
      .get('https://guarded-woodland-97115.herokuapp.com/users', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
        // localStorage.setItem('users', JSON.stringify(res.data)); //storing users in local storage so users dont get lost when pg is reloaded.(no change in user thhen users wont be updated)
        return res.data;
        // const arr = [];
        // Object.assign(arr, res.data);
        // return arr;
      })

      //   .then((data) => {
      //     console.log(data);
      //     setUsers(data);
      //   })
      .catch((error) => console.log(error));
    return response;
  }

  const [users, setUsers] = React.useState([]);
  const [titles, setTitles] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);
  const [followBtnClickUnclick, setFollowBtnClickUnclick] = React.useState(
    false
  );

  const toggleFollowBtnClickUnclick = () => {
    setFollowBtnClickUnclick((prevMember) => {
      let isMember = !prevMember;
      return isMember;
    });
    // console.log(followBtnClickUnclick);
  };

  async function followBtn(id) {
    let from_id = user.id,
      to_id = id;
    const response = await axios
      .post(
        'https://guarded-woodland-97115.herokuapp.com/insertFollowers',
        {
          from_id,
          to_id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .catch((error) => console.log(error));
    toggleFollowBtnClickUnclick();
    return response;
  }
  async function unFollowBtn(id) {
    let from_id = user.id,
      to_id = id;
    const response = await axios
      .post(
        'https://guarded-woodland-97115.herokuapp.com/deleteFollowers',
        {
          from_id,
          to_id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .catch((error) => console.log(error));
    toggleFollowBtnClickUnclick();
    return response;
  }

  //   const [reqUser, setReqUser] = React.useState({});
  //   const openProfile = (user) => {
  //     setReqUser(user);
  //   };

  //   const getAllUser = async (e) => {
  //     const response = await fetch('http://localhost:3001/users', {
  //       method: 'get',
  //       headers: { 'Content-Type': 'application/json' },
  //       //   body: JSON.stringify({
  //       //     users,
  //       //   }),
  //     })
  //       .then((newUser) => newUser.json())
  //       .then((item) => {
  //         if (item.length && item[0].id) {
  //           console.log(item);

  //           setUsers(item);
  //           console.log(users);
  //           return item;
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //     return response;
  //   };

  async function getAllTitle() {
    const response = await axios
      .get('https://guarded-woodland-97115.herokuapp.com/getSkills', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setTitles(res.data);
        // localStorage.setItem('titles', JSON.stringify(res.data)); //storing users in local storage so users dont get lost when pg is reloaded.(no change in user thhen users wont be updated)
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }

  async function getAllFollower() {
    const response = await axios
      .get('https://guarded-woodland-97115.herokuapp.com/getFollowers', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setFollowers(res.data);
        // localStorage.setItem('followers', JSON.stringify(res.data)); //storing users in local storage so users dont get lost when pg is reloaded.(no change in user thhen users wont be updated)
        return res.data;
      })
      .catch((error) => console.log(error));
    return response;
  }
  // const loadNew = async (item) => {
  //   const response = await getAllUser();
  //   console.log(response);
  //   setUsers(response);
  //   console.log(users);

  //   // const newUsers = users.filter((user) => user.id !== item.id);
  //   // newUsers.push(item);
  //   // // setUsers([...newUsers, item]);
  //   // setUsers(newUsers);
  //   // console.log(newUsers, item.id);
  // };
  React.useEffect(() => {
    getAllUser();
    getAllTitle();
    getAllFollower();
    // console.log(users);
    // console.log(followers);
    // setUsers(response);
    // users.map((item) => console.log(item.fname));
    // console.log(users);
    // console.log(titles);
  }, [user, followBtnClickUnclick]); //can't use a func as 2nd arg in useeffect
  return (
    <UsersContext.Provider
      value={{
        users,
        getAllUser,
        getAllTitle,
        getAllFollower,
        titles,
        followers,
        unFollowBtn,
        followBtn,
        followBtnClickUnclick,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export { UsersProvider, UsersContext };

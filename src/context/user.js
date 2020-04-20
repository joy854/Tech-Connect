// user context
import React from 'react';
// import { useHistory } from 'react-router-dom';
// const history = useHistory();
import { Redirect } from 'react-router-dom';

const UserContext = React.createContext();

function getUserFromLocalStorage() {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { username: null, id: null };
}

function UserProvider({ children }) {
  // const [user, setUser] = React.useState({ username: null, token: null });
  const [user, setUser] = React.useState(getUserFromLocalStorage());
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      setHeight(window.pageYOffset);
    });
    return () => window.removeEventListener('scroll', () => {});
  });

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
  const [alert, setAlert] = React.useState({
    show: false,
    msg: '',
    type: 'success',
  });
  const showAlert = ({ msg, type = 'success' }) => {
    setAlert({ show: true, msg, type });
  };
  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };
  return (
    <UserContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        alert,
        showAlert,
        hideAlert,
        height,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };

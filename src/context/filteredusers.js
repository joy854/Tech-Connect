import React from 'react';
import { UsersContext } from './users';
const FilteredUserContext = React.createContext();

function FilteredUserProvider({ children }) {
  const { users } = React.useContext(UsersContext);
  const [filterUser, setFilterUser] = React.useState(users);
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('all');

  //   React.useEffect(() => {
  //     setFilterUser()
  //     return () => {};
  //   }, []);
  React.useLayoutEffect(() => {
    let newUsers = users.filter((item) => {
      return item;
    });
    let fname = '',
      lname = '';
    let f = 0;
    for (let i = 0; i < name.length; i++) {
      if (name[i] === ' ') {
        f = 1;
        continue;
      }
      if (f === 0) {
        fname += name[i];
      } else {
        lname += name[i];
      }
    }
    // console.log('fname', users);
    // console.log('lname', lname);
    if (fname !== '') {
      newUsers = newUsers.filter((item) => {
        let origFname = item.fname.toLowerCase().trim();
        return origFname.startsWith(fname) ? item : null;
      });
    }
    if (lname !== '') {
      newUsers = newUsers.filter((item) => {
        let origLname = item.lname.toLowerCase().trim();
        return origLname.startsWith(lname) ? item : null;
      });
    }
    if (category != 'all') {
      newUsers = newUsers.filter((item) => {
        let origIns = item.institute;
        let newIns = '';
        for (let i = 0; i < origIns.length; i++) {
          if (origIns[i] === ' ') break;
          newIns += origIns[i];
        }
        origIns = newIns.toLowerCase().trim();
        if (origIns === category) return item;
      });
    }
    setFilterUser(newUsers);
    console.log('fname', newUsers);
  }, [name, category]);

  return (
    <FilteredUserContext.Provider
      value={{
        filterUser,
        name,
        setCategory,
        category,
        setName,
      }}
    >
      {children}
    </FilteredUserContext.Provider>
  );
}
export { FilteredUserProvider, FilteredUserContext };

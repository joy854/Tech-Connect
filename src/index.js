import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UsersProvider } from './context/users';
import { UserProvider } from './context/user';
import { SkillProvider } from './context/skills';
import { PostProvider } from './context/post';
import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <UserProvider>
    <UsersProvider>
      <PostProvider>
        <SkillProvider>
          <App />
        </SkillProvider>
      </PostProvider>
    </UsersProvider>
  </UserProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

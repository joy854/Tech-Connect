import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Error from './pages/Error';
import Login from './pages/Login';
import SingleUser from './pages/SingleUser';
import NavBar from './components/NavBar';
import PostForm from './components/PostForm';
import UserList from './components/UserList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatForm from './components/ChatForm';

export default function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/posts'>
            <PostForm />
          </Route>
          <Route exact path='/users'>
            <UserList />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route
            exact
            path='/chats/:id_to'
            children={<ChatForm></ChatForm>}
          ></Route>
          <Route
            exact
            path='/users/:id'
            children={<SingleUser></SingleUser>}
          ></Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

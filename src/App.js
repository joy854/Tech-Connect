import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Error from './pages/Error';
import Login from './pages/Login';
import SingleUser from './pages/SingleUser';
import NavBar from './components/NavBar';
import PostForm from './components/PostForm';
import UserList from './components/UserList';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import ChatForm from './components/ChatForm';
import Footer from './components/Footer';
import ScrollBtn from './components/ScrollBtn';
import Particles from 'react-particles-js';
import { AlertContext } from './context/alert';
export default function App() {
  const { alert } = React.useContext(AlertContext);
  const options = {
    particles: {
      number: {
        value: 30,
        density: { enable: true, value_area: 961.4383117143238 },
      },
      color: { value: '#fff' },
      shape: {
        type: 'circle',
        stroke: { width: 0, color: '#000000' },
        polygon: { nb_sides: 4 },
        image: { src: 'img/github.svg', width: 100, height: 100 },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 10,
        random: true,
        anim: {
          enable: true,
          speed: 92.51369446135125,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 500,
        color: '#ffffff',
        opacity: 0.4,
        width: 2,
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'bottom',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'bubble' },
        onclick: { enable: true, mode: 'repulse' },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 0.5 } },
        bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  };
  return (
    <div>
      <Particles className='particles' params={options} />
      <Router>
        <NavBar />

        <ScrollBtn />

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
        <Footer />
      </Router>
    </div>
  );
}

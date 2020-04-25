import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import Service from '../components/Service';
import { UserContext } from '../context/user';
export default function App() {
  const { user } = React.useContext(UserContext);
  return (
    <div>
      <Hero>
        <Link to='/login' className='BUTTON_LAI'>
          {user.id && <span>Welcome!</span>}
          {!user.id && <span>Lets's Begin!</span>}
        </Link>
      </Hero>
      <Service />
    </div>
  );
}

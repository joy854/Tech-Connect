import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import Service from '../components/Service';
export default function App() {
  return (
    <div>
      <Hero>
        <Link to='/products' className='BUTTON_LAI'>
          our products
        </Link>
      </Hero>
      <Service />
    </div>
  );
}

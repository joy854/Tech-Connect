import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import Service from '../components/Service';
import { UserContext } from '../context/user';
export default function App() {
  const { user } = React.useContext(UserContext);
  // const [newLoad,setToggleLoad]=React.useState(false);
  // const toggleLoad = () => {
  //   // setToggleLoad((prevMember) => {
  //   //   let isMember = !prevMember;
  //   //   return isMember;
  //   // });
  //   window.location.reload(false);
  // };
  // React.useEffect(() => {
  //   // window.location.reload(true);
  //   console.log(user.id);
  //   console.log('HI');
  // }, [user.id]);
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

import React from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';
// import { UserContext } from '../context/user';
export default function ScrollBtn() {
  //   const { height } = React.useContext(UserContext);
  const scrollBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  const height = 200;
  return (
    <div></div>
    // <button
    //   className={height > 100 ? 'scroll-btn show-scroll-btn' : 'scroll-btn'}
    //   //   onClick={scrollBackToTop}
    // >
    //   <FaAngleDoubleUp></FaAngleDoubleUp>
    // </button>
  );
}

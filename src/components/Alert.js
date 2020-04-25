import React from 'react';

const Alert = ({ type, text }) => {
  return (
    <div className={` alert alert-${type}`} style={{}}>
      {text}
    </div>
  );
};

export default Alert;

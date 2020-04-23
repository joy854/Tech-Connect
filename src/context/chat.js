import React from 'react';
import { UserContext } from '../context/user';
export default function chat() {
  const { userDetails } = React.useContext(UserContext);

  return <div></div>;
}

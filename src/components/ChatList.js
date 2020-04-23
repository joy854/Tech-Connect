import React from 'react';
import { UserContext } from '../context/user';
import ChatItem from './ChatItem';
import uuid from 'uuid/v4';

export default function ChatList({ receiver_id }) {
  const { userDetails, allChats, chatText, setChatText } = React.useContext(
    UserContext
  );
  const getreqdChats = () => {
    const newArr = allChats.filter((item) => {
      if (userDetails.id === item.id_from && receiver_id === item.id_to)
        return item;
      if (userDetails.id === item.id_to && receiver_id === item.id_from)
        return item;
    });
    const arr = newArr.map((item) => {
      return <ChatItem key={uuid()} element={item} />; //for returning jsx always use map
    });
    // console.log(allChats);
    // console.log(newArr);
    return arr;
  };
  return <div>{getreqdChats()}</div>;
}

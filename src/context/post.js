import React from 'react';
import { UserContext } from './user';
import uuid from 'uuid/v4';
import { Redirect } from 'react-router-dom';
const PostContext = React.createContext();
function PostProvider({ children }) {
  const { user } = React.useContext(UserContext);

  const [text, setText] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [post_id, setPost_id] = React.useState(uuid());
  const [id, setId] = React.useState(user.id);

  const insertPost = async (e) => {
    // console.log(id, post_id, text, url);
    let response = await fetch('http://localhost:3001/insertPost', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        url,
        id,
        post_id,
      }),
    })
      .then((newUser) => newUser.json())
      .then((item) => {
        const obj = {
          post_id,
        };
        return obj;
      })
      .catch((err) => console.log(err));
    return response;
  };

  const submitPost = async (e) => {
    e.preventDefault();
    // console.log(url);
    const newId = uuid();
    setPost_id(newId);
    setId(user.id);

    const res = await insertPost();
    console.log(res);
  };
  //   if (!user.id) return <Redirect to='/' />;
  return (
    <PostContext.Provider
      value={{
        text,
        setText,
        url,
        setUrl,
        submitPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export { PostProvider, PostContext };

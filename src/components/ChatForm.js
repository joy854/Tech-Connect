import React from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/user';
import ChatList from './ChatList';
import { Redirect } from 'react-router-dom';
export default function ChatForm() {
  let { id_to } = useParams();
  id_to = parseInt(id_to);
  const {
    userDetails,
    allChats,
    user,
    chatText,
    setChatText,
    insertChatByUser,
    getChats,
    setAllChats,
    token,
  } = React.useContext(UserContext);
  //   console.log(id_to, userDetails.id);

  function getChatsDetailFromLocalStorage() {
    return localStorage.getItem('chats')
      ? JSON.parse(localStorage.getItem('chats'))
      : [];
  }

  React.useEffect(() => {
    // console.log(userDetails);
    getChats(); //will result in error when user signs out
    if (window.performance) {
      if (performance.navigation.type == 1) {
        setAllChats(getChatsDetailFromLocalStorage());
        // alert('This page is reloaded');
      }
    }
    // console.log('posts', postsOfUser);
    // console.log('comments', visibleComments);
  }, []);

  if (!token) return <Redirect to='/' />;
  return (
    <section className='section mid-container'>
      <form>
        <h1>Type your Message Below:</h1>
        <br />
        <div className='form-center'>
          <div className='form-group'>
            {/* <input
              type='text'
              className='form-control'
              id='newpost'
              name='newpost'
              placeholder='Write Something Here....'
              value={singleSkill}
              onChange={handleSingleSkill}
            /> */}
            <textarea
              id='newpost'
              style={{ width: '70%', height: '150px' }}
              placeholder='Write Something Here....'
              value={chatText}
              onChange={(e) => {
                // console.log(userDetails);
                setChatText(e.target.value);
              }}
            ></textarea>
          </div>
          <input
            type='button' //all chats lost on submitting :(
            className='BUTTON_LAI'
            value='Send Message'
            onClick={() => {
              insertChatByUser(id_to);
              setChatText('');
              // console.log(userDetails);
              //   console.log(postsOfUser);
              // toggleBtnClick();
            }}
          />
          {/* <button
            className='btn btn-primary'
            onClick={() => {
              submitPost();
              // toggleBtnClick();
            }}
          >
            Create Post
          </button> */}
          {/* <MdSend className='btn-icon' /> */}

          {/* </button> */}
          {/* {funPostlist()} */}
          {/* <PostList /> */}
          <ChatList receiver_id={id_to} />
        </div>
      </form>
    </section>
  );
}

import React from 'react';
import { useParams } from 'react-router-dom';
import { UsersContext, UsersProvider } from '../context/users';
import { UserContext } from '../context/user';
import { Redirect } from 'react-router-dom';
import { FaFire } from 'react-icons/fa';

export default function SingleUser() {
  const { id } = useParams();
  const { user } = React.useContext(UserContext);
  const { users, titles, followers, followBtn, unFollowBtn } = React.useContext(
    UsersContext
  );
  const evalDoesFollow = () => {
    const isFollow = followers.filter((item) => {
      if (item.to_id === parseInt(id) && item.from_id === user.id) return item;
    });

    if (isFollow.length) return true;
    else return false;
  };

  const [person, setPerson] = React.useState({});
  const [skill, setSkill] = React.useState([]);
  const [follow, setFollow] = React.useState([]);
  const [doesFollow, setDoesFollow] = React.useState(evalDoesFollow());
  const toggleDoesFollow = () => {
    setDoesFollow((prevMember) => {
      let isMember = !prevMember;
      return isMember;
    });
  };

  // const person = {
  //   fname: null,
  // };
  // const getUser = async (e) => {
  //   let response = await fetch(`http://localhost:3001/users/${id}`, {
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({}),
  //   })
  //     .then((newUser) => newUser.json())
  //     .then((data) => {
  //       // console.log(data);
  //       Object.assign(person, data);
  //       // console.log(person);
  //       const obj = {
  //         fName: data.fname,
  //         lName: data.lname,
  //       };
  //       // console.log(obj);
  //       return obj;
  //     })
  //     .catch((err) => console.log(err));
  //   return response;
  // };

  React.useEffect(() => {
    //runs on mount and whenever state(id) changes

    const newUser = users.find((item) => {
      if (parseInt(id) === item.id) return item;
    });
    setPerson(newUser);

    const newSkill = titles.filter((item) => {
      if (parseInt(id) === item.id) return item;
    });
    setSkill(newSkill);

    const newFollows = followers.filter((item) => {
      if (user.id === item.from_id) return item;
    });
    setFollow(newFollows);

    // console.log(follow, newFollows);
    // console.log(skill, newSkill);  // changes will not reflect in this console.log Refer, https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    // console.log(person, newUser);
  }, [id, doesFollow]);

  if (!user.id) return <Redirect to='/' />;

  // const notFollow = () => {
  //   //return follow btn if user.id doesn't follow id
  //   if (parseInt(id) === user.id) return <div></div>;
  //   const isFollow = follow.filter((item) => {
  //     if (item.to_id === parseInt(id)) return item;
  //   });
  //   if (isFollow.length)
  //     return (
  //       <button
  //         className='btn btn-danger'
  //         onClick={() => {
  //           unFollowBtn(parseInt(id));
  //           toggleButtonClicked();
  //         }}
  //       >
  //         Unfollow
  //       </button>
  //     );
  //   return (
  //     <button
  //       className='btn btn-success'
  //       onClick={() => {
  //         followBtn(parseInt(id));
  //         toggleButtonClicked();
  //       }}
  //     >
  //       Follow
  //     </button>
  //   );
  // };

  return (
    <div className='contain'>
      <div className='section'>
        <div className='orientation'>
          <img src={person.image} className='img-user-profile' />
          <br />
          <br />
          <h2>
            {person.fname} {person.lname}
            <br />
            (Username: {person.username})
          </h2>
          <br />
          <h4>Student at {person.institute}</h4>
          <h6>
            {person.city},{person.country}{' '}
          </h6>
          {doesFollow ? (
            <button
              className='btn btn-danger'
              onClick={() => {
                unFollowBtn(parseInt(id));
                toggleDoesFollow();
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              className='btn btn-success'
              onClick={() => {
                followBtn(parseInt(id));
                toggleDoesFollow();
              }}
            >
              Follow
            </button>
          )}
          <br />
        </div>
        <div className='orientation'>
          <h5>{person.fname}'s Bio </h5>
          <p>{person.bio} </p>
        </div>
        <div className='orientation'>
          <h5>{person.fname}'s Skills </h5>
          <br />
          <ul>
            {skill.map((item) => {
              return (
                <li>
                  <FaFire /> {item.skill_title}{' '}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

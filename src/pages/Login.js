import React from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/user';
import SkillList from '../components/SkillList';
import SkillForm from '../components/SkillForm';
import { SkillContext } from '../context/skills';
import Home from './Home';
export default function Login() {
  const history = useHistory();
  // setup user context
  const { user, userLogin, alert, showAlert } = React.useContext(UserContext);
  const { skill } = React.useContext(SkillContext);
  // state values
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('default');
  const [isMember, setIsMember] = React.useState(true);
  const [fName, setFName] = React.useState('');
  const [lName, setLName] = React.useState('');
  const [bio, setBio] = React.useState('');
  // const [singleSkill, setSingleSkill] = React.useState('');
  // const [skill, setSkill] = React.useState([]);
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [institute, setInstitute] = React.useState('');
  const [org, setOrg] = React.useState('');

  let isEmpty = !email || !password || !username;
  //   isEmpty=isEmpty|| alert.show|| !fName || !lName || !bio || !institute;

  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername('default') : setUsername('');
      return isMember;
    });
  };

  //   const handleSubmit = async (e) => {
  //     showAlert({
  //       msg: 'accessing user data. please wait...',
  //     });
  //     // alert
  //     e.preventDefault();
  //     let response;
  //     if (isMember) {
  //       response = await loginUser({ email, password });
  //     } else {
  //       response = await registerUser({ email, password, username });
  //     }

  //     if (response) {
  //       const {
  //         jwt: token,
  //         user: { username },
  //       } = response.data;
  //       const newUser = { token, username };
  //       userLogin(newUser);
  //       showAlert({
  //         msg: `you are logged in : ${username}. shop away my friend`,
  //       });
  //       history.push('/products');
  //     } else {
  //       showAlert({
  //         msg: 'there was an error. please try again...',
  //         type: 'danger',
  //       });
  //       //  show alert
  //     }
  //   };
  const storeSkill = (id) => {
    skill.map((item) => {
      const newItem = item.title;
      fetch('http://localhost:3001/storeSkill', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          skill_title: newItem,
        }),
      }).then((response) => response.json());
    });
    console.log('skill', id);
  };
  // const onSubmitRegister = (e) => {
  //   //e.preventDefault();
  //   // console.log('hi');
  //   fetch('http://localhost:3001/register', {
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //       username,
  //       institute,
  //       org,
  //       city,
  //       country,
  //       fName,
  //       lName,
  //       bio,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((per) => {
  //       const obj = {
  //         username: per.username,
  //         id: per.id,
  //       };
  //       if (per.id) {
  //         storeSkill(per.id);
  //         userLogin(obj);
  //       }
  //     });
  //   console.log('reg', user.id);
  // };
  const registerUser = async (e) => {
    let response = await fetch('http://localhost:3001/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        username,
        institute,
        org,
        city,
        country,
        fName,
        lName,
        bio,
      }),
    })
      .then((newUser) => newUser.json())
      .then((item) => {
        const obj = {
          username,
          id: item.id,
        };
        return obj;
      })
      .catch((err) => console.log(err));
    return response;
  };

  const loginUser = async (e) => {
    let response = await fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((newUser) => newUser.json())
      .then((item) => {
        const obj = {
          username: item.username,
          id: item.id,
        };
        return obj;
      })
      .catch((err) => console.log(err));
    return response;
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    // console.log('hi');
    let response;
    if (!isMember) response = await registerUser();
    else response = await loginUser();
    // console.log(response);
    if (response.id) {
      const newUser = {
        username,
        id: response.id,
      };
      storeSkill(newUser.id);
      userLogin(newUser);
    } else {
      // alert
    }
    //     }
    //   .then((response) => response.json())
    //   .then((per) => {
    //     const obj = {
    //       username: per.username,
    //       id: per.id,
    //     };
    //     if (per.id) {
    //       storeSkill(per.id);
    //       userLogin(obj);
    //     }
    //   });
    // console.log('reg', user.id);
  };
  // React.useEffect(() => {
  //   if (user.id) return <Redirect to='/' />;
  // }, [user]);
  // const check = () => {
  //   if (!user.id) return <Redirect to='/home' />;
  //   else return <Error />;
  //   console.log('check', user.id);
  // };
  if (!user.id) {
    return (
      <section className='form section'>
        {/* {check} */}
        <h2 className='section-title'>{isMember ? 'sign in' : 'register'}</h2>
        <form className='login-form'>
          {/* single input */}
          {!isMember && (
            <div className='form-control'>
              <label htmlFor='fname'>First Name</label>
              <input
                type='text'
                id='fname'
                value={fName}
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
          )}
          {/* end of single input */}
          {/* single input */}
          {!isMember && (
            <div className='form-control'>
              <label htmlFor='lname'>Last Name</label>
              <input
                type='text'
                id='lname'
                value={lName}
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
          )}
          {/* end of single input */}
          {/* single input */}
          <div className='form-control'>
            <label htmlFor='email'>email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* end of single input */}
          {/* single input */}
          <div className='form-control'>
            <label htmlFor='password'>password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* end of single input */}
          {/* single input */}
          {!isMember && (
            <div className='form-control'>
              <label htmlFor='username'>username</label>
              <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          {/* end of single input */}
          {/* single input */}
          {!isMember && (
            <div className='form-control'>
              <label htmlFor='institute'>institute</label>
              <input
                type='text'
                id='institute'
                value={institute}
                onChange={(e) => setInstitute(e.target.value)}
              />
            </div>
          )}

          {/* end of single input */}
          {/* single input */}
          {!isMember && (
            <div className='form-control'>
              <label htmlFor='org'>org</label>
              <input
                type='text'
                id='org'
                value={org}
                onChange={(e) => setOrg(e.target.value)}
              />
            </div>
          )}

          {/* end of single input */}
          {/* single input */}
          {!isMember && (
            <div className='form-control'>
              <label htmlFor='bio'>bio</label>
              <input
                type='text'
                id='bio'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          )}

          {/* end of single input */}
          {/* empty form text */}
          {isEmpty && (
            <p className='form-empty'>please fill out all form fields</p>
          )}
          {/* submit btn */}
          {!isEmpty && (
            <button
              type='submit'
              className='btn btn-block btn-primary'
              onClick={onSubmitRegister}
            >
              submit
            </button>
          )}
          {/* skills list */}

          {!isMember && <SkillForm />}
          {!isMember && <SkillList />}

          {/* register link */}
          <p className='register-link'>
            {isMember ? 'need to register' : 'already a member'}
            <button type='button' onClick={toggleMember}>
              click here
            </button>
          </p>
        </form>
      </section>
    );
  }
  return <Redirect to='/' />;
}

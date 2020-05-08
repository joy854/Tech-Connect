import React from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/user';
import SkillList from '../components/SkillList';
import SkillForm from '../components/SkillForm';
import { SkillContext } from '../context/skills';
import { AlertContext } from '../context/alert';
import Alert from '../components/Alert';
import Home from './Home';
export default function Login() {
  const history = useHistory();
  // setup user context
  const { user, userLogin } = React.useContext(UserContext);
  const { alert, handleAlert } = React.useContext(AlertContext);
  const { skill } = React.useContext(SkillContext);
  // state values
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('default');
  const [isMember, setIsMember] = React.useState(true);
  const [fName, setFName] = React.useState('');
  const [lName, setLName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [image, setImage] = React.useState('');
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
      fetch('https://guarded-woodland-97115.herokuapp.com/storeSkill', {
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
    let response = await fetch(
      'https://guarded-woodland-97115.herokuapp.com/register',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          username,
          institute,
          image,
          org,
          city,
          country,
          fName,
          lName,
          bio,
        }),
      }
    )
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
    let response = await fetch(
      'https://guarded-woodland-97115.herokuapp.com/signin',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )
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
    // e.preventDefault();
    console.log(image);
    if (!image)
      setImage(
        'https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-business-male-icon-vector-png-image_916468.jpg'
      );
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
      handleAlert({ type: 'success', text: 'Logged in!' });
    } else {
      handleAlert({ type: 'danger', text: 'Some error occured!' });
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
      <div className='contain' style={{ textAlign: 'center' }}>
        <section className='form section'>
          {/* {check} */}
          <h2 className='section-title'>{isMember ? 'Sign In' : 'Register'}</h2>
          <form className='login-form'>
            {/* single input */}
            {!isMember && (
              <div className='row orientation' style={{ padding: '1.75%' }}>
                <div className='col-md-4'>
                  <label htmlFor='fname'>First Name</label>
                </div>
                <div className='col-md-8'>
                  <input
                    type='text'
                    id='fname'
                    style={{ backgroundColor: '#7f7676', color: 'white' }}
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                  />
                </div>
              </div>
            )}
            {/* end of single input */}
            {/* single input */}
            {!isMember && (
              <div className='row orientation' style={{ padding: '1.75%' }}>
                <div className='col-md-4'>
                  <label htmlFor='lname'>Last Name</label>
                </div>
                <div className='col-md-8'>
                  <input
                    type='text'
                    id='lname'
                    style={{ backgroundColor: '#7f7676', color: 'white' }}
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                  />
                </div>
              </div>
            )}
            {/* end of single input */}
            {/* single input */}
            <div className='row orientation' style={{ padding: '1.75%' }}>
              <div className='col-md-4'>
                <label htmlFor='email'>Email</label>
              </div>
              <div className='col-md-8'>
                <input
                  type='email'
                  id='email'
                  value={email}
                  style={{ backgroundColor: '#7f7676', color: 'white' }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* end of single input */}
            {/* single input */}
            <div className='row orientation' style={{ padding: '1.75%' }}>
              <div className='col-md-4'>
                <label htmlFor='password'>Password</label>
              </div>
              <div className='col-md-8'>
                <input
                  type='password'
                  id='password'
                  value={password}
                  style={{ backgroundColor: '#7f7676', color: 'white' }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {/* end of single input */}
            {/* single input */}
            {!isMember && (
              <div className='row orientation' style={{ padding: '1.75%' }}>
                <div className='col-md-4'>
                  <label htmlFor='username'>Username</label>
                </div>
                <div className='col-md-8'>
                  <input
                    type='text'
                    id='username'
                    style={{ backgroundColor: '#7f7676', color: 'white' }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* end of single input */}
            {/* single input */}
            {!isMember && (
              <div className='row orientation' style={{ padding: '1.75%' }}>
                <div className='col-md-4'>
                  <label htmlFor='institute'>Institute</label>
                </div>
                <div className='col-md-8'>
                  <input
                    type='text'
                    id='institute'
                    value={institute}
                    style={{ backgroundColor: '#7f7676', color: 'white' }}
                    onChange={(e) => setInstitute(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* end of single input */}
            {/* single input */}
            {!isMember && (
              <div className='row orientation' style={{ padding: '1.75%' }}>
                <div className='col-md-4'>
                  <label htmlFor='org'>Organization</label>
                </div>
                <div className='col-md-8'>
                  <input
                    type='text'
                    id='org'
                    value={org}
                    style={{ backgroundColor: '#7f7676', color: 'white' }}
                    onChange={(e) => setOrg(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* end of single input */}
            {/* single input */}
            {!isMember && (
              <div className='row orientation' style={{ padding: '1.75%' }}>
                <div className='col-md-4'>
                  <label htmlFor='bio'>Bio</label>
                </div>
                <div className='col-md-8'>
                  <input
                    type='text'
                    style={{ backgroundColor: '#7f7676', color: 'white' }}
                    id='bio'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>
            )}
            {/* end of single input */}
            {/* single input */}
            {!isMember && (
              <div className='row orientation' style={{ padding: '1.75%' }}>
                <div className='col-md-4'>
                  <label htmlFor='city'>City</label>
                </div>
                <div className='col-md-8'>
                  <input
                    type='text'
                    style={{ backgroundColor: '#7f7676', color: 'white' }}
                    id='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
            )}
            {/* end of single input */}
            {/* single input */}
            {!isMember && (
              <div className='row orientation' style={{ padding: '1.75%' }}>
                <div className='col-md-4'>
                  <label htmlFor='country'>Country</label>
                </div>
                <div className='col-md-8'>
                  <input
                    type='text'
                    style={{ backgroundColor: '#7f7676', color: 'white' }}
                    id='country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* end of single input */}
            {/* single input */}
            {!isMember && (
              <div className='row orientation' style={{ padding: '1.75%' }}>
                <div className='col-md-4'>
                  <label htmlFor='image'>Image</label>
                </div>
                <div className='col-md-8'>
                  <input
                    type='text'
                    style={{ backgroundColor: '#7f7676', color: 'white' }}
                    id='image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* end of single input */}
            {/* empty form text */}
            {isEmpty && (
              <p className='form-empty'>Please fill out all form fields</p>
            )}

            {alert.show && <Alert type={alert.type} text={alert.text} />}
            <Alert />
            {/* submit btn */}
            {!isEmpty && (
              <button
                type='submit'
                className='BUTTON_LAI'
                onClick={onSubmitRegister}
              >
                Submit
              </button>
            )}
            {/* skills list */}

            {!isMember && <SkillForm />}
            {!isMember && <SkillList />}

            {/* register link */}
            <p className='register-link'>
              {isMember ? 'Need to register' : 'Already a member'}
              <button
                type='button'
                className='BUTTON_LAI'
                onClick={toggleMember}
              >
                Click here
              </button>
            </p>
          </form>
        </section>
      </div>
    );
  }
  return <Redirect to='/' />;
}

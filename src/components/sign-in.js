import './sign-in.css';
import logoImage from '../utils/logo-e-com.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [signPressed, setSignPressed] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [signInData, setSignInData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then(response => setSignInData(response.data))
  }, [])

  const signInPressedHandler = () => {
    setSignPressed(true)
    userName !== '' && password !== '' && dispatch({type: 'SIGNEDIN'})
    if(userName !== '' && password !== ''){
      setIsEmpty(false)
    }
  }


  const signInHandler = (e) => {
    e.preventDefault();
    const index = signInData.findIndex(data => data.username === userName && data.password === password)
    if(index !== -1 && !isEmpty){
      alert(`Hi, ${userName}`)
      navigate("/")
    }else if(index === -1){
      !isEmpty && alert("user not found, please sign up")
    }
  }

    return(
      <div className='signIn-page'>
        <img className="logo" src={logoImage} alt="logo"/>
        <div className='form-holder'>
            <span className='signIn-form'>Sign in</span>
            <form className='form' onSubmit={(e) => { signInHandler(e)}}>
              <label className='userLabel' for="userName">Enter UserName:</label><br/>
              <input type='text' id="userName" style={signPressed &&  userName === '' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}} onChange={(e) => {
                setUserName(e.target.value)
              }}/>
              {signPressed &&  userName === '' && <p className='userError'>!!! Please enter UserName</p>}
              <label className='passwordLabel' for="password">Enter Password:</label><br/>
              {showPass && <FontAwesomeIcon className="eyeIcon" icon={faEye} onClick={() => {setShowPass(false)}}/>}
              {!showPass && <FontAwesomeIcon className="eyeIcon" icon={faEyeSlash} onClick={() => {setShowPass(true)}}/>}
              <input type={showPass ? 'text' : 'password'} id="password" style={signPressed &&  password === '' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}} onChange={(e) => {
                setPassword(e.target.value)
              }}/>
              {signPressed && password === '' && <p className='passError'>!!! Please enter Password</p>}
              <button type='submit' className='signIn-button' onClick={() => {signInPressedHandler()}}>Sign in</button>
              <p className='para'>------------don't have Account?-----------</p>
              <NavLink exact to="/Sign-up" className="createAcc">Sign up</NavLink>
            </form>
        </div>
      </div>
    );
}

export default SignIn;
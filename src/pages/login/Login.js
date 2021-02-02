import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import loginImg from '../../images/login-img.svg';
import { Wrapper } from './LoginElements';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <div className='container'>
        <img src={loginImg} alt='github user' />
        <h1>github user</h1>
        <button className='btn' onClick={loginWithRedirect}>
          login / signup
        </button>
      </div>
    </Wrapper>
  );
};

export default Login;

import React from 'react';
import { Wrapper } from './ErrorElements';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <h3>sorry, the page you're looking for cannot be found</h3>
        <Link to='/' className='btn'>
          back home
        </Link>
      </div>
    </Wrapper>
  );
};

export default Error;

import React from 'react';
import Card from '../card/Card';
import Followers from '../followers/Followers';
import { Wrapper } from './UserElements';

const User = () => {
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Card />
        <Followers />
      </Wrapper>
    </section>
  );
};

export default User;

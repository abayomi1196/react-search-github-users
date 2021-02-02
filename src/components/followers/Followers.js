import React, { useContext } from 'react';
import { GithubContext } from '../../context/context';
import { Wrapper } from './FollowersElements';

const Followers = () => {
  const { followers } = useContext(GithubContext);

  return (
    <Wrapper>
      <div className='followers'>
        {followers.length > 0 &&
          followers.map((follower, index) => {
            const { avatar_url: img, html_url, login } = follower;
            return (
              <article key={index}>
                <img src={img} alt='login' />
                <div>
                  <h4>{login}</h4>
                  <a href={html_url}>{html_url}</a>
                </div>
              </article>
            );
          })}
      </div>
    </Wrapper>
  );
};

export default Followers;

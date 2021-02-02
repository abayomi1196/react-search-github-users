import React, { useContext } from 'react';
import { GithubContext } from '../../context/context';
import { MdBusiness, MdLocationOn, MdLink } from 'react-icons/md';
import { Wrapper } from './CardElements';

const Card = () => {
  const {
    githubUser: {
      avatar_url,
      html_url,
      name,
      company,
      blog,
      bio,
      location,
      twitter_username,
    },
  } = useContext(GithubContext);

  return (
    <Wrapper>
      <header>
        <img src={avatar_url} alt={name} />
        <div>
          <h4>{name}</h4>
          {twitter_username && <p>@{twitter_username}</p>}
        </div>
        <a href={html_url} target='_blank' rel='noopener noreferrer'>
          follow
        </a>
      </header>
      <p className='bio'>
        {bio || 'unfortunately, this user does not have a bio'}
      </p>
      <div className='links'>
        {company && (
          <p>
            <MdBusiness /> {company}
          </p>
        )}
        <p>
          <MdLocationOn /> {location || 'earth'}
        </p>
        {blog && (
          <a href={`https://${blog}`}>
            <MdLink />
            {blog}
          </a>
        )}
      </div>
    </Wrapper>
  );
};

export default Card;

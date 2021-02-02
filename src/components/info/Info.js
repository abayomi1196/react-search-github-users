import React, { useContext } from 'react';
import { GithubContext } from '../../context/context';
import { GoRepo, GoGist } from 'react-icons/go';
import { FiUsers, FiUserPlus } from 'react-icons/fi';
import Item from '../item/Item';
import { Wrapper } from './InfoElements';

const UserInfo = () => {
  const {
    githubUser: { public_repos, followers, following, public_gists },
  } = useContext(GithubContext);

  const items = [
    {
      id: 1,
      icon: <GoRepo className='icon' />,
      label: 'repos',
      value: public_repos,
      color: 'pink',
    },
    {
      id: 2,
      icon: <FiUsers className='icon' />,
      label: 'followers',
      value: followers,
      color: 'green',
    },
    {
      id: 3,
      icon: <FiUserPlus className='icon' />,
      label: 'following',
      value: following,
      color: 'purple',
    },
    {
      id: 4,
      icon: <GoGist className='icon' />,
      label: 'gists',
      value: public_gists,
      color: 'yellow',
    },
  ];

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </Wrapper>
    </section>
  );
};

export default UserInfo;

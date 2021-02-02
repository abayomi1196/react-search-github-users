import React, { useContext, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { GithubContext } from '../../context/context';

import { Wrapper, ErrorWrapper } from './SearchElements';

const Search = () => {
  const { requests, error, searchGithubUser, isLoading } = useContext(
    GithubContext
  );

  const [user, setUser] = useState('');

  // function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      searchGithubUser(user);
    }
  };

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {error.show && (
          <ErrorWrapper>
            <p>{error.msg}</p>
          </ErrorWrapper>
        )}
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <MdSearch />
            <input
              type='text'
              placeholder='enter github user..'
              value={user}
              disabled={isLoading}
              onChange={({ target }) => setUser(target.value)}
            />
            {requests > 0 && !isLoading && (
              <button type='submit'>Search</button>
            )}
          </div>
        </form>
        <h3>requests: {requests} / 60</h3>
      </Wrapper>
    </section>
  );
};

export default Search;

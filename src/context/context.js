import React, { useState, useEffect, createContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const BASE_URL = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  // function to check number of remaining requests
  const checkRequests = () => {
    axios(`${BASE_URL}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setRequests(remaining);

        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => console.log(err));
  };

  // function that sets up error
  const toggleError = (show = false, msg = '') => {
    setError({ show, msg });
  };

  // function that searches github user
  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    try {
      // request for github user and storing in state
      const userResponse = await axios(`${BASE_URL}/users/${user}`);
      setGithubUser(userResponse.data);

      const { login, followers_url } = userResponse.data;

      // using Promise.allSettled to settle both repos and followers requests and store them to state
      await Promise.allSettled([
        axios(`${BASE_URL}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]).then((results) => {
        const [repos, followers] = results;

        if (repos.status === 'fulfilled') {
          setRepos(repos.value.data);
        }

        if (followers.status === 'fulfilled') {
          setFollowers(followers.value.data);
        }
      });

      checkRequests();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toggleError(true, 'there is no user with that username!');
      checkRequests();
      setIsLoading(false);
    }
  };

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };

import React, { useContext } from 'react';
import { GithubContext } from '../../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from '../Charts';
import { Wrapper } from './RepoElements';

const Repos = () => {
  const { repos } = useContext(GithubContext);

  // reducing the repos array to an object of languages and number of times used
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;

    // if there is no language property, do nothing
    if (!language) {
      return total;
    }

    // if an object for a language has not been created, create it and initialize values and stars
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };

      // if the object is already created, increment its value property by 1 also stars
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }

    return total;
  }, {});

  // using Object.values to transform our reduced object into an array
  const mostUsed = Object.values(languages)
    // sorting by most used and using the top 5
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map((item) => ({ ...item, value: item.stars }))
    .slice(0, 5);

  // stars, forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };

      return total;
    },
    { stars: {}, forks: {} }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

export default Repos;

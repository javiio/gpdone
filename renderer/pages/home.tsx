import React from 'react';
import Head from 'next/head';
import CurrentBlock from '../libs/blocks/components/CurrentBlock';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>GPD</title>
      </Head>
      <CurrentBlock />
    </React.Fragment>
  );
}

export default Home;

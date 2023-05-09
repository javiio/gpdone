import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import DynamicStylesGenerator from '../libs/platform/components/DynamicStylesGenerator';

function MyApp({ Component, pageProps }: AppProps) {
  return  (
    <React.Fragment>
      <Component {...pageProps} />

      <DynamicStylesGenerator />
    </React.Fragment>
  )
}

export default MyApp

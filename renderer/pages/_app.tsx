import React from 'react';
import type { AppProps } from 'next/app';
import { DynamicStylesGenerator } from '~platform';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return  (
    <React.Fragment>
      <Component {...pageProps} />

      <DynamicStylesGenerator />
    </React.Fragment>
  )
}

export default MyApp

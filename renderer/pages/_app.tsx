import React from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { DynamicStylesGenerator } from '~platform';
import { ProvideTimer } from '~blocks';

import '../styles/globals.css';

const GPDApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ProvideTimer>
        <Component {...pageProps} />
      </ProvideTimer>

      <DynamicStylesGenerator />
    </RecoilRoot>
  );
};

export default GPDApp;

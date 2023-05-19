import React from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { DynamicStylesGenerator } from '~platform';
import { ProvideTimer, ProvideCurrentBlock } from '~blocks';

import '../styles/globals.css';

const GPDApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ProvideCurrentBlock>
        <ProvideTimer>
          <Component {...pageProps} />
        </ProvideTimer>
      </ProvideCurrentBlock>

      <DynamicStylesGenerator />
    </RecoilRoot>
  );
};

export default GPDApp;

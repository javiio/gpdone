import React from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { DynamicStylesGenerator } from '~platform';
import { ProvideCurrentBlock } from '~blocks';
import { ProvideTimer } from '~timer';

import '../styles/globals.css';

const GPDApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ProvideTimer>
        <ProvideCurrentBlock>
          <Component {...pageProps} />
        </ProvideCurrentBlock>
      </ProvideTimer>

      <DynamicStylesGenerator />
    </RecoilRoot>
  );
};

export default GPDApp;

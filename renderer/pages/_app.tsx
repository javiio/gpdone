import React from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { DynamicStylesGenerator } from '~platform';
import { ProvideCurrentBlock, CurrentBlock } from '~blocks';
import { ProvideTimer } from '~timer';
import { ProvideProjects } from '~projects';
import { Navbar } from 'layout/Navbar';

import '../styles/globals.css';

const GPDApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ProvideProjects>
        <ProvideTimer>
          <ProvideCurrentBlock>
            <Navbar />
            <CurrentBlock />
            <div className="absolute top-20 bottom-16 right-0 left-0 overflow-auto">
              <Component {...pageProps} />
            </div>
          </ProvideCurrentBlock>
        </ProvideTimer>
      </ProvideProjects>

      <DynamicStylesGenerator />
    </RecoilRoot>
  );
};

export default GPDApp;

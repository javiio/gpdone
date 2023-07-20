import React from 'react';
import type { AppProps } from 'next/app';
import { DynamicStylesGenerator } from '~platform';
import { ProvideCurrentBlock, CurrentBlock } from '~blocks';
import { ProvideTimer } from '~timer';
import { ProvideProjects } from '~projects';
import { ProvideTasks } from '~tasks';
import { Navbar } from 'layout/Navbar';

import '../styles/globals.css';
import '../styles/editor.css';

const GPDApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ProvideProjects>
      <ProvideTasks>
        <ProvideTimer>
          <ProvideCurrentBlock>
            <Navbar />
            <CurrentBlock />
            <div className="absolute top-32 left-14 right-0 bottom-0 overflow-auto">
              <Component {...pageProps} />
              <DynamicStylesGenerator />
            </div>
          </ProvideCurrentBlock>
        </ProvideTimer>
      </ProvideTasks>
    </ProvideProjects>
  );
};

export default GPDApp;

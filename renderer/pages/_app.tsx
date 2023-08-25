import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { DynamicStylesGenerator, ProvideConfirmation } from '~platform';
import { ProvideCurrentBlock, CurrentBlock } from '~blocks';
import { ProvideTimer } from '~timer';
import { ProvideProjects } from '~projects';
import { ProvideTasks } from '~tasks';
import { Navbar } from 'layout/Navbar';

import '../styles/globals.css';
import '../styles/editor.css';

const isProd = process.env.NODE_ENV === 'production';

const GPDApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    // Fix for empty page on production
    // https://github.com/saltyshiomix/nextron/issues/241#issuecomment-1239401532
    if (isProd) {
      if (window.location.href.search(/\d/) > 0) return;
      if (window.location.href.search('.html') < 0) {
        window.location.replace(`${window.location.href}.html`);
      }
    }
  }, [router.asPath]);

  return (
    <ProvideConfirmation>
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
    </ProvideConfirmation>
  );
};

export default GPDApp;

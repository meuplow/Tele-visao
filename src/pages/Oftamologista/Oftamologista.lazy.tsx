import React, { lazy, Suspense } from 'react';

const LazyOftamologista = lazy(() => import('./Oftamologista'));

const Oftamologista = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOftamologista {...props} />
  </Suspense>
);

export default Oftamologista;

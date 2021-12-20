import React, { lazy, Suspense } from 'react';

const LazyExaminador = lazy(() => import('./Examinador'));

const Examinador = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyExaminador {...props} />
  </Suspense>
);

export default Examinador;

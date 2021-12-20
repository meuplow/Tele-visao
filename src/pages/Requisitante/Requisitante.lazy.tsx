import React, { lazy, Suspense } from 'react';

const LazyRequisitante = lazy(() => import('./Requisitante'));

const Requisitante = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRequisitante {...props} />
  </Suspense>
);

export default Requisitante;

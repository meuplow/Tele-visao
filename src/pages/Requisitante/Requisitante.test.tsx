import React from 'react';
import ReactDOM from 'react-dom';
import Requisitante from './Requisitante';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Requisitante />, div);
  ReactDOM.unmountComponentAtNode(div);
});
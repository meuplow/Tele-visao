import React from 'react';
import ReactDOM from 'react-dom';
import Oftamologista from './Oftamologista';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Oftamologista />, div);
  ReactDOM.unmountComponentAtNode(div);
});
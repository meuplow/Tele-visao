import React from 'react';
import ReactDOM from 'react-dom';
import Oftalmologista from './Oftalmologista';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Oftalmologista />, div);
  ReactDOM.unmountComponentAtNode(div);
});
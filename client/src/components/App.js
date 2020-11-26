import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';

const App = () => {
  return (
    <div className='container'>
      <Router>
        <Header />
      </Router>
    </div>
  );
};

export default App;

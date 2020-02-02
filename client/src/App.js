import React from 'react';

import Channel from './components/Channel/Channel';
import Login from './components/Landing/Login';

const App = () => {
  const title = 'JEK';
  return (
    <div>
      {title}
      <Channel />
      <Login />
    </div>
  );
};

export default App;

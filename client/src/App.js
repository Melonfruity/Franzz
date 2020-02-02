import React from 'react';

import Channel from './components/Channel/Container/Channel';
import PopUpBox from './components/Channel/Container/Canvas/PopUpBox';

const App = () => {
  const title = 'JEK';
  return (
    <div>
      {title}
      <Channel />
      <PopUpBox />
    </div>
  );
};

export default App;

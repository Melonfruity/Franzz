import React from 'react';

// Components
import PopUpBox from './components/Channel/Container/Chat/PopUpBox';
import PopUpButton from './components/Channel/Container/PopUpButtons/PopUpButton';
import Channel from './components/Channel/Channel';
import Login from './components/Landing/Login';
import DragAndDrop from './components/Channel/Container/Photos/DragAndDrop';
import ImageBox from './components/Channel/Container/Photos/photoDisplay';

// Hooks
import useToggleButton from './hooks/useToggleButton';

const ON = 'on';

const App = () => {
  const title = 'JEK';
  const { boxDisplay, clickedButton } = useToggleButton('off');

  return (
    <div>
      {title}
      <Channel />
      <PopUpButton toggleButton={clickedButton} />
      <Login />
      <DragAndDrop />
      { boxDisplay === ON && <PopUpBox />}
      { boxDisplay === ON && <ImageBox />}
    </div>
  );
};

export default App;

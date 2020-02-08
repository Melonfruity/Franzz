import React from 'react';

// Components
import PopUpBox from './components/Channel/Container/Chat/PopUpBox';
import PopUpButton from './components/Channel/Container/PopUpButtons/PopUpButton';
import Channel from './components/Channel/Channel';
import Login from './components/Landing/Login';
import DragAndDrop from './components/Channel/Container/Photos/DragAndDrop';


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
      { boxDisplay === ON && <PopUpBox /> }
      <PopUpButton toggleButton={clickedButton} />
      <Login />
      <DragAndDrop />
    </div>
  );
};

export default App;

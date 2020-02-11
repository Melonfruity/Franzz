import React from 'react';
import TextContainer from './TextContainer';
import Input from './Input';
import ImageBox from '../Photos/photoDisplay';
import DragAndDrop from '../Photos/DragAndDrop';
import PopUpButton from '../PopUpButtons/PopUpButton';
import useToggleButton from '../../../../hooks/useToggleButton';

import './Chat.css';

const ON = 'on';

const Chat = ({
  messages, emitDeleteMessage, emitSendMessage, channel,
}) => {
  console.log(channel);

  const { boxDisplay, clickedButton } = useToggleButton('off');
  return (
    <div className="container">
      <PopUpButton toggleButton={clickedButton} />
      <DragAndDrop />
      {/* { boxDisplay === ON && <PopUpBox />} */}
      { boxDisplay === ON && <ImageBox />}
      <TextContainer
        messages={messages}
        emitDeleteMessage={emitDeleteMessage}
      />
      <Input
        emitSendMessage={emitSendMessage}
      />
    </div>
  );
};

export default Chat;

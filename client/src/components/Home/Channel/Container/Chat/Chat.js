import React from 'react';
import TextContainer from './TextContainer';
import Input from './Input';
import ImageBox from '../../Modules/Photos/ImageBox';
import PopUpButton from '../PopUpButtons/PopUpButton';
import useToggleButton from '../../../../../hooks/useToggleButton';


import './Styling/DragAndDropBox.css';
import './Chat.css';

const ON = 'on';

const Chat = ({
  messages, emitDeleteMessage, emitSendMessage, channel, currentUser,
}) => {
  const { boxDisplay, clickedButton } = useToggleButton('off');
  return (
    <div id="chat-container">
      {/* <PopUpButton toggleButton={clickedButton} />
      { boxDisplay === ON && <ImageBox channelId={channel} emitSendMessage={emitSendMessage} />} */}
      <TextContainer
        messages={messages}
        emitDeleteMessage={emitDeleteMessage}
        emitSendMessage={emitSendMessage}
        channelId={channel}
        currentUser={currentUser}
      />
      
      <Input
        emitSendMessage={emitSendMessage}
        channel={channel}
      />
    </div>
  );
};

export default Chat;

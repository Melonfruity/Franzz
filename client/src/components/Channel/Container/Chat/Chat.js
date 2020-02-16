import React from 'react';
import TextContainer from './TextContainer';
import Input from './Input';
import ImageBox from '../Photos/ImageBox';
import PopUpButton from '../PopUpButtons/PopUpButton';
import useToggleButton from '../../../../hooks/useToggleButton';
import { handleFiles } from './Scripts/DragAndDropPhotos';

import './Chat.css';
import '../../RightBar/Styling/galleryStyling.scss';

const ON = 'on';

const Chat = ({
  messages, emitDeleteMessage, emitSendMessage, channel,
}) => {
  console.log(channel);

  const { boxDisplay, clickedButton } = useToggleButton('off');
  return (
    <div className="container">
      <PopUpButton toggleButton={clickedButton} />
      { boxDisplay === ON && <ImageBox channelId={channel} emitSendMessage={emitSendMessage} />}
      <TextContainer
        messages={messages}
        emitDeleteMessage={emitDeleteMessage}
        emitSendMessage={emitSendMessage}
        channelId={channel}
      />
      <Input
        emitSendMessage={emitSendMessage}
      />
      <input type="file" id="fileElem" multiple accept="image/*" onChange={(e) => handleFiles(e.target.files, channel, '', emitSendMessage)} />
      <label className="button" htmlFor="fileElem">Select some files</label>
    </div>
  );
};

export default Chat;

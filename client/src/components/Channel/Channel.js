import React from 'react';

const Chat = React.lazy(() => import('./Container/Chat/Chat'));

const Channel = ({ socket, channel, messages }) => {
  console.log(messages[0], messages[messages.length - 1]);
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Chat
        key={channel}
        channelID={channel}
        initialMessages={messages}
        socket={socket}
      />
    </React.Suspense>
  );
};

export default Channel;

import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

const Message = ({
  username, message, video, image, isCurrent,
}) => {
  return (
  <Text>{username} {message} {isCurrent}</Text>
  );
};

export default Message;

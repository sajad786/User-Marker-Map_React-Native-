import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Mainstack from './src/Navigation/Mainstack';

const App = () => {
  return (
    <>
      <Mainstack />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default App;

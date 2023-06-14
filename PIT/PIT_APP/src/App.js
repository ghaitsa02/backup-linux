import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Router from './router';
import {DataContext, NamaContext} from './context';
import Drawer from './screen/drawer/Drawer';

const App = () => {
  const [contact, setContact] = useState('');
  const [data, setData] = useState([]);

  return (
    <NamaContext.Provider value={[contact, setContact]}>
      <DataContext.Provider value={[data, setData]}>
        <Router />
      </DataContext.Provider>
    </NamaContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});

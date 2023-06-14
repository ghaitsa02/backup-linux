import {
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  Button,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {NavigationContainer, useRoute} from '@react-navigation/native';

const Drawer = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => {
    return (
      <View style={[styles.container, styles, NavigationContainer]}>
        <Text style={styles.paragraph}>I am Drawer</Text>
        <Button title="Tutup" onPress={() => drawer.current.closeDrawer()} />
      </View>
    );
  };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerBackgroundColor={'#ffa'}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <View style={[styles.container, styles, NavigationContainer]}>
        <Text style={styles.paragraph}>Drawer on the {drawerPosition}</Text>
        <Button
          title="Change drawer position"
          onPress={() => changeDrawerPosition()}
        />
        <Text style={styles.paragraph}>geser atau teken tombol</Text>
        <Button
          title="open drawer"
          onPress={() => drawer.current.openDrawer()}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NavigationContainer: {
    backgroundColor: '#fff',
  },
  paragraph: {
    padding: 15,
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
  },
});

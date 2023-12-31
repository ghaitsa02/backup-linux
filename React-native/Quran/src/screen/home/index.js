import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  useColorScheme,
} from 'react-native';
import React, {Component, useContext, useEffect} from 'react';
import {Usercontext} from '../../router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InternetConnectionAlert from 'react-native-internet-connection-alert';

function Home({navigation}) {
  const {data_asyncStorage} = useContext(Usercontext);
  const [data, setData] = data_asyncStorage;
  const colorScheme = useColorScheme();
  useEffect(() => {
    get_data();
  }, []);

  const get_data = async () => {
    try {
      let value = await AsyncStorage.getItem('database');
      value = JSON.parse(value);
      if (value != null) {
        setData(value);
        console.log(value);
      }
    } catch (error) {
      console.log('Get Data', error);
    }
  };

  return (
    <InternetConnectionAlert
      onChange={connectionState => {
        console.log('Connection State: ', connectionState);
      }}
      title="Tidak ada koneksi internet"
      message="Harap periksa koneksi internet anda...">
      <View style={{flex: 1}}>
        <StatusBar hidden={true} />
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            marginTop: '10%',
            marginLeft: '3%',
          }}>
          {data.map((item, index) => {
            return (
              <Text
                key={index}
                style={{
                  color: 'white',
                  fontSize: 25,
                  fontWeight: 'bold',
                }}>
                Hallo {item.nama} ,
              </Text>
            );
          })}
          {/* <Text style={{color: 'white', fontSize: 16.5}}>
          Selamat datang di Al-Quran Digital
        </Text> */}
        </View>
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            alignItems: 'center',
            width: '100%',
            marginTop: '50%',
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/image/quran.png')}
              style={{width: 80, height: 80}}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Dashboard', {
                  routeName: 'surah',
                })
              }>
              <View
                style={{
                  marginTop: 30,
                  borderWidth: 2.5,
                  borderColor: colorScheme == 'dark' ? 'gray' : 'white',
                  alignItems: 'center',
                  paddingHorizontal: 55,
                  backgroundColor: colorScheme == 'dark' ? 'black' : 'black',

                  paddingVertical: 10,
                  borderRadius: 20,
                  elevation: 30,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '900',
                    letterSpacing: 1,
                  }}>
                  Baca Al-Quran
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ImageBackground
          source={require('../../assets/image/kabah.jpg')}
          style={{width: '100%', height: '100%'}}
          blurRadius={3}
        />
      </View>
    </InternetConnectionAlert>
  );
}

export default Home;

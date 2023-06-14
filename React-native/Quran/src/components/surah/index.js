import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  DrawerLayoutAndroid,
  TextInput,
  useColorScheme,
  ImageBackground,
  Linking,
} from 'react-native';
import React, {
  Component,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/Entypo';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import Icon4 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Usercontext} from '../../router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import Part_Drawer from '../Drawer';

const Surah = ({navigation}) => {
  // Variable Lokal
  const colorScheme = useColorScheme();
  const [surah, setSurah] = useState([]);
  const [kondisi, setKondisi] = useState(true);
  const [kondisi2, setKondisi2] = useState();
  const [remember, setRemember] = useState();
  const [search, setSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const tes = remember;
  // LifeCycle
  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      get_Surah();
      return refresh;
    });
  }, [navigation]);
  // Get data from API
  const get_Surah = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('https://equran.id/api/surat', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setSurah(result);
        setDataSearch(result);
        get_Remember();
        setKondisi(false);
      })
      .catch(error => console.log('error', error));
  };
  // get data from API
  const get_Remember = async () => {
    try {
      let value = await AsyncStorage.getItem('Pengingat');
      value = JSON.parse(value);
      if (value == '' || value == null) {
        setKondisi2(false);
      } else if (value != null) {
        setRemember(value);
        setKondisi2(true);
      }
    } catch (e) {
      console.log('error While get Remember', e);
    }
  };
  // Rules Search
  const Search = text => {
    if (text) {
      const newData = dataSearch.filter(item => {
        const itemData = item.nama_latin
          ? item.nama_latin.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSurah(newData);

      console.log('Filter', surah);
    } else {
      setSurah(dataSearch);
    }
  };
  // Drawer
  const drawer = useRef(null);
  const open_Drawer = () => {
    return (
      // Container 1
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'grey',
            width: 330,
            height: '60%',
            justifyContent: 'flex-end',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          {/* Container 2 */}
          <Image
            source={require('../../assets/image/backgroundDrawer.jpg')}
            style={{
              width: '100%',
              height: '100%',
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
            }}
          />
          <View style={{position: 'absolute', width: '100%'}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/image/quran.png')}
                style={{width: 70, height: 70}}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: 'Poppins-BoldItalic',
                  fontSize: 20,
                  color: colorScheme == 'dark' ? 'white' : 'white',
                }}>
                Al-Quran Digital
              </Text>
            </View>
            {/* content drawer */}
            <View style={{alignItems: 'center'}}>
              <Content_drawer
                text={'Report a Problem'}
                icon="customerservice"
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 50,
                }}
                onPress={() => report_Problem()}
              />
              <Content_drawer
                text={'About Aplication'}
                icon="flag"
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}
                onPress={() => navigation.replace('AboutApp')}
              />
            </View>
            {/* Footer */}
            <View
              style={{
                height: 50,
                marginBottom: 10,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/icon/lineHeader.png')}
                style={{width: 50, borderRadius: 50}}
              />
            </View>
          </View>
        </View>
        {/* Close */}
        <View
          style={{
            height: '40%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingRight: 7,
            paddingBottom: 50,
          }}>
          <TouchableOpacity onPress={() => drawer.current.closeDrawer()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
              }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 21,
                  color: 'black',
                  fontWeight: '700',
                  letterSpacing: 1.3,
                }}>
                Close
              </Text>
              <Icon4 name="logout" size={35} color={'black'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const report_Problem = () => {
    let url =
      'whatsapp://send?text=' +
      'Silahkan Laporkan Bug/Problem Pada Aplikasi CatatanKu,Harap Laporkan dengan Berupa ScreenShot Maupun Video!!!' +
      '&phone=62' +
      895421799979;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Alert.alert(
          'Peringatan !!',
          'Harap Install Aplikasi WhatsApp Terlebih Dahulu.',
        );
      });
  };

  const openDrawer = useCallback(() => {
    drawer.current.openDrawer();
  });
  return kondisi ? (
    <InternetConnectionAlert
      onChange={connectionState => {
        if (connectionState.isConnected == true) {
          get_Surah();
          console.log('get Surah');
        } else if (connectionState.isConnected == false) {
          console.log('false');
        }
      }}
      title="Tidak ada koneksi internet"
      message="Harap periksa koneksi internet anda...">
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#D5CFCF'}}>
        <AnimatedLottieView
          source={require('../../assets/lottie/loadingbacaquran.json')}
          loop={true}
          autoPlay={true}
          style={{width: '65%', height: '65%', marginLeft: '5%'}}
        />
        <Text
          style={{
            position: 'absolute',
            top: '62%',
            left: '30%',
            fontSize: 15,
            fontWeight: '700',
          }}>
          Mohon Tunggu Sebentar...
        </Text>
      </View>
    </InternetConnectionAlert>
  ) : (
    <InternetConnectionAlert
      onChange={connectionState => {
        console.log('Connection State: ', connectionState);
      }}
      title="Tidak ada koneksi internet"
      message="Harap periksa koneksi internet anda...">
      <DrawerLayoutAndroid ref={drawer} renderNavigationView={open_Drawer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: '#F0E8E8',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          {/* Bagian header */}
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => openDrawer()}>
              <Icon2
                name="menu"
                size={30}
                color={colorScheme == 'dark' ? 'white' : 'black'}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 20,
                color: '#672CBC',
              }}>
              Al-Quran Digital
            </Text>
            <TouchableOpacity onPress={() => setSearch(!search)}>
              <Icon
                name="search"
                size={23}
                color={colorScheme == 'dark' ? 'white' : 'black'}
              />
            </TouchableOpacity>
          </View>
          {/* Bagian Terakhir Membaca */}
          <View style={{marginVertical: 25}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                left: 10,
                top: 20,
                zIndex: 2,
              }}>
              <Image
                source={require('../../assets/icon/cib.png')}
                style={{width: 30, height: 30}}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: 'Poppins-Medium',
                  color: 'white',
                }}>
                Terakhir Membaca
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                position: 'absolute',
                zIndex: 2,
                left: 20,
                top: 70,
              }}>
              {kondisi2 ? (
                <>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 18,
                      color: 'white',
                      letterSpacing: 1,
                    }}>
                    {tes.namaSurat}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular', color: 'white'}}>
                    ayat {tes.Ayat}
                  </Text>
                </>
              ) : (
                <View></View>
              )}
            </View>
            <Image
              source={require('../../assets/icon/Frame30.png')}
              style={{width: '100%', height: 150}}
            />
          </View>
          <StatusBar hidden={true} />
          {/* Bagian Search */}
          {search ? (
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <View style={{position: 'absolute', marginLeft: 10}}>
                  <Icon name="search" size={22} color="black" />
                </View>
                <TextInput
                  placeholder="Surah apa ni, Yang ingin kamu cari ?"
                  onChangeText={val => Search(val)}
                  style={{
                    borderColor: colorScheme == 'dark' ? 'grey' : 'black',
                    borderWidth: 1.7,
                    width: '95%',
                    height: 40,
                    paddingLeft: 45,
                    borderRadius: 10,
                    color: colorScheme == 'dark' ? 'white' : 'black',
                  }}
                />
              </View>
            </View>
          ) : (
            <></>
          )}
          {/* Bagian Mapping */}
          {surah.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('persurah', {
                    numberSurah: item.nomor,
                  });
                }}
                key={index}
                style={{
                  flexDirection: 'row',
                  marginBottom: 15,
                  borderBottomWidth: 0.2,
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                {/* Bagian bingkai dan nomor */}
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      position: 'absolute',
                      color: 'black',
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    {item.nomor}
                  </Text>
                  <Image
                    source={require('../../assets/icon/bingkai.png')}
                    style={{width: 55, height: 55}}
                  />
                </View>
                {/* Bagian Deskripsi */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 15,
                    justifyContent: 'space-between',
                    width: '80%',
                  }}>
                  <View>
                    <Text
                      style={{
                        marginBottom: 2,
                        color: 'black',
                        fontSize: 15,
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      {item.nama_latin}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#8789A3', fontWeight: '900'}}>
                        {item.tempat_turun} |{' '}
                      </Text>
                      <Text style={{color: '#8789A3', fontWeight: '900'}}>
                        {item.jumlah_ayat} Ayat
                      </Text>
                    </View>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#863ED5',
                      }}>
                      {item.nama}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </DrawerLayoutAndroid>
    </InternetConnectionAlert>
  );
};

// Component Drawer
const Content_drawer = ({text, icon, style, onPress}) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          style,
          {
            backgroundColor: '#672CBC',
            height: 46,
            width: '80%',
            borderRadius: 40,
            paddingHorizontal: 20,
            elevation: 10,
            borderWidth: 2,
            borderColor: colorScheme == 'dark' ? 'grey' : 'white',
          },
        ]}>
        <Icon3 name={icon} size={25} color={'black'} />
        <Text
          style={{
            fontSize: 15,
            marginLeft: 18,
            color: colorScheme == 'dark' ? '#EEE825' : '#EEE825',
            letterSpacing: 1.3,
            fontWeight: '600',
            fontStyle: 'italic',
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Surah;

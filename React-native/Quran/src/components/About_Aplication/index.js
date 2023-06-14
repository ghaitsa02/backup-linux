import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Linking,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {StatusBar} from 'react-native';

const About_Aplication = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const coloruseTheme = useColorScheme();
  // Linking for email
  const Email = () => {
    Linking.openURL('mailto:farhanmahendra66@gmail.com');
  };
  // Linking for WhatsApp
  const Whatsapp = () => {
    let url =
      'whatsapp://send?text=' +
      'Project or Collaboration on Aplication CatatanKu' +
      '&phone=62' +
      85711197024;
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
  // Linking for Github
  const Github = () => {
    Linking.openURL('https://github.com/09Farhanmahendra01')
      .then(success => {
        console.log('Success to github');
      })
      .catch(e => {
        console.log('Error in', e);
      });
  };
  return (
    <View style={styles.Container}>
      <StatusBar hidden />
      <ImageBackground
        source={require('../../assets/image/backgroundAboutapp.jpg')}>
        {/* Header */}
        <View style={styles.Container2}>
          {/* Back to home*/}
          <TouchableOpacity
            style={{marginLeft: 20}}
            onPress={() =>
              navigation.replace('Dashboard', {
                routeName: 'surah',
              })
            }>
            <Icon
              name="arrowleft"
              size={25}
              color={coloruseTheme == 'dark' ? 'black' : 'black'}
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text
              style={[
                styles.textHeader,
                {color: coloruseTheme == 'dark' ? '#303030' : 'grey'},
              ]}>
              About Aplication
            </Text>
            <View
              style={{
                backgroundColor:
                  coloruseTheme == 'dark' ? '#303030' : '#303030',
                padding: 15,
                borderRadius: 20,
              }}>
              <Image
                source={require('../../assets/image/10586.jpg')}
                style={{width: 130, height: 110, borderRadius: 10}}
              />
            </View>
          </View>
        </View>
        <View style={[styles.Container3, {height: height / 1.5}]}>
          {/* Icon line*/}
          <View style={styles.imageLine}>
            <Image
              source={require('../../assets/icon/lineHeader.png')}
              style={{width: 50, borderRadius: 50}}
            />
          </View>
          {/* Bagian Deskripsi */}
          <ScrollView>
            <View style={styles.containerDeskripsi}>
              <Text style={[styles.deskripsi]}>
                Hallo nama saya Farhan, Diera serba digital ini yang serba
                praktis maka dari itu saya membuatkan Aplikasi Al-Quran agar
                kita tetap bisa kapan pun membaca maupun menghafal Al-Quran
                meskipun tidak membawa mushaf.
              </Text>
              <Text
                style={[
                  styles.deskripsi2,
                  {color: coloruseTheme == 'dark' ? 'grey' : 'grey'},
                ]}>
                * dan Bagaimana Aplikasi Ini dibuat ?
              </Text>
              <Text
                style={[
                  styles.deskripsi3,
                  {color: coloruseTheme == 'dark' ? 'black' : 'black'},
                ]}>
                Aplikasi Ini di buat dan Sekaligus di Kembangkan oleh saya
                pribadi, dengan menggunakan Tekhnologi framework REACT NATIVE.
              </Text>
              {/* part information */}
              <Text
                style={[
                  styles.deskripsi4,
                  {color: coloruseTheme == 'dark' ? 'grey' : 'grey'},
                ]}>
                * Project or Collaboration :
              </Text>
              <View style={{marginLeft: 20, marginTop: 17}}>
                {/* Email */}
                <TouchableOpacity
                  onPress={() => {
                    Email();
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../assets/icon/gmail.png')}
                      style={{width: 25, height: 25}}
                    />
                    <Text
                      style={{
                        letterSpacing: 0.5,
                        color: coloruseTheme == 'dark' ? 'blue' : 'blue',
                      }}>
                      {' '}
                      : farhanmahendra66@gmail.com
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* Whatsapp */}
                <TouchableOpacity onPress={() => Whatsapp()}>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Image
                      source={require('../../assets/icon/whatsapp.png')}
                      style={{width: 25, height: 25}}
                    />
                    <Text
                      style={{
                        letterSpacing: 0.5,
                        color: coloruseTheme == 'dark' ? 'blue' : 'blue',
                      }}>
                      {' '}
                      : 085711197024
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* Github */}
                <TouchableOpacity onPress={() => Github()}>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Image
                      source={require('../../assets/icon/github.png')}
                      style={{width: 25, height: 25}}
                    />
                    <Text
                      style={{
                        letterSpacing: 0.5,
                        color: coloruseTheme == 'dark' ? 'blue' : 'blue',
                      }}>
                      {' '}
                      : 09Farhanmahendra01
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* Footer */}
              <View style={styles.footer}>
                <Text
                  style={{color: coloruseTheme == 'dark' ? 'grey' : 'grey'}}>
                  Copyright{' '}
                </Text>
                <Image
                  source={require('../../assets/icon/copyright.png')}
                  style={{width: 13, height: 13}}
                />
                <Text
                  style={{color: coloruseTheme == 'dark' ? 'grey' : 'grey'}}>
                  {' '}
                  2023
                </Text>
                <Text
                  style={{
                    fontWeight: '900',
                    color: coloruseTheme == 'dark' ? 'black' : 'black',
                  }}>
                  {' '}
                  Al-Quran Digital
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  Container2: {
    height: '35%',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textHeader: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Action_Man_Bold',
  },
  Container3: {
    width: '100%',

    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'white',
  },
  imageLine: {
    marginTop: 15,
    alignItems: 'center',
  },
  containerDeskripsi: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  deskripsi: {
    color: 'black',
    fontWeight: '700',
    fontStyle: 'italic',
    letterSpacing: 0.7,
    lineHeight: 22,
  },
  deskripsi2: {
    marginTop: 10,
    fontSize: 17,
    fontFamily: 'Action_Man_Bold',
  },
  deskripsi3: {
    marginTop: 17,
    lineHeight: 20,
    marginLeft: 25,
    letterSpacing: 0.4,
    fontStyle: 'italic',
  },
  deskripsi4: {
    marginTop: 15,
    fontSize: 17,
    fontFamily: 'Action_Man_Bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});

export default About_Aplication;

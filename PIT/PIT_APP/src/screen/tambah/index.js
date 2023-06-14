import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {DataContext} from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Contact from '../contact';

const Tambah = ({navigation}) => {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [data, setData] = useContext(DataContext);

  const tambah = () => {
    data.push({judul: text, judul2: text2});
    setData(data);
    saveData(data);
  };

  const saveData = async data => {
    try {
      await AsyncStorage.setItem('database', JSON.stringify(data));
    } catch (e) {
      console.log('save error', e);
    }
    navigation.goback();
  };

  return (
    <View
      style={{
        backgroundColor: '#329FF3',
        flex: 1,
      }}>
      {/* <View
        style={{
          backgroundColor: '#000000',
        }}>
        <TouchableOpacity
          onPress={() => navigation.replace('contact')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name="arrowleft" size={35} color={'#fff'} />
          <Text
            style={{
              fontSize: 25,
              color: '#fff',
              fontFamily: 'Rubik-ExtraBold',
            }}>
            Balik
          </Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.bungkus2}>
        <Icon2 name="user" color={'#000'} size={50} />
        <Text style={styles.dContact}>Daftar Contact</Text>
      </View>
      <View style={styles.tInput}>
        <Icon name="user" size={30} color={'#000'} />
        <TextInput
          placeholder="Isi Nama"
          onChangeText={t => setText(t)}
          style={{color: '#fff', width: '100%'}}
        />
      </View>
      <View style={styles.tInput}>
        <Icon name="contacts" size={30} color={'#000'} />
        <TextInput
          placeholder="Isi Nomor"
          onChangeText={t => setText2(t)}
          keyboardType="numeric"
          style={{color: '#fff', width: '100%'}}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.tEdit}
          onPress={() => {
            const cek = () => {
              if (text == '' || text2 == '') {
                Alert.alert(
                  'Tidak Semudah Itu',
                  'Silahkan Isi Semuanya',
                );
              } else {
                tambah();
                navigation.navigate('contact');
              }
            };
            cek();
          }}>
          <Text
            style={{
              fontSize: 25,
              color: '#000',
              fontFamily: 'Rubik-Bold',
            }}>
            Tambah
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tambah;

const styles = StyleSheet.create({
  bungkus2: {
    alignItems: 'center',
    backgroundColor: '#5096',
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25,
  },
  dContact: {
    fontSize: 25,
    color: '#000',
    fontFamily: 'Rubik-ExtraBold',
  },
  tInput: {
    borderWidth: 1,
    height: 45,
    marginTop: 30,
    borderRadius: 7,
    paddingHorizontal: 15,
    backgroundColor: '#D40D42',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tEdit: {
    backgroundColor: '#4AFF6E',
    width: '30%',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    marginTop: 50,
  },
});

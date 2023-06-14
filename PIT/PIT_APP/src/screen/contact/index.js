import {
  Alert,
  Button,
  DrawerLayoutAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseButton, RectButton, TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {DataContext, NamaContext} from '../../context';
import {SearchBar} from 'react-native-screens';

const Contact = ({navigation}) => {
  const [nama, setNama] = useContext(NamaContext);
  const [data, setData] = useContext(DataContext);
  const [index, setIndex] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputModal, setInputModal] = useState('');
  const [inputModal2, setInputModal2] = useState('');
  const [tkpIndex, setTkpIndex] = useState('');
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');
  // const changeDrawerPosition = () => {
  //   if (drawerPosition === 'left') {
  //     setDrawerPosition('right');
  //   } else {
  //     setDrawerPosition('left');
  //   }
  // };

  const navigationView = () => {
    return (
      // isi drawer
      <View>
        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
          }}>
          <Text
            style={{
              fontFamily: 'Rubik-Bold',
            }}>
            PIT
          </Text>
        </View>

        {/* <TouchableOpacity
          onPress={() => drawer.current.closeDrawer()}
          style={{
            alignItems: 'flex-end',
            backgroundColor: '#4021',
          }}>
          <Icon name="arrow-right" size={45} color={'#000'} />
        </TouchableOpacity> */}

        <Text>Isi dari drawer</Text>
        {/* <Icon2 name="customerservice" size={50} color={'#000'} /> */}
      </View>
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      getData();
    });
    return refresh;
  }, [navigation]);

  const getData = async () => {
    setLoading(true);
    try {
      let value = await AsyncStorage.getItem('database');
      value = JSON.parse(value);
      if (value !== null) {
        setData(value);
        console.log('get data', value);
      }
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };

  const alertDel = index => {
    Alert.alert('Hapus Contact', 'Yakin mau di hapus', [
      {
        text: 'yes',
        style: 'cancel',
      },
      {
        text: 'ok',
        onPress: () => del(index),
      },
    ]);
  };

  const del = index => {
    setLoading(true);
    setTimeout(() => {
      data.splice(index, 1);
      console.log('hapus data', data);
      setData(data);
      saveData(data);
      setLoading(false);
    }, 20);
  };

  const saveData = async data => {
    try {
      await AsyncStorage.setItem('database', JSON.stringify(data));
    } catch (e) {
      console.log('save error', e);
    }
  };

  const edit = index => {
    data[index].judul = inputModal;
    data[index].judul2 = inputModal2;
    setData(data);
    console.log(data);
    saveData(data);
  };

  return loading ? (
    <View />
  ) : (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerBackgroundColor={'#329FF3'}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <View style={styles.bungkus}>
        {/* ini header */}
        {/* <View style={styles.bungkus2}>
          <Icon name="user" color={'#000'} size={50} />
          <Text style={styles.dContact}>Daftar Contact</Text>
        </View> */}
        <ScrollView key={index}>
          <View>
            <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
              <Icon
                name="list"
                color={'#000'}
                size={45}
                style={{padding: 10}}
              />
            </TouchableOpacity>
          </View>
          {data.map((item, index) => (
            // ini buat ngubah atau ngapus contact
            <TouchableOpacity
              onPress={() => [
                toggleModal(),
                setInputModal(item.judul),
                setInputModal2(item.judul2),
                setTkpIndex(index),
              ]}>
              <View style={styles.bText}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon3 name="user" size={40} color={'#000'} />
                  {/* ini isi contact */}
                  <Text
                    style={{
                      fontSize: 25,
                      color: '#000',
                      fontFamily: 'Rubik-Black',
                    }}>
                    {item.judul}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000',
                    fontFamily: 'Rubik-Regular',
                    marginLeft: '11.5%',
                  }}>
                  {item.judul2}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* ini buat nambah contact */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('tambah')}
          style={styles.tTambah}>
          <Icon name="user-plus" size={45} color={'#000'} />
        </TouchableOpacity> */}
        {/* ini buat ngubah contact */}
        <Modal
          isVisible={isModalVisible}
          animationIn={'flash'}
          animationOut={'fadeOut'}
          style={{
            height: '100%',
          }}>
          <View
            style={{
              backgroundColor: 'skyblue',
              borderRadius: 10,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => toggleModal()}>
                <Icon2 name="arrowleft" size={50} color={'#000'} />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  fontSize: 25,
                  fontFamily: 'Rubik-Black',
                }}>
                Ubah Contact
              </Text>
            </View>
            <View style={styles.tInput}>
              <Icon name="user" size={30} color={'#000'} />
              <TextInput
                placeholder="Masukan Nama"
                value={inputModal}
                onChangeText={t => setInputModal(t)}
                style={{color: '#fff', width: '100%'}}
              />
            </View>
            <View style={styles.tInput}>
              <Icon2 name="contacts" size={30} color={'#000'} />
              <TextInput
                placeholder="Masukan Nomor"
                value={inputModal2}
                onChangeText={t => setInputModal2(t)}
                keyboardType="numeric"
                style={{color: '#fff', width: '100%'}}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  const gabisa = () => {
                    if (inputModal == '' || inputModal2 == '') {
                      Alert.alert('Gabisa', 'Isi yang bener');
                    } else {
                      [edit(tkpIndex), toggleModal()];
                    }
                  };
                  gabisa();
                }}
                style={styles.tEdit}>
                <Text
                  style={{
                    fontSize: 25,
                    color: '#fff',
                    fontFamily: 'Rubik-ExtraBold',
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  alertDel(tkpIndex);
                  toggleModal();
                }}>
                <Icon name="trash" size={35} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default Contact;

const styles = StyleSheet.create({
  bungkus: {
    flex: 1,
    backgroundColor: '#329FF3',
  },
  bungkus2: {
    alignItems: 'center',
    backgroundColor: '#5096',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
  },

  dContact: {
    fontSize: 25,
    color: '#000',
    fontFamily: 'Rubik-ExtraBold',
  },
  bText: {
    backgroundColor: '#D40D42',
    borderRadius: 10,
    elevation: 3,
    height: 65,
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tTambah: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 30,
    right: 30,
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
    backgroundColor: '#000',
    width: '30%',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    marginTop: 50,
  },
});

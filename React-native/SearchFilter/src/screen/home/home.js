import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const data = [
  {id: 1, name: 'Sambo'},
  {id: 2, name: 'Puan'},
  {id: 3, name: 'Megawati'},
  {id: 4, name: 'Jokowi'},
];

const Home = () => {
  const [dataFromState, setData] = useState(data);

  const item = ({item}) => {
    return (
      <View style={{backgroundColor: 'green'}}>
        <Text style={{fontSize: 34}}>{item.name}</Text>
      </View>
    );
  };

  const searchName = input => {
    let data = dataFromState;
    let searchData = data.filter(item => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setData(searchData);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <TextInput
          placeholder="Search"
          onChangeText={input => {
            searchName(input);
          }}
          style={{fontSize: 35}}
        />
      </View>
      <FlatList
        data={dataFromState}
        renderItem={item}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

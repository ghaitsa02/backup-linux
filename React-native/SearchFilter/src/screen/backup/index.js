import {StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
import React, {useState} from 'react';

const Home = () => {
  const [data, setdata] = useState(data);

  const item = ({item}) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const searchName = input => {
    let data = data;
    let searchData = data.filter(item => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setdata(searchData);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <TextInput
          placeholder="Search"
          onChangeText={input => {
            searchName(input);
          }}
        />
      </View>

      <FlatList
        data={data}
        renderItem={item}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

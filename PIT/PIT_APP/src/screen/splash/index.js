import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect} from 'react';
import AnimatedLottieView from 'lottie-react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('contact');
    }, 2000);
  });

  return (
    <View style={styles.animationContainer}>
      <AnimatedLottieView
        source={require('../../assets/icons/splash.json')}
        autoPlay={true}
        loop={true}
      />
      <Text
        style={{
          fontSize: 50,
          fontFamily: 'Rubik-Bold',
          color: '#000'
        }}>
        PIT
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

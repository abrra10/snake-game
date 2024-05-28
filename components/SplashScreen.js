import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ onHide }) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        onHide && onHide(); 
      });

      Animated.timing(position, {
        toValue: -500,
        duration: 4000, 
        useNativeDriver: true,
      }).start();
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <Animated.View style={{ opacity, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[styles.textContainer, { transform: [{ translateY: position }] }]}>
        <Image source={require('../images/SnakeIcon.png')} style={styles.snakeIcon} />
        <Text style={styles.text}>Snake Game</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#568203', 
  },
  snakeIcon: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 20, // Adjust spacing as needed
  },
});

export default SplashScreen;

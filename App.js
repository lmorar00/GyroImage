import React, {useEffect, useState} from 'react';
import {PixelRatio, View, Dimensions, Image, StyleSheet} from 'react-native';
import {gyroscope} from 'react-native-sensors';
const window = Dimensions.get('window');

const deviceWidth = window.width;
const deviceHeight = window.height;

const imageWidth = 8 * deviceWidth;
const imageHeight = 8 * deviceHeight;

const App = () => {
  const [axisY, setAxisY] = useState(0);
  const [axisX, setAxisX] = useState(1);
  
  const image = `https://placeimg.com/${PixelRatio.getPixelSizeForLayoutSize(
    imageWidth,
  )}/${PixelRatio.getPixelSizeForLayoutSize(imageHeight)}/any`;

  useEffect(() => {
    let subscription = gyroscope.subscribe(({x, y}) => 
    {
      setAxisY(y);
      setAxisX(x);
    
    });

    return () => {
      subscription.unsubscribe();
      subscription = null;
    };
  }, []);

  const positionOnScreenX = -imageWidth / 2;
  const movementX = (-axisY / 1000) * imageWidth;
  
  const positionOnScreenY = -imageHeight / 2;
  const movementY = (-axisX / 1000) * imageHeight;
  return (
    <View>
      <Image
        source={{uri: image}}
        style={styles.image}
        translateX={positionOnScreenX + movementX}
        translateY={positionOnScreenY + movementY}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: imageHeight,
    width: imageWidth,
  },
});

export default App;

// src/components/Slider.js
import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Sample images (update these paths to your actual images)
  const slides = [
    { id: 1, image: require('../../assets/images/Slider/saleOff.jpg')},
    { id: 2, image: require('../../assets/images/Slider/freeship-t04.jpg')},
    { id: 3, image: require('../../assets/images/Slider/storeSystem.jpg')}
  ];

  return (
    <View style={styles.sliderContainer}>
      <Swiper
        style={styles.wrapper}
        showsButtons
        loop
        autoplay
        autoplayTimeout={3}
        onIndexChanged={(index) => setSlideIndex(index)}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        nextButton={<Text style={styles.buttonText}>›</Text>}
        prevButton={<Text style={styles.buttonText}>‹</Text>}
      >
        {slides.map((slide) => (
          <View style={styles.slide} key={slide.id}>
            <Image source={slide.image} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </Swiper>
      {/* Optional: display current slide indicator */}
      {/* <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.indicator, slideIndex === index && styles.activeIndicator]}
            onPress={() => setSlideIndex(index)}
          />
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: { 
    height: 250, 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
   },
  wrapper: {

  },
  slide: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  image: { 
    width: '100%', 
    height: '100%' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 40 
  },
  dot: { 
    backgroundColor: 'rgba(0,0,0,.2)', 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    margin: 3 
  },
  activeDot: { 
    backgroundColor: '#007AFF', 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    margin: 3 
  },
  indicatorContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    position: 'absolute', 
    bottom: 10 
  },
  indicator: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    backgroundColor: 'gray', 
    marginHorizontal: 5 
  },
  activeIndicator: { 
    backgroundColor: 'blue' 
  }
});
export default Slider;

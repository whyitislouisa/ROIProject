import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => 
{
  const [textSizeValue, setTextSizeValue] = useState('Standard');
  const [brightnessValue, setBrightnessValue] = useState(50);
  const [volumeValue, setVolumeValue] = useState(50);

  return (
    <View style={styles.container}>
      <OptionItem
        title="Font Size"
        value={textSizeValue}
        onValueChange={setTextSizeValue}
        items=
        {
          ['Standard', 'Larger', 'Largest']
        }
      />
      <OptionItem
        title="Brightness"
        value={brightnessValue}
        onValueChange={setBrightnessValue}
      />
      <OptionItem
        title="Volume"
        value={volumeValue}
        onValueChange={setVolumeValue}
      />
    </View>
  );
};


const OptionItem = (
  { 
    title, value, onValueChange, items 
  }) => 
{
  return (
    <View style={styles.optionContainer}>
      <Text style={[styles.optionTitle]}>{title}</Text>
      {items ? 
      (
        <Picker
          selectedValue={value}
          style={styles.picker}
          onValueChange={onValueChange}
        >
          {items.map
            (
              (item) => 
              (
                <Picker.Item key={item} label={item} value={item} />
              )
            )
          }
        </Picker>
      ) : (
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={value}
          minimumTrackTintColor="#941a1d"
          maximumTrackTintColor="#D9D9D9"
          thumbTintColor="#941a1d"
          onValueChange={onValueChange}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create
(
  {
  container: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#D9D9D9',
  },
  optionContainer: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionTitle: 
  {
    marginRight: 10,
    fontSize: 18,
    color: '#262626',
  },
  picker: 
  {
    width: 150,
    height: 40,
  },
  slider: 
  {
    width: 200,
    height: 40,
  },
});

export default SettingsScreen;

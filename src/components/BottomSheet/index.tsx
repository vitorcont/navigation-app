import * as React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Window from '../../services/dimensions';
import theme from '../../theme';
import { Input } from '../Input';

const BottomModal = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: Window.heightScale(0.45),
      }}
    >
      <View>
        <View style={{
          width: '30%',
          height: Window.heightScale(0.006),
          backgroundColor: theme.colors.bottomSheet.gray,
          alignSelf: 'center',
          marginTop: Window.heightScale(0.023),
          borderRadius: 10
        }} />
        <View style={{ alignItems: 'center', marginTop: '10%' }}>
          <Input
            placeholder='Sua Localização'
          />
          <Input
            placeholder='Destino'
          />
          <Input
            placeholder='KM/L'
          />
        </View>
      </View>
    </View>
  );
};

export default BottomModal;
import * as React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const Map = () => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCKiN1FuOVkvn9NalCY4HcI7YFEDnJwFNM';
  const origin = { latitude: -22.744243, longitude: -47.298004 };
  const destination = { latitude: -20.073270, longitude: -44.296913 };
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  // setInterval(async () => {
  //   let location = await Location.getCurrentPositionAsync({});
  //   setLocation(location);
  // }, 1000)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', zIndex: 100, backgroundColor: 'red', alignSelf: 'center' }}>
        <Text>Velocidade: {location?.coords.speed}</Text>
      </View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        <MapViewDirections
          lineDashPattern={[0]}
          origin={location?.coords}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
        />
      </MapView>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

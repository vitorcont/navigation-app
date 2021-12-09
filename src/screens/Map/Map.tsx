import * as React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import MapViewDirections from 'react-native-maps-directions'
import { useEffect, useRef, useState } from 'react'
import * as Location from 'expo-location'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import BottomModal from '../../components/BottomSheet'
import Window from '../../services/dimensions'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import theme from '../../theme'
import navigationService from '../../services/navigation'

const Map = () => {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCKiN1FuOVkvn9NalCY4HcI7YFEDnJwFNM'
    const origin = { latitude: -22.744243, longitude: -47.298004 }
    const destination = { latitude: -20.07327, longitude: -44.296913 }
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [visible, setVisible] = useState(false)
    const sheetRef = useRef<BottomSheet>(null)

    // setInterval(async () => {
    //   let location = await Location.getCurrentPositionAsync({});
    //   setLocation(location);
    // }, 1000)

    const sheetHandler = () => {
        if (sheetRef && sheetRef.current)
            if (visible) {
                sheetRef.current.snapTo(0)
            } else {
                sheetRef.current.snapTo(Window.heightScale(0.45))
            }
        setVisible(!visible)
    }

    useEffect(() => {
        ;(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                return
            }

            let location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        })()
    }, [])

    return (
        <View style={styles.container}>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE}>
                <MapViewDirections
                    lineDashPattern={[0]}
                    origin={location?.coords}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                />
            </MapView>
            <TouchableOpacity
                onPress={() => navigationService.navigate('ProfileNavigator')}
                activeOpacity={0.7}
                style={styles.profileIcon}
            >
                <FontAwesome name="user-circle-o" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={sheetHandler}
                activeOpacity={0.7}
                style={styles.navigateIcon}
            >
                <Ionicons name="car-sport" size={30} color="black" />
            </TouchableOpacity>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[
                    Window.heightScale(0.06),
                    Window.heightScale(0.45),
                    Window.heightScale(0.45),
                ]}
                borderRadius={20}
                renderContent={BottomModal}
            />
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    profileIcon: {
        position: 'absolute',
        top: Window.heightScale(0.075),
        left: Window.widthScale(0.08),
        alignSelf: 'flex-start',
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: 5,
        borderRadius: 100,
        elevation: 10,
    },
    navigateIcon: {
        position: 'absolute',
        top: Window.heightScale(0.075),
        right: Window.widthScale(0.08),
        alignSelf: 'flex-start',
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: 5,
        borderRadius: 100,
        elevation: 10,
    },
})

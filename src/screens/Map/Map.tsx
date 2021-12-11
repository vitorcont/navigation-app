import React, { useEffect, useRef, useState } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location'
import BottomSheet from 'reanimated-bottom-sheet'
// import BottomModal from '../../components/BottomModal'
import Window from '../../services/dimensions'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import theme from '../../theme'
import navigationService from '../../services/navigation'
import axios from 'axios'
import { Input } from '../../components/Input'
import { Weather } from '../../components/Weather'

export interface InfoProps {
    city: string
    description: string
    temp: number
    temp_min: number
    temp_max: number
    humidity: number
}

const Map = () => {
    const { GOOGLE_MAPS_APIKEY } = process.env
    const origin = { latitude: -22.744243, longitude: -47.298004 }
    const destination = { latitude: -20.07327, longitude: -44.296913 }
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [visible, setVisible] = useState(false)
    const sheetRef = useRef<BottomSheet>(null)
    const [info, setInfo] = useState<InfoProps>({} as InfoProps)
    const [destino, setDestino] = useState('')
    const { WEATHER_APIKEY } = process.env

    // setInterval(async () => {
    //   let location = await Location.getCurrentPositionAsync({});
    //   setLocation(location);
    // }, 1000)

    const fetchWeather = async () => {
        let city = destino
        if (city.includes(' ')) city.replaceAll(' ', '%20')

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_APIKEY}&units=metric`
            )

            response !== undefined &&
                response !== null &&
                setInfo({
                    city: destino,
                    description: response.data.weather[0].description,
                    temp: response.data.main.temp.toPrecision(2),
                    temp_min: response.data.main.temp_min.toPrecision(2),
                    temp_max: response.data.main.temp_max.toPrecision(2),
                    humidity: response.data.main.humidity.toPrecision(2),
                })
        } catch (error) {
            setInfo({} as InfoProps)
        }
    }

    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                height: Window.heightScale(0.45),
            }}
        >
            <View>
                <View
                    style={{
                        width: '30%',
                        height: Window.heightScale(0.006),
                        backgroundColor: theme.colors.bottomSheet.gray,
                        alignSelf: 'center',
                        marginTop: Window.heightScale(0.023),
                        borderRadius: 10,
                    }}
                />
                <ScrollView>
                    <View style={{ alignItems: 'center', marginTop: '10%' }}>
                        <Input placeholder="Sua Localização" />
                        <Input data={destino} setData={setDestino} placeholder="Destino" />
                        <Input placeholder="KM/L" />

                        {Object.keys(info).length !== 0 && <Weather info={info} />}
                    </View>
                </ScrollView>
            </View>
        </View>
    )

    useEffect(() => {
        fetchWeather()
    }, [destino])

    const sheetHandler = () => {
        if (sheetRef && sheetRef.current)
            if (visible) {
                sheetRef.current.snapTo(0)
            } else {
                sheetRef.current.snapTo(1)
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
                    apikey={`${GOOGLE_MAPS_APIKEY}`}
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
                renderContent={renderContent}
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

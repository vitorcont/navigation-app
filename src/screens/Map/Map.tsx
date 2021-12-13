import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location'
import BottomSheet from 'reanimated-bottom-sheet'
// import BottomModal from '../../components/BottomModal'
import Window from '../../services/dimensions'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import theme from '../../theme'
import navigationService from '../../services/navigation'
import axios from 'axios'
import { Input } from '../../components/Input'
import { Weather } from '../../components/Weather'
import Button from '../../components/Button'
import PlacesInput from '../../components/PlacesInput'
import { getDistance, getOffset } from '../../services/location'
import MeIcon from '../../assets/ic_me.svg'

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
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [destination, setDestination] = useState({ lat: 0, lng: 0 });
    const [destinoText, setDestinoText] = useState('');
    const [visible, setVisible] = useState(false)
    const mapRef = useRef<MapView | null>(null)
    const sheetRef = useRef<BottomSheet>(null)
    const [info, setInfo] = useState<InfoProps>({} as InfoProps)
    const { WEATHER_APIKEY } = process.env

    // setInterval(async () => {
    //   let location = await Location.getCurrentPositionAsync({});
    //   setLocation(location);
    // }, 1000)

    const centerLocation = () => {
        if (mapRef && mapRef.current && !!location)
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            })
    }

    const fetchWeather = async () => {
        let city = destinoText

        try {
            let response
            if (destination.lat === 0 && destination.lng === 0) {
                if (!!location) {
                    response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_APIKEY}&units=metric`
                    )
                }
            } else {
                response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${destination.lat}&lon=${destination.lng}&appid=${WEATHER_APIKEY}&units=metric`
                )
            }

            response !== undefined &&
                response !== null &&
                setInfo({
                    city: destinoText === '' ? 'Sua Localização' : destinoText,
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
            <ScrollView>
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
                <View>
                    <View style={{ alignItems: 'center', marginTop: '10%', marginBottom: '20%' }}>
                        {Object.keys(info).length !== 0 && <Weather info={info} />}

                        <Input data={destinoText} editable={false} placeholder="Destino" />
                        {
                            destination.lat !== 0 && (
                                <Input placeholder="Distância Média" data={`${getDistance(destination.lat, destination.lng, location.coords.latitude, location.coords.longitude)} Km`} />
                            )
                        }


                        <Button label="Salvar" color={theme.colors.blue} small />
                    </View>
                </View>
            </ScrollView>
        </View>
    )

    useEffect(() => {
        fetchWeather()
    }, [destinoText, location])

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
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                return
            }

            let location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        })()
    }, [])

    useEffect(() => {
        if (destination.lat === 0) {
            if (mapRef && mapRef.current && !!location)
                mapRef.current.animateToRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                })
        } else {
            if (mapRef && mapRef.current && !!location)
                mapRef.current.animateToRegion({
                    latitude: (destination.lat + location.coords.latitude) / 2,
                    longitude: (destination.lng + location.coords.longitude) / 2,
                    latitudeDelta: getOffset(destination.lat, destination.lng, location.coords.latitude, location.coords.longitude),
                    longitudeDelta: getOffset(destination.lat, destination.lng, location.coords.latitude, location.coords.longitude),
                })
        }
    }, [destination, location])

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}>
                {destination.lat !== 0 && (
                    <MapViewDirections
                        lineDashPattern={[10]}
                        origin={location?.coords}
                        destination={{
                            latitude: destination.lat,
                            longitude: destination.lng
                        }}
                        strokeWidth={5}
                        strokeColor="hotpink"
                        apikey={`${GOOGLE_MAPS_APIKEY}`}
                    />
                )}
                {destination.lat !== 0 && (
                    <Marker
                        coordinate={{
                            latitude: destination.lat,
                            longitude: destination.lng
                        }}
                    >
                        <MaterialIcons name="location-pin" size={30} color="black" />
                    </Marker>
                )}
                {!!location && (
                    <Marker
                        coordinate={{
                            latitude: location?.coords.latitude,
                            longitude: location?.coords.longitude
                        }}
                    >
                        <View style={{ elevation: 10 }}>
                            <MeIcon />
                        </View>
                    </Marker>
                )}
            </MapView>
            <View style={{
                position: 'absolute',
                top: Window.heightScale(0.15), zIndex: 100,
                width: '100%',
                alignItems: 'center',
                elevation: 10,
            }}>
                <PlacesInput
                    setLocation={setDestination}
                    setAddressText={setDestinoText}
                />
            </View>
            <TouchableOpacity
                onPress={() => navigationService.navigate('ProfileNavigator')}
                activeOpacity={0.7}
                style={styles.profileIcon}
            >
                <FontAwesome name="user-circle-o" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={centerLocation}
                activeOpacity={0.7}
                style={styles.centerIcon}
            >
                <MaterialIcons name="gps-fixed" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={sheetHandler}
                activeOpacity={0.7}
                style={styles.navigateIcon}
            >
                <Ionicons name="information" size={28} color="black" />
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
        right: Window.widthScale(0.2),
        alignSelf: 'flex-start',
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: 5,
        borderRadius: 100,
        elevation: 10,
    },
    centerIcon: {
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

import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location'
import BottomSheet from 'reanimated-bottom-sheet'
import BottomModal from '../../components/BottomModal'
import Window from '../../services/dimensions'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import theme from '../../theme'
import navigationService from '../../services/navigation'
import PlacesInput from '../../components/PlacesInput'
import { getDistance, getOffset } from '../../services/location'
import MeIcon from '../../assets/ic_me.svg'
import { GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete'
import { DestinationProps } from '../../types'
import moment from 'moment'
import 'moment/locale/pt-br'
import uuid from 'react-native-uuid'
import { UpdateUser, useAuth } from '../../Hooks/auth'

moment.locale('pt-br')

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
    const [clear, setClear] = useState<() => void>(() => { })
    const [prevLocation, setPrevLocation] = useState<Location.LocationObject | null>(null)
    const [destination, setDestination] = useState({ lat: 0, lng: 0 })
    const [destinoText, setDestinoText] = useState('')
    const [visible, setVisible] = useState(false)
    const mapRef = useRef<MapView | null>(null)
    const sheetRef = useRef<BottomSheet>(null)
    const { user, setUser } = useAuth()

    const centerLocation = () => {
        if (mapRef && mapRef.current && !!location)
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })
    }

    const saveDestination = (destino: string, distancia: string) => {
        let d = {
            id: uuid.v4(),
            origem: 'Sua Localização',
            destino: destino,
            distancia: distancia,
            data: moment().subtract(0, 'days').calendar(),
        } as DestinationProps

        console.log(user);
        user.destinations.push(d)
        UpdateUser(user)
        setUser(user)
    }

    const getLocation = async () => {
        await Location.watchPositionAsync(
            {
                accuracy: 4,
                timeInterval: 1000
            },
            (newLocation) => {
                if (location?.coords.latitude !== prevLocation?.coords.latitude || !prevLocation) {
                    setPrevLocation(location)
                    setLocation(newLocation)
                }
            }
        )
    }

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
        ; (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                return
            }

            getLocation()
        })()
    }, [])

    useEffect(() => {
        if (destination.lat === 0) {
            if (mapRef && mapRef.current && !!location) centerLocation()
        } else {
            if (mapRef && mapRef.current && !!location)
                mapRef.current.animateToRegion({
                    latitude: (destination.lat + location.coords.latitude) / 2,
                    longitude: (destination.lng + location.coords.longitude) / 2,
                    latitudeDelta: getOffset(
                        destination.lat,
                        destination.lng,
                        location.coords.latitude,
                        location.coords.longitude
                    ),
                    longitudeDelta: getOffset(
                        destination.lat,
                        destination.lng,
                        location.coords.latitude,
                        location.coords.longitude
                    ),
                })
        }
    }, [destination, location])

    return (
        <View style={styles.container}>
            <MapView ref={mapRef} style={styles.map} provider={PROVIDER_GOOGLE}>
                {destination.lat !== 0 && (
                    <MapViewDirections
                        lineDashPattern={[10]}
                        origin={location?.coords}
                        destination={{
                            latitude: destination.lat,
                            longitude: destination.lng,
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
                            longitude: destination.lng,
                        }}
                    >
                        <MaterialIcons name="location-pin" size={30} color="black" />
                    </Marker>
                )}
                {!!location && (
                    <Marker
                        coordinate={{
                            latitude: location?.coords.latitude,
                            longitude: location?.coords.longitude,
                        }}
                    >
                        <View style={{ elevation: 10 }}>
                            <MeIcon />
                        </View>
                    </Marker>
                )}
            </MapView>
            <View
                style={{
                    position: 'absolute',
                    top: Window.heightScale(0.15),
                    zIndex: 100,
                    width: '100%',
                    alignItems: 'center',
                    elevation: 10,
                }}
            >
                <PlacesInput setLocation={setDestination} setAddressText={setDestinoText} />
            </View>
            <TouchableOpacity
                onPress={() => navigationService.navigate('ProfileNavigator')}
                activeOpacity={0.7}
                style={styles.profileIcon}
            >
                <FontAwesome name="user-circle-o" size={30} color="black" />
            </TouchableOpacity>
            {destination.lat !== 0 && (
                <>
                    <TouchableOpacity
                        onPress={() => {
                            setDestination({ lat: 0, lng: 0 })
                            setDestinoText('')
                        }}
                        activeOpacity={0.7}
                        style={styles.cancelText}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '700', color: 'red' }}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            saveDestination(
                                destinoText,
                                `${getDistance(
                                    location?.coords.latitude,
                                    location?.coords.longitude,
                                    destination.lat,
                                    destination.lng
                                )}`
                            )
                        }}
                        activeOpacity={0.7}
                        style={[styles.cancelText, { left: 175 }]}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.blue }}>
                            Salvar
                        </Text>
                    </TouchableOpacity>
                </>
            )}
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
                    Window.heightScale(0.7),
                    Window.heightScale(0.7),
                ]}
                borderRadius={20}
                renderContent={() => (
                    <BottomModal
                        locationText={destinoText}
                        distance={`${getDistance(
                            location?.coords.latitude,
                            location?.coords.longitude,
                            destination.lat,
                            destination.lng
                        )} Km`}
                        destination={destination}
                        location={{
                            lat: location?.coords.latitude,
                            lng: location?.coords.longitude,
                        }}
                    />
                )}
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
    cancelText: {
        position: 'absolute',
        top: Window.heightScale(0.076),
        left: Window.widthScale(0.2),
        alignSelf: 'flex-start',
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: 9,
        borderRadius: 16,
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

import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import Window from '../../services/dimensions'
import theme from '../../theme'
import { Input } from '../Input'
import { Weather } from '../Weather'
import axios from 'axios'
import Button from '../Button'

export interface InfoProps {
    city: string
    description: string
    temp: number
    temp_min: number
    temp_max: number
    humidity: number
}

interface Destination {
    lat: number,
    lng: number
}

interface IProps {
    locationText: string,
    distance: string,
    destination: Destination,
    location: Destination
}

const BottomModal = ({ locationText, distance, destination, location }: IProps) => {
    const [info, setInfo] = useState<InfoProps>({} as InfoProps)
    const { WEATHER_APIKEY } = process.env

    const fetchWeather = async () => {
        let city = locationText;

        try {
            let response
            if (destination.lat === 0 && destination.lng === 0) {
                if (!!location) {
                    response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${WEATHER_APIKEY}&units=metric`
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
                    city: locationText === '' ? 'Sua Localização' : locationText,
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

    useEffect(() => {
        fetchWeather()
    }, [locationText, location])

    return (
        <View
            style={{
                backgroundColor: 'white',
                height: Window.heightScale(0.7),
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
                <View>
                    <View style={{ alignItems: 'center', marginTop: '10%', marginBottom: '20%' }}>
                        {Object.keys(info).length !== 0 && <Weather info={info} />}

                        <Input data={locationText} editable={false} placeholder="Destino" />
                        {
                            destination.lat !== 0 && (
                                <Input
                                    placeholder="Distância Média"
                                    data={distance}
                                    editable={false}
                                />
                            )
                        }
                        <View style={{ marginBottom: '5%', width: '100%', alignItems: 'center' }}>
                            <Button label="Salvar" color={theme.colors.blue} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default BottomModal

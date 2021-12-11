import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import Window from '../../services/dimensions'
import theme from '../../theme'
import { Input } from '../Input'
import { Weather } from '../Weather'
import axios from 'axios'

export interface InfoProps {
    city: string
    description: string
    temp: number
    temp_min: number
    temp_max: number
    humidity: number
}

const BottomModal = () => {
    const [info, setInfo] = useState<InfoProps>({} as InfoProps)
    const [found, setFound] = useState(false)
    const { WEATHER_APIKEY } = process.env

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${WEATHER_APIKEY}&units=metric`
            )

            response !== undefined &&
                response !== null &&
                setInfo({
                    city: 'London',
                    description: response.data.weather[0].description,
                    temp: response.data.main.temp.toPrecision(2),
                    temp_min: response.data.main.temp_min.toPrecision(2),
                    temp_max: response.data.main.temp_max.toPrecision(2),
                    humidity: response.data.main.humidity.toPrecision(2),
                })
            setFound(true)
        } catch (error) {
            console.log(error)
            setFound(false)
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [found])

    return (
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
                        <Input placeholder="Destino" />
                        <Input placeholder="KM/L" />

                        <Weather info={info} />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
export default BottomModal

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CloudySvg from '../../assets/Cloudy.svg'
import PartlyCloudySvg from '../../assets/PartlyCloudy.svg'
import RainSvg from '../../assets/Rainy.svg'
import RainThunderSvg from '../../assets/RainThunder.svg'
import SnowSvg from '../../assets/Snowy.svg'
import SunnySvg from '../../assets/Sunny.svg'
import theme from '../../theme'
import { InfoProps } from '../BottomModal'

interface WeatherProps {
    info: InfoProps
}

export function Weather({ info }: WeatherProps) {
    console.log(info)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Como está o tempo em{' '}
                <Text style={[styles.title, { fontFamily: theme.fonts.bold }]}>{info.city}</Text>?
            </Text>
            <View style={styles.iconContainer}>
                {info.description.includes('cloud') && <PartlyCloudySvg />}
                {info.description.includes('mist') && <CloudySvg />}
                {info.description.includes('fog') && <CloudySvg />}
                {info.description.includes('rain') && <RainSvg />}
                {info.description.includes('snow') && <SnowSvg />}
                {info.description.includes('clear sky') && <SunnySvg />}
                {info.description.includes('thunderstorm') && <RainThunderSvg />}
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.text, { fontFamily: theme.fonts.medium }]}>
                    Temperatura: <Text style={styles.text}>{info.temp}°C</Text>
                </Text>
                <Text style={[styles.text, { fontFamily: theme.fonts.medium }]}>
                    Temperatura Mínima: <Text style={styles.text}>{info.temp_min}°C</Text>
                </Text>
                <Text style={[styles.text, { fontFamily: theme.fonts.medium }]}>
                    Temperatura Máxima: <Text style={styles.text}>{info.temp_max}°C</Text>
                </Text>
                <Text style={[styles.text, { fontFamily: theme.fonts.medium }]}>
                    Humidade: <Text style={styles.text}>{info.humidity}</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        marginBottom: 100,
    },

    title: {
        marginLeft: '7.5%',
        fontSize: 15,
        fontFamily: theme.fonts.regular,
        marginVertical: 5,
    },

    iconContainer: {
        width: '50%',
        height: 50,
        alignSelf: 'flex-start',
        marginLeft: 10,
    },

    textContainer: {
        width: '60%',
        height: 50,
        alignSelf: 'flex-end',
        marginRight: 5,
        justifyContent: 'center',
        bottom: 10,
    },

    text: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        marginBottom: 5,
        color: theme.colors.blue,
    },
})

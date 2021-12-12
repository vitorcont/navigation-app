import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import theme from '../../theme'

interface ButtonProps extends TouchableOpacityProps {
    label: string
    color: string
    small?: boolean
}

const Button = ({ label, color, small = false, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[small ? styles.smallContainer : styles.container, { backgroundColor: color }]}
        >
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    smallContainer: {
        width: '52%',
        height: 55,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        width: '65%',
        height: 55,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    label: {
        fontSize: 24,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
    },
})

export default Button

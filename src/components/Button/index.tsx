import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import theme from '../../theme'

interface ButtonProps extends TouchableOpacityProps {
    label: string
    color: string
}

const Button = ({ label, color, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: color }]}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 250,
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

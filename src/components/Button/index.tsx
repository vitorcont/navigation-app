import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ButtonProps {
    label: string
    color: string
}

const Button = ({ label, color }: ButtonProps) => {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: color }]}>
            <Text>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 50,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Button

import React from 'react'
import { View, StyleSheet } from 'react-native'
import theme from '../../theme'

export function ListDivider() {
    return <View style={styles.container} />
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 1,
        backgroundColor: theme.colors.white,
        marginVertical: 13,
    },
})

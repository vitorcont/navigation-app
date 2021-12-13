import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import theme from '../../theme'
import { DestinationProps } from '../../types'

import { AntDesign } from '@expo/vector-icons'

interface CardProps {
    data: DestinationProps
}

export function Card({ data }: CardProps) {
    const [visible, setVisible] = useState(false)
    const [gambiarra, setGambiarra] = useState(false)
    const [margin, setMargin] = useState(20)
    const [marginDropdown, setMarginDropdown] = useState(0)
    const ref = useRef(new Animated.Value(0)).current

    const open = () => {
        setVisible(true)
        Animated.timing(ref, {
            toValue: 136 + 60,
            duration: 500,
            useNativeDriver: false,
        }).start()
        setTimeout(() => setGambiarra(true), 400)
        setMargin(0)
        setMarginDropdown(20)
    }

    const close = () => {
        Animated.timing(ref, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
        setGambiarra(false)
        setTimeout(() => {
            setVisible(false)
            setMargin(20)
            setMarginDropdown(0)
        }, 500)
    }

    return (
        <>
            <TouchableOpacity
                style={[styles.container, { marginBottom: margin }]}
                onPress={visible ? close : open}
                activeOpacity={0.8}
            >
                <Text style={styles.title}>{data.origem}</Text>
                <AntDesign name="arrowright" size={24} color={theme.colors.purbleblue} />
                <Text style={styles.title}>{data.destino}</Text>
                <Text style={styles.date}>{data.data}</Text>
            </TouchableOpacity>

            {visible && (
                <Animated.View
                    style={[
                        styles.dropdownContainer,
                        { height: ref, marginBottom: marginDropdown },
                    ]}
                >
                    {gambiarra && (
                        <View>
                            <View style={styles.line}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.label}>Origin:</Text>
                                    <Text style={styles.data}>{data.origem}</Text>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.label}>Destino:</Text>
                                    <Text style={styles.data}>{data.destino}</Text>
                                </View>
                            </View>

                            <View style={styles.line}>
                                <View style={{ flexDirection: 'column', marginRight: '17.5%' }}>
                                    <Text style={styles.label}>Distância:</Text>
                                    <Text style={styles.data}>{data.distancia}km</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </Animated.View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },

    title: {
        fontSize: 18,
        fontFamily: theme.fonts.bold,
        color: theme.colors.purbleblue,
        marginHorizontal: 5,
    },

    date: {
        fontSize: 13,
        fontFamily: theme.fonts.regular,
        color: theme.colors.purbleblue,
        marginHorizontal: 5,
    },

    dropdownContainer: {
        width: '100%',
        backgroundColor: '#2B2B2B',
        opacity: 0.85,
        marginTop: -10,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },

    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        marginVertical: '5%',
    },

    label: {
        fontSize: 30,
        fontFamily: theme.fonts.bold,
        color: theme.colors.purbleblue,
    },

    data: {
        fontSize: 28,
        fontFamily: theme.fonts.regular,
        color: theme.colors.purbleblue,
    },
})

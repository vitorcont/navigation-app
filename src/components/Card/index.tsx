import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import theme from '../../theme'

import { AntDesign } from '@expo/vector-icons'

interface CardProps {}

export function Card({}: CardProps) {
    const [visible, setVisible] = useState(false)
    const [gambiarra, setGambiarra] = useState(false)
    const ref = useRef(new Animated.Value(0)).current

    const open = () => {
        setVisible(true)
        Animated.timing(ref, {
            toValue: 136 + 60,
            duration: 500,
            useNativeDriver: false,
        }).start()
        setTimeout(() => setGambiarra(true), 400)
    }

    const close = () => {
        Animated.timing(ref, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
        setGambiarra(false)
        setTimeout(() => setVisible(false), 500)
    }

    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={visible ? close : open}
                activeOpacity={0.8}
            >
                <Text style={styles.title}>São Paulo</Text>
                <AntDesign name="arrowright" size={24} color={theme.colors.purple} />
                <Text style={styles.title}>São Paulo</Text>
                <Text style={styles.date}>03/12/21</Text>
            </TouchableOpacity>

            {visible && (
                <Animated.View style={[styles.dropdownContainer, { height: ref }]}>
                    {gambiarra && (
                        <View>
                            <View style={styles.line}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.label}>Tempo de Viagem:</Text>
                                    <Text style={styles.data}>3:00h</Text>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.label}>Consumo Médio:</Text>
                                    <Text style={styles.data}>R$ 10,00</Text>
                                </View>
                            </View>

                            <View style={styles.line}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.label}>Origin:</Text>
                                    <Text style={styles.data}>lorem</Text>
                                </View>

                                <View style={{ flexDirection: 'column', marginRight: '17.5%' }}>
                                    <Text style={styles.label}>Distância:</Text>
                                    <Text style={styles.data}>300km</Text>
                                </View>
                            </View>

                            <View style={styles.line}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.label}>Destino:</Text>
                                    <Text style={styles.data}>ipsum</Text>
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
        width: '85%',
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
        color: theme.colors.purple,
        marginHorizontal: 5,
    },

    date: {
        fontSize: 13,
        fontFamily: theme.fonts.regular,
        color: theme.colors.purple,
        marginHorizontal: 5,
    },

    dropdownContainer: {
        width: '85%',
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
        fontSize: 15,
        fontFamily: theme.fonts.bold,
        color: theme.colors.purple,
    },

    data: {
        fontSize: 14,
        fontFamily: theme.fonts.regular,
        color: theme.colors.purple,
    },
})

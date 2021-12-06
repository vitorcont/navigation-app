import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SvgProps } from 'react-native-svg'
import theme from '../../theme'
import Divider from '../../assets/divider.svg'
import { Entypo } from '@expo/vector-icons'
import navigationService from '../../services/navigation'

interface HeaderProps {
    backgroundColor?: string
    dividerColor?: string
    title?: string
    Icon: React.FC<SvgProps>
    back?: boolean
    isProfile?: boolean
}

export function Header({
    backgroundColor = theme.colors.primary.medium,
    dividerColor = theme.colors.white,
    title,
    Icon,
    back = false,
    isProfile = false,
}: HeaderProps) {
    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            {back && (
                <View style={{ alignSelf: 'flex-start', marginLeft: '7.5%' }}>
                    <TouchableOpacity onPress={navigationService.back}>
                        <Entypo name="chevron-left" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
            )}

            <Icon width={'80%'} height={'50%'} />
            {!isProfile && <Text style={styles.text}>{title}</Text>}
            <View style={{ position: 'absolute', bottom: 0 }}>
                <Divider fill={dividerColor} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 36,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
        marginBottom: 40,
    },
})

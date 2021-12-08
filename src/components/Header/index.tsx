import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SvgProps } from 'react-native-svg'
import theme from '../../theme'
import Divider from '../../assets/divider.svg'
import { Entypo } from '@expo/vector-icons'
import navigationService from '../../services/navigation'
import Window from '../../services/dimensions'

interface HeaderProps {
    backgroundColor?: string
    dividerColor?: string
    Icon: React.FC<SvgProps>
    isProfile?: boolean
    back?: boolean
    backColor?: boolean
}

export function Header({
    backgroundColor,
    dividerColor = theme.colors.white,
    Icon,
    isProfile = false,
    back = false,
    backColor = false,
}: HeaderProps) {
    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            {back && (
                <View
                    style={{
                        alignSelf: 'flex-start',
                        marginLeft: '7.5%',
                        marginBottom: '75%',
                    }}
                >
                    <TouchableOpacity onPress={navigationService.back}>
                        <Entypo name="chevron-left" size={24} color={backColor ? '#000' : '#FFF'} />
                    </TouchableOpacity>
                </View>
            )}

            {isProfile ? (
                <>
                    <Icon width={'80%'} height={'50%'} style={{ marginBottom: 30 }} />
                    <View style={{ position: 'absolute', bottom: 0 }}>
                        <Divider fill={dividerColor} />
                    </View>
                </>
            ) : (
                <View style={{ position: 'absolute', bottom: '-10%' }}>
                    <Icon width={Window.widthScale(1)} height={Window.heightScale(0.46)} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

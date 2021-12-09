import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ProfilePictureFemaleSvg from '../../assets/profilePictureFemale.svg'
import { Card } from '../../components/Card'
import { Header } from '../../components/Header'
import theme from '../../theme'

interface PersonalDataProps {}

const PersonalData = ({}: PersonalDataProps) => {
    return (
        <View style={styles.container}>
            <Header
                backgroundColor={theme.colors.white}
                dividerColor={theme.colors.purbleblue}
                Icon={ProfilePictureFemaleSvg}
                backColor
                back
                isProfile
            />

            <View style={styles.dataContainer}>
                <Text style={styles.textLogo}>Destinos</Text>

                <Card />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.purbleblue,
    },

    dataContainer: {
        width: '100%',
        height: '50%',
        marginTop: 5,
        alignItems: 'center',
    },

    textLogo: {
        fontSize: 36,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
        marginBottom: 30,
    },

    label: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.white,
        marginBottom: 4,
    },

    userDataText: {
        fontFamily: theme.fonts.regular,
        fontSize: 16,
        color: theme.colors.white,
    },

    button: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
})

export default PersonalData

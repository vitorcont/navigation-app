import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import ProfilePictureFemaleSvg from '../../assets/profilePictureFemale.svg'
import { Header } from '../../components/Header'
import theme from '../../theme'

const TermsOfService = () => {
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
                <Text style={styles.textLogo}>Termos e Serviços</Text>

                <ScrollView>
                    <Text style={styles.text}>Lorem ipsum</Text>
                </ScrollView>
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
        marginLeft: '7.5%',
    },

    textLogo: {
        fontSize: 36,
        width: '100%',
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
        marginBottom: 30,
        alignSelf: 'center',
    },

    text: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.white,
    },
})

export default TermsOfService

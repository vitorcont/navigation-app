import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ProfilePictureFemaleSvg from '../../assets/profilePictureFemale.svg'
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
            />

            <View style={styles.dataContainer}>
                <Text style={styles.textLogo}>Dados Pessoais</Text>

                <Text style={styles.label}>
                    Nome: <Text style={styles.userDataText}>Renato Santos</Text>
                </Text>
                <Text style={styles.label}>
                    Idade: <Text style={styles.userDataText}>20</Text>
                </Text>
                <Text style={styles.label}>
                    E-mail: <Text style={styles.userDataText}>renato@email.com</Text>
                </Text>
                <Text style={styles.label}>
                    Senha: <Text style={styles.userDataText}>*********</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.purbleblue,
        alignItems: 'center',
        justifyContent: 'center',
    },

    dataContainer: {
        position: 'absolute',
        top: '50%',
        width: '85%',
        height: '50%',
    },

    textLogo: {
        fontSize: 36,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
        marginBottom: 30,
        marginTop: -10,
        alignSelf: 'center',
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

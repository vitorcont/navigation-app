import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ProfilePictureMaleSvg from '../../assets/profilePictureMale.svg'
import ProfilePictureFemaleSvg from '../../assets/profilePictureFemale.svg'
import Button from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { ListDivider } from '../../components/ListDivider'
import theme from '../../theme'

const Profile = () => {
    return (
        <View style={styles.container}>
            <Header
                backgroundColor={theme.colors.white}
                dividerColor={theme.colors.purbleblue}
                Icon={ProfilePictureFemaleSvg}
                isProfile
            />

            <View style={styles.dataContainer}>
                <Text style={styles.textLogo}>Perfil</Text>

                <Text style={styles.title}>Dados pessoais</Text>
                <Text style={styles.subtitle}>Nome, Idade, E-mail e Senha</Text>
                <ListDivider />
                <Text style={styles.title}>Destinos</Text>
                <Text style={styles.subtitle}>Consulte os seus últimos destinos</Text>
                <ListDivider />
                <Text style={styles.title}>Termos e Serviços</Text>
                <Text style={styles.subtitle}>Privacidade de seus dados</Text>
                <ListDivider />
            </View>

            <View style={styles.button}>
                <Button label={'Sair'} color={theme.colors.darkpurpleblue} />
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
        position: 'absolute',
        top: '50%',
        width: '85%',
        height: '50%',
        alignItems: 'center',
    },

    textLogo: {
        fontSize: 36,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
        marginBottom: 30,
        marginTop: -10,
    },

    title: {
        color: theme.colors.white,
        fontFamily: theme.fonts.regular,
        fontSize: 14,
        alignSelf: 'flex-start',
    },

    subtitle: {
        color: theme.colors.white,
        fontFamily: theme.fonts.regular,
        fontSize: 11,
        alignSelf: 'flex-start',
        marginTop: 3,
    },

    button: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
})

export default Profile

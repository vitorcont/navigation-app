import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ProfilePictureMaleSvg from '../../assets/profilePictureMale.svg'
import GeladoSvg from '../../assets/gelado.svg'
import Button from '../../components/Button'
import { Header } from '../../components/Header'
import { ListDivider } from '../../components/ListDivider'
import theme from '../../theme'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import navigationService from '../../services/navigation'
import { useAuth } from '../../Hooks/auth'
import PlacesInput from '../../components/PlacesInput'

const Profile = () => {
    const { user, setUser, signOut } = useAuth()

    return (
        <View style={styles.container}>
            <Header
                backgroundColor={theme.colors.white}
                dividerColor={theme.colors.purbleblue}
                Icon={GeladoSvg}
                back
                backColor
                isProfile
            />


            <View style={styles.dataContainer}>
                <Text style={styles.textLogo}>Perfil</Text>

                <TouchableWithoutFeedback
                    onPress={() => navigationService.navigate('PersonalData')}
                >
                    <>
                        <Text style={styles.title}>Dados pessoais</Text>
                        <Text style={styles.subtitle}>Nome, Idade, E-mail e Senha</Text>
                    </>
                </TouchableWithoutFeedback>

                <ListDivider />

                <TouchableWithoutFeedback
                    onPress={() => navigationService.navigate('Destinations')}
                >
                    <>
                        <Text style={styles.title}>Destinos</Text>
                        <Text style={styles.subtitle}>Consulte os seus últimos destinos</Text>
                    </>
                </TouchableWithoutFeedback>

                <ListDivider />

                <TouchableWithoutFeedback
                    onPress={() => navigationService.navigate('TermsOfService')}
                >
                    <>
                        <Text style={styles.title}>Termos e Serviços</Text>
                        <Text style={styles.subtitle}>Privacidade de seus dados</Text>
                    </>
                </TouchableWithoutFeedback>

                <ListDivider />

                <View style={styles.button}>
                    <Button label={'Sair'} color={theme.colors.darkpurpleblue} onPress={signOut} />
                </View>
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
        width: '85%',
        height: '50%',
        marginTop: 5,
        marginLeft: '7.5%',
    },

    textLogo: {
        fontSize: 36,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
        marginBottom: 30,
        alignSelf: 'center',
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
        marginTop: 40,
        alignItems: 'center',
    },
})

export default Profile

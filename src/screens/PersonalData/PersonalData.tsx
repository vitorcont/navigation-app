import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import GeladoSvg from '../../assets/gelado.svg'
import { Header } from '../../components/Header'
import { useAuth } from '../../Hooks/auth'
import theme from '../../theme'

interface PersonalDataProps {}

const PersonalData = ({}: PersonalDataProps) => {
    const { user } = useAuth()
    const [mostrarSenha, setMostrarSenha] = useState(false)

    const hidePassword = () => {
        let string = ''
        for (let i = 0; i < user.password.length; i++) string += '*'
        return string
    }

    return (
        <View style={styles.container}>
            <Header
                backgroundColor={theme.colors.white}
                dividerColor={theme.colors.purbleblue}
                Icon={GeladoSvg}
                backColor
                back
                isProfile
            />

            <View style={styles.dataContainer}>
                <Text style={styles.textLogo}>Dados Pessoais</Text>

                <Text style={styles.label}>
                    Nome: <Text style={styles.userDataText}>{user.name}</Text>
                </Text>
                <Text style={styles.label}>
                    Idade: <Text style={styles.userDataText}>{user.age}</Text>
                </Text>
                <Text style={styles.label}>
                    E-mail: <Text style={styles.userDataText}>{user.email}</Text>
                </Text>
                <Text style={styles.label}>
                    Senha:{' '}
                    <Text style={styles.userDataText}>
                        {mostrarSenha ? user.password : hidePassword()}
                    </Text>
                </Text>
                <Text
                    style={[styles.label, { fontSize: 13 }]}
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                >
                    Mostrar Senha
                </Text>
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

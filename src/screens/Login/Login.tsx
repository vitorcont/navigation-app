import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

import Divider from '../../assets/divider.svg'
import Logo from '../../assets/logo.svg'
import Button from '../../components/Button'
import theme from '../../theme'

const Login = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Logo fill={'white'} width={'80%'} height={'50%'} />
                <Text style={styles.textLogo}>Navegation App</Text>
                <View style={{ position: 'absolute', bottom: 0 }}>
                    <Divider fill={'white'} />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor={theme.colors.input.gray}
                    placeholder="Email"
                    style={[styles.input, { marginBottom: 30 }]}
                ></TextInput>
                <TextInput
                    placeholderTextColor={theme.colors.input.gray}
                    placeholder="Senha"
                    secureTextEntry
                    style={styles.input}
                ></TextInput>
                <Text style={[styles.link, { alignSelf: 'flex-start', marginLeft: '7.5%' }]}>
                    Esqueceu a senha?
                </Text>
            </View>

            <View style={styles.button}>
                <Text style={styles.link}>Não tem conta? Clique aqui</Text>
                <Button label={'Entrar'} color={theme.colors.primary.lightest} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '50%',
        backgroundColor: theme.colors.primary.lightest,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textLogo: {
        fontSize: 36,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
        marginBottom: 40,
    },

    inputContainer: {
        position: 'absolute',
        top: '50%',
        width: '100%',
        height: '50%',
        alignItems: 'center',
        marginTop: 20,
    },

    input: {
        width: '85%',
        height: 55,
        backgroundColor: theme.colors.input.lightest_gray,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: theme.colors.input.light_gray,
        padding: 20,
    },

    link: {
        color: '#3692FE',
        marginVertical: 10,
    },

    button: {
        position: 'absolute',
        bottom: 60,
        alignItems: 'center',
    },
})

export default Login

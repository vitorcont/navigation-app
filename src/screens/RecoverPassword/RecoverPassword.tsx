import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'

import RecoverPasswordSvg from '../../assets/recoverPassword.svg'
import Button from '../../components/Button'
import { Input } from '../../components/Input'
import theme from '../../theme'
import { Header } from '../../components/Header'

const RecoverPassword = () => {
    const [email, setEmail] = useState('')

    return (
        <View style={styles.container}>
            <Header backgroundColor={theme.colors.purple} Icon={RecoverPasswordSvg} back />

            <KeyboardAvoidingView style={styles.inputContainer}>
                <Text style={{ width: '85%', marginTop: 30, marginBottom: 15 }}>
                    Digite um e-mail válido para enviarmos um link para recuperação de Senha
                </Text>
                <Input data={email} setData={setEmail} placeholder={'Email'} />
            </KeyboardAvoidingView>

            <View style={styles.button}>
                <Button label={'Enviar'} color={theme.colors.purple} />
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

    inputContainer: {
        position: 'absolute',
        top: '50%',
        width: '100%',
        height: '50%',
        alignItems: 'center',
        marginTop: -10,
    },

    button: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
})

export default RecoverPassword

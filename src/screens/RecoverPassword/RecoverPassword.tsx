import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

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

            <View style={styles.inputContainer}>
                <Text style={{ width: '85%', marginTop: 30, marginBottom: 15 }}>
                    Digite um e-mail válido para enviarmos um link para recuperação de Senha
                </Text>
                <Input data={email} setData={setEmail} placeholder={'Email'} />
            </View>

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
    },

    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },

    button: {
        alignItems: 'center',
        marginTop: 120,
    },
})

export default RecoverPassword

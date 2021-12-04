import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'

import CreateAccountSvg from '../../assets/createAccount.svg'
import Divider from '../../assets/divider.svg'
import Button from '../../components/Button'
import { Input } from '../../components/Input'
import theme from '../../theme'

const CreateAccount = () => {
    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <CreateAccountSvg width={'80%'} height={'50%'} />
                <Text style={styles.textLogo}>Criar Conta</Text>
                <View style={{ position: 'absolute', bottom: 0 }}>
                    <Divider fill={'white'} />
                </View>
            </View>

            <KeyboardAvoidingView style={styles.inputContainer}>
                <Input data={nome} setData={setNome} placeholder={'Nome'} />
                <Input data={idade} setData={setIdade} placeholder={'Idade'} />
                <Input data={email} setData={setEmail} placeholder={'Email'} />
                <Input data={senha} setData={setSenha} placeholder={'Senha'} isPassword />
            </KeyboardAvoidingView>

            <View style={styles.button}>
                <Button label={'Criar'} color={theme.colors.primary.light} />
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
        backgroundColor: theme.colors.primary.light,
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
        marginTop: -10,
    },

    button: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
})

export default CreateAccount

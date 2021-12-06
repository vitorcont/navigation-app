import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'

import CreateAccountSvg from '../../assets/createAccount.svg'
import Button from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import useForm from '../../Hooks/useForm'
import theme from '../../theme'

const CreateAccount = () => {
    const [form, onChange] = useForm({ nome: '', idade: '', email: '', senha: '' })

    return (
        <View style={styles.container}>
            <Header
                backgroundColor={theme.colors.primary.light}
                title={'Criar Conta'}
                Icon={CreateAccountSvg}
                back
            />

            <KeyboardAvoidingView style={styles.inputContainer}>
                <Input
                    data={form.nome}
                    setData={(value) => onChange('nome', value)}
                    placeholder={'Nome'}
                />
                <Input
                    data={form.idade}
                    setData={(value) => onChange('idade', value)}
                    placeholder={'Idade'}
                />
                <Input
                    data={form.email}
                    setData={(value) => onChange('email', value)}
                    placeholder={'Email'}
                />
                <Input
                    data={form.senha}
                    setData={(value) => onChange('senha', value)}
                    placeholder={'Senha'}
                    isPassword
                />
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

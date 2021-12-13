import React from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'

import CreateAccountSvg from '../../assets/createAccount.svg'
import Button from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { useAuth } from '../../Hooks/auth'
import useForm from '../../Hooks/useForm'
import navigationService from '../../services/navigation'
import theme from '../../theme'
import { UserProps } from '../../types'

export const ValidateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
}

export const ValidatePassword = (password: string) => {
    if (password.length < 8) return false

    return true
}

const CreateAccount = () => {
    const [form, onChange] = useForm({ nome: '', idade: '', email: '', senha: '' })
    const { loading, signUp } = useAuth()

    const handlePress = () => {
        if (ValidateEmail(form.email) && ValidatePassword(form.senha) && form.nome !== '') {
            const user: UserProps = {
                email: form.email,
                age: form.idade,
                name: form.nome,
                password: form.senha,
                auth: true,
                destinations: new Array(),
            }
            signUp(user)
            navigationService.navigate('Login')
        }
    }

    return (
        <View style={styles.container}>
            <Header backgroundColor={theme.colors.pink} Icon={CreateAccountSvg} back />

            <ScrollView style={styles.inputContainer}>
                <View style={{ alignItems: 'center' }}>
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
                </View>
                <View style={styles.button}>
                    {loading ? (
                        <ActivityIndicator color="black" />
                    ) : (
                        <Button
                            label={'Criar'}
                            color={theme.colors.pink}
                            onPress={() => handlePress()}
                        />
                    )}
                </View>
            </ScrollView>
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
        marginTop: 20,
    },

    button: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 50,
    },
})

export default CreateAccount

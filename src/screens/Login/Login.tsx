import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import Divider from '../../assets/divider.svg'
import LoginSvg from '../../assets/login.svg'
import Button from '../../components/Button'
import { Input } from '../../components/Input'
import theme from '../../theme'
import navigationService from '../../services/navigation'
import useForm from '../../Hooks/useForm'
import { Header } from '../../components/Header'
import { useAuth } from '../../Hooks/auth'
import { ValidateEmail, ValidatePassword } from '../CreateAccount/CreateAccount'

const Login = () => {
    const [form, onChange] = useForm({ email: '', senha: '' })
    const { loading, signIn } = useAuth()

    return (
        <View style={styles.container}>
            <Header backgroundColor={theme.colors.blue} Icon={LoginSvg} />

            <View style={styles.inputContainer}>
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
                <Text
                    onPress={() => navigationService.navigate('Recovery')}
                    style={[
                        styles.link,
                        { alignSelf: 'flex-start', marginVertical: -35, marginLeft: '7.5%' },
                    ]}
                >
                    Esqueceu a senha?
                </Text>

                <View style={styles.button}>
                    <Text onPress={() => navigationService.navigate('Create')} style={styles.link}>
                        Não tem conta? Clique aqui
                    </Text>

                    {loading ? (
                        <ActivityIndicator color="black" />
                    ) : (
                        <Button
                            label={'Entrar'}
                            color={theme.colors.blue}
                            onPress={() => {
                                if (ValidateEmail(form.email) && ValidatePassword(form.senha))
                                    signIn(form.email, form.senha)
                            }}
                        />
                    )}
                </View>
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

    link: {
        color: theme.colors.blue,
        marginVertical: 10,
    },

    button: {
        alignItems: 'center',
        width: '100%',
        marginTop: 120,
    },
})

export default Login

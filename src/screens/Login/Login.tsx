import React from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'

import Divider from '../../assets/divider.svg'
import LoginSvg from '../../assets/login.svg'
import Button from '../../components/Button'
import { Input } from '../../components/Input'
import theme from '../../theme'
import navigationService from '../../services/navigation'
import useForm from '../../Hooks/useForm'
import { Header } from '../../components/Header'

const Login = () => {
    const [form, onChange] = useForm({ email: '', senha: '' })

    return (
        <View style={styles.container}>
            <Header backgroundColor={theme.colors.blue} Icon={LoginSvg} isLogin />

            <KeyboardAvoidingView style={styles.inputContainer}>
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
            </KeyboardAvoidingView>

            <View style={styles.button}>
                <Text onPress={() => navigationService.navigate('Create')} style={styles.link}>
                    Não tem conta? Clique aqui
                </Text>
                <Button
                    onPress={() => navigationService.navigate('Content')}
                    label={'Entrar'}
                    color={theme.colors.blue}
                />
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
        marginTop: 20,
    },
    link: {
        color: theme.colors.blue,
        marginVertical: 10,
    },

    button: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
})

export default Login

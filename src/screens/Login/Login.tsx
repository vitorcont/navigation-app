import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

import Divider from '../../assets/divider.svg'

const Login = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text>Image</Text>
                <Text>Navegation App</Text>
                <View style={{ position: 'absolute', bottom: 0 }}>
                    <Divider fill={'white'} />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <TextInput placeholder="Email" style={styles.input}></TextInput>
                <TextInput placeholder="Senha" secureTextEntry style={styles.input}></TextInput>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '50%',
        backgroundColor: '#ff0000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputContainer: {
        position: 'absolute',
        top: '50%',
        width: '100%',
        height: '50%',
        backgroundColor: 'blue',
        alignItems: 'center',
    },

    input: {
        width: '85%',
        height: 50,
        backgroundColor: 'grey',
        padding: 20,
    },
})

export default Login

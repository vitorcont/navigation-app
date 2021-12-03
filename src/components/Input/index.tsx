import React, { useState } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import theme from '../../theme'

interface InputProps {
    data: string
    setData: (data: string) => void
    placeholder: string
    isPassword?: boolean
}

export function Input({ data, setData, placeholder, isPassword = false }: InputProps) {
    const [hidePassword, setHidePassword] = useState(true)

    return (
        <>
            <TextInput
                value={data}
                onChangeText={setData}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.input.gray}
                secureTextEntry={isPassword ? hidePassword : false}
                style={styles.input}
            ></TextInput>

            {isPassword ? (
                hidePassword ? (
                    <View style={styles.eye}>
                        <TouchableWithoutFeedback onPress={() => setHidePassword(!hidePassword)}>
                            <Ionicons name="eye" size={24} color="black" />
                        </TouchableWithoutFeedback>
                    </View>
                ) : (
                    <View style={styles.eye}>
                        <TouchableWithoutFeedback onPress={() => setHidePassword(!hidePassword)}>
                            <Ionicons name="eye-off" size={24} color="black" />
                        </TouchableWithoutFeedback>
                    </View>
                )
            ) : (
                []
            )}
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '85%',
        height: 55,
        backgroundColor: theme.colors.input.lightest_gray,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: theme.colors.input.light_gray,
        padding: 20,
        marginBottom: 20,
    },

    eye: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        marginRight: '10%',
        bottom: 60,
    },
})

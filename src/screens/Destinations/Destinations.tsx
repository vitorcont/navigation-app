import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import GeladoSvg from '../../assets/gelado.svg'
import { Card } from '../../components/Card'
import { Header } from '../../components/Header'
import { useAuth } from '../../Hooks/auth'
import theme from '../../theme'

const items = [
    {
        id: '1',
        data: '03/12/21',
        origem: 'Sao Paulo',
        destino: 'Sao Paulo',
        distancia: '300',
    },
    {
        id: '2',
        data: '03/12/21',
        origem: 'Sao Paulo',
        destino: 'Sao Paulo',
        distancia: '300',
    },
]

const Destinations = () => {
    const { user } = useAuth()

    return (
        <View style={styles.container}>
            <Header
                backgroundColor={theme.colors.white}
                dividerColor={theme.colors.purbleblue}
                Icon={GeladoSvg}
                backColor
                back
                isProfile
            />

            <View style={styles.dataContainer}>
                <Text style={styles.textLogo}>Destinos</Text>

                <FlatList
                    data={user.destinations}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    renderItem={({ item }) => <Card data={item} />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.purbleblue,
    },

    dataContainer: {
        width: '100%',
        height: '50%',
        marginTop: 5,
        alignItems: 'center',
    },

    textLogo: {
        fontSize: 36,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
        marginBottom: 30,
    },

    label: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.white,
        marginBottom: 4,
    },

    userDataText: {
        fontFamily: theme.fonts.regular,
        fontSize: 16,
        color: theme.colors.white,
    },

    button: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
})

export default Destinations

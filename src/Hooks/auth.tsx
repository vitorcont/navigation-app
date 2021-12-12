import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

import { AuthContextProps, UserProps } from '../types'

import firebase from 'firebase'
import 'firebase/firestore'

const AuthContext = createContext({} as AuthContextProps)

export const firebaseConfig = {
    apiKey: 'AIzaSyDI4QGBg3L_jgphtWRI5In-su4apCmp6jI',
    authDomain: 'navigation-app-e29c9.firebaseapp.com',
    projectId: 'navigation-app-e29c9',
    storageBucket: 'navigation-app-e29c9.appspot.com',
    messagingSenderId: '360073973838',
    appId: '1:360073973838:web:d0436d1a79c5d37fc0331f',
    measurementId: 'G-3TL9FX1XLT',
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

interface AuthProviderProps {
    children: ReactNode
}

export const UpdateUser = async (user: UserProps) => {
    let firebaseUser = firebase.auth().currentUser
    if (firebaseUser)
        await firebase
            .firestore()
            .collection('Usuários')
            .doc(firebaseUser.uid)
            .get()
            .then((doc) => {
                if (doc.exists && firebaseUser) {
                    firebase.firestore().collection('Usuários').doc(firebaseUser.uid).update(user)
                }
            })
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState({} as UserProps)
    const [loading, setLoading] = useState(false)

    const signIn = async (email: string, password: string) => {
        setLoading(true)
        await firebase
            .firestore()
            .collection('Usuários')
            .get()
            .then((snapshot) => {
                let itExists = false

                snapshot.forEach((doc) => {
                    let user = doc.data() as UserProps
                    if (user.email === email && user.password === password) {
                        user.auth = true
                        console.log(user)
                        UpdateUser(user)
                        setUser(user)
                        itExists = true
                    }
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const signUp = async (user: UserProps) => {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(() => {
                let firebaseUser = firebase.auth().currentUser
                if (firebaseUser)
                    firebase.firestore().collection('Usuários').doc(firebaseUser.uid).set(user)
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setLoading(false)
            })
    }

    const signOut = async () => {
        const updatedUser = {
            ...user,
            auth: false,
        }
        UpdateUser(updatedUser)
        setUser(updatedUser)
    }

    const loadUser = async () => {
        let firebaseUser = firebase.auth().currentUser
        if (firebaseUser)
            await firebase
                .firestore()
                .collection('Usuários')
                .doc(firebaseUser.uid)
                .get()
                .then((doc) => {
                    if (doc.exists) setUser(doc.data() as UserProps)
                })
    }

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}

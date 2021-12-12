export type UserProps = {
    name: string
    age: number
    email: string
    password: string
    avatar: string
    auth: boolean
}

export type AuthContextProps = {
    user: UserProps
    setUser: (user: UserProps) => void
    loading: boolean
    signIn: (email: string, password: string) => void
    signUp: (user: UserProps) => void
    signOut: () => void
}

export type DestinationProps = {
    id: string
    origem: string
    destino: string
    distancia: string
    data: string
}

export type UserProps = {
    name: string
    age: string
    email: string
    password: string
    auth: boolean
    destinations: DestinationProps[]
}


export type AuthContextProps = {
    user: UserProps
    setUser: (user: UserProps) => void
    loading: boolean
    signIn: (email: string, password: string) => void
    signUp: (user: UserProps) => void
    signOut: () => void
}

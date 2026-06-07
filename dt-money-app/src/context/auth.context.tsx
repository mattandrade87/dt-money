import { FormLoginParams } from '@/screens/Login/LoginForm'
import { FormRegisterParams } from '@/screens/Register/RegisterForm'
import { IUser } from '@/shared/interfaces/user.interface'
import * as AuthServices from '@/shared/services/dtMoney/auth.service'
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react'

type AuthContextType = {
  user: IUser | null
  token: string | null
  handleAuthenticate: (params: FormLoginParams) => Promise<void>
  handleRegister: (params: FormRegisterParams) => Promise<void>
  handleLogout: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const handleAuthenticate = async (userData: FormLoginParams) => {
    const { user, token } = await AuthServices.authenticate(userData)

    setUser(user)
    setToken(token)
  }

  const handleRegister = async (formData: FormRegisterParams) => {
    const { user, token } = await AuthServices.registerUser(formData)

    setUser(user)
    setToken(token)
  }

  const handleLogout = () => {}

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  return context
}

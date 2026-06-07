import { AppButton } from '@/components/AppButton'
import { AppInput } from '@/components/AppInput'
import { PublicStackParamsList } from '@/routes/PublicRoutes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

export interface FormRegisterParams {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterForm = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegisterParams>()

  return (
    <>
      <AppInput
        control={control}
        name="name"
        leftIconName="person"
        label="NOME"
        placeholder="Seu nome"
      />

      <AppInput
        control={control}
        name="email"
        leftIconName="mail-outline"
        label="E-MAIL"
        placeholder="mail@example.br"
      />

      <AppInput
        control={control}
        name="password"
        leftIconName="lock-outline"
        label="SENHA"
        placeholder="Sua senha"
        secureTextEntry
      />

      <AppInput
        control={control}
        name="confirmPassword"
        leftIconName="lock-outline"
        label="SENHA"
        placeholder="Confirme sua senha"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-8 min-h-[250px]">
        <AppButton iconName="arrow-forward">Cadastrar</AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Já possui uma conta?
          </Text>

          <AppButton
            mode="outline"
            onPress={() => navigation.navigate('Login')}
          >
            Acessar
          </AppButton>
        </View>
      </View>
    </>
  )
}

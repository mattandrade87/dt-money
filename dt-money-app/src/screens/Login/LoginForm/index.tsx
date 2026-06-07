import { AppButton } from '@/components/AppButton'
import { AppInput } from '@/components/AppInput'
import { Text, View } from 'react-native'
import { useForm } from 'react-hook-form'

export interface FormLoginParams {
  email: string
  password: string
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>()

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="E-MAIL"
        leftIconName="email"
        placeholder="mail@example.br"
      />

      <AppInput
        control={control}
        name="password"
        label="SENHA"
        leftIconName="lock-outline"
        placeholder="Sua senha"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-8 min-h-[250px]">
        <AppButton iconName="arrow-forward">Login</AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Ainda não possui uma conta?
          </Text>

          <AppButton mode="outline">Cadastrar</AppButton>
        </View>
      </View>
    </>
  )
}

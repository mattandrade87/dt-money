import { AppButton } from '@/components/AppButton'
import { SelectCategoryModal } from '@/components/SelectCategoryModal'
import { TransactionTypeSelector } from '@/components/TransactionTypeSelector'
import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import { colors } from '@/shared/colors'
import { CreateTransactionRequest } from '@/shared/interfaces/http/createTransactionRequest'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import * as yup from 'yup'

import { transactionSchema } from './schema'

type ValidationErrorsTypes = Record<keyof CreateTransactionRequest, string>

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext()

  const [transaction, setTransaction] = useState<CreateTransactionRequest>({
    description: '',
    typeId: 0,
    categoryId: 0,
    value: 0,
  })

  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsTypes>({} as ValidationErrorsTypes)

  const setTransactionData = (
    key: keyof CreateTransactionRequest,
    value: string | number
  ) => {
    setTransaction((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleCreateTransaction = async () => {
    try {
      await transactionSchema.validate(transaction, {
        abortEarly: false,
      })
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {} as ValidationErrorsTypes

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof CreateTransactionRequest] = err.message
          }
        })

        setValidationErrors(errors)
      }
    }
  }

  return (
    <View className="px-8">
      <View className="w-full flex-row items-center justify-between">
        <Text className="text-white text-xl font-bold">Nova transação</Text>

        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" color={colors.gray[700]} size={20} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 mt-8 mb-8">
        <TextInput
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(text) => setTransactionData('description', text)}
        />

        <CurrencyInput
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData('value', value ?? 0)}
        />

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) => setTransactionData('categoryId', categoryId)}
        />

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData('typeId', typeId)}
        />

        <View>
          <AppButton onPress={handleCreateTransaction}>Registrar</AppButton>
        </View>
      </View>
    </View>
  )
}

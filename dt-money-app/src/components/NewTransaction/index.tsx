import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import { colors } from '@/shared/colors'
import { CreateTransactionRequest } from '@/shared/interfaces/http/createTransactionRequest'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext()

  const [transaction, setTransaction] = useState<CreateTransactionRequest>({
    description: '',
    typeId: 0,
    categoryId: 0,
    value: 0,
  })

  return (
    <View className="px-8">
      <View className="w-full flex-row items-center justify-between">
        <Text className="text-white text-xl font-bold">Nova transação</Text>

        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" color={colors.gray[700]} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

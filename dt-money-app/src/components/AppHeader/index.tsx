import { NewTransaction } from '@/components/NewTransaction'
import { useAuthContext } from '@/context/auth.context'
import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import { colors } from '@/shared/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export const AppHeader = () => {
  const { handleLogout } = useAuthContext()
  const { openBottomSheet } = useBottomSheetContext()

  return (
    <View className="w-full p-8 bg-background-primary">
      <Image
        source={require('@/assets/dt-money-logo.png')}
        className="h-16 w-16 self-center"
      />

      <View className="flex-row justify-between items-center mt-6">
        <TouchableOpacity
          className="flex-row items-center gap-2"
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" color={colors.gray[700]} size={15} />

          <Text className="text-gray-700 text-base">Sair da conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-accent-brand w-[130px] items-center justify-center rounded-xl h-[50px]"
          onPress={() => openBottomSheet(<NewTransaction />, 0)}
        >
          <Text className="text-white font-bold text-sm">Nova transação</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

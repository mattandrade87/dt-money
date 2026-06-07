import { AppHeader } from '@/components/AppHeader'
import { ScrollView, Text, View } from 'react-native'

export const ListHeader = () => {
  return (
    <>
      <AppHeader />

      <View className="h-[150px] w-full">
        <View className="h-[50%] bg-background-primary" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute pl-6 h-[141px]"
        >
          <Text className="text-white">Card</Text>

          <Text className="text-white">Card</Text>

          <Text className="text-white">Card</Text>
        </ScrollView>
      </View>
    </>
  )
}

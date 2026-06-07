import { AppHeader } from '@/components/AppHeader'
import { TransactionTypes } from '@/shared/enums/transactionTypes'
import { ScrollView, View } from 'react-native'

import { TransactionCard } from './TransactionCard'

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
          <TransactionCard type={TransactionTypes.expense} amount={0} />

          <TransactionCard type={TransactionTypes.revenue} amount={0} />

          <TransactionCard type="total" amount={0} />
        </ScrollView>
      </View>
    </>
  )
}

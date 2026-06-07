import { useTransactionContext } from '@/context/transaction.context'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { useEffect } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ListHeader } from './ListHeader'
import { TransactionCard } from './TransactionCard'

export const Home = () => {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loading,
  } = useTransactionContext()

  const { errorHandler } = useErrorHandler()

  const handleFetchCategories = async () => {
    await fetchCategories()
  }

  const fetchInitialData = async () => {
    try {
      await Promise.all([handleFetchCategories(), fetchTransactions()])
    } catch (error) {
      errorHandler(error, 'Falha ao buscar dados iniciais')
    }
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        data={transactions}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        keyExtractor={(item) => `transaction-${item.id}`}
        ListHeaderComponent={ListHeader}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshTransactions} />
        }
      />
    </SafeAreaView>
  )
}

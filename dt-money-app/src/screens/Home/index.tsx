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
    loadMoreTransactions,
    loading,
  } = useTransactionContext()

  const { errorHandler } = useErrorHandler()

  const handleFetchCategories = async () => {
    await fetchCategories()
  }

  const handleFetchInitialTransactions = async () => {
    try {
      await fetchTransactions({
        page: 1,
      })
    } catch (error) {
      errorHandler(error, 'Falha ao buscar transações')
    }
  }

  const handleLoadMoreTransactions = async () => {
    try {
      await loadMoreTransactions()
    } catch (error) {
      errorHandler(error, 'Falha ao carregar novas transações')
    }
  }

  const handleRefreshTransactions = async () => {
    try {
      await refreshTransactions()
    } catch (error) {
      errorHandler(error, 'Falha ao recarregar as transações')
    }
  }

  const fetchInitialData = async () => {
    try {
      await Promise.all([
        handleFetchCategories(),
        handleFetchInitialTransactions(),
      ])
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
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefreshTransactions}
          />
        }
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  )
}

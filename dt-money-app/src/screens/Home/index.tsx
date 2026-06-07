import { AppHeader } from '@/components/AppHeader'
import { useTransactionContext } from '@/context/transaction.context'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Home = () => {
  const { fetchCategories } = useTransactionContext()
  const { errorHandler } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      await fetchCategories()
    } catch (error) {
      errorHandler(error, 'Falha ao buscar as categorias')
    }
  }

  useEffect(() => {
    handleFetchCategories()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
    </SafeAreaView>
  )
}

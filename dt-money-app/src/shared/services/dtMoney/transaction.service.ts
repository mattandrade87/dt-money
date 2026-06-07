import { dtMoneyApi } from '@/shared/api/dtmoney'
import { TransactionCategory } from '@/shared/interfaces/http/transaction-category-response'

export const getTransactionCategories = async (): Promise<
  TransactionCategory[]
> => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    '/transaction/categories'
  )

  return data
}

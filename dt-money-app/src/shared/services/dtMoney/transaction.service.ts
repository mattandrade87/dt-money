import { dtMoneyApi } from '@/shared/api/dtmoney'
import { CreateTransactionRequest } from '@/shared/interfaces/http/createTransactionRequest'
import { TransactionCategory } from '@/shared/interfaces/http/transaction-category-response'

export const getTransactionCategories = async (): Promise<
  TransactionCategory[]
> => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    '/transaction/categories'
  )

  return data
}

export const createTransaction = async (
  transaction: CreateTransactionRequest
): Promise<void> => {
  await dtMoneyApi.post('/transaction', transaction)
}

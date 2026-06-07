import { CreateTransactionRequest } from '@/shared/interfaces/http/createTransactionRequest'
import { TransactionCategory } from '@/shared/interfaces/http/transaction-category-response'
import { Transaction } from '@/shared/interfaces/transaction'
import * as TransactionService from '@/shared/services/dtMoney/transaction.service'
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

type TransactionContextType = {
  fetchCategories: () => Promise<void>
  fetchTransactions: () => Promise<void>
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>
  categories: TransactionCategory[]
  transactions: Transaction[]
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchCategories = async () => {
    const categoriesResponse =
      await TransactionService.getTransactionCategories()

    setCategories(categoriesResponse)
  }

  const fetchTransactions = useCallback(async () => {
    const transactionResponse = await TransactionService.getTransactions({
      page: 1,
      perPage: 10,
    })

    setTransactions(transactionResponse.data)
  }, [])

  const createTransaction = async (transaction: CreateTransactionRequest) => {
    await TransactionService.createTransaction(transaction)
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        transactions,
        fetchCategories,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)

  return context
}

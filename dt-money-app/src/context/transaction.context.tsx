import { TransactionCategory } from '@/shared/interfaces/http/transaction-category-response'
import * as TransactionService from '@/shared/services/dtMoney/transaction.service'
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react'

type TransactionContextType = {
  fetchCategories: () => Promise<void>
  categories: TransactionCategory[]
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([])

  const fetchCategories = async () => {
    const categoriesResponse =
      await TransactionService.getTransactionCategories()

    setCategories(categoriesResponse)
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
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

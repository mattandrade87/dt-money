import {
  CreateTransactionRequest,
  UpdateTransactionRequest,
} from '@/shared/interfaces/http/createTransactionRequest'
import { Pagination } from '@/shared/interfaces/http/get-transactions-request'
import { TransactionCategory } from '@/shared/interfaces/http/transaction-category-response'
import { TotalTransactions } from '@/shared/interfaces/total-transactions'
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

interface FetchTransactionsParams {
  page: number
}

type TransactionContextType = {
  fetchCategories: () => Promise<void>
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>
  refreshTransactions: () => Promise<void>
  loadMoreTransactions: () => Promise<void>
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>
  updateTransaction: (transaction: UpdateTransactionRequest) => Promise<void>
  categories: TransactionCategory[]
  transactions: Transaction[]
  totalTransactions: TotalTransactions
  loading: boolean
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>({
    expense: 0,
    revenue: 0,
    total: 0,
  })
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(false)

  const fetchCategories = async () => {
    const categoriesResponse =
      await TransactionService.getTransactionCategories()

    setCategories(categoriesResponse)
  }

  const fetchTransactions = useCallback(
    async ({ page }: FetchTransactionsParams) => {
      setLoading(true)

      const transactionResponse = await TransactionService.getTransactions({
        page,
        perPage: pagination.perPage,
      })

      if (page === 1) {
        setTransactions(transactionResponse.data)
      } else {
        setTransactions((prevState) => [
          ...prevState,
          ...transactionResponse.data,
        ])
      }

      setTotalTransactions(transactionResponse.totalTransactions)

      setPagination({
        ...pagination,
        page,
        totalRows: transactionResponse.totalRows,
        totalPages: transactionResponse.totalPages,
      })

      setLoading(false)
    },
    [pagination],
  )

  const refreshTransactions = async () => {
    const { page, perPage } = pagination

    setLoading(true)

    const transactionResponse = await TransactionService.getTransactions({
      page: 1,
      perPage: page * perPage,
    })

    setTransactions(transactionResponse.data)
    setTotalTransactions(transactionResponse.totalTransactions)

    setPagination({
      ...pagination,
      page,
      totalRows: transactionResponse.totalRows,
      totalPages: transactionResponse.totalPages,
    })

    setLoading(false)
  }

  const loadMoreTransactions = useCallback(async () => {
    if (loading || pagination.page >= pagination.totalPages) {
      return
    }

    await fetchTransactions({
      page: pagination.page + 1,
    })
  }, [loading, pagination, fetchTransactions])

  const createTransaction = async (transaction: CreateTransactionRequest) => {
    await TransactionService.createTransaction(transaction)

    await refreshTransactions()
  }

  const updateTransaction = async (transaction: UpdateTransactionRequest) => {
    await TransactionService.updateTransaction(transaction)

    await refreshTransactions()
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        transactions,
        totalTransactions,
        loading,
        fetchCategories,
        fetchTransactions,
        refreshTransactions,
        loadMoreTransactions,
        createTransaction,
        updateTransaction,
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

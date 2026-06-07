import { colors } from '@/shared/colors'
import { TransactionTypes } from '@/shared/enums/transactionTypes'
import { MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { View } from 'react-native'

type TransactionCardType = TransactionTypes | 'total'

interface TransactionCardProps {
  type: TransactionCardType
  amount: number
}

interface IconData {
  name: keyof typeof MaterialIcons.glyphMap
  color: string
}

const icons: Record<TransactionCardType, IconData> = {
  [TransactionTypes.revenue]: {
    name: 'arrow-circle-up',
    color: colors['accent-brand-light'],
  },
  [TransactionTypes.expense]: {
    name: 'arrow-circle-down',
    color: colors['accent-red'],
  },
  total: {
    name: 'attach-money',
    color: colors.white,
  },
}

export const TransactionCard: FC<TransactionCardProps> = ({ amount, type }) => {
  const iconData = icons[type]

  return (
    <View>
      <MaterialIcons name={iconData.name} color={iconData.color} size={26} />
    </View>
  )
}

import { colors } from '@/shared/colors'
import { TransactionTypes } from '@/shared/enums/transactionTypes'
import { MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { Text, View } from 'react-native'

type TransactionCardType = TransactionTypes | 'total'

interface TransactionCardProps {
  type: TransactionCardType
  amount: number
}

interface IconData {
  name: keyof typeof MaterialIcons.glyphMap
  color: string
}

interface CardData {
  label: string
  bgColor: string
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

const cardData: Record<TransactionCardType, CardData> = {
  [TransactionTypes.expense]: {
    label: 'Saída',
    bgColor: 'background-tertiary',
  },
  [TransactionTypes.revenue]: {
    label: 'Entrada',
    bgColor: 'background-tertiary',
  },
  total: {
    label: 'Total',
    bgColor: 'accent-brand-background-primary',
  },
}

export const TransactionCard: FC<TransactionCardProps> = ({ amount, type }) => {
  const iconData = icons[type]
  const data = cardData[type]

  return (
    <View
      className={`bg-${data.bgColor} min-w-[280px] rounded-6 px-8 py-6 justify-between mr-6`}
    >
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base">{data.label}</Text>

        <MaterialIcons name={iconData.name} color={iconData.color} size={26} />
      </View>

      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          R$ {amount.toFixed(2).replace('.', ',')}
        </Text>
      </View>
    </View>
  )
}

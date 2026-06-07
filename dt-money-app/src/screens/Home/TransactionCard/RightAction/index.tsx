import { colors } from '@/shared/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { DeleteModal } from './DeleteModal'

export const RightAction = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const showModal = () => {
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  return (
    <>
      <TouchableOpacity
        className="h-[140px] bg-accent-red-background-primary w-[80px] rounded-r-6 items-center justify-center"
        onPress={showModal}
      >
        <MaterialIcons name="delete-outline" color={colors.white} size={30} />
      </TouchableOpacity>

      <DeleteModal visible={modalVisible} hideModal={hideModal} />
    </>
  )
}

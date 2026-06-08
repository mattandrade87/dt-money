import { colors } from '@/shared/colors'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'

interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode, index: number) => void
  closeBottomSheet: () => void
}

export const BottomSheetContext = createContext({} as BottomSheetContextType)

export const BottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const [content, setContent] = useState<React.ReactNode | null>(null)
  const [openIndex, setOpenIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const snapPoints = ['70%', '90%']

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, index: number) => {
      setContent(newContent)
      setOpenIndex(index)
      setIsOpen(true)
    },
    []
  )

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsOpen(false)
      setContent(null)
    }
  }, [])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  )

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}

      {isOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          index={openIndex}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
          backgroundStyle={{
            backgroundColor: colors['background-secondary'],
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        >
          <BottomSheetScrollView>{content}</BottomSheetScrollView>
        </BottomSheet>
      )}
    </BottomSheetContext.Provider>
  )
}

export const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext)

  return context
}

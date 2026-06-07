import './src/styles/global.css'

import { SnackBar } from '@/components/SnackBar'
import { AuthContextProvider } from '@/context/auth.context'
import { BottomSheetProvider } from '@/context/bottom-sheet.context'
import { SnackbarContextProvider } from '@/context/snackbar.context'
import NavigationRoutes from '@/routes'

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <BottomSheetProvider>
          <NavigationRoutes />

          <SnackBar />
        </BottomSheetProvider>
      </AuthContextProvider>
    </SnackbarContextProvider>
  )
}

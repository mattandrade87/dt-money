import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ListHeader } from './ListHeader'

export const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      <FlatList
        data={[]}
        renderItem={() => <></>}
        ListHeaderComponent={ListHeader}
      />
    </SafeAreaView>
  )
}

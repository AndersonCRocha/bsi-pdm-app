import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import FeedItem from '../../components/FeedItem'
import staticFeed from '../../assets/data/feed.json'
import { PER_PAGE, sleep } from '../../utils/utils'
import { Loading } from './styles'

const Feed = () => {
  const [feed, setFeed] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsloading] = useState(false)

  useEffect(() => loadFeed(), [])

  const fetchFeed = async () => {
    const firstItem = page * PER_PAGE

    await sleep(1000)

    return staticFeed.filter(
      (_, index) => index >= firstItem && index < firstItem + PER_PAGE
    )
  }

  const loadFeed = useCallback(() => {
    // eslint-disable-next-line prettier/prettier
    ; (async () => {
      if (isLoading) return
      setIsloading(true)

      const actualFeed = await fetchFeed()

      setPage(page + 1)
      setFeed([...feed, ...actualFeed])
      setIsloading(false)
    })()
  }, [page, feed, isLoading])

  const reset = () => {
    setFeed([])
    setPage(0)
    loadFeed()
  }

  const renderFooter = () =>
    isLoading ? (
      <Loading>
        <ActivityIndicator color="black" />
      </Loading>
    ) : (
      <></>
    )

  return (
    <>
      <FlatList
        data={feed}
        numColumns={1}
        onEndReached={loadFeed}
        onEndReachedThreshold={0.1}
        keyExtractor={item => String(item._id)}
        renderItem={({ item }) => <FeedItem item={item} />}
        ListFooterComponent={renderFooter}
      />

      <TouchableOpacity onPress={reset} style={styles.btnReset}>
        <Text>Resetar</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  btnReset: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#CCC',
    fontSize: 16,
  },
})

export default Feed

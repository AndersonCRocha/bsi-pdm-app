import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import FeedItem from '../../components/FeedItem'
import staticFeed from '../../assets/data/feed.json'
import { PER_PAGE, sleep } from '../../utils/utils'
import { Loading } from './styles'

const INITIAL_PAGE = 0

const Feed = () => {
  const [feed, setFeed] = useState([])
  const [page, setPage] = useState(INITIAL_PAGE)
  const [isLoading, setIsloading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    loadFeed()

    return () => setFeed([])
  }, [])

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
      setIsRefreshing(false)
    })()
  }, [page, feed, isLoading])

  const refresh = () => {
    setIsRefreshing(true)
    setFeed([])
    setPage(INITIAL_PAGE)
    loadFeed()
  }

  const renderFooter = () =>
    isLoading && staticFeed.length !== feed.length ? (
      <Loading>
        <ActivityIndicator color="black" />
      </Loading>
    ) : (
      <></>
    )

  return (
    <FlatList
      data={feed}
      numColumns={2}
      onEndReached={loadFeed}
      onEndReachedThreshold={0.1}
      onRefresh={refresh}
      refreshing={isRefreshing}
      keyExtractor={item => String(item._id)}
      renderItem={({ item }) => <FeedItem item={item} />}
      ListFooterComponent={renderFooter}
    />
  )
}

export default Feed

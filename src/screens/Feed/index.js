import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'
import { Header } from 'react-native-elements'
import FeedItem from '../../components/FeedItem'
import staticFeed from '../../assets/data/feed.json'
import { PER_PAGE, sleep } from '../../utils/utils'
import { Loading } from './styles'
import SearchBar from '../../components/SearchBar'
import EmptyResult from '../../components/EmptyResult'
import { ThemeContext } from 'styled-components'

const INITIAL_PAGE = 0

const Feed = () => {
  const [feed, setFeed] = useState([])
  const [page, setPage] = useState(INITIAL_PAGE)
  const [inputSearchValue, setInputSearchValue] = useState('')
  const [isFilteredResults, setIsFilteredResults] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const theme = useContext(ThemeContext)

  useEffect(() => {
    loadFeed()

    return () => setFeed([])
  }, [])

  const fetchFeed = async () => {
    await sleep(500)
    if (inputSearchValue) {
      setIsFilteredResults(true)
      return staticFeed.filter(item =>
        item.product.name.toLowerCase().includes(inputSearchValue.toLowerCase())
      )
    }

    setIsFilteredResults(false)
    const firstItem = page * PER_PAGE
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

  const handleRefresh = () => {
    setIsRefreshing(true)
    setFeed([])
    setPage(INITIAL_PAGE)
    loadFeed()
  }

  const handleSearch = async () => {
    if (inputSearchValue === '') {
      handleRefresh()
      return
    }

    setIsRefreshing(true)
    const filteredFeed = await fetchFeed()
    setFeed([...filteredFeed])
    setIsRefreshing(false)
  }

  const renderEmptyComponent = () => <>{isFilteredResults && <EmptyResult />}</>

  const renderFooter = () =>
    isLoading && staticFeed.length !== feed.length ? (
      <Loading>
        <ActivityIndicator color="black" size={28} />
      </Loading>
    ) : (
      <></>
    )

  return (
    <>
      <Header
        leftComponent={<Icon name="menuunfold" size={28} />}
        centerComponent={
          <SearchBar
            handleChangeInputSearch={setInputSearchValue}
            onSearch={handleSearch}
          />
        }
        rightComponent={<Icon name="user" size={28} />}
        backgroundColor={theme.primaryColor}
      />

      <FlatList
        data={feed}
        numColumns={2}
        onEndReached={() => isFilteredResults || loadFeed()}
        onEndReachedThreshold={0.1}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        keyExtractor={item => String(item._id)}
        renderItem={({ item }) => <FeedItem item={item} />}
        style={{
          backgroundColor: theme.secondaryColor,
        }}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
      />
    </>
  )
}

export default Feed

import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Header } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'
import { ThemeContext } from 'styled-components'
import staticFeed from '../../assets/data/feed.json'
import EmptyResult from '../../components/EmptyResult'
import FeedItem from '../../components/FeedItem'
import SearchBar from '../../components/SearchBar'
import { PER_PAGE, sleep } from '../../utils/utils'
import { Loading } from './styles'

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

  const fetchFeed = async _page => {
    await sleep(500)
    if (inputSearchValue) {
      setIsFilteredResults(true)
      return staticFeed.filter(item =>
        item.product.name.toLowerCase().includes(inputSearchValue.toLowerCase())
      )
    }

    setIsFilteredResults(false)
    const firstItem = _page * PER_PAGE
    return staticFeed.filter(
      (_, index) => index >= firstItem && index < firstItem + PER_PAGE
    )
  }

  const loadFeed = async _isRefreshing => {
    if (
      isLoading ||
      (isFilteredResults && !_isRefreshing) ||
      (feed.length === staticFeed.length && !_isRefreshing)
    ) {
      return
    }
    setIsloading(true)

    if (_isRefreshing) {
      setFeed([])
      const actualFeed = await fetchFeed(INITIAL_PAGE)

      setPage(INITIAL_PAGE + 1)
      setFeed([...actualFeed])
    } else {
      const actualFeed = await fetchFeed(page)

      setPage(prevState => prevState + 1)
      setFeed(prevState => [...prevState, ...actualFeed])
    }
    setIsloading(false)
    setIsRefreshing(false)
  }

  const handleSearch = async () => {
    if (inputSearchValue === '') {
      loadFeed(true)
    } else {
      setIsRefreshing(true)
      const filteredFeed = await fetchFeed()
      setFeed([...filteredFeed])
      setIsRefreshing(false)
    }
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
        onEndReached={() => loadFeed(false)}
        onEndReachedThreshold={0.1}
        onRefresh={() => loadFeed(true)}
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

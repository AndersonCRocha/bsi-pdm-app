import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StatusBar, Text } from 'react-native'
import { Header } from 'react-native-elements'
import { DrawerLayout, FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'
import { ThemeContext } from 'styled-components'
import staticFeed from '../../assets/data/feed.json'
import EmptyResult from '../../components/EmptyResult'
import FeedItem from '../../components/FeedItem'
import Menu from '../../components/Menu'
import SearchBar from '../../components/SearchBar'
import { PER_PAGE, sleep } from '../../utils/utils'
import { Loading } from './styles'

const INITIAL_PAGE = 0

const Feed = () => {
  const [feed, setFeed] = useState([])
  const [page, setPage] = useState(INITIAL_PAGE)
  const [inputSearchValue, setInputSearchValue] = useState('')
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [isFilteredResults, setIsFilteredResults] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const menu = useRef(null)
  const userMenu = useRef(null)
  const theme = useContext(ThemeContext)

  useEffect(() => {
    loadFeed()
  }, [])

  useEffect(() => {
    loadFeed(true)
  }, [selectedCompany])

  const fetchFeed = async _page => {
    await sleep(500)
    if (selectedCompany) {
      setIsFilteredResults(true)
      return staticFeed.filter(item => item.company._id === selectedCompany)
    }

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
      setSelectedCompany(null)
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

  const renderEmptyComponent = () => (
    <>{isFilteredResults && !isRefreshing && !isLoading && <EmptyResult />}</>
  )

  const renderFooter = () =>
    isLoading && staticFeed.length !== feed.length ? (
      <Loading>
        <ActivityIndicator color="black" size={28} />
      </Loading>
    ) : (
      <></>
    )

  return (
    <DrawerLayout
      ref={menu}
      drawerPosition={DrawerLayout.positions.Left}
      drawerType="slide"
      drawerBackgroundColor="#ddd"
      renderNavigationView={() => (
        <Menu
          onPressItem={setSelectedCompany}
          closeDrawer={() => menu.current.closeDrawer()}
        />
      )}
    >
      <DrawerLayout
        ref={userMenu}
        drawerContainerStyle={{ height: 100 }}
        drawerPosition={DrawerLayout.positions.Right}
        drawerType="front"
        drawerBackgroundColor="#ddd"
        renderNavigationView={() => (
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              marginTop: 30,
              padding: 16,
            }}
          >
            Usuário: Anderson
          </Text>
        )}
      >
        <Header
          leftComponent={
            <Icon
              name="menuunfold"
              size={28}
              onPress={() => menu.current.openDrawer()}
            />
          }
          centerComponent={
            <SearchBar
              handleChangeInputSearch={setInputSearchValue}
              onSearch={handleSearch}
            />
          }
          rightComponent={
            <Icon
              name="user"
              size={28}
              onPress={() => userMenu.current.openDrawer()}
            />
          }
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
      </DrawerLayout>
    </DrawerLayout>
  )
}

export default Feed

import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'

import staticFeed from '../../assets/data/feed.json'
import FeedItemDetail from '../../components/FeedItemDetail'
import { ThemeContext } from 'styled-components'
import { PageTitle } from './styles'
import Share from '../../components/Share'

const Detail = () => {
  const navigation = useNavigation()
  const theme = useContext(ThemeContext)
  const { itemId } = navigation.state.params
  const [feedItem, setFeedItem] = useState(null)

  const fetchItem = () => {
    const item = staticFeed.find(item => item._id === itemId)
    setFeedItem(item)
  }

  useEffect(() => {
    fetchItem()

    return () => setFeedItem(null)
  }, [])

  return (
    <>
      {feedItem && (
        <>
          <Header
            leftComponent={
              <Icon
                name="arrowleft"
                size={28}
                onPress={() => navigation.goBack()}
              />
            }
            centerComponent={<PageTitle>Detalhes do produto</PageTitle>}
            rightComponent={<Share item={feedItem} />}
            backgroundColor={theme.primaryColor}
          />
          <FeedItemDetail item={feedItem} />
        </>
      )}
    </>
  )
}

export default Detail

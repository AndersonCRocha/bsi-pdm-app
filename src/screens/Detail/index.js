import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import staticFeed from '../../assets/data/feed.json'
import FeedItemDetail from '../../components/FeedItemDetail'

const Detail = () => {
  const { state } = useNavigation()
  const { itemId } = state.params
  const [feedItem, setFeedItem] = useState(null)

  const fetchItem = () => {
    const item = staticFeed.find(item => item._id === itemId)
    setFeedItem(item)
  }

  useEffect(() => {
    fetchItem()

    return () => setFeedItem(null)
  }, [])

  return <>{feedItem && <FeedItemDetail item={feedItem} />}</>
}

export default Detail

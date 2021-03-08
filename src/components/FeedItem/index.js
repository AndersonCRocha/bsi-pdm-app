import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Card, CardContent, CardImage } from 'react-native-cards'
import Icon from 'react-native-vector-icons/AntDesign'
import { formatCurrency } from '../../utils/utils'

import {
  Avatar,
  CompanyWrapper,
  ContentFooter,
  FeedItemWrapper,
  ItemDescription,
  ItemName,
  ItemPrice,
  Likes,
  LikesWrapper,
} from './styles'

import avatar from '../../assets/images/avatar.jpeg'
import produto from '../../assets/images/produto.jpeg'

const FeedItem = ({ item }) => {
  const price = `R$ ${formatCurrency(item.product.price)}`

  return (
    <FeedItemWrapper>
      <TouchableOpacity>
        <Card>
          <CardImage source={produto} />
          <CardContent>
            <CompanyWrapper>
              <Avatar source={avatar} />
              <Text>{item.company.name}</Text>
            </CompanyWrapper>

            <ItemName>{item.product.name}</ItemName>
            <ItemDescription>{item.product.description}</ItemDescription>

            <ContentFooter>
              <ItemPrice>{price}</ItemPrice>
              <LikesWrapper>
                <Icon name="heart" size={18} color="red" />
                <Likes>{item.likes}</Likes>
              </LikesWrapper>
            </ContentFooter>
          </CardContent>
        </Card>
      </TouchableOpacity>
    </FeedItemWrapper>
  )
}

export default FeedItem

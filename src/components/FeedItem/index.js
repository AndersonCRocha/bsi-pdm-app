import React from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Card, CardContent, CardImage } from 'react-native-cards'
import Icon from 'react-native-vector-icons/AntDesign'
import { cutText, formatCurrency } from '../../utils/utils'

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
import { useNavigation } from 'react-navigation-hooks'

const FeedItem = ({ item }) => {
  const navigation = useNavigation()
  const price = `R$ ${formatCurrency(item.product.price)}`

  return (
    <FeedItemWrapper>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { itemId: item._id })}
        style={{ flex: 1 }}
      >
        <Card>
          <CardImage source={produto} />
          <CardContent flex={1}>
            <CompanyWrapper>
              <Avatar source={avatar} />
              <Text>{item.company.name}</Text>
            </CompanyWrapper>

            <ItemName>{item.product.name}</ItemName>
            <ItemDescription>
              {cutText(item.product.description, 100)}
            </ItemDescription>

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

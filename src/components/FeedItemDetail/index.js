import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import CardView from 'react-native-cardview'
import {
  ContentFooter,
  ItemDescription,
  ItemName,
  ItemPrice,
  Likes,
  LikesWrapper,
} from '../FeedItem/styles'
import Icon from 'react-native-vector-icons/AntDesign'

import slide1 from '../../assets/images/slide1.jpeg'
import slide2 from '../../assets/images/slide2.jpeg'
import slide3 from '../../assets/images/slide3.jpeg'
import { formatCurrency } from '../../utils/utils'
import { ItemContainer } from './styles'

const FeedItemDetail = ({ item }) => {
  const price = formatCurrency(item.product.price)

  const renderSlides = () => (
    <SliderBox
      dotColor="#FFAD05"
      inactiveDotColor="#5995ED"
      resizeMethod={'resize'}
      resizeMode={'cover'}
      dotStyle={{
        width: 15,
        height: 15,
        borderRadius: 15,
        marginHorizontal: 5,
      }}
      images={[slide1, slide2, slide3]}
    />
  )

  return (
    <>
      {item && (
        <CardView cardElevation={2}>
          {renderSlides()}

          <ItemContainer>
            <ItemName>{item.product.name}</ItemName>
            <ItemDescription>{item.product.description}</ItemDescription>

            <ContentFooter>
              <ItemPrice>R$ {price}</ItemPrice>
              <LikesWrapper>
                <Icon name="heart" size={18} color="red" />
                <Likes>{item.likes}</Likes>
              </LikesWrapper>
            </ContentFooter>
          </ItemContainer>
        </CardView>
      )}
    </>
  )
}

export default FeedItemDetail

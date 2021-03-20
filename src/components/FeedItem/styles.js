import styled from 'styled-components/native'

export const FeedItemWrapper = styled.View`
  width: 50%;
  max-width: 50%;
  flex: 1;
`

export const CompanyWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Avatar = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 8px;
`

export const ItemName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

export const ItemDescription = styled.Text`
  font-size: 12px;
  margin-bottom: 8px;
`

export const ItemPrice = styled.Text`
  font-weight: bold;
  font-size: 16px;
`

export const LikesWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Likes = styled.Text`
  margin-left: 8px;
`

export const ContentFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

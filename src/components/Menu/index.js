import React from 'react'
import { Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, CompanyWrapper } from '../FeedItem/styles'
import { MenuItem, MenuWrapper } from './styles'

import companies from '../../assets/data/companies.json'
import avatar from '../../assets/images/avatar.jpeg'

const Menu = ({ onPressItem, closeDrawer }) => {
  return (
    <MenuWrapper>
      <ScrollView>
        {companies.map(company => (
          <TouchableOpacity
            key={company._id}
            onPress={() => {
              onPressItem(company._id)
              closeDrawer()
            }}
          >
            <MenuItem>
              <CompanyWrapper>
                <Avatar source={avatar} />
                <Text>{company.name}</Text>
              </CompanyWrapper>
            </MenuItem>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </MenuWrapper>
  )
}

export default Menu

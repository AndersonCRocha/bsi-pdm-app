import React from 'react'
import { StatusBar } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Feed from './src/screens/Feed'
import Detail from './src/screens/Detail'

const Navigator = createStackNavigator({
  Feed: { screen: Feed },
  Detail: { screen: Detail },
})

const Container = createAppContainer(Navigator)

const App = () => {
  return (
    <MenuProvider>
      <StatusBar barStyle="dark-content" />
      <Container />
    </MenuProvider>
  )
}

export default App

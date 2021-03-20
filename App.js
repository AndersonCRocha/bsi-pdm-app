import React from 'react'
import { StatusBar } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Feed from './src/screens/Feed'
import Detail from './src/screens/Detail'
import { ThemeProvider } from 'styled-components'

const Navigator = createStackNavigator(
  {
    Feed: { screen: Feed },
    Detail: { screen: Detail },
  },
  {
    headerMode: 'none',
  }
)

const Container = createAppContainer(Navigator)

const defaultTheme = {
  primaryColor: '#FD800F',
  secondaryColor: '#FAB276',
}

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <MenuProvider>
        <StatusBar barStyle="dark-content" />
        <Container />
      </MenuProvider>
    </ThemeProvider>
  )
}

export default App

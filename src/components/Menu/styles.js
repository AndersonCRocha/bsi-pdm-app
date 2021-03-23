import styled from 'styled-components/native'
import { StatusBar } from 'react-native'

export const MenuWrapper = styled.View`
  margin-top: ${StatusBar.currentHeight}px;
`

export const MenuItem = styled.View`
  padding: 8px;
  border-color: #cccccc;
  border-bottom-width: 1px;
`

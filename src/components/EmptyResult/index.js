import React, { useContext } from 'react'
import { EmptyResultWrapper, TextWrapper } from './styles'
import Icon from 'react-native-vector-icons/AntDesign'
import { ThemeContext } from 'styled-components'

const EmptyResult = () => {
  const theme = useContext(ThemeContext)

  return (
    <EmptyResultWrapper>
      <Icon name="exclamationcircle" size={80} color={theme.primaryColor} />
      <TextWrapper>
        Não foi encontrado nenhum resultado para a busca.
      </TextWrapper>
    </EmptyResultWrapper>
  )
}

export default EmptyResult

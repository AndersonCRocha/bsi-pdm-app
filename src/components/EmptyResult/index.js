import React, { useContext } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import Icon from 'react-native-vector-icons/AntDesign'
import { ThemeContext } from 'styled-components'
import {
  EmptyResultWrapper,
  GoToListButton,
  GoToListText,
  TextWrapper,
} from './styles'

const EmptyResult = () => {
  const theme = useContext(ThemeContext)
  const navigation = useNavigation()

  return (
    <EmptyResultWrapper>
      <Icon name="exclamationcircle" size={80} color={theme.primaryColor} />
      <TextWrapper>
        Não foi encontrado nenhum resultado para a busca.
      </TextWrapper>
      <GoToListButton
        onPress={() => navigation.navigate('Detail', { itemId: 1 })}
      >
        <Icon name="back" size={20} />
        <GoToListText>Voltar para listagem</GoToListText>
      </GoToListButton>
    </EmptyResultWrapper>
  )
}

export default EmptyResult

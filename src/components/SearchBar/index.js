import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { InputSearch, SearchBarWrapper } from './styles'

const SearchBar = ({ handleChangeInputSearch, onSearch }) => {
  return (
    <SearchBarWrapper>
      <InputSearch
        onChangeText={handleChangeInputSearch}
        placeholder="Buscar ..."
      />
      <Icon
        name="search1"
        size={20}
        style={{ position: 'absolute', right: 12 }}
        onPress={onSearch}
      />
    </SearchBarWrapper>
  )
}

export default SearchBar

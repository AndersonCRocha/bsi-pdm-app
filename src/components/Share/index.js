import React from 'react'
import { Share as ShareApi } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const Share = ({ item }) => {
  const message = `
    ${item.product.url}: ${item.product.url} \r\n
    Baixe agora o nosso app e fique por dentro de todos os produtos.
  `

  const handleSharePress = async () => {
    await ShareApi.share({
      title: item.product.name,
      message,
    })
  }

  return <Icon size={28} name="sharealt" onPress={handleSharePress} />
}

export default Share

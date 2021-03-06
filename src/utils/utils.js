export const PER_PAGE = 2

export const formatCurrency = number => number.toFixed(2)

export const cutText = (text, size) => `${text.substring(0, size)}...`

export const sleep = async time =>
  new Promise(resolve => setTimeout(resolve, time))

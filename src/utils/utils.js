export const PER_PAGE = 1

export const formatCurrency = number => number.toFixed(2)

export const sleep = async time =>
  new Promise(resolve => setTimeout(resolve, time))

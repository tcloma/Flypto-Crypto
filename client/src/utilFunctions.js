export const getImage = (name, symbol) => {
  const formatName = name?.toLowerCase().replace(' ', '-')
  const formatSymbol = symbol?.toLowerCase()
  return (`https://cryptologos.cc/logos/${formatName}-${formatSymbol}-logo.png?v=023`)
}

export const imageOnErrorHandler = (e) => {
  e.currentTarget.src = 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=023';
}

export const renderSuccessFetch = (status, error, renderFunction) => {
  switch (status) {
    case 'success':
      return renderFunction
    case 'loading':
      return <p> Loading... </p>
    case 'error':
      return <p> {error.message} </p>
    default:
      return null
  }
}

export const roundPrice = (value) => {
  if (value <= 2) {
    return Number.parseFloat(value).toFixed(5)
  }
  else if (value <= 100) {
    return Number.parseFloat(value).toFixed(2)
  }
  else {
    return Number.parseFloat(value).toFixed()
  }
}

export const twoDecimalPlaces = (number) => {
  return parseFloat(number).toFixed(2)
}
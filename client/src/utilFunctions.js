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
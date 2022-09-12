import { useQuery } from "react-query";
import Card from "./sub-components/Card";
import { getAllCoins } from "../coinApi";

const Homepage = () => {
  const { status, error, data: allCoins } = useQuery('coins', () => getAllCoins())
  console.log('Status', status)
  console.log('Data: ', allCoins)

  const renderCards = () => {
    return (
      allCoins.map((coin) => {
        return (
          <Card
            key={coin.id}
            name={coin.name}
            price={coin.priceUsd}
          />
        )
      })
    )
  }

  const renderContent = () => {
    switch (status){
      case 'success':
        return renderCards()
      case 'loading':
        return <p> Loading... </p>
      case 'error':
        return <p> {error.message} </p>
      default:
        return null
    }
  }

  return (
    <div className="App">
      <div className="card-container">
        {renderContent()}
      </div>
    </div>
  )
}
export default Homepage
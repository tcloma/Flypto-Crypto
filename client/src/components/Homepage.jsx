import { useQuery } from "react-query";
import Card from "./sub-components/Card";
import backgroundImage from '../assets/background.mp4'
import { getAllCoins } from "../coinApi";

const Homepage = ({setSelectedCoin}) => {
  const { status, error, data: allCoins } = useQuery('coins', () => getAllCoins())
  console.log('Status', status)
  console.log('Data: ', allCoins)

  const renderCards = () => {
    return (
      <div>
      <video className="home-video" muted autoPlay loop>
        <source src={backgroundImage} type="video/mp4"/>
      </video>
      <div className="overlay">
          <h1>Flypto</h1>
          <h5>Buy, sell, and exchange your cryptocurrency with no extra fees.</h5>
          <div className='button-home-div'>
            <button id='get-started' className='home-buttons'>Get Started</button>
          </div>
    </div>
      <div className='card-container'>
      {allCoins.map((coin) => {
        return (
          <Card
            setSelectedCoin={setSelectedCoin}
            key={coin.id}
            id={coin.id}
            name={coin.name}
            price={coin.priceUsd}
          />
        )
      })}
      </div>
      </div>
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
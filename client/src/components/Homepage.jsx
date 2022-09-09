import { useQuery } from "react-query";
import axios from "axios"
import Card from "./sub-components/Card";

const Homepage = () => {
  const { isLoading, data } = useQuery('crypto', () =>
    axios(`https://api.coincap.io/v2/assets`)
  );

  const coinData = isLoading ? null : data.data.data

  const renderCards = () => {
    return (
      coinData.map((coin) => {
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

  // console.log(error)
  // if (error) return <div className="app"><h1> Error: {error.message}</h1></div>;

  return (
    <div className="App">
      <div className="card-container">
        {isLoading ? <p> Loading ...</p> : renderCards()}
      </div>
    </div>
  )
}
export default Homepage
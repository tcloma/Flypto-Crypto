import { useNavigate } from "react-router-dom";
import { getImage, imageOnErrorHandler} from "../../utilFunctions";

export const decimalRound = (value) => {
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

const twoDecimalPlaces = (number) => {
  return parseFloat(number).toFixed(2)
}

const Card = ({ name, symbol, price, id, setSelectedCoin, change24Hr }) => {
  let navigate = useNavigate();

  // console.log(change24Hr)
  const getCoin = () => {
    setSelectedCoin(id)
    console.log(id)
    navigate('/trade')
  }

  const priceChangeColor = () => {
    if (change24Hr > 0) {
      return 'price-up'
    }
    else if (change24Hr < 0) {
      return 'price-down'
    }
  }

  return (
    <div className="card" onClick={getCoin}>
      <img className='card-coin-images' src={getImage(name, symbol)} onError={(e)=> imageOnErrorHandler(e)}/>
      <h3> {name} </h3>
      <p> ${decimalRound(price)} </p>
      {change24Hr !== undefined ?
        <p className={priceChangeColor()}>
          {change24Hr > 0 ? '▲' : '▼'}
          {change24Hr > 0 ? twoDecimalPlaces(change24Hr) : twoDecimalPlaces(change24Hr) * -1}%
        </p>
        : null}
    </div>
  )
}
export default Card;
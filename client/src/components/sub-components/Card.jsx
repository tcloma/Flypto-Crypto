import { useNavigate } from "react-router-dom";
import { getImage, roundPrice, twoDecimalPlaces, imageOnErrorHandler} from "../../utilFunctions";

const Card = ({ name, symbol, price, id, setSelectedCoin, change24Hr }) => {
  let navigate = useNavigate();

  const getCoin = () => {
    setSelectedCoin(id)
    console.log(id)
    navigate('/trade')
  }
  // console.log(change24Hr)

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
      <h6 className='card-symbol'>{symbol}</h6>
      <p> ${roundPrice(price)} </p>
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
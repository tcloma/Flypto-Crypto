import { useNavigate } from "react-router-dom";

export const decimalCheck = (value) => {
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

const Card = ({ name, price, id, setSelectedCoin, change24Hr }) => {
  let navigate = useNavigate();

  // console.log(change24Hr)
  const getCoin = () => {
    setSelectedCoin(id)
    console.log(id)
    navigate('/trade')
  } 

  return (
    <div className="card" onClick={getCoin}>
      <h3> {name} </h3>
      <p> ${decimalCheck(price)} </p>
      {change24Hr !== undefined ? <p> { parseFloat(change24Hr).toFixed(2) } % </p> : null }
    </div>
  )
}
export default Card;
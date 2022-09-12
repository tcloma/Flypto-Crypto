import { useNavigate } from "react-router-dom";


const Card = ({ name, price, id, setSelectedCoin }) => {
  let navigate = useNavigate();

  const getCoin = () => {
    setSelectedCoin(id)
    console.log(id)
    navigate('/trade')
  } 

  const decimalCheck = (value) => {
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

  return (
    <div className="card" onClick={getCoin}>
      <h3> {name} </h3>
      <p> ${decimalCheck(price)} </p>
    </div>
  )
}
export default Card;
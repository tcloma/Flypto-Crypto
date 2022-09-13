import '../styles/Crypto.scss'
import { getAllCoins } from '../coinApi'
import { decimalCheck } from './sub-components/Card'
import { useQuery } from 'react-query'
import Card from './sub-components/Card'
import { useState } from 'react'

const CryptoPage = ({ setSelectedCoin }) => {
  const { status, error, data: allCoins } = useQuery('all-coins', () => getAllCoins())

  const [winOrLose, setWinOrLose] = useState('win')

  const sortParams = (coin1, coin2) => {
    if (winOrLose === 'win') {
      return coin2.changePercent24Hr - coin1.changePercent24Hr
    } else if (winOrLose === 'lose') {
      return coin1.changePercent24Hr - coin2.changePercent24Hr
    }
  }

  const winnerLoserCoin = allCoins?.slice()?.sort((coin1, coin2) => {
    return (
      sortParams(coin1, coin2)
    )
  })

  const handleWinClick = () => {
    setWinOrLose('win')
  }

  const handleLoseClick = () => {
    setWinOrLose('lose')
  }


  // console.log('Growth Coins: ', highestGrowthCoins?.slice(0, 5))
  // console.log('Lowvalue Coins: ', lowestGrowthCoins?.slice(0, 5))
  // console.log('Fetch status: ', status)
  // console.log('Data: ', allCoins)

  return (
    <div className="crypto-page-container">
      <div className='fastest-growing'>
        <div className='growth-selector'>
          <button onClick={() => handleWinClick()}>Winners</button><button onClick={() => handleLoseClick()}>Losers</button>
        </div>
        <div className='fastest-growing-cards'>
          {winnerLoserCoin?.slice(0, 5)?.map(coin => {
            return (
              <Card
                setSelectedCoin={setSelectedCoin}
                id={coin.id}
                key={coin.id}
                name={coin.name}
                price={coin.priceUsd}
                change24Hr={coin.changePercent24Hr}
              />
            )
          })}
        </div>
        {/* <div className='fastest-growing-cards'>
          {lowestGrowthCoins?.slice(0, 5)?.map(coin => {
            return (
              <Card
                key={coin.id}
                name={coin.name}
                price={coin.priceUsd}
                change24Hr={coin.changePercent24Hr}
              />
            )
          })}
        </div> */}
      </div>
      <table className='coins-table'>
        <thead>
          <tr>
            <td> Logo </td>
            <td> Name </td>
            <td> Price </td>
          </tr>
        </thead>
        <tbody>
          {allCoins?.map(coin => {
            return (
              <tr key={coin.id}>
                <td> {coin.symbol} </td>
                <td> {coin.name} </td>
                <td> {decimalCheck(coin.priceUsd)} </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default CryptoPage
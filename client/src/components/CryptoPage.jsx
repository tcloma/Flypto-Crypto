import '../styles/Crypto.scss'
import { getAllCoins } from '../coinApi'
import { decimalRound } from './sub-components/Card'
import { useQuery } from 'react-query'
import Card from './sub-components/Card'
import { useState } from 'react'

const CryptoPage = ({ setSelectedCoin }) => {
  const { status, error, data: allCoins } = useQuery('all-coins', () => getAllCoins())

  const [bullOrBear, setBullOrBear] = useState('win')

  const sortParams = (coin1, coin2) => {
    if (bullOrBear === 'bull') {
      return coin2.changePercent24Hr - coin1.changePercent24Hr
    } else if (bullOrBear === 'bear') {
      return coin1.changePercent24Hr - coin2.changePercent24Hr
    }
  }

  const winnerLoserCoin = allCoins?.slice()?.sort((coin1, coin2) => {
    return (
      sortParams(coin1, coin2)
    )
  })

  // console.log('Growth Coins: ', highestGrowthCoins?.slice(0, 5))
  // console.log('Lowvalue Coins: ', lowestGrowthCoins?.slice(0, 5))
  // console.log('Fetch status: ', status)
  // console.log('Data: ', allCoins)

  return (
    <div className="crypto-page-container">
      <div className='fastest-growing'>
        <div className='growth-selector'>
          <button onClick={() => setBullOrBear('bull')}>Bull</button>
          <button onClick={() => setBullOrBear('bear')}>Bear</button>
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
                <td> {decimalRound(coin.priceUsd)} </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default CryptoPage
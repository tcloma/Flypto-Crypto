import '../styles/Crypto.scss'
import { getAllCoins } from '../coinApi'
import { decimalCheck } from './sub-components/Card'
import { useQuery } from 'react-query'
import Card from './sub-components/Card'

const CryptoPage = () => {
  const { status, error, data: allCoins } = useQuery('all-coins', () => getAllCoins())

  const highestGrowthCoins = allCoins?.slice()?.sort((coin1, coin2) => {
    return (
      coin2.changePercent24Hr - coin1.changePercent24Hr
    )
  })
  const lowestGrowthCoins = allCoins?.slice()?.sort((coin1, coin2) => {
    return (
      coin1.changePercent24Hr - coin2.changePercent24Hr
    )
  })

  console.log('Growth Coins: ', highestGrowthCoins?.slice(0, 5))
  console.log('Lowvalue Coins: ', lowestGrowthCoins?.slice(0, 5))
  console.log('Fetch status: ', status)
  // console.log('Data: ', allCoins)

  return (
    <div className="crypto-page-container">
      <h1> Crypto Page </h1>
      <div className='fastest-growing'>
        <p>Growth in 24h</p>
        <div className='fastest-growing-cards'>
          {highestGrowthCoins?.slice(0, 5)?.map(coin => {
            return (
              <Card
                key={coin.id}
                name={coin.name}
                price={coin.priceUsd}
                change24Hr={coin.changePercent24Hr}
              />
            )
          })}
        </div>
        <div className='fastest-growing-cards'>
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
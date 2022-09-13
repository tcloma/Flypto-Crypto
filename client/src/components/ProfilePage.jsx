import Card from './sub-components/Card'
import '../styles/Profile.scss'
import { useQuery } from 'react-query'
import { getAllCoins } from '../coinApi'
import { decimalRound } from './sub-components/Card'

const ProfilePage = ({ username = 'Olivia' }) => {

  const exampleData = [
    { name: 'bitcoin', price: 20000 },
    { name: 'ethereum', price: 5000 },
    { name: 'cardano', price: 300 },
    { name: 'doge-coin', price: 1 }
  ]

  const { status, error, data: allCoins } = useQuery('coins', () => getAllCoins())

  return (
    <div className="profile-container">
      <div className="portfolio-page">
        <h1> {username}'s Portfolio </h1>
        <div className='portfolio-graph'>
          <h3> Portfolio Graph </h3>
        </div>

        <div className='watchlist-container'>
          <h2> Tracked Coins: </h2>
          {allCoins?.slice(0, 5).map(coin => {
            return (
              <Card name={coin.name} price={coin.priceUsd} />
            )
          })}
        </div>
        <h2> Owned Coins: </h2>
        <table className='owned-coins-table'>
          <thead>
            <tr>
              <td> Coin </td>
              <td> Price </td>
              <td> 24hr diff </td>
            </tr>
          </thead>
          <tbody>
            {allCoins?.slice(7, 18)?.map(coin => {
              return (
                <tr>
                  <td>{coin.name}</td>
                  <td>{decimalRound(coin.priceUsd)}</td>
                  <td>{parseFloat(coin.changePercent24Hr).toFixed(2)}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default ProfilePage;
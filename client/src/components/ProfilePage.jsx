import Card from './sub-components/Card'
import React from 'react'
import '../styles/Profile.scss'
import { useQuery } from 'react-query'
import { getAllCoins } from '../apis/coinApi'
import { roundPrice } from '../utilFunctions'

const ProfilePage = ({ username }) => {
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
              <Card
                name={coin.name}
                symbol={coin.symbol}
                price={coin.priceUsd}
              />
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
                  <td>{roundPrice(coin.priceUsd)}</td>
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
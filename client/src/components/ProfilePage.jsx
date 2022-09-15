import Card from './sub-components/Card'
import React, { useState } from 'react'
import '../styles/Profile.scss'
import { useQuery } from 'react-query'
import { getAllCoins } from '../apis/coinApi'
import { roundPrice } from '../utilFunctions'
import Table from './sub-components/Table'
import { useEffect } from 'react'

const ProfilePage = ({ username, setSelectedCoin }) => {
  const { status, error, data: allCoins } = useQuery('coins', () => getAllCoins())
  const [gaining, setGaining] = useState(false)

  let totalChange = 200
  allCoins?.slice()?.forEach(coin => {
    totalChange = totalChange + parseFloat(coin.changePercent24Hr)
    // console.log(totalChange)
  })

  const gainCheck = () => {
    if (totalChange > 0) {
      setGaining(true)
    } else if (totalChange < 0) {
      setGaining(false)
    }
  }

  useEffect(() => {
    gainCheck()
  }, [])

  return (
    <div className="profile-container">
      <div className="portfolio-page">
        <h1> {username}'s Portfolio </h1>
        <div className='portfolio-graph'>
          <h3> Your portfolio is {gaining ? 'up' : 'down'}: </h3>
          <h1 className={gaining ? 'total-gaining' : 'total-losing'}>
            {totalChange < 0 ? totalChange?.toFixed(2) * -1 : totalChange?.toFixed(2)}%
          </h1>
        </div>

        <div className='watchlist-container'>
          <h2> Tracked Coins: </h2>
          {allCoins?.slice(0, 5).map(coin => {
            return (
              <Card
                key={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.priceUsd}
              />
            )
          })}
        </div>
        <div className='owned-coins-table'>
          <h2> Owned Coins: </h2>
          <Table
            allCoins={allCoins}
            setSelectedCoin={setSelectedCoin}
          />
        </div>
      </div>
    </div>
  )
}
export default ProfilePage;
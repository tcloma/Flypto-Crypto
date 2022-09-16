import Card from './sub-components/Card'
import React, { useState } from 'react'
import '../styles/Profile.scss'
import { useQuery } from 'react-query'
import { getAllCoins } from '../apis/coinApi'
import Table from './sub-components/Table'
import { useEffect } from 'react'

const ProfilePage = ({ user, setSelectedCoin }) => {
  const { status, error, data: allCoins } = useQuery('coins', () => getAllCoins())
  const [gaining, setGaining] = useState(false)
  const { name, email, funds } = user

  let totalChange = 0
  allCoins?.slice(0, 1)?.forEach(coin => {
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
        <div className='portfolio-header'>
          <div className='user-info'>
            <h1> {name}'s Portfolio </h1>
            <p> {email} </p>
            <p> <span className='money'>$</span>{funds}</p>
          </div>
          <div className='portfolio-graph'>
            <h3> Your portfolio is {gaining ? 'up' : 'down'}: </h3>
            <h2 className={gaining ? 'total-gaining' : 'total-losing'}>
              {gaining ? '▲' : '▼'}{totalChange < 0 ? totalChange?.toFixed(2) * -1 : totalChange?.toFixed(2)}%
            </h2>
          </div>
        </div>

        <div className='watchlist-container'>
          <h2> Tracked Coins: </h2>
          {allCoins?.slice(0, 5).map(coin => {
            return (
              <Card
                setSelectedCoin={setSelectedCoin}
                id={coin.id}
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
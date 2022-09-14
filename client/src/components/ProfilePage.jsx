import Card from './sub-components/Card'
import React from 'react'
import '../styles/Profile.scss'

const ProfilePage = () => {

  const exampleData = [
    {name: 'bitcoin', price: 20000},
    {name: 'ethereum', price: 5000},
    {name: 'cardano', price: 300},
    {name: 'doge-coin', price: 1}
  ]

  return (
    <div className="profile-container">
      <div className="portfolio-page">
        <h1> Username </h1>
        <div className='portfolio-graph'>
          <h3> Portfolio Graph </h3>
        </div>

        <div className='watchlist-container'>
          {exampleData.map(coin => {
            return(
              <Card name={coin.name} price={coin.price}/>
            )
          })}
        </div>

        <div style={{display: 'flex', justifyContent:'center'}}>
          <table className='owned-coins-list'>
            <thead>
              <tr>
                <td> Coin </td>
                <td> Price </td>
                <td> 24hr diff </td>
              </tr>
            </thead>
            <tbody>
              {exampleData.map(coin => {
                return(
                  <tr>
                    <td>{coin.name}</td>
                    <td>{coin.price}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default ProfilePage;
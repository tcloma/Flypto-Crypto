import '../styles/Crypto.scss'
import { getAllCoins } from '../apis/coinApi'
import { useQuery } from 'react-query'
import Card from './sub-components/Card'
import { useState } from 'react'
import Table from './sub-components/Table'

const CryptoPage = ({ setSelectedCoin }) => {
  // Data queries
  const { status, error, data: allCoins } = useQuery('all-coins', () => getAllCoins())

  // States
  const [bullOrBear, setBullOrBear] = useState('bull')
  const [coinFilter, setCoinFilter] = useState('')

  const bullOrBearSortParams = (coin1, coin2) => {
    if (bullOrBear === 'bull') {
      return coin2.changePercent24Hr - coin1.changePercent24Hr
    } else if (bullOrBear === 'bear') {
      return coin1.changePercent24Hr - coin2.changePercent24Hr
    }
  }

  const bullOrBearCoin = allCoins?.slice()?.sort((coin1, coin2) => {
    return (
      bullOrBearSortParams(coin1, coin2)
    )
  })

  const classNameLogic = (blbr) => {
    const classes = ['growth-selector-button', 'growth-selector-button-clicked']
    if (blbr === 'bl') {
      switch (bullOrBear) {
        case 'bull':
          return classes[0]
        case 'bear':
          return classes[1]
      }
    } else {
      switch (bullOrBear) {
        case 'bull':
          return classes[1]
        case 'bear':
          return classes[0]
      }
    }
  }



  return (
    <div className="crypto-page-container">
      <div className='fastest-growing'>
        <div className='growth-selector'>
          <button className={classNameLogic('bl')} onClick={() => setBullOrBear('bull')}>Bull</button>
          <button className={classNameLogic('br')} onClick={() => setBullOrBear('bear')}>Bear</button>
        </div>
        <div className='fastest-growing-cards'>
          {bullOrBearCoin?.slice(0, 5)?.map(coin => {
            return (
              <Card
                setSelectedCoin={setSelectedCoin}
                id={coin.id}
                key={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.priceUsd}
                change24Hr={coin.changePercent24Hr}
              />
            )
          })}
        </div>
      </div>
      <div className='coin-database'>
        <h1> Coin Database </h1>
        <input
          value={coinFilter}
          onChange={e => setCoinFilter(e.target.value)}
          type='text'
          className='coin-search'
          placeholder='Search for a coin..'
        />
        <Table
          allCoins={allCoins}
          coinFilter={coinFilter}
          setSelectedCoin={setSelectedCoin}
        />
      </ div>
    </div>
  )
}
export default CryptoPage
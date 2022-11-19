/* eslint-disable no-fallthrough */
import { useState } from "react"
import { getImage, imageOnErrorHandler, roundPrice, twoDecimalPlaces } from '../../utilFunctions'
import { useNavigate } from "react-router-dom"

const Table = ({ allCoins, coinFilter = false, setSelectedCoin, withQuantity = false }) => {
   // Sorting states
   const [sortParam, setSortParam] = useState('')
   const [nameSort, setNameSort] = useState(false)
   const [rankSort, setRankSort] = useState(false)
   const [priceSort, setPriceSort] = useState(false)
   const [changeSort, setChangeSort] = useState(false)
   const [quantitySort, setQuantitySort] = useState(false)

   // Constant variables
   const sortMethods = {
      none: { method: null },
      rankAscending: { method: (coin1, coin2) => coin1.rank - coin2.rank },
      rankDescending: { method: (coin1, coin2) => coin2.rank - coin1.rank },
      nameAscending: { method: (coin1, coin2) => coin1.name.localeCompare(coin2.name) },
      nameDescending: { method: (coin1, coin2) => coin2.name.localeCompare(coin1.name) },
      priceAscending: { method: (coin1, coin2) => coin1.priceUsd - coin2.priceUsd },
      priceDescending: { method: (coin1, coin2) => coin2.priceUsd - coin1.priceUsd },
      changeAscending: { method: (coin1, coin2) => coin1.changePercent24Hr - coin2.changePercent24Hr },
      changeDescending: { method: (coin1, coin2) => coin2.changePercent24Hr - coin1.changePercent24Hr },
      quantityAscending: { method: (coin1, coin2) => coin1.quantity - coin2.quantity },
      quantityDescending: { method: (coin1, coin2) => coin2.quantity - coin1.quantity }
   }

   const handleCoinSort = (param) => {
      switch (param) {
         case 'rank':
            if (rankSort === true) {
               return setSortParam('rankAscending')
            } else if (rankSort === false) {
               return setSortParam('rankDescending')
            }
         case 'name':
            if (nameSort === true) {
               return setSortParam('nameAscending')
            } else if (nameSort === false) {
               return setSortParam('nameDescending')
            }
         case 'price':
            if (priceSort === true) {
               return setSortParam('priceAscending')
            } else if (priceSort === false) {
               return setSortParam('priceDescending')
            }
         case 'change':
            if (changeSort === true) {
               return setSortParam('changeAscending')
            } else if (changeSort === false) {
               return setSortParam('changeDescending')
            }
         case 'quantity':
            if (quantitySort === true) {
               return setSortParam('quantityAscending')
            }
            else if (quantitySort === false) {
               return setSortParam('quantityDescending')
            }
         default:
            return null
      }
   }

   let filteredCoins
   if (coinFilter !== false) {
      filteredCoins = allCoins?.filter((coin => {
         return (
            coin?.name?.toLowerCase().includes(coinFilter?.toLowerCase()) || coin?.symbol?.toLowerCase().includes(coinFilter?.toLowerCase())
         )
      }))
   } else {
      filteredCoins = allCoins
   }

   const handleSortRank = () => {
      setRankSort(!rankSort)
      setNameSort(false)
      setPriceSort(false)
      setChangeSort(false)
      setQuantitySort(false)
      handleCoinSort('rank')
   }

   const handleSortName = () => {
      setNameSort(!nameSort)
      setRankSort(false)
      setPriceSort(false)
      setChangeSort(false)
      setQuantitySort(false)
      handleCoinSort('name')
   }

   const handleSortPrice = () => {
      setPriceSort(!priceSort)
      setNameSort(false)
      setRankSort(false)
      setChangeSort(false)
      setQuantitySort(false)
      handleCoinSort('price')
   }

   const handleSortChange = () => {
      setChangeSort(!changeSort)
      setNameSort(false)
      setRankSort(false)
      setPriceSort(false)
      setQuantitySort(false)
      handleCoinSort('change')
   }

   const handleSortQuantity = () => {
      setQuantitySort(!quantitySort)
      setNameSort(false)
      setRankSort(false)
      setPriceSort(false)
      setChangeSort(false)
      handleCoinSort('quantity')
   }

   const percentChangeClassNameLogic = (value) => {
      if (value > 0) {
         return 'change-positive'
      }
      else {
         return 'change-negative'
      }
   }

   let navigate = useNavigate();

   const getCoin = (id) => {
      setSelectedCoin(id)
      console.log(id)
      navigate('/trade')
   }

   return (
      <table className='coins-table'>
         <thead>
            <tr>
               <td><span onClick={() => { withQuantity ? handleSortQuantity() : handleSortRank() }}>{withQuantity ? <span>Qty</span> : <span>Rank</span>}<span className={rankSort ? 'up-arrow' : 'down-arrow'}>{rankSort ? '▲' : '▼'}</span> </span></td>
               <td><span onClick={() => handleSortName()}> Name <span className={nameSort ? 'up-arrow' : 'down-arrow'}>{nameSort ? '▲' : '▼'}</span> </span></td>
               <td><span onClick={() => handleSortPrice()}> Price <span className={priceSort ? 'up-arrow' : 'down-arrow'}>{priceSort ? '▲' : '▼'}</span></span></td>
               <td><span onClick={() => handleSortChange()}>24Hr Change <span className={changeSort ? 'up-arrow' : 'down-arrow'}>{changeSort ? '▲' : '▼'}</span> </span></td>

            </tr>
         </thead>
         <tbody>
            {filteredCoins?.sort(sortMethods[sortParam]?.method)?.map(coin => {
               return (
                  <tr key={coin.id} onClick={() => getCoin(coin.id)}>
                     <td className='image-row'>
                        {withQuantity ? <span> {coin.quantity}</span>
                           :
                           <img className='coin-images' src={getImage(coin.name, coin.symbol)} onError={(e) => imageOnErrorHandler(e)} alt='coin icon' />
                        }
                     </td>
                     <td>{`${coin.name} (${coin.symbol})`}</td>
                     <td> ${roundPrice(coin.priceUsd)}</td>
                     <td>
                        <span className={percentChangeClassNameLogic(coin.changePercent24Hr)}>
                           {coin.changePercent24Hr > 0 ? '+' : null}{twoDecimalPlaces(coin.changePercent24Hr)}%
                        </span>
                     </td>
                  </tr>
               )
            })}
         </tbody>
      </table>
   )
}
export default Table;
// Components and assets
import HomeImage from '../assets/art.webp'
import HomeVideo from '../assets/phone.mp4'
import Card from "./sub-components/Card";

// Dependencies
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { renderSuccessFetch } from '../utilFunctions'
import { getAllCoins } from "../apis/coinApi";

const Homepage = ({ setSelectedCoin }) => {
   const { status, error, data: allCoins } = useQuery('coins', () => getAllCoins())
   // console.log('Fetch Status: ', status)
   // console.log('Data: ', allCoins)

   const renderCards = () => {
      return (
         <>
            {allCoins?.slice(0, 5).map((coin) => {
               return (
                  <Card
                     setSelectedCoin={setSelectedCoin}
                     key={coin.id}
                     id={coin.id}
                     name={coin.name}
                     symbol={coin.symbol}
                     price={coin.priceUsd}
                  />
               )
            })}
         </>
      )
   }

   return (
      <div className="App">
         <div className="hero">
            <div className="hero-text">
               <h1>Flypto</h1>
               <h5>The future of money is here </h5>
               <h5> Start your crypto journey with flypto </h5>
            </div>
            <div className="hero-img">
               <img src={HomeImage} alt="crypto art" />
            </div>
         </div>
         <div className="card-container">
            {renderSuccessFetch(status, error, renderCards())}
         </div>
         <div className="get-started-main-container">
            <div className="home-get-started-container">
               <div className="get-started-1">
                  {/* <h1 className="get-started-head"> Buy  Sell  Exchange </h1> */}
                  <div className="buy-sell-exchange">
                     <div className="buy"> <h1> Buy </h1> </div>
                     <div className="sell"> <h1 style={{ color: '#0fff4f' }}> Sell </h1> </div>
                     <div className="exchange"> <h1> Exchange </h1></div>
                  </div>
                  <h4 className="get-started-text"> your cryptocurrency with <span style={{ color: '#58f582' }}>no extra fees</span></h4>
                  <Link to='/signup'>
                     <button className='get-started-button'>Get Started</button>
                  </Link>
               </div>
            </div>
         </div>
         <div className="home-reward-container">
            <div className="home-reward-1">
               <h1 className="reward-head"> Explore crypto like Bitcoin, Ethereum, and Dogecoin </h1>
               <h5> Simply and securely buy, sell, and manage hundreds of cryptocurrency </h5>
               <Link to='/crypto'>
                  <button className="reward-button"> See more assets </button>
               </Link>
            </div>
            <div className="home-reward-2" >
               <video className="home-video-reward" muted autoPlay loop>
                  <source src={HomeVideo} type='video/mp4' />
               </video>
            </div>
         </div>
      </div>
   )
}
export default Homepage
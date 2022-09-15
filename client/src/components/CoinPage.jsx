import { useState, React } from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
import moment from 'moment';
import { useQuery } from "react-query";
import { roundPrice } from '../utilFunctions'
import { getCoin, getAllCoins, getCoinGraphData } from '../apis/coinApi';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const CoinPage = ({ selectedCoin, user }) => {

  const [timePeriod, setTimePeriod] = useState('m1')
  const [transaction, setTransaction] = useState('buy')
  const [fromBTC, setFromBTC] = useState(true)
  const [cryptoAmount, setCryptoAmount] = useState(0)
  const [usdAmount, setUSDAmount] = useState(0)
  const [conversionCoin, setConversionCoin] = useState(false)
  const [conversionValue, setConversionValue] = useState(0)

  const { isLoading: coinLoading, data: specCoinData } = useQuery('coinData', () => getCoin(selectedCoin));
  const { isLoading: graphLoading, data: graphData, refetch } = useQuery(timePeriod, () => getCoinGraphData(selectedCoin, timePeriod));
  const { status, error, data: allCoins } = useQuery('all-coins', () => getAllCoins())

  const coinData = graphData

  const newData = coinData?.map((day) => {
    const newObj = {};
    let date;
    if (timePeriod === 'm1') {
      date = moment(day.date).format('h A');
    }
    if (timePeriod === 'h1') {
      date = moment(day.date).format('MMM DD');
    }
    if (timePeriod === 'd1') {
      date = moment(day.date).format('MMM DD, YYYY');
    }
    newObj['label'] = date
    newObj['value'] = day.priceUsd
    return newObj
  })

  const extraCoinInfoFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  }

  const dataSource = {
    chart: {
      bgAlpha: "100",
      showBorder: 1,
      borderThickness: 1.5,
      caption: `${specCoinData?.name}`,
      plotFillColor: '#459DBA',
      outCnvBaseFontColor: '#252525',
      baseFont: 'Gilroy',
      drawFullAreaBorder: true,
      showPlotBorder: true,
      plotBorderThickness: 3,
      setAdaptiveYMin: true,
      labelStep: 100,
      plotBorderColor: '#459DBA',
      bgColor: '#FFFFFF',
      subCaption: `(${specCoinData?.symbol})`,
      xAxisName: 'Day',
      yAxisName: 'Price ($USD)',
      numberPrefix: '$',
      theme: 'fusion'
    },
    annotations: {
      autoScale: '1',
      showBelow: '0',
      groups: [{
        id: 'price-displays',
        items: [{
          id: 'price-display',
          fillcolor: "#252525",
          fontsize: "26",
          type: "text",
          bold: 1,
          text: `$${roundPrice(specCoinData?.priceUsd)}`,
          x: "$canvasEndY-260",
          y: "$canvasEndY - 375",
        },
        {
          id: 'price-display',
          fillcolor: specCoinData?.changePercent24Hr > 0 ? "39FF14" : "#ff0000",
          fontsize: "12",
          italic: 1,
          type: "text",
          bold: 1,
          text: specCoinData?.changePercent24Hr > 0 ? `▲(${parseFloat(specCoinData?.changePercent24Hr).toFixed(2)}%)` : `▼(${parseFloat(specCoinData?.changePercent24Hr).toFixed(2)}%)`,
          x: "$canvasEndY-260",
          y: "$canvasEndY-355",
        }]

      }]

    },
    data: newData
  };

  const chartConfigs = {
    type: 'area2d',
    width: "900",
    height: "500",
    dataFormat: 'json',
    dataSource: dataSource
  };

  const selectTimePeriod = (e) => {
    setTimePeriod(e.target.value);
    refetch();
  }

  const selectConversionCoin = (e) => {
    setConversionCoin(JSON.parse(e.target.value))
  }

  const calculateConversionValue = (value) => {
    const selectedInUSD = specCoinData?.priceUsd * value
    const conversionCoinValue = selectedInUSD / conversionCoin.priceUsd
    setConversionValue(() => roundPrice(conversionCoinValue))
  }


  const handleChange = (e) => {
    if (transaction === 'buy' || transaction === 'sell') {
      if (fromBTC) {
        setCryptoAmount(e.target.value)
        handleConvertUSD(e.target.value)
      }
      else {
        setUSDAmount(e.target.value)
        handleConvertUSD(e.target.value)
      }
    }
    else {
      setCryptoAmount(e.target.value)
      calculateConversionValue(e.target.value)
    }

  }

  const handleConvertUSD = (value) => {
    if (fromBTC) {
      const convertedAmount = (value * specCoinData?.priceUsd)
      setUSDAmount(() => roundPrice(convertedAmount))
    }
    else {
      const convertedAmount = (value / specCoinData?.priceUsd)
      setCryptoAmount(() => roundPrice(convertedAmount))
    }
  }

  const handleSwap = (e) => {
    e.preventDefault()
    setFromBTC(!fromBTC)
  }

  //   const fundsData = {
  //     'funds': user.funds - usdAmount
  //   }

  const handleBuySubmit = (e) => {
    e.preventDefault()
    // if(usdAmount > user.funds)
    // {
    //     axios.patch('users', fundsData)
    // }
    // else
    // {
    //     console.log('Not enough money')
    // }

  }

  const renderTrade = () => {
    if (transaction === 'buy') {
      return (
        <>
          <form onSubmit={(e) => handleBuySubmit(e)} id='buy-input-form'>
            <div style={{ display: 'flex' }}>
              <div>
                <input onChange={(e) => handleChange(e)} type="text" id='amount-input-buy' name="amount" />
                <h2>{fromBTC ? specCoinData?.symbol : 'USD'}</h2>
              </div>
              <div style={{ display: 'flex', minWidth: '50%', justifyContent: 'center', alignItems: 'center' }}>
                <h2 id='result-amount'>{fromBTC ? `$${usdAmount}` : `${cryptoAmount} ${specCoinData.symbol}`}</h2>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <button onClick={(e) => handleSwap(e)} id='swap-button'>{fromBTC ? `USD-${specCoinData?.symbol}` : `${specCoinData?.symbol}-USD`}</button>
              <input className='buy-button' type="submit" value="Buy" />
            </div>
          </form>
        </>
      )
    }
    if (transaction === 'sell') {
      return (
        <>
          <form onSubmit={(e) => handleBuySubmit(e)} id='buy-input-form'>
            <h2 className=''>{`0 ${specCoinData?.symbol}`}</h2>
            <input onChange={(e) => handleChange(e)} type="text" id='amount-input-buy' name="amount" />
            <h2>{fromBTC ? specCoinData?.symbol : 'USD'}</h2>
            <button onClick={(e) => handleSwap(e)} id='swap-button'>{fromBTC ? `USD-${specCoinData?.symbol}` : `${specCoinData?.symbol}-USD`}</button>
            <input className='buy-button' type="submit" value="Sell" />
            <h2 id='result-amount'>{fromBTC ? `$${usdAmount}` : `${cryptoAmount} ${specCoinData.symbol}`}</h2>
          </form>
        </>
      )
    }
    if (transaction === 'convert')
      return (
        <>
          <form onSubmit={(e) => handleBuySubmit(e)} id='buy-input-form'>
            <h2 className=''>{`0 ${specCoinData?.symbol}`}</h2>
            <input onChange={(e) => handleChange(e)} type="text" id='amount-input-buy' name="amount" />
            <h2>{specCoinData?.symbol}</h2>
            {/* <button onClick={(e) => handleSwap(e)} id='swap-button'>{fromBTC ? `USD-${specCoinData?.symbol}`: `${specCoinData?.symbol}-USD`}</button> */}
            <input className='buy-button' type="submit" value="Convert" />
            <select onChange={(e) => selectConversionCoin(e)} name="conversion-choice" id="conversion-choice">
              {allCoins.map((coin) => {
                return (
                  <option value={JSON.stringify(coin)}>{coin.symbol}</option>
                )
              })}
            </select>
            <h2 id='result-amount'>{`${conversionValue} ${conversionCoin ? conversionCoin.symbol : ''}`}</h2>
          </form>
        </>
      )
  }

  return (
    <div className='full-page-container'>
      <div className='coin-chart-container'>
        <div className='coin-chart'>
          {graphLoading ? <p>Loading ...</p> : <ReactFC {...chartConfigs} />}
          <div className='time-choices'>

            <select onChange={selectTimePeriod} name="time-period" id="time-period">
              <option value="m1">Today</option>
              <option value="h1">This Month</option>
              <option value="d1">This Year</option>
            </select>
            <div className='coin-extra-info'>
              <div className='coin-extra-info-container'>
                <div className='coin-extra-info-element'>
                  <h4>Market Cap</h4>
                  <p>{`$${extraCoinInfoFormatter(specCoinData?.marketCapUsd)}`}</p>
                </div>
                <div className='coin-extra-info-element'>
                  <h4>Volume (24hr)</h4>
                  <p>{`$${extraCoinInfoFormatter(specCoinData?.volumeUsd24Hr)}`}</p>
                </div >
                <div className='coin-extra-info-element'>
                  <h4>Supply</h4>
                  <p>{`${extraCoinInfoFormatter(specCoinData?.supply)} ${specCoinData?.symbol}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='buy-sell-container'>
          <div className='info-container'>
            <h2>Trade</h2>
          </div>
          <div className='info-button-container'>
            <button onClick={() => { setConversionCoin(false); setTransaction('buy') }} className='info-buttons'>Buy</button>
            <button onClick={() => { setConversionCoin(false); setTransaction('sell') }} className='info-buttons'>Sell</button>
            <button onClick={() => { setConversionCoin(false); setTransaction('convert') }} className='info-buttons'>Convert</button>
          </div>
          <div className='trade-component'>
            {renderTrade()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinPage
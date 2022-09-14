import {useState, React} from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
import moment from 'moment';
import { useQuery } from "react-query";
import { decimalRound } from './sub-components/Card'
import { getCoin, getCoinGraphData } from '../coinApi';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const CoinPage = ({selectedCoin}) => {

  const [timePeriod, setTimePeriod] = useState('m1')
  const [transaction, setTransaction] = useState('buy')
  const [fromBTC, setFromBTC] = useState(true)
  const [cryptoAmount, setCryptoAmount] = useState(0)
  const [usdAmount, setUSDAmount] = useState(0)

  const { isLoading: coinLoading, data: specCoinData } = useQuery('coinData', () => getCoin(selectedCoin));
  const { isLoading: graphLoading, data: graphData, refetch} = useQuery(timePeriod, () => getCoinGraphData(selectedCoin, timePeriod));

  const coinData = graphData

  const newData = coinData?.map((day) => {
    const newObj = {};
    let date;
    if(timePeriod === 'm1')
    {
        date = moment(day.date).format('h A');
    }
    if(timePeriod === 'h1')
    {
        date = moment(day.date).format('MMM DD');
    }
    if(timePeriod === 'd1')
    {
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
      caption: `${specCoinData?.name}`,
      plotFillColor: '#2E5984',
      outCnvBaseFontColor: '#FFFFFF',
      baseFont: 'Gilroy',
      drawFullAreaBorder: true,
      showPlotBorder: true,
      plotBorderThickness: 3,
      setAdaptiveYMin: true,
      labelStep: 100,
      bgColor: '#222222',
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
                fillcolor: "#FFFFFF",
                fontsize: "26",
                type: "text",
                bold: 1,
                text: `$${decimalRound(specCoinData?.priceUsd)}`,
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
    width: "65%",
    height: "60%",
    dataFormat: 'json',
    dataSource: dataSource
  };

  const selectTimePeriod = (e) => {
    setTimePeriod(e.target.value);
    refetch();
  }

  const handleChange = (e) => {
    if(fromBTC) {
        setCryptoAmount(e.target.value)
        handleConvert(e.target.value)
    }
    else
    {
        setUSDAmount(e.target.value)
        handleConvert(e.target.value)
    }
  }

  const handleConvert = (value) => {
    if(fromBTC)
    {
        const convertedAmount = (value*specCoinData?.priceUsd)
        setUSDAmount(() => decimalRound(convertedAmount))
    }
    else
    {
        const convertedAmount = (value/specCoinData?.priceUsd)
        setCryptoAmount(() => decimalRound(convertedAmount))
    }
  }

  const handleSwap = (e) => {
    e.preventDefault()
    setFromBTC(!fromBTC)
  }

  const renderTrade = () => {
    if(transaction === 'buy')
    {
        return(
            <div className='buy-input-container'>
                <form id='buy-input-form'>
                <input onChange={(e) => handleChange(e)} type="text" id='amount-input-buy' name="amount" />
                <h2>{fromBTC ? specCoinData?.symbol : 'USD'}</h2>
                <button onClick={(e) => handleSwap(e)} id='swap-button'>{fromBTC ? `USD-${specCoinData?.symbol}`: `${specCoinData?.symbol}-USD`}</button>
                <input id='buy-button' type="submit" value="Buy"/>
                </form>
                <h2 id='result-amount'>{fromBTC ? `$${usdAmount}` : `${cryptoAmount} ${specCoinData.symbol}`}</h2>
            </div>
        )
        }
  }

  return (
    <div className='full-page-container'>
    <div className='coin-chart-container'>
      <div className='coin-chart'>
        {graphLoading ? <p>Loading ...</p> : <ReactFC {...chartConfigs} />}
        <div className='time-choices'>
    
        <select  onChange={selectTimePeriod} name="time-period" id="time-period">
            <option value="m1">Today</option>
            <option value="h1">This Month</option>
            <option value="d1">This Year</option>
        </select>
    </div>
      </div>
    <div className='buy-sell-container'>
        <div className='info-container'>
            <h2>Trade</h2>
        </div>
        <div className='info-button-container'>
            <button onClick={()=> setTransaction('buy')} className='info-buttons'>Buy</button>
            <button onClick={()=> setTransaction('sell')} className='info-buttons'>Sell</button>
            <button onClick={()=> setTransaction('convert')} className='info-buttons'>Convert</button>
        </div>
        <div className='trade-component'>
            {renderTrade()}
        </div>
    </div>
    </div>
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
  )
}

export default CoinPage
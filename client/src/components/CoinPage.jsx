import {useState, React} from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
import moment from 'moment';
import { useQuery } from "react-query";
import { getCoin, getCoinGraphData } from '../coinApi';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const CoinPage = ({selectedCoin}) => {

  const [timePeriod, setTimePeriod] = useState('m1')
  const [transaction, setTransaction] = useState('buy')

  const { isLoading: coinLoading, data: specCoinData } = useQuery('coinData', () => getCoin(selectedCoin));
  const { isLoading: graphLoading, data: graphData, refetch} = useQuery(timePeriod, () => getCoinGraphData(selectedCoin, timePeriod));

  const coinData = graphData

  const newData = coinData?.map((day) => {
    const newObj = {};
    let date;
    if(timePeriod === 'm1')
    {
        date = moment(day.date).format('LT');
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
      labelStep: 80,
      bgColor: '#222222',
      subCaption: `(${specCoinData?.symbol})`,
      xAxisName: 'Day',
      yAxisName: 'Price ($USD)',
      numberPrefix: '$',
      theme: 'fusion'
    },
    data: newData
  };

  const chartConfigs = {
    type: 'area2d',
    width: "70%",
    height: "60%",
    dataFormat: 'json',
    dataSource: dataSource
  };

  const selectTimePeriod = (e) => {
    setTimePeriod(e.target.value);
    refetch();
  }

  const renderTrade = () => {
    if(transaction === 'buy')
    {
        return(
            <div className='buy-input-container'>
                <form>
                <input type="text" id='amount-input-buy' name="amount" />
                <h2>{specCoinData?.symbol}</h2>
                <input id='buy-button' type="submit" value="Buy" />
                </form>
            </div>
        )
        }
  }

  return (
    <div>
    <div className='coin-chart-container'>
      <div className='coin-chart'>
        {graphLoading ? <p>Loading ...</p> : <ReactFC {...chartConfigs} />}
        <div className='time-choices'>
        {/* <label htmlFor="day">Today</label>
        <input onClick={()=> {setTimePeriod('m1'); refetch()}} type="radio" id="day" name="time-period-setter" value="day"/>
        <label htmlFor="month">This Month</label>
        <input onClick={()=> {setTimePeriod('h1'); refetch()}} type="radio" id="month" name="time-period-setter" value="month"/>
        <label htmlFor="year">This Year</label>
        <input onClick={()=> {setTimePeriod('d1'); refetch()}} type="radio" id="year" name="time-period-setter" value="year"/> */}
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
    </div>
    </div>
  )
}

export default CoinPage
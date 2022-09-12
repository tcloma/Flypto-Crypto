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

  const [timePeriod, setTimePeriod] = useState('d1')

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
    width: 1800,
    height: 500,
    dataFormat: 'json',
    dataSource: dataSource
  };

  return (
    <div className='coin-chart-container'>
      <div className='coin-chart'>
        {graphLoading ? <p>Loading ...</p> : <ReactFC {...chartConfigs} />}
      </div>
    <div className='time-choices'>
        <label htmlFor="day">Today</label>
        <input onClick={()=> {setTimePeriod('m1'); refetch()}} type="radio" id="day" name="time-period-setter" value="day"/>
        <label htmlFor="month">This Month</label>
        <input onClick={()=> {setTimePeriod('h1'); refetch()}} type="radio" id="month" name="time-period-setter" value="month"/>
        <label htmlFor="year">This Year</label>
        <input onClick={()=> {setTimePeriod('d1'); refetch()}} type="radio" id="year" name="time-period-setter" value="year"/>
    </div>
    </div>
  )
}

export default CoinPage
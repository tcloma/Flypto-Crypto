import React from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
import moment from 'moment';
import { useQuery } from "react-query";
import { getCoin, getCoinGraphData } from '../coinApi';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const CoinPage = () => {
  
  let selectedCoin = 'bitcoin'
  const { isLoading: coinLoading, data: specCoinData } = useQuery('coinData', () => getCoin(selectedCoin));
  const { isLoading: graphLoading, data: graphData } = useQuery('graph', () => getCoinGraphData(selectedCoin));


  const coinData = graphData

  const newData = coinData?.map((day) => {
    const newObj = {};
    const date = moment(day.date).format('DD MMM, YYYY');
    newObj['label'] = date
    newObj['value'] = day.priceUsd
    return newObj
  })

  const dataSource = {
    chart: {
      caption: `${specCoinData?.name}`,
      plotFillColor: '#2E5984',
      outCnvBaseFontColor: '#FFFFFF',
      drawFullAreaBorder: true,
      showPlotBorder: true,
      plotBorderThickness: 3,
      setAdaptiveYMin: true,
      labelStep: 50,
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
    width: 1400,
    height: 500,
    dataFormat: 'json',
    dataSource: dataSource
  };

  return (
    <div className='coin-chart-container'>
      <div className='coin-chart'>
        {graphLoading ? <p>Loading ...</p> : <ReactFC {...chartConfigs} />}
      </div>
    </div>
  )
}

export default CoinPage
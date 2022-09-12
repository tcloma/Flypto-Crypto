import React from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
import moment from 'moment';
import { useQuery } from "react-query";
import axios from "axios"

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const CoinPage = () => {
    const { isLoading, data } = useQuery('crypto', () =>
    axios(`https://api.coincap.io/v2/assets/solana/history?interval=d1`)
  );
  

  const coinData = isLoading ? null : data.data.data

  const newData = coinData?.map((day) => {
    const newObj = {};
    const date = moment(day.date).format('DD MMM, YYYY');
    newObj['label'] = date
    newObj['value'] = day.priceUsd
    return newObj
  })

  const dataSource = {
    chart: {
      caption: 'Bitcoin',
      baseFont: 'Gilroy',
      plotFillColor: '#2E5984',
      outCnvBaseFontColor: '#FFFFFF',
      drawFullAreaBorder: true,
      showPlotBorder: true,
      plotBorderThickness: 3,
      setAdaptiveYMin: true,
      labelStep: 50,
      bgColor: '#222222',
      subCaption: '(BTC)',
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

    return(
        <div>
            <ReactFC {...chartConfigs} />
        </div>
    )
}

export default CoinPage
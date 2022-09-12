import axios from "axios";

export const getAllCoins = async () => {
  const response = await axios.get(`https://api.coincap.io/v2/assets`)
  return response.data.data
}

export const getCoin = async (coin) => {
  const response = await axios.get(`https://api.coincap.io/v2/assets/${coin}`)
  return response.data.data
}

export const getCoinGraphData = async (coin) => {
  const response = await axios.get(`https://api.coincap.io/v2/assets/${coin}/history?interval=d1`)
  return response.data.data
}
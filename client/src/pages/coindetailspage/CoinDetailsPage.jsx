import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import HistoryChart from '../../component/historychart/HistoryChart';
import DetailCoinData from '../../component/detailcoindata/DetailCoinData';
import coinGecko from '../../api/coinGecko';

const CoinDetailsPage = () => {
    const {id} = useParams();
    const [coinData, setCoinData] = useState({}); //Set Coin Data
    const [isLoading, setIsLoading] = useState(false); //Display Loading during fetch

    const formatData = data => {
      return data.map(el => {
        return{
          t:el[0],
          y:el[1].toFixed(2)
        }
      })
    }

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const[ day, week, month, sixmon, year, details] = await Promise.all([
          coinGecko.get(`/coins/${id}/market_chart`, {
            params: {
              vs_currency:"usd",
              days: "1"
            }
          }),
          coinGecko.get(`/coins/${id}/market_chart`, {
            params: {
              vs_currency:"usd",
              days: "7"
            }
          }),
          coinGecko.get(`/coins/${id}/market_chart`, {
            params: {
              vs_currency:"usd",
              days: "30"
            }
          }),
          coinGecko.get(`/coins/${id}/market_chart`, {
            params: {
              vs_currency:"usd",
              days: "180"
            }
          }),
          coinGecko.get(`/coins/${id}/market_chart`, {
            params: {
              vs_currency:"usd",
              days: "365"
            }
          }),
          coinGecko.get("/coins/markets", {
            params:{
              vs_currency: "usd",
              ids: id
            }       
        })
        ])        
                     
        setCoinData(
          {day:formatData(day.data.prices), 
            week:formatData(week.data.prices), 
            month:formatData(month.data.prices), 
            sixmon:formatData(sixmon.data.prices), 
            year:formatData(year.data.prices), 
            details:details.data[0]});
        setIsLoading(false);
      };
      fetchData();
    }, []);

    //Component
    const renderData = () => { 
      if (isLoading) {
        return <>       
        <div className="d-flex align-items-center text-white">
        <strong>Loading...</strong>
       <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>    
        </>
      }
      return (
        <div className="coinlist">        
        <DetailCoinData data={coinData.details}/>
        <HistoryChart data={coinData}/>
      </div>
      )
    }

    return renderData();   
  }
  
  export default CoinDetailsPage;
  
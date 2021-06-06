import React, {useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import { historyOptions } from '../../chart/chartconfig';


const HistoryChart = ({data}) => {
    const chartRef = useRef()
    const {day, week, month, sixmon, year, details} = data;
    const [timeFormat, setTimeFormat] = useState("24h");

    const determineTimeFormat = () => {
            switch (timeFormat){
              case "24h" : return day;
              case "7d" : return week;
              case "1m" : return month;
              case "6m" : return sixmon;
              case "1y" : return year;
              default: return day;
            };
    }
        
    useEffect(() => {
      if(chartRef && chartRef.current && details){
        const chartInstance = new Chart(chartRef.current, {
          type: 'line',
          data: {              
              datasets: [{
                  label: `${details.name} Price`,
                  data: determineTimeFormat(),
                  backgroundColor: "rgba(20, 19, 97,0.5)",
                  borderColor: "rgba(10, 9, 61, 0.8)",
                  pointRadius: 0,
                  borderWidth: 1
              }]    
          },
          options: {
            ...historyOptions,}
      } )
      } //graph 
    });
    
    
    return (
        <div className="bg-white border mt-2 rounded p-3">
            <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>        
           </div>
           <div className="chart-button mt-1">
             <button onClick={() =>setTimeFormat("24h")} className="btn btn-outline-secondary btn btn-sm">24h</button>
             <button onClick={() =>setTimeFormat("7d")} className="btn btn-outline-secondary btn btn-sm mx-1">7d</button>
             <button onClick={() =>setTimeFormat("1m")} className="btn btn-outline-secondary btn btn-sm">1m</button>
             <button onClick={() =>setTimeFormat("6m")} className="btn btn-outline-secondary btn btn-sm mx-1">6m</button>
             <button onClick={() =>setTimeFormat("1y")} className="btn btn-outline-secondary btn btn-sm">1y</button>
           </div>
        </div>
        
      );
  };
  
  export default HistoryChart;
  
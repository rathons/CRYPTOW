import React from 'react';
import { Link } from 'react-router-dom';

const DetailCoinData = ({data}) => {
  const renderData = () => {
    if (data) {
      return (
        <div className="text-center">
          <Link to={"/"}><button className="btn btn-outline-primary">Back</button></Link>          
        <div className="bg-white mt-3 p-2 rounded border row">
          <div className="col-sm">
            <div className="d-flex flex-column">
              <span className="badge bg-success">Market Cap</span>
              <span className="fw-bold">{data.market_cap}</span>
            </div>
            <hr />
            <div className="d-flex flex-column">
              <span className="badge bg-primary">Total Supply</span>
              <span className="fw-bold">{data.total_supply}</span>
            </div>
          </div>

          <div className="col-sm">
            <div className="d-flex flex-column">
              <span className="badge bg-dark">Volume(24H)</span>
              <span className="fw-bold">{data.total_volume}</span>
            </div>
            <hr />
            <div className="d-flex flex-column">
              <span className="badge bg-danger">High(24h)</span>
              <span className="fw-bold">{data.high_24h}</span>
            </div>
          </div>

          <div className="col-sm">
            <div className="d-flex flex-column">
              <span className="badge bg-warning text-dark">Circulating Supply</span>
              <span className="fw-bold">{data.circulating_supply}</span>
            </div>
            <hr />
            <div className="d-flex flex-column">
              <span className="badge bg-info text-dark">Low(24h)</span>
              <span className="fw-bold">{data.low_24h}</span>
            </div>
          </div>
        </div>
        </div>
      );
    }
  };

  return <div>{renderData()}</div>;   
  }

  export default DetailCoinData;
  
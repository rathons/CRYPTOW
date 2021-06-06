import React from 'react';
import AddCoin from '../../component/addcoin/AddCoin';
import CoinList from '../../component/coinlist/CoinList';

const CoinSummaryPage = () => {
    return (
     <> <div className="shadow border p-2 rounded m1-2 bg-light container-md">
        <AddCoin /> 
        <CoinList /> 
      </div>
      <p className="fs-6 text-white fw-light text-end">*Click on the coin to view more info</p></>
    );
  }
  
  export default CoinSummaryPage;
  
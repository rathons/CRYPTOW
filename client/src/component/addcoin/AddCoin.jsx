import React, { useState, useContext } from 'react';
import { WatchListContext } from '../watchlist/watchList';

const AddCoin = () => {
  const [isActive, SetIsActive] = useState(false);
  const {addCoin} = useContext(WatchListContext);

  const availableCoins = ["bitcoin",
  "ethereum",
  "ripple",
  "tether",
  "bitcoin-cash",
  "litecoin",
  "eos",
  "okb",
  "tezos",
  "cardano"];

  const addingCoin = (coin) => {
    addCoin(coin);
    SetIsActive(false);
  }

    return (
      <div className="dropdown d-grid gap-2">
        <button onClick={() => SetIsActive(!isActive)} className="btn btn-success dropdown-toggle">Add Coin</button>
        <div className={isActive ? "dropdown-menu show" : "dropdown-menu"}>
            {
            availableCoins.map((el) => {
              return(<a onClick={() => addingCoin(el)} href="/#" className="dropdown-item">{el}</a>);
            })}
        </div>        
      </div>
    );
  }
  
  export default AddCoin;
  
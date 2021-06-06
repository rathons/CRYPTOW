import React from 'react';
import {Link} from 'react-router-dom';
import './Coin.css'

const Coin = ({coin, deleteCoin})  =>{
    return(
        <Link to={`/coins/${coin.id}`} className="text-decoration-none my-1 coin">
            <li className="coinlist-item list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark" title="Click to view detailed summary">
                <img className="coinlist-image" src={coin.image} alt="" />
                <span className="coin-price">${coin.current_price}</span>
                <span className={coin.price_change_percentage_24h < 0 ? "text-danger mr-2" : "text-success mr-2"}>
                    {coin.price_change_percentage_24h < 0 ? <i className="bi bi-arrow-down-square-fill align-middle mr-1 p-2"></i> : <i className="bi bi-arrow-up-square-fill align-middle mr-1 p-2"></i> }                    
                     {coin.price_change_percentage_24h}
                </span>
                <i onClick={(e) => {
                    e.preventDefault();
                    deleteCoin(coin.id)
                }} className="bi bi-trash-fill text-danger" title="Delete Coin"></i>
            </li>
        </Link>
    )
}

export default Coin;
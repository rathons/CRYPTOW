import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import CoinDetailsPage from '../../pages/coindetailspage/CoinDetailsPage';
import CoinSummaryPage from '../../pages/coinsummarypage/CoinSummaryPage';
import { WatchListContextProvider } from '../../component/watchlist/watchList';

const MainContainer = () => {
    return (
      <div className="container">
        <WatchListContextProvider>
          <BrowserRouter>
                <Route exact path="/" component={CoinSummaryPage} />
                <Route path="/coins/:id" component={CoinDetailsPage}/>
          </BrowserRouter>
                
        </WatchListContextProvider>
      </div>
    );
  }
export default MainContainer;




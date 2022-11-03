import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import StockItem from "../StockItem";
import './index.scss'

const LocalSavedStocks = JSON.parse(localStorage.getItem('SavedStocks'))
if (LocalSavedStocks === null){
    const emptyArray = JSON.stringify([])
    localStorage.setItem('SavedStocks', emptyArray)
}

const loadingStatusConstent = {
    loading: 'LOADING',
    success: 'SUCCESS',
    fail: 'FAIL'
}


const Stocks = () => {
    const  LocalstoreSavedStocks = JSON.parse(localStorage.getItem('SavedStocks'))
    const [searchInput, setSearchInput] = useState('')
    const [loadingStatus, setLoadingStatus] = useState('LOADING')
    const [stocks, setStocks] = useState([])
    const [index, setIndex] = useState(0)
    const [savedStocks, setSavedStocks] = useState(LocalstoreSavedStocks)

    let searchResults
    const  stocksCount = stocks.length
    let upperIndex
    let currentPageStocks
    let searchResultsCount = 0

    if (stocksCount !== 0){
        searchResults  = stocks.filter(eachStock => eachStock.name.toLowerCase().startsWith(searchInput.toLowerCase()))
        upperIndex = index + 5
        currentPageStocks = searchResults.slice(index, upperIndex)
        searchResultsCount = searchResults.length
    }
    

    const getStocksData = () =>{
        setLoadingStatus('LOADING')
        const url = "https://rest.coinapi.io/v1/exchanges"

        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CoinAPI-Key': '1AE8D7D3-9474-45EF-BC0A-0A018981B16A'
            }})
                .then((response) => response.json())
                .then((data) => {
                    setStocks(data)
                    setLoadingStatus('SUCCESS')
                })
                .catch(() => {
                    setLoadingStatus('FAIL')
                });
    }

    useEffect(()=>{
        getStocksData()
    }, [])

    const saveStock = (stock) => {
        const updatedSavedStocks = [...savedStocks, stock]
        localStorage.setItem('SavedStocks', JSON.stringify(updatedSavedStocks))
        setSavedStocks(updatedSavedStocks)
    }

    const increaceIndex = () => {
        if (index < stocksCount){
            setIndex(index + 5)
        }
    }

    const decraceIndex = () => {
        if (index !== 0){
            setIndex(index - 5)
        }
    }

    const renderFailView = () => (
        <div className="container">
            <h1 className="failed-h">Server Was Not Responding</h1>
            <p className="failed-p">Please Try Again</p>
            <button type="button" className="re-try-btn" onClick={() => {getStocksData()}}>Retry</button>
        </div>
    )

    const renderSuccessView = () => {
        return(
            <>
                <li className="stock-items-header"><p className="stock-items-heading company-name">Company Name</p><p className="stock-items-heading">SYMBOL</p><p className="stock-items-heading">MARKET CAP</p><div></div><p className="stock-items-heading">Current price</p></li>
                {currentPageStocks.map(eachStock => <StockItem stock={eachStock} key={eachStock['exchange_id']} saveStock={saveStock} />)}
            </>
            
        )
    }

    const renderLoadingView = () => (
        <div className="container">
            <h1 className="loading-txt">Please Wait Data Was LOADING...</h1>
        </div>
    )

    const renderStocks =()=>{
        switch (loadingStatus) {
            case loadingStatusConstent.loading:
                return renderLoadingView()
            case loadingStatusConstent.success:
                return renderSuccessView()
            case loadingStatusConstent.fail:
                return renderFailView()
            default:
                return null
        }
    }

    return(
        <ul className="stocks-container">
            <li className="stocks-header">
                 <h1 className="stocks-header-heading">Stock Details Table</h1>
                <div className="stocks-header-searchbar"><FiSearch className="search-icon" /><input type='search' placeholder="Search by Company Name" value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}} className="searchbar" /></div>
            </li>
            {renderStocks()}
            <li className="index-container"><p className="index">{`${index + 1} of ${index + 5} ${searchResultsCount}`}</p><div className="pages-controllers"><FaLessThan className="pagenation-icon" onClick={decraceIndex} /><FaGreaterThan  className="pagenation-icon" onClick={increaceIndex} /></div></li>
        </ul>
    )
}

export default Stocks
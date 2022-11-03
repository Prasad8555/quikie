import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import Navbar from '../Navbar' 
import MasterCards from '../MasterCards'
import SavedStockItem from '../SavedStockItem'
import './index.scss'

const  LocalSavedStocks = JSON.parse(localStorage.getItem('SavedStocks'))
if (LocalSavedStocks === null){
    console.log('pass', LocalSavedStocks)
    const emptyArray = JSON.stringify([])
    localStorage.setItem('SavedStocks', emptyArray)
}

const View = () => { 
    const locSavedStocks = JSON.parse(localStorage.getItem('SavedStocks'))

    const [savedStocks, setSavedStocks] = useState(locSavedStocks)
    const [index, setIndex] = useState(0)
    const savedStocksLen = savedStocks.length

    const  stocksCount = savedStocks.length
    let upperIndex
    let currentPageStocks

    if (stocksCount !== 0){
        upperIndex = index + 5
        currentPageStocks = savedStocks.slice(index, upperIndex)
    }

    const increaceIndex = () => {
        if (index + 5 < stocksCount){
            setIndex(index + 5)
        }
    }

    const decraceIndex = () => {
        if (index !== 0){
            setIndex(index - 5)
        }
    }

    const deleteStock = (id) => {
        const updatedSavedStocks = savedStocks.filter(eachStcok => eachStcok['exchange_id'] !== id)
        localStorage.setItem('SavedStocks', JSON.stringify(updatedSavedStocks))
        setSavedStocks(updatedSavedStocks)
    }

    return(
        <div className='view-container'>
            <Navbar/>
            <div className='master-cards-container'>
                <MasterCards />
            </div>
            
            {savedStocksLen === 0 ? <div className='no-stocks'><h1 className='no-stocks-h'>No Saved Stocks</h1></div>: (
                <ul className='stocks-container'>
                    <li className="stocks-header">
                        <h1 className="stocks-header-heading">Saved Stock Details Table</h1>
                    </li>
                    <li className="stock-items-header"><p className="stock-items-heading company-name">Company Name</p><p className="stock-items-heading">SYMBOL</p><p className="stock-items-heading">MARKET CAP</p><div></div><p className="stock-items-heading">Current price</p></li>
                    {currentPageStocks.map(eachStock => <SavedStockItem stock={eachStock} key={eachStock['exchange_id']} deleteStock={deleteStock} />)}
                    <li className="index-container"><p className="index">{`${index + 1} of ${index + 5} ${stocksCount}`}</p><div className="pages-controllers"><FaLessThan className="pagenation-icon" onClick={decraceIndex} /><FaGreaterThan  className="pagenation-icon" onClick={increaceIndex} /></div></li>
                </ul>
            )}
            <Link to='/'><button type='button' className='back-btn'>Back</button></Link>
        </div>
    )
}

export default View
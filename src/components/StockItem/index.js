import { Link } from 'react-router-dom'
import './index.scss'

const StockItem = ({stock, saveStock}) => {
    const {exchange_id, name, volume_1hrs_usd, volume_1mth_usd} = stock
    const cap = Math.round((volume_1mth_usd / 82) / 1000)
    const price = Math.round((volume_1hrs_usd / 82) / 10000)
    const savedStocks = JSON.parse(localStorage.getItem('SavedStocks'))
    const stockinLocalStorage = savedStocks.filter(eachStock => eachStock['exchange_id'] === exchange_id)
    const isSaved = stockinLocalStorage.length !== 0

    const onClickSave = () => {
        saveStock(stock)
    }
    
    return(
        <li className="stock-item">
            <p className="stock-item-name">{name}</p>
            <div><button type='button' className="stock-symbol">&#8226; {exchange_id}</button></div>
            <p className="stock-cap">${cap}K</p>
            {isSaved ? <Link to="/view" className='link'><button className='save-btn' style={{backgroundColor: '#6300ba', color:'#fff'}} type="button">VIEW</button></Link> : <button className='save-btn' style={{backgroundColor: '#03adfc', color: '#fff'}} onClick={onClickSave} type="button">Save Data</button> }
            <div className="stock-price-container">
                <p className="stock-price">${price}</p>
                <p>USD</p>
            </div>
        </li>
    )
}

export default StockItem
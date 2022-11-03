import './index.scss'

const SavedStockItem = ({stock, deleteStock }) => {
    const {exchange_id, name, volume_1hrs_usd, volume_1mth_usd} = stock
    const cap = Math.round((volume_1mth_usd / 82) / 1000)
    const price = Math.round((volume_1hrs_usd / 82) / 10000)

    const onClickDelete = () => {
        deleteStock(exchange_id)
    }
    
    return(
        <li className="stock-item">
            <p className="stock-item-name">{name}</p>
            <div><button type='button' className="stock-symbol">&#8226; {exchange_id}</button></div>
            <p className="stock-cap">${cap}K</p>
            <button type="button" className='dlete-btn' onClick={onClickDelete}>Delete</button>
            <div className="stock-price-container">
                <p className="stock-price">${price}</p>
                <p>USD</p>
            </div>
        </li>
    )
}

export default SavedStockItem
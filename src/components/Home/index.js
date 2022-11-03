import Navbar from "../Navbar"
import MasterCards from "../MasterCards"
import Stocks from "../Stocks"
import './index.scss'

const Home = () => {
    return(
        <div className="home-container">
            <Navbar />
            <div className="master-cards-container">
                <MasterCards />
            </div>
            <div>
                <Stocks />
            </div>
        </div>
    )
}

export default Home
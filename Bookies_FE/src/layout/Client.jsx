import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ProfileContext} from '../context/userContext.jsx'
import { useContext, useState } from 'react';
import Header from '../components/organisms/Header.jsx';
import Footer from '../components/organisms/Footer.jsx';
import Home from '../pages/Client/Home.jsx';
import Explore from '../pages/Client/Explore.jsx'
import Sidebar from '../components/organisms/Sidebar.jsx';
import BookInfo from '../pages/Client/BookInf.jsx';
import Cart from '../pages/Client/Cart.jsx';
import Order from '../pages/Client/Order.jsx';

function Client() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='text-dark-blue'>
            <div className={`fixed z-30 top-0 w-sidebar h-full ${isOpen ? 'left-0' : '-left-sidebar'} lg:left-0 bg-stone-white transition-all duration-500`}>
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div className='ml-0 lg:ml-sidebar transition-all duration-500'>
                <div className="relative z-20 top-0">
                    <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
                </div>
                <div className="w-full px-6 py-10 lg:px-12 lg:py-12">
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="explore/" element={<Explore/>}/>
                        <Route path='books/:isbn/' element={<BookInfo/>}/>
                        <Route path='cart/' element={<Cart/>}/>
                        <Route path='onestepcheckout/index' element={<Order/>}/>
                    </Routes>
                </div>
                <div className=" bg-stone-white px-10 md:px-12 py-8 md:py-10">
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Client
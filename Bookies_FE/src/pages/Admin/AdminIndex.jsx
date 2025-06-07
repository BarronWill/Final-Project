import SidebarAdmin from '../../components/organisms/SidebarAdmin';
import OrderMng from './OrderMng';
import { useState} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function AdminIndex() {
    const [isOpen, setIsOpen] = useState(false);
    console.log(isOpen)
    return (
        <div className='text-dark-blue bg-stone-white'>
            <div className={`fixed z-30 top-0 w-sidebar -left-sidebar h-full ${isOpen ? 'left-0' : '-left-sidebar'} lg:left-0 bg-stone-white transition-all duration-500`}>
                <SidebarAdmin isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div className='ml-0 lg:ml-sidebar transition-all duration-500'>
                <div className="w-full">
                    <Routes>
                        <Route path="user" element={<OrderMng isOpen={isOpen} setIsOpen={setIsOpen} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default AdminIndex;
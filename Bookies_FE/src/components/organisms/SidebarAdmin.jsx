import { Button } from '../atoms/FormElement';
import NavItem from '../atoms/NavItem';
import logo from '../../assets/img/logo.png';
import LinkItem from '../atoms/LinkItem';   
import ProfileMenu from '../molecules/ProfileMenu';


export default function SidebarAdmin({isOpen,setIsOpen}) {
    const toggleSidebar = () => {
        console.log('toggle sidebar');
        setIsOpen(!isOpen);
    }

    return (
        <div className='flex flex-col p-2 py-4 w-full rounded-md h-full justify-between shadow-custom-blue' >
            <div>
                <div className="flex flex-row justify-between items-center leading-none text-header font-bold mb-12">
                    <LinkItem children="Bookies" href="#" src={logo}/>
                    <div className="">
                        <div className='hover:bg-cloud-grey rounded-md lg:hidden'>
                            <Button type="button" icon='fa-regular fa-window-maximize fa-rotate-270' onClick={toggleSidebar}/>
                        </div>
                    </div>
                </div>
                <nav>
                    <ul className='flex flex-col gap-2'>
                        <li>
                            <NavItem href='/admin/home/' icon='fa-solid fa-chart-simple'>Dashboard</NavItem>
                        </li>
                        <li>
                            <NavItem href='/admin/user/' icon='fa-solid fa-user'>User Management</NavItem>
                        </li>
                        <li>
                            <NavItem href='/admin/order/' icon='fa-solid fa-cart-shopping'>Order Management</NavItem>
                        </li>
                        <li>
                            <NavItem href='/admin/product/' icon='fa-solid fa-book'>Product Management</NavItem>
                        </li>
                        <div className='w-full h-px bg-dark-blue'></div>
                        <li>
                            <NavItem href='/admin/setting' icon='fa-solid fa-gear'>Setting</NavItem>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* <div className="text-body font-semibold">
                <SidebarAdmin/>
            </div> */}
        </div>
    );
}
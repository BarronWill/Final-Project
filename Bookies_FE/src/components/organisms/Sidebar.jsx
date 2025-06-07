import Button from '../atoms/Button';
import NavItem from '../atoms/NavItem';
import logo from '../../assets/img/logo.png';
import LinkItem from '../atoms/LinkItem';   
import ProfileMenu from '../molecules/ProfileMenu';


export default function Sidebar({isOpen,setIsOpen}) {
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }
    // console.log("sidebar rendered")
    return (
        <div className='flex flex-col p-2 py-4 w-full rounded-md h-full justify-between shadow-custom-blue' >
            <div>
                <div className="flex flex-row justify-between items-center leading-none text-header font-bold mb-12">
                    <LinkItem children="Bookies" href="#" src={logo}/>
                    <div className="lg:hidden">
                        <Button icon='fa-regular fa-window-maximize fa-rotate-270' color='stone' onClick={toggleSidebar}/>
                    </div>
                </div>
                <nav>
                    <ul className='flex flex-col gap-2'>
                        <li>
                            <NavItem href='/' icon='fa-solid fa-home'>Home</NavItem>
                        </li>
                        <li>
                            <NavItem href='/explore' icon='fa-solid fa-magnifying-glass'>Explore</NavItem>
                        </li>
                        <li>
                            <NavItem href='/cart' icon='fa-solid fa-book-bookmark'>Saved</NavItem>
                        </li>
                        <li>
                            <NavItem href='/bot' icon='fa-regular fa-message'>Bookie Bot</NavItem>
                        </li>
                        <div className='w-full h-px bg-dark-blue'></div>
                        <li>
                            <NavItem href='/setting' icon='fa-solid fa-gear'>Setting</NavItem>
                        </li>
                        <li>
                            <NavItem href='/support' icon='fa-solid fa-headset'>Support</NavItem>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="text-body font-semibold">
                <ProfileMenu/>
            </div>
        </div>
    );
}
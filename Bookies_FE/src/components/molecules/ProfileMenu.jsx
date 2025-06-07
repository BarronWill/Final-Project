import Button from "../atoms/Button"
import {useState, useEffect, useContext} from 'react'
import fetchProfile from '../../services/user/fetchProfile'
import logoutAuth from '../../services/auth/logoutAuth'
import { useNavigate } from "react-router-dom"
import {ProfileContext} from "../../context/userContext"
import { memo } from "react"

const ProfileMenu = memo(() => {
    const [isOpen, setIsOpen] = useState(false)
    const {profile, updateProfile, updateAddress, address} = useContext(ProfileContext)
    const navigator = useNavigate()
        useEffect(() => {
            const loadData = async () => {
                try{
                    const response = await fetchProfile()
                    const data = await response.json()
                    updateProfile(data.profile)
                    const addressList = []
                    data.address.forEach(element => {
                        addressList.push(element)
                        console.log(element)
                    });
                    updateAddress(addressList);
                } catch (error) {
                    console.log(error)
                }
            }
            loadData()
    }, [])
    console.log(address)
    const handleLogout = async (event) => {
        try{
            event.preventDefault()
            await logoutAuth()
            navigator('/login')
        } catch (error) {
            console.log("Failed to get logout API")
        }
    }

    const handleToggleBar = (event) => {
        event.preventDefault()
        setIsOpen(!isOpen)
    }
    
    return (
        <>  
            <div className={`${isOpen ? '' : 'hidden'} absolute bottom-16 right-2 text-body font-semibold gap-2 flex flex-col rounded-md bg-stone-white border-2 `}>
                <Button children="Profile" icon="fa-solid fa-user" />
                <Button children="Log out" onClick={handleLogout} icon="fa-solid fa-right-from-bracket"/>
            </div>
            <div className="flex flex-row justify-between items-center px-2 py-1 rounded-md hover:bg-cloud-grey ">
                {
                profile == null 
                ?
                <div>Loading...</div>
                :
                <div className="flex flex-row gap-4 items-center">
                    {/* <img src={avt} alt="avarta"/> */}
                    <i className="fa-solid fa-user"></i>
                    <h3 className="">{profile.name}</h3>
                </div>
                }
                <Button icon="fa-solid fa-ellipsis-vertical" onClick={handleToggleBar}/>
            </div>
        </>
    )
})

export default ProfileMenu
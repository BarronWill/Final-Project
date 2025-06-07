import { createContext, useContext, useState } from "react";

export const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState(null)
    const [address, setAddress] = useState([])

    const updateProfile = (userInfo) => {
        setProfile(userInfo)
    }

    const updateAddress = (addressInfo) => {
        setAddress(addressInfo)
    }

    return (
        <ProfileContext.Provider value={{profile, address, updateProfile, updateAddress}}>
            {children}
        </ProfileContext.Provider>
    )
}
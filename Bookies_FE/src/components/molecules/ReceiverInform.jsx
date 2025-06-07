import { memo, useContext, useState } from 'react'
import {nations, cities, communes, districts} from '../../data/constant'
import fetchCreateAddress from '../../services/user/fetchCreateAddress'
import { Input, Select, Button} from '../atoms/FormElement'
import { ProfileContext } from '../../context/userContext'

const ReceiverInform = memo(({setIsOpenningForm}) => {
    const [receiverName, setReceiverName] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [nation, setNation] = useState(nations[0] || '')
    const [district, setDistrict] = useState(districts[0] || '')
    const [commune, setCommnue] = useState(communes[0] || '')
    const [city, setCity] = useState(cities[0] || '')
    const [destination, setDestination] = useState('')
    const {profile, address, updateAddress} = useContext(ProfileContext)

    const handleSubmit = async(event) => {
        const data = {
            user: profile.user,
            receiver_name: receiverName,
            phonenumber: phonenumber,
            nation: nation,
            city: city,
            district: district,
            commune: commune,
            destination: destination
        } 

        event.preventDefault()
        const response = await fetchCreateAddress(data)
        const message = await response.json()

        if(response.ok) {
            alert("Create successfully")
            setIsOpenningForm(false)
            
            const newAddressList = [...address, data]
            updateAddress(newAddressList)  
        } else {
            console.log(message)
        }
    }
    return (
        <>
            <div className='flex flex-col gap-4 w-fit p-4 rounded-md m-auto bg-stone-white shadow-custom-blue items-center border-2'>
                <h2 className='text-subheader font-semibold text-center'>Update Receiver Address</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-2 items-center'>
                            <h3 className='text-body font-semibold w-[150px]'>Receiver Name</h3>
                            <Input type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} placeholder="Enter the receiver name"/>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <h3 className='text-body font-semibold w-[150px]'>Phone number</h3>
                            <Input type="text" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="09346978xx"/>                            
                        </div>

                        <div className='flex gap-2 items-center'>
                            <h3 className='text-body font-semibold w-[150px]'>Nation</h3>
                            <Select value={nation}  onChange={(e) => setNation(e.target.value)}>
                                {nations.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </Select>                           
                        </div>

                        <div className='flex gap-2 items-center'>
                            <h3 className='text-body font-semibold w-[150px]'>City</h3>
                            <Select value={city}  onChange={(e) => setCity(e.target.value)}>
                                {cities.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </Select>                            
                        </div>
                        <div className='flex gap-2 items-center'>
                            <h3 className='text-body font-semibold w-[150px]'>Province</h3>
                            <Select value={commune} onChange={(e) => setCommnue(e.target.value)}>
                                {communes.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </Select>                            
                        </div>
                        <div className='flex gap-2 items-center'>
                            <h3 className='text-body font-semibold w-[150px]'>District</h3>
                            <Select value={district} onChange={(e) => setDistrict(e.target.value)}>
                                {districts.map((item, index) => (
                                    <option value={item} key={index} >{item}</option>
                                ))}
                            </Select>                            
                        </div>

                        <div className='flex gap-2 items-center'>
                            <h3 className='text-body font-semibold w-[150px]'>Destination</h3>
                            <Input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter the receiver name"/>
                        </div>
                    </div>
                    <div className='flex flex-row gap-4 mt-8'>
                        <div className='border-2 rounded-md bg-blue font-semibold text-white hover:opacity-70'>
                            <Button type="submit">Save</Button>
                        </div>
                        <div className='border-2 bg-stone-white font-semibold text-dark-blue rounded-md hover:bg-cloud-grey'>
                            <Button type="button" onClick={() => setIsOpenningForm(false)}>Cancel</Button>
                        </div>
                        
                    </div>
                    
                </form>
            </div>
        </>
    )
})

export default ReceiverInform
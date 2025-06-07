import { useEffect, useState, useContext, memo} from 'react'
import Radio from '../../components/atoms/Radio'
import TitleWithCaption from '../../components/atoms/TitleWithCaption'
import { useLocation, useNavigate } from 'react-router-dom'
import scrollToTop from '../../utils/scrollToTop'
import BillItem from '../../components/molecules/BillItem'
import airpay from '../../assets/img/payment/ico_airpay.svg'
import zalopayapp from '../../assets/img/payment/ico_zalopayapp.svg'
import vnpay from '../../assets/img/payment/ico_vnpay.svg'
import cash from '../../assets/img/payment/ico_cashondelivery.svg'
import momo from '../../assets/img/payment/ico_momopay.svg'
import zalopayatm from '../../assets/img/payment/ico_zalopayatm.svg'
import zalopaycc from '../../assets/img/payment/ico_zalopaycc.svg'
import fetchCreateOrder from '../../services/orders/fetchCreateOrder'
import { ProfileContext } from '../../context/userContext'
import Button from '../../components/atoms/Button'
import ReceiverInform from '../../components/molecules/ReceiverInform'

const AddressSelection = memo(({value, setValue}) => {
    const [isOpenningForm, setIsOpenningForm] = useState(false)
    const [arr, setArr] = useState([])
    const {address} = useContext(ProfileContext)
    
    useEffect(() => {
        let newArr = []
        for (let i = 0; i < address.length; i++){
            if (i == 0) {
                newArr.push(
                    <Radio itsvalue={address[i]} value={value} setValue={setValue} active={true}>
                        <p className='line-clamp-2 overflow-clip'>
                        {address[i].destination} | {address[i].phonenumber} | {address[i].receiver_name} 
                        </p>
                    </Radio>
                )
            } else {
                newArr.push(
                    <Radio itsvalue={address[i]} value={value} setValue={setValue}>
                        <p className='line-clamp-2 overflow-clip'>
                        {address[i].destination} | {address[i].phonenumber} | {address[i].receiver_name} 
                        </p>
                    </Radio>
                )
            }
        }
        setArr(newArr)
    }, [address, value])

    return (
        <>
            <div className={`${isOpenningForm ? '' : 'hidden'} fixed flex items-center  top-0 left-0 z-20 w-screen h-screen  backdrop-blur-sm`}>
                <ReceiverInform setIsOpenningForm={setIsOpenningForm}/>
            </div>
            
            <div className="flex flex-col px-2 py-1 gap-2 bg-white text-dark-blue shadow-custom-blue rounded-md">
                <TitleWithCaption title={"Địa chỉ giao hàng"} caption={""} />
                <div className='flex flex-col gap-2'>
                    {arr.map((element, index) => (
                        <div key={index}>{element}</div>
                    ))}
                </div>
                <Button 
                icon='fa-solid fa-plus' 
                color='white'
                onClick = {() => setIsOpenningForm(true)}
                >Add an address</Button>
            </div>
        </>
    )
})

const DeliveryMethodSelection = memo(({delivery, setDelivery}) => {
    return (
        <>
            <div className="flex flex-col px-2 py-1 gap-2 bg-white text-dark-blue shadow-custom-blue rounded-md">
                <TitleWithCaption title={"Địa chỉ giao hàng"} caption={""} />
                <Radio itsvalue={1} value={delivery} setValue={setDelivery} active={true}>
                    <div className='flex flex-col'>
                        <h3 className='text-body'>Express Ship: 20.000 VND</h3>
                        <h4 className='text-caption'>Prediction: Tuesday - 14/1</h4>
                    </div>
                </Radio>
                <Radio itsvalue={2} value={delivery} setValue={setDelivery}>
                    <div className='flex flex-col'>
                        <h3 className='text-body'>Normal Ship: 10.000 VND</h3>
                        <h4 className='text-caption'>Prediction: Wednesday - 15/1</h4>
                    </div>
                </Radio>
            </div>
        </>
    )   
})

const PaymentMethodSelection = memo(({paymentMethod, setPaymentMethod}) => {
    return (
        <>
        <div className='flex flex-col gap-2 px-2 py-1 bg-white text-dark-blue shadow-custom-blue rounded-md'>
            <TitleWithCaption title="Payement Selection" />
            <Radio itsvalue={4} value={paymentMethod} setValue={setPaymentMethod} active={true}>
                <div className='flex flex-row gap-2'>
                    <img src= {zalopayapp} height={50} width={50} />
                    <h3>Ví ZaloPay</h3>
                </div>
            </Radio>

            <Radio itsvalue={1} value={paymentMethod} setValue={setPaymentMethod}>
                <div className='flex flex-row gap-2'>
                    <img src={vnpay} height={50} width={50} />
                    <h3>Ví VNPAY</h3>
                </div>
            </Radio>
            <Radio itsvalue={2} value={paymentMethod} setValue={setPaymentMethod}>
                <div className='flex flex-row gap-2'>
                    <img src={airpay} height={50} width={50} />
                    <h3>Ví ShopeePay</h3>
                </div>
            </Radio>

            <Radio itsvalue={7} value={paymentMethod} setValue={setPaymentMethod}>
                <div className='flex flex-row gap-2'>
                    <img src={momo} height={50} width={50} />
                    <h3>Ví Momo</h3>
                </div>
            </Radio>

            <Radio itsvalue={6} value={paymentMethod} setValue={setPaymentMethod}>
                <div className='flex flex-row gap-2'>
                    <img src={zalopayatm} height={50} width={50} />
                    <h3>ATM / Internet Banking</h3>
                </div>
            </Radio>

            <Radio itsvalue={3} value={paymentMethod} setValue={setPaymentMethod}>
                <div className='flex flex-row gap-2'>
                    <img src={zalopaycc} height={50} width={50} />
                    <h3>Visa / Master / JCB</h3>
                </div>
            </Radio>

            <Radio itsvalue={5} value={paymentMethod} setValue={setPaymentMethod}>
                <div className='flex flex-row gap-2'>
                    <img src={cash} height={50} width={50} />
                    <h3>Cash</h3>
                </div>
            </Radio>
        </div>
        </>
    )
})

const VoucherSelection = memo(({voucher, setVoucher}) => {
    return (
        <>
            <div className='flex flex-col text-dark-blue bg-white gap-4 px-2 py-1 shadow-custom-blue rounded-md'>
                <div className='font-semibold text-subheader'>
                    <TitleWithCaption title="Select your vouchers" />
                </div>
                
            </div>
        </>
    )
})

const Note = memo(({note, setNote}) => {
    return (
        <>
            <div className='flex flex-col gap-2 px-2 py-1 bg-white shadow-custom-blue rounded-md text-dark-blue'>
                <div className='font-semibold text-subheader'>
                    <TitleWithCaption title="Other information"/>
                </div>
                <fieldset className='px-2 py-1 border-[1px] rounded-md'>
                    <legend>Your note</legend>
                    <textarea className="w-full rounded-md p-2 outline-none" maxLength={250} placeholder='Write your notes to the shipper' value={note} onChange={(e) => setNote(e.target.value)}/>
                </fieldset>
            </div>
        </>
    )
})

function Order() {
    const location = useLocation()
    const navigator = useNavigate()
    scrollToTop()
    const {profile} = useContext(ProfileContext)
    const [address, setAddress] = useState(null)
    const [delivery, setDelivery] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [voucher, setVoucher] = useState([])
    const [note, setNote] = useState('')
    const {books, total} = location.state
    
    if (profile == null) {
        return(
            <>
                <div>Loading...</div>
            </>
        )
    }

    let ship = 200
    const handlePay = async (event) => {
        event.preventDefault()
        const data = {
            address: address.destination,
            payment: paymentMethod, 
            receiver_note: note,
            phone_number: address.phonenumber,
            user: profile.user,
            receiver_name: address.receiver_name
        }
        try{
            const response = await fetchCreateOrder(data)
            const result = await response.json()
            if (response.ok){
                alert("Successfullyl")
                console.log(result)
            }
            else {
                alert("Try again")
                console.log(result)
            }
            navigator("/cart")
        } catch(error){
            console.log()
        }
    }
    
    let arr = []
    books.forEach(book => {
        arr.push(<BillItem book={book}/>)
    });
     
    return (
        <>
            <div className='flex flex-col lg:flex-row gap-4 w-full justify-between text-dark-blue'>
                <div className='flex flex-col gap-4 flex-auto'>
                    <AddressSelection value={address} setValue={setAddress}/>
                    <DeliveryMethodSelection delivery={delivery} setDelivery={setDelivery}/>
                    <PaymentMethodSelection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
                    <VoucherSelection voucher={voucher} setVoucher={setVoucher}/>
                    <Note note={note} setNote={setNote} />
                </div>
                <div className='flex flex-col gap-4 flex-auto'>
                    <div className='flex flex-col gap-2 bg-white px-2 py-1 shadow-custom-blue'>
                        <TitleWithCaption title="Your Books"/>
                        {arr.map((element, index) => 
                            <div key={index}>{element}</div>
                        )}
                        <div>
                            
                        </div>
                    </div>
                    <div className='flex  w-full flex-col gap-2 bg-white px-2 py-1 shadow-custom-blue '>
                        <div className='flex flex-row justify-between text-body'>
                            <h3>Cost</h3>
                            <h3 className='font-semibold'>{total} VND</h3>
                        </div>
                        <div className='flex flex-row justify-between text-body'>
                            <h3>Delivery expense</h3>
                            <h3 className='font-semibold'>{ship} VND</h3>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <h3 className='font-semibold text-subheader'>Total bill</h3>
                            <h3 className='font-bold text-subheader text-orange'>{total + ship} VND</h3>
                        </div>
                        <div className='bg-blue rounded-md hover:bg-dark-blue'>
                            <button className='w-full text-white font-semibold text-subheader' onClick={handlePay}>Pay this bill</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order
import TextRunning from '../components/atoms/TextRunning'
import { useState } from 'react'
import loginAuth from '../services/auth/loginAuth'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [isFalse, setIsFail] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await loginAuth(username,password)
        if (response.status==200){
            navigate('/')
            setIsFail(false)
        }
        else{
            alert("Wrong passwrod")
            setIsFail(true)
        }
    }

    return (
        <>
            <div className="grid grid-rows-1 md:grid-cols-12 h-screen bg-white px-10 gap-10 text-dark-blue">
                <div className="flex flex-col justify-center min-w-[200px] font-semibold text-header leading-1.5 md:h-screen md:col-span-6">
                    <TextRunning/>
                </div>

                <div className="flex flex-row items-center justify-center mb-10 md:flex-col md:col-span-6">
                    <div className="flex flex-col items-center p-4 w-full rounded-md md:w-2/3 shadow-custom-blue bg-stone-white">
                        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
                            <fieldset className="px-2 py-1 border-[1px] rounded-md">
                                <legend>Your Email</legend>
                                <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} className="w-full outline-none font-semibold bg-stone-white"></input>
                            </fieldset>
                            <fieldset className="px-2 py-1 border-[1px] rounded-md">
                                <legend>Your Password</legend>
                                <input type="password"  value={password} onChange={(e) => setPassWord(e.target.value)} className="w-full font-semibold outline-none bg-stone-white"></input>
                            </fieldset>
                            <div className={`text-light-red text-caption ${isFalse ? 'block' : 'hidden'}`}>Wrong password</div>
                            <button type="submit"  className="py-1 bg-light-blue rounded-md font-semibold hover:bg-blue">Log in</button>
                        </form>
                        <p className="mt-4">Forget the password ?</p>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Login
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import registerAuth from "../services/auth/registerAuth"
import loginAuth from "../services/auth/loginAuth"

function Register() {
    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [isFalse, setIsFalse] = useState(false)
    const navigator = useNavigate()
    
    const handleSubmit = async(event) => {
        try{
            event.preventDefault()
            const response = await registerAuth(username, password)
            if (response.status == 200){
                navigator('/login')
                setIsFalse(false)
            }
            else {
                alert("Wrong format")
                setIsFalse(true)
            }
        } catch (error) {
            console.log("Failed to get response from the register authentication")
        }
    }   
    
    return (
        <>
            <div className="w-2/3 h-screen py-12 m-auto">
                <div className="flex flex-col justify-center px-4 bg-stone-white rounded-md h-full">
                    <h1 className="text-header font-bold text-dark-blue text-center mb-12">Register for Bookies</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2 text-body font-semibold text-dark-blue">
                            <fieldset className="px-2 py-1 border-[1px] rounded-md">
                                <legend>User Email</legend>
                                    <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} className="w-full outline-none font-semibold bg-stone-white"></input>
                            </fieldset>
                            <fieldset className="px-2 py-1 border-[1px] rounded-md">
                                <legend>Password</legend>
                                <input type="password" value={password} onChange={(e) => setPassWord(e.target.value)} className="w-full outline-none font-semibold bg-stone-white"></input>
                            </fieldset>
                            <div className={`text-caption text-light-red font-semibold ${isFalse ? 'block' : 'hidden'}`}>Wrong format</div>
                            <button type="submit" className="bg-light-blue font-semibold px-4 py-2 rounded-md hover:bg-blue">Register</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default Register
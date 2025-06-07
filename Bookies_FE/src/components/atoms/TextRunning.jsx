import { useState, useEffect, memo} from "react"

const TextRunning = memo(() => {
    const sentences = [
        "Knowledge is power. \n\n— Francis Bacon",
        "The more that you read, the more things you will know. The more that you learn, the more places you'll go.\n\n— Dr. Seuss",
        "Education is the most powerful weapon which you can use to change the world. \n\n— Nelson Mandela",
        "An investment in knowledge pays the best interest. \n\n— Benjamin Franklin",
        "Learning never exhausts the mind. \n\n— Leonardo da Vinci",
        "The beautiful thing about learning is that no one can take it away from you. \n\n— B.B. King",
        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. \n\n— Albert Schweitzer",
        "The only limit to our realization of tomorrow is our doubts of today. \n\n— Franklin D. Roosevelt",
        "The best way to predict the future is to create it. \n\n— Peter Drucker",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. \n\n— Winston Churchill",
        "Do not wait to strike till the iron is hot, but make it hot by striking. \n\n— William Butler Yeats",
        "It does not matter how slowly you go as long as you do not stop. \n\n— Confucius",
        "The expert in anything was once a beginner. \n\n— Helen Hayes",
        "It always seems impossible until it’s done. \n\n— Nelson Mandela",
        "Believe you can and you're halfway there. \n\n— Theodore Roosevelt"
    ]

    const [currentPhrase, setcurrentPhrase] = useState(0)
    const [isDelete, setDelete] = useState(false)
    const [text, setText] = useState('')

    useEffect(() => {
        const deleteSpeed = 3500
        const typingSpeed = 30
        const PauseDuration = 3000

        if (!isDelete && text === sentences[currentPhrase]){
            setTimeout(() => setDelete(true), PauseDuration )
            setTimeout(() => setText(''), deleteSpeed)
        }
        if (isDelete && text === ''){
            setcurrentPhrase((currentPhrase + 1) % sentences.length)
            setDelete(false)
        }

        const timeout = setTimeout(()=>{
            if (!isDelete){
                setText(sentences[currentPhrase].substring(0, text.length + 1))
            }
            else{
                setText(sentences[currentPhrase].substring(0, text.length - 1))
            }
        }, isDelete ? deleteSpeed : typingSpeed)
        
        return () => clearTimeout(timeout)
    }, [text, isDelete, currentPhrase])

    return(
    <>
    <div className="flex items-start">
        <p className={`transition-all duration-300 whitespace-pre-wrap ${isDelete ? ' opacity-0' : 'opacity-100'}`}>
            {text}
            <span> </span> 
            <span className="w-3 h-3 bg-light-blue rounded-full text-light-blue leading-none">     </span>
        </p>
        
    </div>
        
    </>)
})

export default TextRunning
    

import Button from '../atoms/Button';
import fetchBooks from '../../services/books/fetchBooks';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import IconAndText from '../atoms/IconAndText';
function Slide({data}) {
    return (
        <Link to={`/books`} state={{'book': data}} className="flex flex-col p-2 gap-2 rounded-md w-[200px] snap-start hover:bg-cloud-grey">
            <img src={data.image_url} alt="Book" className="flex-1 w-full rounded-md aspect-[3/4]" />
            <div className="flex flex-col gap-1 flex-1">
                <h3 className="font-semibold text-body leading-5 line-clamp-2 break-words">{data.title}</h3>
                <h4 className="font-normal text-caption">{data.author}</h4>
                <p className="font-normal text-caption line-clamp-3">{data.publisher}</p>
                <div className="flex flex-row items-center justify-start gap-2 text-caption font-normal">
                    <IconAndText icon="fa-solid fa-star text-yellow" text="5"/>
                    <IconAndText icon="fa-solid fa-cart-shopping" text="100"/>
                </div>
                <div className="flex flex-row flex-start gap-2 items-center">
                    <h3 className="font-semibold text-subheader leading-none">100.000 đ</h3>
                    <h3 className="font-normal text-caption leading-none line-through">150.000 đ</h3>
                </div>
            </div>
        </Link>
    )
}

export default function Carousel(){
    const [data, setData] = useState([]);
    const navigator = useNavigate()
    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await fetchBooks()
                if (response.status == 200){
                    const books = await response.json()
                    setData(books)
                }
                else{
                    navigator('/login')
                }
                
            } catch (error) {
                console.log(error)
            }
        } 
        loadData()       
    }, [])

    if(data.length == 0){
        return (
            <div className='text-body font-bold'>Loading...</div>
        )
    }
    
    let arr = [];
    for(let i = 0; i < 10; i++){
        arr.push(<Slide data={data[i]}/>)
    }

    return (
        <div className='flex flex-row items-center justify-between gap-5 text-subheader'>
            <Button icon='fa-solid fa-arrow-left'/>
            <div className="flex flex-row items-start gap-10 justify-between snap-x snap-mandatory overflow-x-auto scrollbar-hide">
               {arr.map((element, index) => (
                <div key={index}>{element}</div>
               ))}
            </div>
            <Button icon='fa-solid fa-arrow-right'/>
        </div>
    )
}
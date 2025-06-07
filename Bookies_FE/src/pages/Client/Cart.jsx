import { useEffect, useState } from "react"
import ItemCart from "../../components/molecules/ItemCart"
import Button from "../../components/atoms/Button"
import fetchCart from "../../services/cart/fetchCart"
import Checkbox from "../../components/atoms/Checkbox"
import { Link } from "react-router-dom"

function Cart() {
    const [selectedBook, setSelectedBook] = useState([])
    const [books, setBooks] = useState([])
    useEffect(() => {
        const loadBooks = async() => {
            try{
                const response = await fetchCart()
                const book = await response.json()
                setBooks(book)
            } catch (error){
                console.log(error)
            }
        }
        loadBooks()
    }, [])
    // Return Loading page when there's no content 
    if (books.length == 0){
        return (
            <div>Loading...</div>
        )
    }

    // Push all the cart items to an array to present
    let arr = []
    let totalBill = 0
    for(let i = 0; i < books.length; i++){
        arr.push(<ItemCart book={books[i]} setBooks={setBooks} books={books} setSelectedBook={setSelectedBook} selectedBook={selectedBook}/>)
    }
    selectedBook.forEach((item) => totalBill += (item.price * (item.quantity ? item.quantity : 1)))

    return (
        <>
            <div className="flex flex-col justify-between lg:flex-row gap-4 w-full min-h-screen">
                <div className="flex flex-col gap-2 lg:w-3/4 w-full">
                    <div className="flex flex-row gap-4 px-3 py-2 bg-stone-white shadow-custom-blue">
                        <Checkbox value={0}>
                            <h3 className="text-body font-semibold text-dark-blue">Select all ({selectedBook.length} items)</h3>
                        </Checkbox>
                        
                    </div>
                    <div className="flex flex-col px-3 py-2 rounded-md gap-6 bg-stone-white shadow-custom-blue">
                        {arr.map((element, index) => (
                        <div key={index}>{element}</div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/4 text-dark-blue">
                    <div className="w-full flex-row gap-4 flex lg:flex-col justify-between items-center rounded-md px-3 py-2 bg-stone-white shadow-custom-blue">
                        <div className="flex flex-col w-full justify-between gap-1 lg:flex-row lg:items-center">
                            <p className="text-body font-semibold">Total</p>
                            <p className="text-subheader font-semibold text-red">{totalBill} đ</p>
                        </div>
                        <Link to= "/onestepcheckout/index" state={{'books':selectedBook, 'total': totalBill}} className="w-full justify-items-end">
                            <Button children="Buy Now !" color="red" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
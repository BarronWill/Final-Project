import { useEffect, useState } from "react"
import Counter from "../atoms/Counter"
import Button from "../atoms/Button"
import deleteCartItem from "../../services/cart/fetchDeleteCartItem"
import Checkbox from "../atoms/Checkbox"

function ItemCart({book, books, setBooks, selectedBook, setSelectedBook}) {
    const [number, setNumber] = useState(1)
    const [isSelected, setIsSelected] = useState(0)
    useEffect(() => {
        setSelectedBook(prev => {
            const index = selectedBook.findIndex(item => item.isbn === book.isbn)
            if (isSelected) {
                if (index == -1) {
                    book.quantity = number
                    const newData = [...prev, book]
                    return newData
                }
                else {
                    const newData = [...prev]
                    newData[index].quantity = number
                    console.log("update number")
                    return newData
                }
            }
            else {
                return prev.filter(item => item.isbn != book.isbn)
            }
        })
    },[number, isSelected])
    // The function works as follow:
    // 1. Get the new bookset by filtering all the records except for the deleted items (probs.item)
    // 2. Update new bookset to the state 
    // 3. Use deleteCartItem function to fetch deletion API from backend for removing the target item in the bookbase
    const handleDelete = (event) => {
        try{
            event.preventDefault()
            const updatedBooks = books.filter(item => item.isbn !== book.isbn)
            setBooks(updatedBooks)
            deleteCartItem(book.isbn)
        } catch (error){
            console.log("The items can't be deleted")
        }
    }

    return (
        <>
            {/* i cannot adjust the size of the image by set up the height of the parent div .Fix it later */}
            {/* How to adjust the size of parent based on the child --image*/}
            <div className="flex flex-row justify-between items-center h-auto">   
                <div className="flex flex-row gap-4 justify-between h-full items-center w-3/4 md:w-2/4">
                    <Checkbox isSelected={isSelected} setIsSelected={setIsSelected}>
                        <img src={book.img_url} className="aspect-[3/4] h-[100px] rounded-md" />
                        <div className="flex flex-col gap-2 w-full h-full justify-between ml-4">
                            <p className="text-body font-semibold text-dark-blue line-clamp-2 overflow-hidden text-ellipsis">
                                {book.book_title}
                            </p>
                            <div className="text-body text-dark-blue md:hidden">
                                <Counter number={number} setNumber={setNumber}/>
                            </div>
                            <div className="md:flex md:flex-col md:gap-2">
                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-body font-bold text-red">{book.price} đ</p>
                                    <p className="text-caption text-dark-blue line-through">{book.price + 2000} đ</p>
                                </div>
                            </div>
                        </div>
                    </Checkbox>
                    
                </div>

                <div className="hidden text-body text-dark-blue md:block">
                    <Counter number={number} setNumber={setNumber}/>
                </div>
                <form action="" className="text-subheader">
                    <Button icon="fa-solid fa-trash" onClick={handleDelete}/>
                </form>
                
            </div>

        </>
    )
}

export default ItemCart
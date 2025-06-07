import { useEffect } from "react";
import Button from "../../components/atoms/Button";
import Category from "../../components/atoms/Category";
import IconAndText from "../../components/atoms/IconAndText";
import TitleWithCaption from "../../components/atoms/TitleWithCaption";
import Carousel from "../../components/molecules/Carousel";
import scrollToTop from "../../utils/scrollToTop"
import { useLocation } from "react-router-dom";
import saveToCart from "../../services/cart/fetchSaveToCart";
import { useNavigate } from "react-router-dom";

export default function BookInfo(){
    const location = useLocation()
    scrollToTop()
    const {book} = location.state
    const navigator = useNavigate()

    const handleSaveToCart = async() => {
        const book_id = book.isbn
        const response = await saveToCart(book_id)
        if(response.status == 201){
            alert("Save successfully")
        }
        else{
            alert("Try again!")
        }
    }

    const handleBuy = async() => {
        const book_id = book.isbn
        const response = await saveToCart(book_id)
        if(response.status == 201){
            navigator('/cart')
        }
        else{
            alert("Try again!")
        } 
    }
    return (
        <>
            <div className="flex flex-col md:flex-row md:justify-between px-3 gap-10 mb-10 md:mb-12">
                <img src={book.img_url} alt="Book image" className="rounded-md md:order-2 aspect-[3/4]"></img>
                <div className=" flex flex-col gap-10 md:order-1">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-header font-bold">{book.book_title}</h2>
                        <h4 className="text-body font-semibold">{book.book_author}</h4>
                        <h3 className="text-subheader font-normal">{book.subtitle}</h3>
                    </div>
                    <div className="flex flex-row justify-between py-4 border-y-2 border-cloud-grey">
                        <div className="flex flex-row items-center gap-2">
                            <h2 className="text-subheader font-semibold">100.000 đ</h2>
                            <h4 className="text-caption line-through font-thin">150.000 đ</h4>
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <IconAndText icon="fa-solid fa-star text-yellow" text="10"/>
                            <IconAndText icon="fa-solid fa-cart-shopping" text={100}/>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-start">
                        <Button children="Buy" color="dark" icon="fa-solid fa-cart-shopping" onClick={handleBuy}/>
                        <Button children="Save" color="white" icon="fa-solid fa-book-open-reader" onClick={handleSaveToCart}/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-subheader font-bold">What's it about</h2>
                        <div className="flex flex-row flex-wrap gap-2 text-body font-normal">
                            <Category title="Health" icon="fa-solid fa-heart"/>
                            <Category title="Health" icon="fa-solid fa-heart"/>
                        </div>
                        <p className="text-body font-normal leading-normal">{book.summary}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-10 md:mb-12">
                <div className="px-3 mb-8">
                    <TitleWithCaption title="Similar Books" caption="Related books you might enjoy"/>
                </div>
                <div>
                    <Carousel />
                </div>
            </div>
            <div className="flex flex-col mb-10 md:mb-12">
                <div className="px-3 mb-8">
                    <TitleWithCaption title="Trending" caption="What's popular right now"/>
                </div>
                <div>
                    <Carousel />
                </div>
            </div>
                
            
        </>
    )
}
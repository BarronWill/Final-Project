function BillItem({book}) {
    return (
        <>
            <div className="flex flex-row justify-between items-center h-auto">   
                <div className="flex flex-row gap-4 justify-between h-full items-center w-3/4 md:w-2/4">
                    <img src={book.img_url} className="aspect-[3/4] h-[100px] rounded-md" />
                    <div className="flex flex-col gap-2 w-full h-full justify-between ml-4">
                        <p className="text-body font-semibold text-dark-blue line-clamp-2 overflow-hidden text-ellipsis">
                            {book.book_title}
                        </p>
                        <div className="text-body  text-dark-blue">
                            Quantity: {book.quantity}
                        </div>
                        <div className="md:flex md:flex-col md:gap-2">
                            <div className="flex flex-row items-center gap-2">
                                <p className="text-body font-bold text-red">{book.price} đ</p>
                                <p className="text-caption text-dark-blue line-through">{book.price + 2000} đ</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="hidden text-body text-dark-blue md:block">
                    Quantity: {book.quantity}
                </div> */}
                <div className="text-subheader text-orange font-semibold">{book.price} VND</div>
            </div>
        </>
    )
}

export default BillItem
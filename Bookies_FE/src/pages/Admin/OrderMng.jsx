import { useState } from "react";
import { Button } from "../../components/atoms/FormElement";

function ToPayRow({orderId, product, price, buyer, address, sale, date, note}) {
    return (
        <div key={orderId} className="flex flex-col gap-4 px-4 py-2  rounded-md leading-none shadow-md hover:bg-gradient-to-r from-cloud-grey to-white">
            <div className="text-subheader font-bold py-2 text-dark-blue bg-gradient-to-r from-dark-green to-white">{orderId}</div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-caption">Product</h4>
                        <h3 className="text-body">{product}</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-caption">Price</h4>
                        <div className="flex flex-row gap-1 items-center">
                            <h3 className="font-bold">{sale} VND</h3>
                            <h4 className="text-caption">{price} VND</h4>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-caption">Buyer</h4>
                        <h3 className="text-body">{buyer}</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-caption">Address</h4>
                        <h3 className="text-body">{address}</h3>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-caption">Created date</h4>
                        <h3 className="text-body">{date}</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-caption">Note</h4>
                        <p className="text-body">{note}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                    <h3 className="text-body">Total (2 products)</h3>
                    <h3 className="text-subheader font-bold">300.000 VND</h3>
                </div>
                <div className="flex flex-row gap-4 items-center">
                    <div className="bg-dark-blue text-white border-2 rounded-md hover:opacity-80">
                        <Button type="button">Confirm</Button>
                    </div>
                    <div className="bg-white text-dark-blue border-2 rounded-md hover:opacity-80">
                        <Button type="button">Cancel</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

function OrderMng({isOpen, setIsOpen}) {
    const [tab, setTab] = useState("all");

    const switchTab = (tab) => {
        setTab(tab);
    }

    const toggleBar = () => {
        setIsOpen(!isOpen);
    }
    
    const dataToPay = [
        {
            orderId: "Order 1",
            product: "Product 1",
            price: "100.000",
            buyer: "Nguyen Van A",
            address: "123 Nguyen Van Linh, Da Nang",
            sale: "90.000",
            date: "21/08/2021",
            note: "Note 1"
        },
        {
            orderId: "Order 2",
            product: "Product 2",
            price: "200.000",
            buyer: "Nguyen Van B",
            address: "123 Nguyen Van Linh, Da Nang",
            sale: "190.000",
            date: "21/08/2021",
            note: "Note 2"
        }
    ]

    return (
        <div className="grid grid-cols-4 h-screen leading-none">
            <div className="flex flex-col col-span-3">
                <header className="flex flex-row p-4 justify-between items-center bg-stone-white shadow-custom-blue">
                    <div className="flex flex-row gap-2 items-center text-subheader">
                        <div className={`hover:bg-cloud-grey rounded-md cursor-pointer ${isOpen ? 'hidden' : 'block'} lg:hidden`}>
                            <Button type="button" icon="fa-solid fa-bars" onClick={toggleBar}></Button>
                        </div>
                        <h1 className="text-dark-blue text-header font-bold">Order Manager</h1>
                    </div>
                    
                    <div className="bg-black text-white font-semibold rounded-md hover:opacity-80">
                        <Button type="button" icon="fa-solid fa-arrow-down">Export</Button>
                    </div>
                </header>

                <div className="flex-1 flex flex-col px-2">
                    <div className="flex flex-row gap-6">
                        <div className={`${tab == 'all' ? 'border-b-2' : 'border-none'} p-1 border-dark-blue`}>
                            <div className="hover:bg-cloud-grey rounded-md">
                                <Button type="button" onClick={() => {switchTab("all")}}>
                                    All
                                </Button>
                            </div>   
                        </div>
                        <div className={`${tab == 'pay' ? 'border-b-2' : 'border-none'} p-1 border-dark-blue`}>
                            <div className="hover:bg-cloud-grey rounded-md">
                                <Button type="button" onClick={() => {switchTab("pay")}}>
                                    To Pay
                                </Button>
                            </div>   
                        </div>
                        <div className={`${tab == 'ship' ? 'border-b-2' : 'border-none'} p-1 border-dark-blue`}>
                            <div className="hover:bg-cloud-grey rounded-md">
                                <Button type="button" onClick={() => {switchTab("ship")}}>
                                    To Ship
                                </Button>
                            </div>   
                        </div>
                        <div className={`${tab == 'receive' ? 'border-b-2' : 'border-none'} p-1 border-dark-blue`}>
                            <div className="hover:bg-cloud-grey rounded-md">
                                <Button type="button" onClick={() => {switchTab("receive")}}>
                                    To Receive
                                </Button>
                            </div>   
                        </div>
                    </div>
                    
                    {/* this div */}
                    <div className="flex-1 w-full h-full overflow-scroll">
                        <div className={`${tab == 'all' ? 'block' : 'hidden'}`}>
                            <div className="absolute flex flex-row gap-4 items-center bottom-4 left-1/3 ">
                                <div className="hover:bg-cloud-grey bg-white rounded-md cursor-pointer border-2">
                                    <Button icon="fa-solid fa-trash">Delete</Button>
                                </div>
                                <div className="flex flex-row rounded-md gap-2 bg-white border-2">
                                    <div className="hover:bg-cloud-grey rounded-md cursor-pointer">
                                        <Button icon="fa-solid fa-circle-info">Details</Button>
                                    </div>
                                    
                                    <div className="hover:bg-cloud-grey rounded-md cursor-pointer">
                                        <Button icon="fa-solid fa-circle-info">Details</Button>
                                    </div>
                                </div>
                            </div>
                            <table className="table-auto mt-4 w-full ">
                                <thead className="sticky text-dark-blue border-b-2  text-left text-body">
                                    <tr>
                                        <th className="p-4"><input type="checkbox"></input></th>
                                        <th className="p-4">Order ID</th>
                                        <th className="p-4">User ID</th>
                                        <th className="p-4">Products</th>
                                        <th className="p-4">Payment</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Total</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="hover:bg-light-blue">
                                        <td className="rounded-tl-md rounded-bl-md p-4"><input type="checkbox" /></td>
                                        <td className="p-4">#Order112124</td>
                                        <td className="p-4">2021608149</td>
                                        <td className="p-4">Product1</td>
                                        <td className="p-4">ShoppePay</td>
                                        <td className="p-4">11/21/2024</td>
                                        <td className="p-4">14.000.000</td>
                                        <td className="rounded-tr-md rounded-br-md p-4"><span className="p-1 bg-light-green rounded-md">Success</span></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                        <div className={`${tab == 'pay' ? 'block' : 'hidden'}`}>
                            <div className="flex flex-col gap-4">
                                <div className="absolute flex flex-row gap-4 items-center left-1/3 bottom-2">
                                    <div className="bg-white rounded-md border-2 hover:bg-cloud-grey">
                                        <Button icon="fa-solid fa-trash">Delete</Button>
                                    </div>
                                    <div className="flex flex-row gap-2 bg-white gap-2 rounded-md border-2">
                                        <div className="bg-white rounded-md  hover:bg-cloud-grey">
                                            <Button icon="fa-solid fa-circle-info">Details</Button>
                                        </div>
                                        <div className="bg-white rounded-md  hover:bg-cloud-grey">
                                            <Button icon="fa-solid fa-circle-info">Details</Button>
                                        </div>
                                    </div>
                                </div>
                                {dataToPay.map((item) => {
                                    return <ToPayRow key={item.orderId} {...item}/>
                                })}


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col h-full p-3 gap-6 border-l-2">
                {/* <section class="flex flex-col gap-3">
                    <h3>Payment</h3>
                    <div class="flex flex-col gap-3">
                        <div class="chart"></div>
                        <div class="flex flex-row justify-between medium-gap">
                            <div class="info">
                                <span><b>450</b></span>
                                <p>Mua Online</p>
                            </div>

                            <div class="info">
                                <span><b>450</b></span>
                                <p>Mua Offline<p>
                            </div>
                        </div>
                    </div>
                </section> */}
                <section className="flex flex-col pb-3 gap-4 border-b-2">
                    <h3 className="text-subheader font-bold">Order status</h3>
                    <div className="flex flex-col gap-3">
                        <div className="w-full h-[25px] bg-light-red"></div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row justify-between">
                                <p>Success</p>
                                <span><b>80%</b></span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>In Process</p>
                                <span><b>80%</b></span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>Failed</p>
                                <span><b>80%</b></span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>Refund</p>
                                <span><b>80%</b></span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col pb-3 gap-6 border-b-2">
                    <h3 className="text-subheader font-bold">Summary</h3>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col items-start gap-1">
                                    <span><b>175,000 VND</b></span>
                                    <p>Avg.orders</p>
                                </div>
                                <div className="flex flex-col items-start gap-1">
                                    <span><b>16,5 p</b></span>
                                    <p>Processing time</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col items-start gap-1">
                                    <span><b>100M VND</b></span>
                                    <p>Revenue</p>
                                </div>

                                <div className="flex flex-col items-start gap-1">
                                    <span><b>3,4</b></span>
                                    <p>Avg.book</p>
                                </div>
                            </div>

                        </div>
                </section>

                <section className="flex flex-col pb-3 gap-4 border-b-2">
                    <h3 className="text-subheader font-bold">Top sellers</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between">
                            <p>Don't giving a fuck</p>
                            <span><b>100</b></span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Don't giving a fuck</p>
                            <span><b>100</b></span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Don't giving a fuck</p>
                            <span><b>100</b></span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Don't giving a fuck</p>
                            <span><b>100</b></span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Don't giving a fuck</p>
                            <span><b>100</b></span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default OrderMng;
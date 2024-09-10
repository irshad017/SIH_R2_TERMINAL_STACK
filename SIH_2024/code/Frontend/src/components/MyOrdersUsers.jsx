import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderMessage = () => {
    const [UserData,setUserData] = useState([])
    const [UserName,setUserName] = useState("")
    const [UserPhone,setUserPhone] = useState("")
    const [UserEmail,setUserEmail] = useState("")
    const [Fpincode,setFpincode] = useState("")
    const [Fdistrict,setFdistrict] = useState("")
    const [Fstate,setFstate] = useState("")
    const [MyOrders,setMyOrders] = useState([])
    const [products, setProducts] = useState([])
    const [fetched,setFetched] = useState(true)
    const [fetchUser,setFetchUser] = useState(true)
    const [OpenSeller,setOpenSeller] = useState([])
    const [selectedProductData,setSelectedProductData] = useState([])
    const [farmAddress, setFarmAddress] = useState([])
    const [User2Address, setUser2Address] = useState([])
    const [Status, setStatus] = useState("")

    const [farmerData,setFarmerData] = useState([])
    const [farmerName,setFarmerName] = useState("")
    const [farmerEmail,setFarmerEmail] = useState("")
    const [customers,setCustomers] = useState([])
    
    
    const [selectOrderBool,setSelectOrderBool] = useState(false)
    const [AcceptBool,setAcceptBool] = useState(true)
    const [fetchFarm,setFetchFarm] = useState(true)
    const [OpenCustomer,setOpenCustomer] = useState([])
    
    const [selectedBuyerData,setSelectedBuyerData] = useState([])
    const [ProTitle,setProTitle] = useState('')
    const [ProPrice,setProPrice] = useState('')
    const [ProQuantity,setProQuantity] = useState('')
    const [ProLocation,setProLocation] = useState('')
    
    const [FarmerID,setFarmerID] = useState('')
    const [BuyerID,setBuyerID] = useState('')

    useEffect(()=>{
        const fetch = async ()=>{
            try{
                const UserID = localStorage.getItem('UserId')
                // console.log("UserID: ",UserID)
                if(UserID){
                    const response = await axios.get(`http://localhost:5000/currentUserData?userId=${UserID}`)
                    if(response.status === 200){
                        const data = response.data.userData
                        const location = data.address[0]
                        const phone = data.phoneNumber
                        console.log("PHone", phone)
                        console.log("Data: ",data)
                        console.log("LOcation: ",location)
                        setUser2Address(location)
                        setUserPhone(phone)
                        const ordeR = data.myOrder
                        // console.log(ordeR)
                        if(data.length > 0){
                            setUserData(data)
                        }
                        if(ordeR.length > 0){
                            setMyOrders(ordeR)
                            setFetched(false)
                        }
                        // const Name = response.data.farmerData.email.split('@')[0]
                        const Name = response.data.userData.firstName
                        const eMail = data.email
                        if(Name){
                            setUserName(Name)
                            setUserEmail(eMail)
                            setFetchUser(false)
                        }
                    }
                }else{
                    console.log("FarmerId not present")
                }
            }catch(err){
                if(err.response && err.response.status === 300){
                    console.log("Farmer is not LOgged")
                }else{
                    console.log("ERROR",err)
                }
            }
        }
        fetch()
    },[])

    const HandleOpen = async (BuyerId, order_id, farmerID) => {
        // console.log("Buyer/User:",BuyerId);
        setBuyerID(BuyerId)
        // console.log("OrderId:", order_id);
        // console.log("FarmerID:", farmerID);
        setFarmerID(order_id)
        // const FarmerID = localStorage.getItem('FarmerId')
        // console.log("Orders: ",MyOrders)
        // const order = MyOrders.filter((e)=> {e._id === order_id})
        // console.log("OrderONe: ",order)
    
        try {
            const response = await axios.get(`http://localhost:5000/currentUserUserDataOrder?farmerId=${BuyerId}&orderId=${order_id}`);
            
            if (response.status === 200) {
                console.log("RES1: ", response.data.ProductData);
                // Update state with the fetched order data
                const data = response.data.ProductData
                setSelectedProductData(response.data.ProductData);
                // console.log("YEY",selectedProductData)
                // const Title = data.title
                
                setOpenCustomer(data)
                // console.log("Stau",data.status)
                setStatus(data.status)

                // const Location = data.farmLocation
                // console.log("data2: ", data)
                // console.log("Location2: ", Location)

                // console.log("Title: ",Title)
                // setProTitle(Title)
                // console.log(ProTitle)
            }
            const response2 = await axios.get(`http://localhost:5000/currentUserData?userId=${BuyerId}`);
            //// GIVES USER DATA---
            if (response2.status === 200) {
                console.log("RES2: ", response2.data.userData);
                // Update state with the fetched order data
                const Udata = response2.data.userData
                // setSelectedBuyerData(Udata)
                setOpenCustomer(Udata)
                
                // console.log("YEY",Udata)
                
                // console.log("ad",Uaddress)
                
                setSelectOrderBool(true)
            }
            //// GIVES FARMER DATA-------
            const response3 = await axios.get(`http://localhost:5000/currentFarmerData?FarmerID=${farmerID}`)
            if(response3.status === 200){
                const data = response3.data.farmerData
                // console.log("FarmerData: ",data)
                const locatioN = data.farmLocation[0]
                // console.log("Location: ", locatioN)
                setFarmAddress(locatioN)
                setFarmerData(data)
            }
        } catch (err) {
            console.log("Error: ", err);
        }
    };
    
    const HandleAccept = ()=>{

    }

    return (
        <div className="bg-red-100 flex flex-col lg:flex-row h-screen">
        {/* Sidebar */}
        <div className=" w-full lg:w-1/4 bg-gray-100 p-4 border-r border-gray-200">
            {/* Profile */}
            <div className="flex items-center p-2 mb-4">
            <img 
            src='data:image/png;base64,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'
            alt="User" className="w-10 h-10 rounded-full" />
            <div className="ml-4">
                {
                    fetchUser ? <>
                        <h2 className="text-sm font-semibold">Farmer Name</h2>
                        <p className="text-xs text-gray-500">farmer Email</p>
                    </>
                        :
                        <>
                            <h2 className="text-sm font-semibold">{UserName}</h2>
                            <p className="text-xs text-gray-500">{UserEmail}</p>
                        </>
                }
            </div>
            </div>
            {/* Chat List */}
            <div>
            <input
                type="text"
                placeholder="Search..."
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />
            <ul className=''>
                {fetched ? (
                    <></> // You can replace this with a loading spinner or a message if needed
                ) : (
                    MyOrders.slice().reverse().map((name, idx) => (
                        <li
                            key={idx}
                            className=" flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer mb-2"
                            onClick={() => HandleOpen(name.buyerId, name._id,name.farmerId)}
                        >
                            <img 
                            src="data:image/png;base64,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" 
                            alt={name.title} className="w-10 h-10 rounded-full" />
                            <div className="ml-3">
                                <div className='flex space-x-4' >
                                    <h3 className="text-sm font-medium">{name.title}</h3>
                                    <h2 className={`text-sm font-medium ${name.status === 'Accepted!' ? 'text-green-600' : 'text-red-600'}`}>{name.status}</h2>
                                </div>
                                {/* <h3 className="text-sm font-medium">{name.buyerId}</h3> */}
                                <p className="text-xs text-gray-500">OrderDate: {name.orderDate.slice(0,10)}</p>
                                <p className="text-xs text-gray-500">Time: {name.orderDate.slice(11,19)}</p>
                                {/* <p className="text-xs text-gray-500">Day: {name.orderDate.slice(10,11)}</p> */}
                            </div>
                        </li>
                    ))
                )}
            </ul>

            </div>
        </div>

        {/* Chat Section */}
        <div className="w-full lg:w-2/4 p-4 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b pb-2 mb-2">
            <div className="flex items-center">
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQlVYQsJxbEDr57v18Wmwi2rXLOGQui08vHw&s"
                    alt="User" className="border-2 border-black w-10 h-10 rounded-full" />
                <div className="ml-4">
                <h2 className="text-sm font-semibold">{farmerData.firstName}</h2>
                <p className="text-xs text-gray-500">{farmerData.email}</p>
                <p className="text-xs text-gray-500">{farmerData.farmName}</p>
                </div>
            </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto">
                <div className=" mb-4 flex justify-end bg-blue-500 rounded-t-xl rounded-l-xl">
                    <div className="ml-2 bg-blue p-2 rounded-lg">
                        <p className="text-sm text-gray-200 font-medium ">
                            The order request is for <span className='font-medium text-white '>{selectedProductData.quantity}kg</span> of <span className='font-medium text-white '>{selectedProductData.title}</span> priced at <span className='font-medium text-white'>Rs.{selectedProductData.price}</span>, to be delivered to the address in <span className='font-medium text-white'>, pincode-{User2Address.pincode}, {User2Address.district}, {User2Address.state}</span>
                        </p>
                    </div>
                    <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQlVYQsJxbEDr57v18Wmwi2rXLOGQui08vHw&s"
                    alt="User" className=" w-8 h-8 rounded-full" />
                </div>
                <div className="mb-4 flex r">
                    <img src="https://via.placeholder.com/40" alt="User" className="w-8 h-8 rounded-full" />
                    <div className="rounded-t-xl rounded-r-xl flex justify-center pr-3 space-x-2 ml-2 bg-blue-500 text-white p-2">
                        <p className='w-auto'>{Status}</p>
                    </div>
                </div>

            {/* More messages can go here */}
            </div>

            {/* Input field */}
            <div className="mt-4 border-t pt-2">
            <input
                type="text"
                placeholder="Type something..."
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:w-1/4 bg-gray-100 p-4">
            <h2 className="text-lg font-semibold mb-4 ">Seller Info</h2>
            {/* User details */}
            <div className="bg-white h-12 shadow-lg rounded-lg flex items-center mb-4">
                <img 
                    src='data:image/png;base64,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'
                    alt="User" className="ml-1 w-10 h-10 rounded-full" />
                <div className="ml-4">
                    <h3 className="text-mf font-medium">{farmerData.firstName} </h3>
                    <p className="text-sm text-gray-500">{farmerData.email}</p>
                </div>
            </div>
            {/* Gallery */}
            <div className="px-2 h-28 mb-2 rounded-lg shadow-lg bg-white gap-2">
                <p className='text-md font-medium underline'>Seller Address</p>
                <p>Farmname: {farmerData.farmName} </p>
                <p className='text-medium text-black'>Farm Location: {farmAddress.pincode}, {farmAddress.district}, {farmAddress.state} </p>
            </div>
            <div className="px-2 h-28 mt-2 rounded-lg shadow-lg bg-white gap-2 ">
            <p className='text-md font-medium underline'>Delivery Address</p>
                <p>PhoneNumber: {UserPhone} </p>
                <p className='text-medium text-black'>Your Address: {User2Address.pincode}, {User2Address.district}, {User2Address.state} </p>
            </div>
        </div>
        </div>
    );
};

export default OrderMessage;

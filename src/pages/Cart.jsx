import Cookies from "universal-cookie"
import Header from "../containers/Header";
import { useState, useEffect } from "react";
import React from "react";
import NumberFormatter from "../components/NumberFormater";
import axios from "axios";
import Swal from "sweetalert2";
// import Cookies from "universal-cookie";

var toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export default function Cart(){
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("Thành phố Hồ Chí Minh")
    const [district, setDistrict] = useState("")
    const [address, setAddress] = useState("")
    const [load, setLoad] = useState(true)
    const [dataprovinces, setDataProvinces] = useState([])
    const [datadistricts, setDataDistricts] = useState([])
    const [datawards, setDataWards] = useState([])
    const cookie = new Cookies()

    useEffect(() =>{
        if(cookie.get('products') != null){
            cookie.get('products').forEach(element => {
            axios.get(`http://127.0.0.1:8000/api/productofcart/products?id=${JSON.stringify(cookie.get('products'))}`).then(resp =>{
                setData(resp.data)
                setState(resp.data.length)
                setTotal(resp.data.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.price * (100 - currentValue.discount)/100), 0))
            })
            axios.get(`http://127.0.0.1:8000/api/order/getprovince`).then(resp =>{
                setDataProvinces(resp.data)
                setLoad(false)
                })
            });
        }
    }, [])
    const [count, setState] = useState(0); 
    const [total, setTotal] = useState(0)
    
    function increment(e, id){
        e.preventDefault();
        setState(function (prevCount) {
            return (prevCount += 1);
        });
        var input = document.getElementById(id);
        var currentValue = parseInt(input.value);
        var newValue = currentValue + 1;
        input.value = newValue.toString();
        setTotal(function(number){
            return (number + parseFloat(data[id].price * (100 - data[id].discount)/100))
        })
    }
    function deleteitem(e, index, id){
        e.preventDefault();
        var amount = parseInt(document.getElementById(index).value)
        var price = parseFloat(data[index].price * (100 - data[index].discount)/100)

        setTotal(function(number){
            return (number - (amount * price))
        })
        setState(function (prevCount) {
            return (prevCount -= amount);
        });


        const newData = [...data];
        newData.splice(index, 1);

        setData(newData);
        const arrayCookie = cookie.get('products')
        const newArray = arrayCookie.filter(val => val !== id)
        if(newArray.length != 0){
            cookie.set('products', JSON.stringify(newArray), {path: '/'})
        }
        else{
            cookie.remove('products')
        }
    }
    function decrement(e, id){
        e.preventDefault();
        setState(function (prevCount) {
            if (prevCount > data.length) {
              return (prevCount -= 1);
            } else {
              return (prevCount = data.length);
            }
          });
        var input = document.getElementById(id);
        var currentValue = parseInt(input.value);
        if(currentValue > 1){
            var newValue = currentValue - 1;
            input.value = newValue.toString();
            setTotal(function(number){
                return (number - parseFloat(data[id].price * (100 - data[id].discount)/100))
            })
        }
        else{
            var newValue = 1;
            input.value = newValue.toString();
        }
    }
    const handleProvince = async(e) => {
        await axios.get(`http://127.0.0.1:8000/api/order/getdistrict/${e.target.value}`).then(response =>{
            setDataDistricts(response.data)
        })
      }
    const handleDistrict = async(e) => {
        await axios.get(`http://127.0.0.1:8000/api/order/getward/${e.target.value}`).then(response =>{
            setDataWards(response.data)
        })
      }
    let handleSubmit = async (e) =>{
        e.preventDefault();
        if(count != 0){
            const cookie = new Cookies();
            cookie.remove('products')
            const newdata = []
            setData(newdata)
            setState(0)
            setTotal(0)
            const newData = [...data];
            for( let i = 0; i< data.length; i++){
                let amount = document.getElementById(i).value;
                newData[i] = {...newData[i], amount: amount}; 
            }
            try {
                let res = await axios.post("http://127.0.0.1:8000/api/order/orderproduct", {
                name: name,
                phone: phone,
                data: newData,
                email: email,
                total: total,
                city: city,
                district: district,
                address: address,
                });
                if (res.status === 200) {
                    await axios.post("http://127.0.0.1:8000/api/order/sendmail", {
                        name: name,
                        email: email,
                    });
                    setName("");
                    setPhone("");
                    setAddress("");
                    setDistrict("");
                    setEmail("");
                    setCity("Thành phố Hồ Chí Minh");
                } else {
                    console.log("Some error occurred");
                }
                toastMixin.fire({
                    animation: true,
                    title: 'Đạt hàng thành công'
                });
            } catch (err) {
                console.log(err);
            }
        }
        else{
            toastMixin.fire({
                animation: true,
                title: 'Vui lòng kiểm tra lại sản phẩm',
                icon: 'error',
              });
        }
    }
    if(load == false ){
    return(
        
        <>
            <Header/>
            <div className="cart-continent">
                <div className="cart-content">
                <form onSubmit={handleSubmit}>
                    <div className="cart-products">
                        {
                            data.map((obj, index) => {
                                return(
                                    <div key={index} className="cart-product">
                                        <div className="cart-product-img">
                                            <img src={obj.thumbnail} alt="" />
                                            <button onClick={(e) => deleteitem(e, index, obj.id)} className="btn-delete">Xóa</button>
                                        </div>
                                        <div className="cart-product-content">
                                            <div className="cart-product-content-1">
                                                <p>{obj.ProductDescription}</p>
                                                <strong><NumberFormatter number={parseFloat(obj.price * (100 - obj.discount)/100)}/></strong>
                                                <s><NumberFormatter number={parseFloat(obj.price)}/></s>
                                            </div>
                                        </div>
                                        <div className="cart-product-content">
                                            <div className="cart-product-content-1">
                                                <p>Màu: {obj.color.name_color}</p>
                                                <div className="cart-amount">
                                                    <button onClick={(e) => decrement(e, index)}>-</button>
                                                    <input name={`amount_${index}`} id={index} type="text" defaultValue="1" />
                                                    <button onClick={(e) => increment(e, index)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                )
                            })
                        }
                        <div className="cart-total">
                            <div className="cart-total-left">
                                <strong>Tạm tính</strong>
                                <span>({count} sản phẩm)</span>
                            </div>
                            <div className="cart-total-right">
                                <strong><NumberFormatter number={total}/></strong>
                            </div>
                        </div>
                    </div>
                    <hr className="hr-content" />
                    <div className="cart-customer">
                        <div className="margin-30">
                            <strong>Thông tin khách hàng</strong><br />
                            <input className="customer-checkbox" type="checkbox" />
                            <label className="customer-label" htmlFor="" style={{marginRight: '50px'}}>Anh</label>
                            <input className="customer-checkbox" type="checkbox" />
                            <label className="customer-label" htmlFor="">Chị</label><br />
                            <input className="customer-input" type="text" placeholder="Họ và Tên" style={{marginRight:"10px"}} onChange={(e) => setName(e.target.value)} value={name}/>
                            <input className="customer-input" type="text" placeholder="Số điện thoại" onChange={(e) => setPhone(e.target.value)} value={phone}/>
                            <input className="customer-input-lg" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        </div>
                    </div> 
                    <hr className="hr-content" />
                    <div className="cart-receive">
                        <div className="margin-30">
                            <strong>Chọn hình thức nhận hàng</strong><br />
                            <input className="customer-checkbox" type="checkbox" />
                            <label className="customer-label" htmlFor="" style={{marginRight: '50px'}}>Giao tận nơi</label>
                            <input className="customer-checkbox" type="checkbox" />
                            <label className="customer-label" htmlFor="">Nhận tại cửa hàng</label><br />
                            <div className="cart-receive-address">
                                <div className="padding-20">
                                    <select className="cart-select" name="" id="" style={{marginBottom: 15, marginRight: 15}} onChange={(e) => setCity(e.target.value)} value={city} onClick={handleProvince}>
                                        <option value="00">Chọn Tỉnh / Thành Phố</option>
                                        {dataprovinces.map((obj, index) => {
                                            return(
                                                <>
                                                    <option value={obj.code} key={index}>{obj.name}</option>
                                                </>
                                            )})}
                                        {/* <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
                                        <option value="Hà Nội">Hà Nội</option> */}
                                    </select>
                                    <select className="cart-select" name="" id="" placeholder="Chọn Quận / Huyện" onChange={(e) => setDistrict(e.target.value)} value={district} onClick={handleDistrict}>
                                        <option value="00">Chọn Quận / Huyện</option>
                                        {
                                            datadistricts.map((obj, index) => {
                                                return(
                                                    <>
                                                        <option key={index} value={obj.code}> 
                                                        {obj.name}
                                                        </option>  
                                                    </>)
                                                }
                                            )
                                        }
                                        {/* <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
                                        <option value="Hà Nội">Hà Nội</option> */}
                                    </select>
                                    <select className="cart-select" name="" id="" style={{marginRight: 15}}>
                                        <option value="">Chọn Phường / Xã</option>
                                        {
                                            datawards.map((obj, index) => {
                                                return(
                                                    <>
                                                        <option key={index} value={obj.code}> 
                                                        {obj.name}
                                                        </option>  
                                                    </>)
                                                }
                                            )
                                        }
                                    </select>
                                    <input type="text" placeholder="Số nhà, Tên đường" className="cart-receive-input" onChange={(e) => setAddress(e.target.value)} value={address}/>
                                </div>
                            </div>
                            <input type="text" className="cart-receive-note" placeholder="Nhập ghi chú(nếu có)"/>
                        </div>
                    </div>
                    <hr className="hr-content" />
                    <div>
                        <div className="margin-30 display-grid">
                            <div className="cart-payment">
                                <strong>Tổng tiền:</strong>
                                <span><NumberFormatter number={parseFloat(total)}/></span>
                            </div><br />
                            <hr /><br />
                            <div>
                                <input className="customer-checkbox" type="checkbox" checked="true"/>
                                <label className="customer-label" htmlFor="">Tôi đồng ý với <a href="">Chính sách xử lý dữ liệu cá nhân</a> của TopZone</label><br />
                            </div>
                            <button className="cart-order" type="submit">Đặt hàng</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </>
    )}
    else{
        return(
            <>
            <Header/>
            <div className="cart-continent">
                <div className="cart-content">
                <form onSubmit={handleSubmit}>
                    <div className="cart-products">
                        {/* {
                            data.map((obj, index) => {
                                return(
                                    <div key={index} className="cart-product">
                                        <div className="cart-product-img">
                                            <img src={obj.thumbnail} alt="" />
                                            <button onClick={(e) => deleteitem(e, index, obj.id)} className="btn-delete">Xóa</button>
                                        </div>
                                        <div className="cart-product-content">
                                            <div className="cart-product-content-1">
                                                <p>{obj.ProductDescription}</p>
                                                <strong><NumberFormatter number={parseFloat(obj.price * (100 - obj.discount)/100)}/></strong>
                                                <s><NumberFormatter number={parseFloat(obj.price)}/></s>
                                            </div>
                                        </div>
                                        <div className="cart-product-content">
                                            <div className="cart-product-content-1">
                                                <p>Màu: {obj.color.name_color}</p>
                                                <div className="cart-amount">
                                                    <button onClick={(e) => decrement(e, index)}>-</button>
                                                    <input name={`amount_${index}`} id={index} type="text" defaultValue="1" />
                                                    <button onClick={(e) => increment(e, index)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                )
                            })
                        } */}
                        <div className="cart-total">
                            <div className="cart-total-left">
                                <strong>Tạm tính</strong>
                                <span>({count} sản phẩm)</span>
                            </div>
                            <div className="cart-total-right">
                                <strong><NumberFormatter number={total}/></strong>
                            </div>
                        </div>
                    </div>
                    <hr className="hr-content" />
                    <div className="cart-customer">
                        <div className="margin-30">
                            <strong>Thông tin khách hàng</strong><br />
                            <input className="customer-checkbox" type="checkbox" />
                            <label className="customer-label" htmlFor="" style={{marginRight: '50px'}}>Anh</label>
                            <input className="customer-checkbox" type="checkbox" />
                            <label className="customer-label" htmlFor="">Chị</label><br />
                            <input className="customer-input" type="text" placeholder="Họ và Tên" style={{marginRight:"10px"}} onChange={(e) => setName(e.target.value)} value={name}/>
                            <input className="customer-input" type="phone" placeholder="Số điện thoại" onChange={(e) => setPhone(e.target.value)} value={phone}/>
                            <input className="customer-input-lg" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        </div>
                    </div> 
                    <hr className="hr-content" />
                    <div className="cart-receive">
                        <div className="margin-30">
                            <strong>Chọn hình thức nhận hàng</strong><br />
                            <input className="customer-checkbox" type="checkbox" />
                            <label className="customer-label" htmlFor="" style={{marginRight: '50px'}}>Giao tận nơi</label>
                            <input className="customer-checkbox" type="checkbox" />
                            <label className="customer-label" htmlFor="">Nhận tại cửa hàng</label><br />
                            <div className="cart-receive-address">
                                <div className="padding-20">
                                    <select className="cart-select" name="" id="" style={{marginBottom: 15, marginRight: 15}} onChange={(e) => setCity(e.target.value)} value={city}>
                                        <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
                                        <option value="Hà Nội">Hà Nội</option>
                                    </select>
                                    <select className="cart-select" name="" id="" placeholder="Chọn Quận / Huyện" onChange={(e) => setDistrict(e.target.value)} value={district}>
                                        <option value="">Chọn Quận / Huyện</option>
                                        <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
                                        <option value="Hà Nội">Hà Nội</option>
                                    </select>
                                    <select className="cart-select" name="" id="" style={{marginRight: 15}}>
                                        <option value="">Chọn Phường / Xã</option>
                                        <option value="">Thành phố Hồ Chí Minh</option>
                                        <option value="">Hà Nội</option>
                                    </select>
                                    <input type="text" placeholder="Số nhà, Tên đường" className="cart-receive-input" onChange={(e) => setAddress(e.target.value)} value={address}/>
                                </div>
                            </div>
                            <input type="text" className="cart-receive-note" placeholder="Nhập ghi chú(nếu có)"/>
                        </div>
                    </div>
                    <hr className="hr-content" />
                    <div>
                        <div className="margin-30 display-grid">
                            <div className="cart-payment">
                                <strong>Tổng tiền:</strong>
                                <span><NumberFormatter number={parseFloat(total)}/></span>
                            </div><br />
                            <hr /><br />
                            <div>
                                <input className="customer-checkbox" type="checkbox" checked="true"/>
                                <label className="customer-label" htmlFor="">Tôi đồng ý với <a href="">Chính sách xử lý dữ liệu cá nhân</a> của TopZone</label><br />
                            </div>
                            <button className="cart-order" type="submit">Đặt hàng</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </>
        )
    }
}
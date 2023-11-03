import { useEffect, useState } from "react";
import Header from "../containers/Header";
import CarouselMinimal from "../components/CarouselMinimal";
import Carousels from "../components/Carousel";
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';
import NumberFormatter from "../components/NumberFormater";
import axios from 'axios'
import Cookies from "universal-cookie";
import React from "react";
import Collapse from "@kunukn/react-collapse";
import '../assets/css/Collapse.css';
import Down from "../components/Down";
import { useReducer } from "react";
import Swal from "sweetalert2";

const initialState = [];
function reducer(state, { type, index }) {
    switch (type) {
      case "expand-all":
        return [true, true, true];
      case "collapse-all":
        return [false, false, false];
      case "toggle":
        let newState = [...state];
        newState[index] = !newState[index];
        return newState;
  
      default:
        throw new Error("reducer configuration");
    }
}

function Block({ isOpen, title, onToggle, children }) {
    return (
      <div className="block">
        <button className="btn toggle" onClick={onToggle}>
          <span>{title}</span>
          <Down isOpen={isOpen} />
        </button>
        <Collapse isOpen={isOpen}>{children}</Collapse>
      </div>
    );
  }
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

export default function Product(){
    const id = useParams().id
    const [data, setData] = useState([])
    const [datasimilar, setDataSimilar] = useState([])
    const [images, setImages] = useState('')
    const [groupSpecifications, setGroupSpecification] = useState([])
    const [state, SetState] = useReducer(reducer, initialState);
    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/api/product/${id}`).then(resp =>{
            setData(resp.data)
        })
        axios.get(`http://127.0.0.1:8000/api/imageofproduct/${id}`).then(resp =>{
            setImages(resp.data)
        })
        axios.get(`http://127.0.0.1:8000/api/productsimilar/${id}`).then(resp =>{
            setDataSimilar(resp.data)
        })
        axios.get(`http://127.0.0.1:8000/api/specification/${id}`).then(resp =>{
            setGroupSpecification(resp.data)
        })
    }, []);

    const setCookies = async (id) =>
    {
        const cookie = new Cookies();
        if(cookie.get('products') == undefined){
            const array = [id]
            cookie.set('products', JSON.stringify(array), {path: '/'})
        }
        else{
            const arrayCookie = cookie.get('products')
            var check = false;
            for(var i = 0; i < arrayCookie.length; i++){
                if(arrayCookie[i] == id){
                    check = true;
                }
            }
            if(check == false){
                arrayCookie.push(id)
                cookie.set('products', JSON.stringify(arrayCookie), {path: '/'})
            }
        }
        toastMixin.fire({
            animation: true,
            title: 'Thêm vào giỏ hàng thành công'
          });
    }

    if(data == [] || images == '' || datasimilar == [] || groupSpecifications == []){
        return(
            <>
                <Header/>
            </>
        )
    }
    else{
    return(
        <>
            <Header/>
            <br />
            <div className="continent">
                <div className="content-product">
                    <div className="content-product-left">
                        <CarouselMinimal data={images}/>
                    </div>
                    <div className="content-product-right">
                        <h1>{data.product_description}</h1>
                        <div className="price-detail">
                            <h2><NumberFormatter number={data.price * (100 - data.discount)/100}/></h2>
                            <h3><NumberFormatter number={data.price}/></h3>
                            <span>-{data.discount}%</span>
                        </div>
                        <br />
                        <p>Phiên Bản</p>
                        <br />
                        {
                            data.versions.map((obj, index) => (
                                <Link 
                                    key={index}
                                    className={data.version === obj.version ? "memory active" : "memory"}
                                    onClick={() => { window.location.href = '/product/' + obj.id.id; }}
                                >
                                    {obj.version}
                                </Link>
                            ))
                        }
                        <br />
                        <br />
                        <p>Màu: {data.color.name_color}</p>
                        <div className="flex-gap-20">
                            {
                                data.colors.map((obj, index) =>(
                                    <button 
                                        key={index} 
                                        className={data.color.code_color === obj.code_color? "color active-color" : "color"} 
                                        style={{backgroundColor:"#" + obj.code_color}}
                                        onClick={() => { window.location.href = '/product/' + obj.productid; }}
                                    ></button>
                                ))
                            }
                        </div>
                        <br />
                        <div className="promotion">
                            <div className="padding-20">
                                <strong>Khuyến mãi</strong><br />
                                <span>Giá và khuyến mãi dự kiến áp dụng đến 23:00h hôm nay</span>
                                <hr />
                                <ul>
                                    <li>
                                    Thu cũ Đổi mới: Giảm đến 2 triệu (Tùy model máy cũ, không kèm các hình thức thanh toán online, mua kèm)
                                    <a href="">Xem chi tiết</a>
                                    </li>
                                    <li>
                                    Vòng quay may mắn: Giảm thêm 100.000đ - 500.000đ (Chỉ áp dụng tại siêu thị; Không áp dụng kèm Thu cũ Đổi mới)
                                    <a href="">Xem chi tiết</a>
                                    </li>
                                    <li>
                                    Hoàn tiền nếu ở đâu rẻ hơn (Trong vòng 7 ngày; chỉ áp dụng tại siêu thị)
                                    <a href="">Xem chi tiết</a>
                                    </li>
                                    <li>
                                    Nhập mã VNPAY789 giảm tối đa 150K cho đơn hàng từ 05 Triệu thanh toán qua VNPAY 
                                    <a href="">Xem chi tiết</a>
                                    </li>
                                    <li>
                                    Nhập mã MMTGDD giảm tối đa 100.000đ khi thanh toán qua MOMO
                                    <a href="">Xem chi tiết</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <br />
                        <button className="btn-buy" onClick={() => setCookies(data.id)}>Mua ngay</button>
                        <div className="flex-gap-10">
                            <button className="btn-buy-company">
                                <strong>Mua trả góp</strong><br />
                                <span>Qua công ty tài chính</span>
                            </button>
                            <button className="btn-buy-card">
                                <strong>Trả góp qua thẻ</strong><br />
                                <span>Visa, Mastercard, JCB, Amex</span>
                            </button>
                        </div>
                    </div>
                </div>   
            </div>
            <div className="continent">
                <h2 style={{color:"white"}}>Các sản phẩm khác của {data.product_name}</h2>
                <br />
                <Carousels data={datasimilar} links={'/product/'}/>
            </div>
            <div className="continent-specification">
                <div className="area-specification">
                    <button className="btn-specification">Thông số kỹ thuật</button>
                </div>
                {
                    groupSpecifications.map((obj, index) => (
                        <div>
                            <Block
                                key={index}
                                title={obj.name}
                                isOpen={state[index]}
                                onToggle={() => SetState({ type: "toggle", index: index })}
                            >    
                                {obj.specification.map((object, id) => (
                                    <>
                                        <div className="area-specification" key={id}>
                                            <div className="content-specification">
                                                <div className="specification-left">
                                                    <span>{object.name}:</span>
                                                </div>
                                                <div className="specification-right">
                                                    <span>{object.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                ))}
                            </Block>
                        </div>
                    ))
                }
            </div>
        </>
    )}
}
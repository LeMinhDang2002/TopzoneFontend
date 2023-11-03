import Header from "../containers/Header";
import SliderChild from "../components/SlideChild";
import Items from "../components/Item";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function ShowCategory(props){
    const data = [
        {
          image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1170x300/https://cdn.tgdd.vn/2023/06/banner/iPhone11-2400-600-1920x480.png",
        },
        {
          image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1170x300/https://cdn.tgdd.vn/2023/06/banner/ip14-AW-S8-2400-600-1920x480.png",
        },  
    ];
    const [products, setProducts] = useState([])
    const [subcategory, setSubcategory] = useState([])

    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/api/${lastSegment}`).then(response =>{
          setProducts(response.data)
        })
        axios.get(`http://127.0.0.1:8000/api/subcategory/${lastSegment}`).then(response =>{
          setSubcategory(response.data)
        })
    }, [])
    const getAllTypeProduct = async () => {
        await axios.get(`http://127.0.0.1:8000/api/${lastSegment}`).then(response =>{
            setProducts(response.data)
        })
    }
    const getTypeProduct = async (type) => {
        await axios.get(`http://127.0.0.1:8000/api/productofcategory/${type}`).then(response =>{
            setProducts(response.data)
        })
    }
    const RedirectPage = async (type) => {
        await axios.get(`http://127.0.0.1:8000/api/${type}`).then(response =>{
            setProducts(response.data)
          })
        await axios.get(`http://127.0.0.1:8000/api/subcategory/${type}`).then(response =>{
            setSubcategory(response.data)
          })
    }
    if(products == [] || subcategory == []){
        return(
            <>
                <Header/>
            </>
        )
    }
    return(
        <>
            <div className='header'>
                <div className='header-content'>
                    <div className='header-left'>
                        <ul>
                            <li><Link to={"/"} className='topzone-logo'><div></div></Link></li>
                            <li><Link to={"/"} className='apple-logo'><div></div></Link></li>
                        </ul>
                    </div>
                    <div className='header-mid'>
                        <ul>
                            <li><Link className='a-nav' to={"/products/iphones"} onClick={() => RedirectPage('iphones')}>Iphone</Link></li>
                            <li><Link className='a-nav' to={"/products/macs"} onClick={() => RedirectPage('macs')}>Mac</Link></li>
                            <li><Link className='a-nav' to={"/products/ipads"} onClick={() => RedirectPage('ipads')}>Ipad</Link></li>
                            <li><Link className='a-nav' to={"/products/watches"} onClick={() => RedirectPage('watches')}>Watch</Link></li>
                            <li><Link className='a-nav' to={"/products/sounds"} onClick={() => RedirectPage('sounds')}>Âm thanh</Link></li>
                            <li><Link className='a-nav' to={"/posts"}>TekZone</Link></li>
                            <li><Link className='a-nav' to>TopCare</Link></li>
                        </ul>
                    </div>
                    <div className='header-right'>
                        <ul>
                            {/* <li>
                                <Link><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3ZM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8Z"/></svg></Link>
                            </li> */}
                            <li><Link to={'/cart'}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M8.418 3.25c.28-.59.884-1 1.582-1h4c.698 0 1.301.41 1.582 1c.683.006 1.216.037 1.692.223a3.25 3.25 0 0 1 1.426 1.09c.367.494.54 1.127.776 1.998l.742 2.722l.28.841l.024.03c.901 1.154.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91c-.858-3.431-1.287-5.147-.386-6.301l.024-.03l.28-.841l.742-2.722c.237-.871.41-1.505.776-1.999a3.25 3.25 0 0 1 1.426-1.089c.476-.186 1.008-.217 1.692-.222Zm.002 1.502c-.662.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.176.237-.28.568-.57 1.635l-.57 2.089C6.384 9 7.778 9 9.684 9h4.631c1.907 0 3.3 0 4.32.18l-.569-2.089c-.29-1.067-.394-1.398-.57-1.635a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118A1.75 1.75 0 0 1 14 5.75h-4a1.75 1.75 0 0 1-1.58-.998Z" clip-rule="evenodd"/></svg></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="text-align">
                <h2 className="object">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 15 15"><path fill="currentColor" d="M7.875 2.937A.371.371 0 0 1 7.5 2.57C7.5 1.15 8.676 0 10.124 0a.37.37 0 0 1 .375.367c0 1.42-1.175 2.57-2.624 2.57Z"/><path fill="currentColor" d="M7.875 2.937A.371.371 0 0 1 7.5 2.57C7.5 1.15 8.676 0 10.124 0a.37.37 0 0 1 .375.367c0 1.42-1.175 2.57-2.624 2.57Zm5.475 7.731c.145.106.192.3.11.458C12.14 13.712 11.087 15 10.125 15c-.448 0-.888-.142-1.317-.418a1.985 1.985 0 0 0-2.073-.044c-.52.305-1.015.462-1.485.462c-1.415 0-3.75-4.267-3.75-6.608c0-2.5 1.339-4.406 3.375-4.406c.958 0 1.785.138 2.48.419c.294.118.627.11.914-.025c.564-.266 1.308-.394 2.23-.394c1.127 0 2.11.55 2.926 1.615a.362.362 0 0 1-.075.514c-.911.67-1.35 1.421-1.35 2.277c0 .855.439 1.607 1.35 2.276Z"/><path fill="currentColor" d="M13.35 10.668c.145.106.192.3.11.458C12.14 13.712 11.087 15 10.125 15c-.448 0-.888-.142-1.317-.418a1.985 1.985 0 0 0-2.073-.044c-.52.305-1.015.462-1.485.462c-1.415 0-3.75-4.267-3.75-6.608c0-2.5 1.339-4.406 3.375-4.406c.958 0 1.785.138 2.48.419c.294.118.627.11.914-.025c.564-.266 1.308-.394 2.23-.394c1.127 0 2.11.55 2.926 1.615a.362.362 0 0 1-.075.514c-.911.67-1.35 1.421-1.35 2.277c0 .855.439 1.607 1.35 2.276Z"/></svg>
                Apple
                </h2>
            </div>
            <SliderChild slider={data}/>
            <div className="continent">
                <div className="content-iphone">
                    <div>
                        <Link onClick={() => getAllTypeProduct()} className="link-filter">Tất cả</Link>
                        {subcategory.map((obj, index) => {
                            return(
                                <Link key={index} onClick={() => getTypeProduct(obj.id)} className="link-filter">{obj.category_name}</Link>
                            );
                        })}
                    </div>
                    <br />
                    <br /><br />
                    <Items data={products} link={'/product/'}/>
                </div>
            </div>
        </>
    )
}
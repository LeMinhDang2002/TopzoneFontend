import Carousels from "../components/Carousel";
import Header from "../containers/Header";
import Navigation from "../containers/Navigation";
import Slideshow from "../containers/Slide";
import { useState, useEffect } from "react";
import axios from "axios";
import SubLink from "../components/SubLink";

function Home(){
    const [dataiphone, setDataiPhone] = useState([])
    const [datamac, setDataMac] = useState([])
    const [dataipad, setDataiPad] = useState([])
    const [datasound, setDataSound] = useState([])
    const [datawatch, setDataWatch] = useState([])
    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/api/iphones').then(response =>{
          setDataiPhone(response.data)
        })
        axios.get('http://127.0.0.1:8000/api/macs').then(response =>{
          setDataMac(response.data)
        })
        axios.get('http://127.0.0.1:8000/api/ipads').then(response =>{
          setDataiPad(response.data)
        })
        axios.get('http://127.0.0.1:8000/api/sounds').then(response =>{
          setDataSound(response.data)
        })
        axios.get('http://127.0.0.1:8000/api/watches').then(response =>{
          setDataWatch(response.data)
        })
    }, []);
    return(
        <>
            <Header/>
            <Slideshow/>
            <Navigation/>
            <SubLink type={'iphones'} title={'iPhone'}/>
            <Carousels data={dataiphone} links={'/product/'}/>
            <SubLink type={'macs'} title={'Mac'}/>
            <Carousels data={datamac} links={'/product/'}/>
            <SubLink type={'ipads'} title={'iPad'}/>
            <Carousels data={dataipad} links={'/product/'}/>
            <SubLink type={'sounds'} title={'Sound'}/>
            <Carousels data={datasound} links={'/product/'}/>
            <SubLink type={'watches'} title={'Watch'}/>
            <Carousels data={datawatch} links={'/product/'}/>
        </>
    )
}
export default Home;
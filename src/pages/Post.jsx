import Header from "../containers/Header"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Post(){
    const [dataPost, setDataPost] = useState([]);
    const [data3Post, setData3Post] = useState([]);
    const [categories, setCategories] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect( () =>{
        axios.get('http://127.0.0.1:8000/api/posts/allpost').then(response =>{
            setDataPost(response.data)
          })
        axios.get('http://127.0.0.1:8000/api/posts/3post').then(response =>{
            setData3Post(response.data)
          })
        axios.get('http://127.0.0.1:8000/api/posts/categoriespost').then(response =>{
            setCategories(response.data);
            setLoad(false);
          })
    },[]);
    const getTypePost = async (url) => {
        await axios.get(`http://127.0.0.1:8000/api/posts/${url}`).then(response =>{
            setDataPost(response.data)
        })
    }
    
    if(load == true)
    {
        return(
            <>
                <Header />
            </>
        )
    }else{
        return(
            <>
                <Header/>
                <div className="continent">
                    <div className="area-post">
                        <div className="post-new">
                            <div className="post-new-left">
                                <img src={data3Post[0].link_thumbnail} alt="" />
                                <h3 className="post-new-h3">{data3Post[0].title}</h3>
                            </div>
                            <div className="post-new-right">
                                <div className="post-new-right-div">
                                    <img src={data3Post[1].link_thumbnail} alt="" />
                                    <h4 className="post-new-h4">{data3Post[1].title}</h4>
                                </div>
                                <div className="post-new-right-div">
                                    <img src={data3Post[2].link_thumbnail} alt="" />
                                    <h4 className="post-new-h4">{data3Post[2].title}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="area-btn-post">
                            {
                                categories.map((obj, index) => (
                                    <>
                                        <button key={index} onClick={() => getTypePost(obj.url)} className="btn-post">
                                            <img src={obj.thumbnail} alt="" />
                                            <p>{obj.category_name}</p>
                                        </button>
                                    </>))
                            }
                        </div>
                        <div className="list-post">
                            {
                                dataPost.map((obj, index) => (
                                    <>
                                        <a key={index} className="link-post" href={obj.url} target="_blank">
                                            <div>
                                                <img src={obj.link_thumbnail} alt="" />
                                            </div>
                                            <div>
                                                <h2>{obj.title}</h2>
                                                <span>3 giờ trước</span>
                                            </div>
                                        </a>
                                        <hr />
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
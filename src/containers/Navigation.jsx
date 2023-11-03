import { Link } from "react-router-dom"
const images = [
    {link:"/products/iphones",name: "iPhone", image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/mwgcart/topzone/images/desktop/img-cateiphone-1.png"},
    {link:"/products/macs",name: "Mac", image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/mwgcart/topzone/images/desktop/img-catemac-1.png"},
    {link:"/products/ipads",name: "iPad", image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/mwgcart/topzone/images/desktop/img-cateipad.png?v=3"},
    {link:"/products/watches",name: "Watch", image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/mwgcart/topzone/images/desktop/img-catewatch-1.png?v=2"},
    {link:"/products/sounds",name: "Âm thanh", image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/mwgcart/topzone/images/desktop/img-catesound.png"},
    {link:"",name: "Phụ kiện", image: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/mwgcart/topzone/images/desktop/img-catephukien-1.png?v=2"},
]

export default function Navigation(){
    return (
        <div className="continent margin-top-50">
            <div className="nav-content">
                {images.map((obj, index) => (
                    <Link key={index} to={obj.link} className="nav-link-image">
                        <div>
                        <img src={obj.image} alt="" />
                        </div>
                    <p>{obj.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
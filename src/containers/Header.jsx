
import { Link } from "react-router-dom";

function Header(){
    return(
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
                        <li><Link className='a-nav' to={"/products/iphones"}>Iphone</Link></li>
                        <li><Link className='a-nav' to={"/products/macs"}>Mac</Link></li>
                        <li><Link className='a-nav' to={"/products/ipads"}>Ipad</Link></li>
                        <li><Link className='a-nav' to={"/products/watches"}>Watch</Link></li>
                        <li><Link className='a-nav' to={"/products/sounds"}>Âm thanh</Link></li>
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
        // <Slideshow />
    )
}
export default Header;
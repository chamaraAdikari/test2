import "./mailList.css";

const MailList = () => {
    return(
        <div className="mail">
            <div className="mailContainer">
                <h1 className="mailTitle">Stay Updated. Stay Traveling.</h1>
                <span className="mainDesc">Stay in the loop. Discover more of Sri Lanka.</span>
                <div className="mailInputContainer">
                    <input type="text" placeholder="Your Email"/>
                    <button>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default MailList;
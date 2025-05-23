import "./footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="fLists">
                {/* Quick Links */}
                <ul className="fList">
                    <h4 className="fTitle">Quick Links</h4>
                    <li className="listItem">Home</li>
                    <li className="listItem">About Us</li>
                    <li className="listItem">Contact</li>
                    <li className="listItem">Blog</li>
                    <li className="listItem">FAQs</li>
                </ul>

                {/* Explore */}
                <ul className="fList">
                    <h4 className="fTitle">Explore</h4>
                    <li className="listItem">Top Destinations</li>
                    <li className="listItem">Hotels in Anuradhapura</li>
                    <li className="listItem">Coastal Stays</li>
                    <li className="listItem">Hill Country Escapes</li>
                    <li className="listItem">Cultural Experiences</li>
                </ul>

                {/* For Partners */}
                <ul className="fList">
                    <h4 className="fTitle">For Partners</h4>
                    <li className="listItem">List Your Property</li>
                    <li className="listItem">Partner Login</li>
                    <li className="listItem">Become a Host</li>
                    <li className="listItem">Property Support</li>
                </ul>

                {/* Legal */}
                <ul className="fList">
                    <h4 className="fTitle">Legal</h4>
                    <li className="listItem">Terms & Conditions</li>
                    <li className="listItem">Privacy Policy</li>
                    <li className="listItem">Cancellation Policy</li>
                    <li className="listItem">Cookie Policy</li>
                </ul>

                {/* Stay Connected */}
                <ul className="fList">
                    <h4 className="fTitle">Stay Connected</h4>
                    <li className="listItem">Subscribe to Updates</li>
                    <li className="listItem">Follow Us on Social Media</li>
                    <li className="listItem">Feedback & Suggestions</li>
                </ul>
            </div>
            <div className="fText">
                Copyright © 2025 Ceylon-Bookin. | Powered by 
                <a href="https://thenula.netlify.app/" target="_blank" rel="noopener noreferrer" className="footerLink"> Thenula</a>
            </div>
        </div>
    );
};

export default Footer;

import React from 'react'
import "./Footer.css"

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className='footer-content-left'>
                    <img src="logo.svg" alt="" />
                    <p>Empower your career with our AI-driven resume builder. Seamlessly create professional resumes tailored to your skills and experience, all with the guidance of cutting-edge AI technology. Start crafting your standout resume today and take the next step in your career journey with ease!</p>
                    <div className="footer-social-icon">
                        <img src="facebook_icon" alt="" />
                        <img src="twitter_icon" alt="" />
                        <img src="linkedin_icon" alt="" />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>Company</h2>
                    <ul>
                        <a href='/'><li>Home</li></a>
                        <a href='/'><li>About</li></a>
                        <a href="https://shoaibakhtar.org/contact"><li>Contact</li></a>
                        <a href="https://shoaibakhtar.org/privacy-policy"><li>Privacy Policy</li></a>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>8409024123</li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <hr />
            <p>Copyright 2024 &copy; Ai Resume Builder - All Right Reserved. Powered By <a href='https://shoaibakhtar.org'>SHOAIBAKHTAR.ORG</a></p>
        </div>
    )
}

export default Footer

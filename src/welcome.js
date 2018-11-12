import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Registration } from './registration.js';
import { Link } from 'react-router-dom';

import { Login } from './login';


export function Welcome() {
    return (
        <HashRouter>
            <div className="container">
                <div className="header">
                    <div>
                        <Link className="no-underline" to="/login"><p className="logo"><i className="logo logohover far fa-bookmark"></i> Authors<span className="pink">In</span>Town</p></Link>
                    </div>
                    <div>
                        <Link className="btn menubtn" to="/login">Login</Link>
                        <Link className="btn menubtn" to="/register">Register</Link>

                    </div>
                </div>

                <div className="homepage-hero-module">
                    <div className="video-container">
                        <div className="filter"></div>
                        <video autoPlay loop className="fillWidth">
                            <source src="/videos/Candolim-Beach.jpg" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
                            <source src="/videos/Candolim-Beach.mp4" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
                        </video>
                        <div className="poster hidden">
                        </div>
                    </div>
                </div>
                <div className="welcome-box">
                    <h1>Welcome to Authors In Town</h1>
                    <p>Carrot cake jelly-o jujubes cotton candy. Pastry halvah biscuit marzipan halvah. Icing toffee jelly-o gingerbread cupcake jelly-o. </p>
                    <ul>
                        <li><i className="fas fa-book welcomeicon"></i> Amazing reason number 1 to sign up</li>
                        <li><i className="fas fa-book welcomeicon"></i> This point is sooooo good</li>
                        <li><i className="fas fa-book welcomeicon"></i> Still reading?</li>
                        <li><i className="fas fa-book welcomeicon"></i> I hope you like Jasper Fforde</li>
                    </ul>

                    <div className="postform inline">
                        <Link className="inline loginlink" to="/register">
                            <button className="btn inline" >Register</button>
                        </Link>
                    </div>
                    <div className="postform inline">
                        <Link className="inline loginlink bluebackground" to="/register/author">
                            <button className="btn" id="bluebackground">Author Register</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <Route exact path="/register" component={Registration} />
                    <Route exact path="/register/author" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </div>
        </HashRouter>
    );
}

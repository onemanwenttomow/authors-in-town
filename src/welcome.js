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
                        <li>Point 1</li>
                        <li>Point 2</li>
                        <li>Point 3</li>
                        <li>Point 4</li>
                    </ul>

                    <div className="postform">
                        <Link className="inline right loginlink blue" to="/register">
                            <button className="btn" >Register</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <Route exact path="/register" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </div>
        </HashRouter>
    );
}

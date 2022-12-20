import { useContractKit } from '@celo-tools/use-contractkit'
import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
} from "react-router-dom";
import Trade from './trade';
import SwapCoin from './swap';
import landing from './landing';


interface PriceValue {
    [key: string]: number
}
export default function Navbar() {


    const [price, setPrice] = useState(0.500);
    const [loading, setLoading] = useState(true);
    const [toggleMenu, setToggleMenu] = useState(false)


    const { connect, address } = useContractKit();
    const fetchPrice = () => {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=celo&vs_currencies=usd")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.usd);
                setPrice(data.celo.usd);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {

        const interval = setInterval(() => {
            fetchPrice()
        }, 4000)


        return () => clearInterval(interval)

    }, [])


    type Params = {
        separator?: 'braces' | 'brackets' | 'parenthesis';
    };

    const opening = {
        braces: '{',
        brackets: '[',
        parenthesis: '(',
    };

    const closing = {
        braces: '}',
        brackets: ']',
        parenthesis: ')',
    };
    function shorten(address: string, { separator }: Params = {}) {
        const match = address.match(/^(0x[a-zA-Z0-9])[a-zA-Z0-9]+([a-zA-Z0-9])$/);

        return match
            ? `0x${address.slice(2, 2 + 4)}${separator ? opening[separator] : ''}…${separator ? closing[separator] : ''
            }${address.slice(address.length - 4)}`
            : address;
    }
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    return (
        <>
            <Router>
                <div>
                    <nav>
                        <div className='nav-logo'>
                            <Link to="/">CSWAP
                            </Link>
                        </div>
                        {(toggleMenu && (
                            <div className='mobile-nav'>
                                <ul className='list'>
                                    <div className='nav-items'>
                                        <Link to="/trade">Trade</Link>
                                    </div>
                                    <div className='nav-items'>
                                        <Link to="/swap">Swap</Link>
                                    </div>
                                    <div> {loading ? (
                                        <div className='nav-item price loading-price'>
                                            <>
                                                <span className='nav-price-text'>
                                                    celo today
                                                </span>
                                                $
                                            </>
                                        </div>) : (
                                        <div className='price'>
                                            <>
                                                <span className='nav-price-text'>
                                                    celo today
                                                </span>
                                                ${price}
                                            </>
                                        </div>)
                                    }</div>
                                </ul>
                            </div>
                        ))}
                        <div className='nav-link'>
                            <div className='nav-item'>
                                <Link to="/trade">Trade</Link>
                            </div>
                            <div className='nav-item'>
                                <Link to="/swap">Swap</Link>
                            </div>
                            <div className='nav-item price-container'>
                                {loading ? (
                                    <div className='nav-item price loading-price'>
                                        <>
                                            <span className='nav-price-text'>
                                                celo today
                                            </span>
                                            $
                                        </>
                                    </div>) : (
                                    <div className='price'>
                                        <>
                                            <span className='nav-price-text'>
                                                celo today
                                            </span>
                                            ${price}
                                        </>
                                    </div>)
                                }
                            </div>

                            {address ? (
                                <div className='nav-item wallet-nav'>Connected to {shorten(address)} </div>
                            ) : (
                                <button className='nav-item wallet-nav' onClick={connect}>Connect wallet</button>
                            )
                            }
                        </div>
                        <a id="menu-icon" className="menu-icon responsive" onClick={toggleNav}>
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#3d2b7c" stroke-width="2" stroke-linecap="butt" stroke-linejoin="arcs"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </a>
                    </nav>
                    <Route path="/" exact component={landing} />
                    <Route path="/trade" exact component={Trade} />
                    <Route path="/swap" component={SwapCoin} />
                </div>
            </Router>
        </>
    )
}



import { connected } from 'process';
import { ethers } from "ethers";
import React, { useState, useEffect } from 'react'

let userAddress = ('0xD38F6813a941f3ec7924B38494CeC8FeFfeacFe7')
const apiUrl = "https://explorer.celo.org/mainnet/api?module=stats&action=coinprice"


export default function Navbar() {

    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);

    // const provider = new ethers.providers.Web3Provider(
    //     (window as any).ethereum
    // );
    // const userAddresses = async () => {
    //     return provider.listAccounts()
    // };
    useEffect(() => {
        fetch("https://explorer.celo.org/mainnet/api?module=stats&action=coinprice")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPrice(data.coin_usd);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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

    return (
        <>
            <nav>
                <div className='nav-logo'>CSWAP</div>
                <div className='nav-link'>
                    <div className='nav-item'>Trade</div>
                    <div className='nav-item'>Swap</div>
                    {
                        !loading && (
                            <div className='nav-item'>${price}</div>
                        )
                    }
                    {
                        connected && (
                            <div className='nav-item wallet-nav'>{shorten(userAddress)}</div>
                        )
                    }
                    <div className='nav-item wallet-nav'>connect wallet</div>
                </div>
            </nav>
        </>
    )
}

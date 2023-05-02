import Link from 'next/link';
import React from 'react'

const Footer = () => {
    const footLinks = [
        { name: 'About', link: '/about' },
        { name: 'Privacy', link: '/privacy' },
        { name: 'Terms', link: '/terms' },
    ];

    return (
        <>
        <div className='useful-link'>
            <ul className="useful-link-items">
                {
                    footLinks.map(({name, link}, index) => (
                        <li className="useful-link-items-item" key={index}>
                            <Link href={link} className='link'>{name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
        <div className="copyrights">
            Copyright © 2023 <Link href='https://waynedev.vercel.app' className='link' target='_blank'>Wayne Development</Link>.<br />All rights reserved.
        </div>
        </>
    )
}

export default Footer
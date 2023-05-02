import Logo from '@/components/Logo';
import Link from 'next/link';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';
import { useRouter } from 'next/router';


const Navbar = () => {
    const secLinks = [
        { name: 'Recent Blogs', link: '/#recentblogs' },
        { name: 'About', link: '/about' },
        { name: 'Blog', link: '/blog/' },
        { name: 'Contact', link: '/contact' },
    ];

    const router = useRouter();

    const navRef = useRef<HTMLUListElement>(null);

    const [NavbarVisible, setNavbarVisible] = useState(false);
    const [responsiveNavVisible, setresponsiveNavVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.pageYOffset > 100 ? setNavbarVisible(true) : setNavbarVisible(false);
        })
    }, []);

    useEffect(() => {
        const html = document.querySelector('html');
        html?.addEventListener('click', () => setresponsiveNavVisible(false));

    }, []);

    useEffect(() => {
        const main = document.querySelector('main');
        if (responsiveNavVisible) {
            main?.classList.add('blur');
        } else {
            main?.classList.remove('blur');
        }
    }, [responsiveNavVisible]);

    return (
        <nav>
            <div className={`wrapper ${NavbarVisible ? 'blur-nav' : ''}`}>
                <div className="brand">
                    <div className="brand-logo">
                        <Link href='/'><Logo /></Link>
                    </div>
                    <div className="brand-text">
                        <Link href='/'>ayneBlogs</Link>
                    </div>
                </div>
                <div className="nav-responsive-toggle">
                    {responsiveNavVisible ? (
                        <CgClose
                            onClick={(e) => {
                                e.stopPropagation();
                                setresponsiveNavVisible(false);
                            }}
                        />
                    ) : (
                        <GiHamburgerMenu
                            onClick={(e) => {
                                e.stopPropagation();
                                setresponsiveNavVisible(true);
                            }}
                        />
                    )}
                </div>

                <div className={`${responsiveNavVisible && 'nav-responsive'} nav-items`} onClick={(e) => e.stopPropagation() }>
                    <ul ref={navRef} className="nav-items-list">
                        {secLinks.map(({ name, link }, index) => (
                            <li key={index} className='nav-items-list-item'>
                                <Link href={link}>
                                    <div className="nav-items-list-item-link"
                                        onClick={(e) => {
                                            setresponsiveNavVisible(false);
                                        }}
                                    >{name}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
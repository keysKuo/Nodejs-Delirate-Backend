import '../../assets/mdb/css/bootstrap.min.css';
import '../../assets/mdb/css/mdb.min.css';
import { Link } from 'react-router-dom';
import { Image, Input } from 'react-ui';
import logo2 from '../../static/delirate-logo2.png'
import { useState } from 'react';

const navLinks = [
    {
        title: 'Dashboard',
        link: '#',
        children: [],
    },
    {
        title: 'Items',
        link: '#',
        children: [
            {
                title: 'All Items',
                link: '#',
            },
            {
                title: 'New Item',
                link: '#',
            },
        ],
    },
    {
        title: 'Orders',
        link: '#',
        children: [
            {
                title: 'All Orders',
                link: '#',
            },
        ],
    },
];

export default function Navigation() {
    const [ activeLinkIndex, setActiveLinkIndex] = useState(null);
    const [ navPosition, setNavPosition ] = useState('0')
    const handleLinkClick = (index) => {
        if(index === activeLinkIndex) {;
            setActiveLinkIndex(null);
        }
        else {
            setActiveLinkIndex(index);
        }
      // Set the active link index when a link is clicked
    };

    const toogleSideNav = () => {
        setNavPosition((prev) => {
            if(prev === '-100%') {
                return '0'
            }else {
                return '-100%'
            }
        })
    }

    return (
        <div className="fixed-sn white-skin">
            <header>
                <div style={{transition: '0.5s ease', transform: `translateX(${navPosition})`}} id="slide-out" className="side-nav sn-bg-4 fixed">
                    <ul className="custom-scrollbar">
                        <li className="logo-sn waves-effect py-3">
                            <div className="text-center center-box">
                                <Link href="#" className="pl-0"><Image style={{ width: '36%'}} src={logo2} /></Link>
                            </div>
                        </li>
                        <li>
                            <form className="search-form" role="search">
                                <div className="md-form mt-0 waves-light">
                                    <Input type="text" className="form-control py-2" placeholder="Search" />
                                </div>
                            </form>
                        </li>

                        <li>
                            <ul className="collapsible collapsible-accordion">
                        {navLinks.map((nav, index) => {
                            return (
                                <>
                                    <li className={`${index === activeLinkIndex ? 'active' : ''}`} key={index}>
                                        <Link
                                            to={nav.link}
                                            onClick={() => handleLinkClick(index)}
                                            className={`collapsible-header waves-effect arrow-r ${
                                                index === activeLinkIndex ? 'active' : ''
                                            }`}
                                        >
                                            <i className="w-fa fas fa-tachometer-alt"></i>
                                            {nav.title}
                                            <i className="fas fa-angle-down rotate-icon"></i>
                                        </Link>
                                        <div className={`collapsible-body ${
                                                index === activeLinkIndex ? 'd-block' : '' }`}>
                                            <ul>
                                                {nav.children.map((n, childIndex) => {
                                                    return (
                                                        <>
                                                            <li key={childIndex}>
                                                                <Link to={n.link} className="waves-effect">
                                                                    {n.title}
                                                                </Link>
                                                            </li>
                                                        </>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </li>
                                </>
                            );
                        })}
                            </ul>
                        </li>
                        

                        {/* <li>
                            <ul className="collapsible collapsible-accordion">
                                <li className={`${isOpen ? 'active' : ''}`}>
                                    <Link onClick={() => setIsOpen(!isOpen)} className={`collapsible-header waves-effect arrow-r ${isOpen ? 'active' : ''}`}>
                                        <i className="w-fa fas fa-tachometer-alt"></i>Dashboards
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </Link>
                                    <div className={`collapsible-body ${isOpen ? 'd-block' : ''}`}>
                                        <ul>
                                            <li>
                                                <Link href="../dashboards/v-1.html" className="waves-effect">
                                                    Version 1
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../dashboards/v-2.html" className="waves-effect">
                                                    Version 2
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../dashboards/v-3.html" className="waves-effect">
                                                    Version 3
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../dashboards/v-4.html" className="waves-effect">
                                                    Version 4
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../dashboards/v-5.html" className="waves-effect">
                                                    Version 5
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../dashboards/v-6.html" className="waves-effect">
                                                    Version 6
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link className="collapsible-header waves-effect arrow-r">
                                        <i className="w-fa fas fa-image"></i>Pages
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </Link>
                                    <div className={`collapsible-body ${isOpen ? 'd-block' : ''}`}>
                                        <ul>
                                            <li>
                                                <Link href="../pages/login.html" className="waves-effect">
                                                    Login
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../pages/register.html" className="waves-effect">
                                                    Register
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../pages/pricing.html" className="waves-effect">
                                                    Pricing
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../pages/about.html" className="waves-effect">
                                                    About us
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../pages/single.html" className="waves-effect">
                                                    Single post
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../pages/post.html" className="waves-effect">
                                                    Post listing
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../pages/landing.html" className="waves-effect">
                                                    Landing page
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../pages/customers.html" className="waves-effect">
                                                    Customers
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../pages/invoice.html" className="waves-effect">
                                                    Invoice
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../pages/page-creator.html" className="waves-effect">
                                                    Page Creator
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../pages/support.html" className="waves-effect">
                                                    Support
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../pages/chat.html" className="waves-effect">
                                                    Chat
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link className="collapsible-header waves-effect arrow-r">
                                        <i className="w-fa fas fa-user"></i>Profile
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </Link>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <Link href="../profile/basic-1.html" className="waves-effect">
                                                    Basic 1
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../profile/basic-2.html" className="waves-effect">
                                                    Basic 2
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../profile/extended.html" className="waves-effect">
                                                    Extended
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link className="collapsible-header waves-effect arrow-r">
                                        <i className="w-fa fab fa-css3"></i>CSS<i className="fas fa-angle-down rotate-icon"></i>
                                    </Link>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <Link href="../css/grid.html" className="waves-effect">
                                                    Grid system
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/media.html" className="waves-effect">
                                                    Media object
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/utilities.html" className="waves-effect">
                                                    Utilities / helpers
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/code.html" className="waves-effect">
                                                    Code
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/icons.html" className="waves-effect">
                                                    Icons
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/images.html" className="waves-effect">
                                                    Images
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/typography.html" className="waves-effect">
                                                    Typography
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/animations.html" className="waves-effect">
                                                    Animations
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/colors.html" className="waves-effect">
                                                    Colors
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/hover.html" className="waves-effect">
                                                    Hover effects
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/masks.html" className="waves-effect">
                                                    Masks
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/shadows.html" className="waves-effect">
                                                    Shadows
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../css/skins.html" className="waves-effect">
                                                    Skins
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link className="collapsible-header waves-effect arrow-r">
                                        <i className="w-fa fas fa-th"></i>Components
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </Link>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <Link href="../components/buttons.html" className="waves-effect">
                                                    Buttons
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/cards.html" className="waves-effect">
                                                    Cards
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/collapse.html" className="waves-effect">
                                                    Collapse
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/date.html" className="waves-effect">
                                                    Date picker
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/list.html" className="waves-effect">
                                                    List group
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/panels.html" className="waves-effect">
                                                    Panels
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/pagination.html" className="waves-effect">
                                                    Pagination
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/popovers.html" className="waves-effect">
                                                    Popovers
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/progress.html" className="waves-effect">
                                                    Progress bars
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/stepper.html" className="waves-effect">
                                                    Stepper
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/tabs.html" className="waves-effect">
                                                    Tabs & pills
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/tags.html" className="waves-effect">
                                                    Tags, labels & badges
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/time.html" className="waves-effect">
                                                    Time picker
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../components/tooltips.html" className="waves-effect">
                                                    Tooltips
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link className="collapsible-header waves-effect arrow-r">
                                        <i className="w-fa far fa-check-square"></i>Forms
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </Link>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <Link href="../forms/basic.html" className="waves-effect">
                                                    Basic
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../forms/extended.html" className="waves-effect">
                                                    Extended
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link className="collapsible-header waves-effect arrow-r">
                                        <i className="w-fa fas fa-table"></i>Tables
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </Link>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <Link href="../tables/basic.html" className="waves-effect">
                                                    Basic
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../tables/extended.html" className="waves-effect">
                                                    Extended
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../tables/datatables.html" className="waves-effect">
                                                    DataTables.net
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link className="collapsible-header waves-effect arrow-r">
                                        <i className="w-fa fas fa-map"></i>Maps<i className="fas fa-angle-down rotate-icon"></i>
                                    </Link>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <Link href="../maps/google.html" className="waves-effect">
                                                    Google Maps
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../maps/full.html" className="waves-effect">
                                                    Full screen map
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="../maps/vector.html" className="waves-effect">
                                                    Vector world map
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <Link href="../alerts/alerts.html" className="collapsible-header waves-effect">
                                        <i className="w-fa far fa-bell"></i>Alerts
                                    </Link>
                                </li>
                                <li>
                                    <Link href="../modals/modals.html" className="collapsible-header waves-effect">
                                        <i className="w-fa fas fa-bolt"></i>Modals
                                    </Link>
                                </li>
                                <li>
                                    <Link href="../charts/charts.html" className="collapsible-header waves-effect">
                                        <i className="w-fa fas fa-chart-pie"></i>Charts
                                    </Link>
                                </li>
                                <li>
                                    <Link href="../calendar/calendar.html" className="collapsible-header waves-effect">
                                        <i className="w-fa far fa-calendar-check"></i>Calendar
                                    </Link>
                                </li>
                                <li>
                                    <Link href="../sections/sections.html" className="collapsible-header waves-effect">
                                        <i className="w-fa fas fa-th-large"></i>Sections
                                    </Link>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
                    <div className="sidenav-bg mask-strong"></div>
                </div>

                <nav className="navbar fixed-top navbar-expand-lg scrolling-navbar double-nav">
                    <div className="float-left">
                        <Link onClick={toogleSideNav} href="#" data-activates="slide-out" className="ml-3">
                            <i className="fas fa-bars"></i>
                        </Link>
                    </div>

                    <div className="breadcrumb-dn mr-auto">
                        <p>Invoice</p>
                    </div>

                    <ul className="nav navbar-nav nav-flex-icons ml-auto">
                        <li className="nav-item dropdown notifications-nav">
                            <Link
                                className="nav-link dropdown-toggle waves-effect"
                                id="navbarDropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span className="badge red">3</span> <i className="fas fa-bell"></i>
                                <span className="d-none d-md-inline-block">Notifications</span>
                            </Link>
                            <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" href="#">
                                    <i className="far fa-money-bill-alt mr-2" aria-hidden="true"></i>
                                    <span>New order received</span>
                                    <span className="float-right">
                                        <i className="far fa-clock" aria-hidden="true"></i> 13 min
                                    </span>
                                </Link>
                                <Link className="dropdown-item" href="#">
                                    <i className="far fa-money-bill-alt mr-2" aria-hidden="true"></i>
                                    <span>New order received</span>
                                    <span className="float-right">
                                        <i className="far fa-clock" aria-hidden="true"></i> 33 min
                                    </span>
                                </Link>
                                <Link className="dropdown-item" href="#">
                                    <i className="fas fa-chart-line mr-2" aria-hidden="true"></i>
                                    <span>Your campaign is about to end</span>
                                    <span className="float-right">
                                        <i className="far fa-clock" aria-hidden="true"></i> 53 min
                                    </span>
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link waves-effect">
                                <i className="fas fa-envelope"></i>{' '}
                                <span className="clearfix d-none d-sm-inline-block">Contact</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link waves-effect">
                                <i className="far fa-comments"></i>{' '}
                                <span className="clearfix d-none d-sm-inline-block">Support</span>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle waves-effect"
                                href="#"
                                id="userDropdown"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-user"></i>{' '}
                                <span className="clearfix d-none d-sm-inline-block">Profile</span>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <Link className="dropdown-item" href="#">
                                    Log Out
                                </Link>
                                <Link className="dropdown-item" href="#">
                                    My account
                                </Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}
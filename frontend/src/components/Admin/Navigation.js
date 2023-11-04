import '../../assets/mdb/css/bootstrap.min.css';
import '../../assets/mdb/css/mdb.min.css';

export default function Navigation() {
    return (
        <body class="fixed-sn white-skin">
            <header>
                <div id="slide-out" className="side-nav sn-bg-4 fixed">
                    <ul className="custom-scrollbar">
                        <li className="logo-sn waves-effect py-3">
                            <div className="text-center">
                                {/* <a href="#" className="pl-0"><img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"></a> */}
                            </div>
                        </li>

                        <li>
                            <form className="search-form" role="search">
                                <div className="md-form mt-0 waves-light">
                                    {/* <input type="text" className="form-control py-2" placeholder="Search"> */}
                                </div>
                            </form>
                        </li>

                        <li>
                            <ul className="collapsible collapsible-accordion">
                                <li>
                                    <a className="collapsible-header waves-effect arrow-r">
                                        <i className="fas fa-tachometer-alt"></i>
                                        Dashboards<i className="fas fa-angle-down rotate-icon"></i>
                                    </a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <a href="../dashboards/v-1.html" className="waves-effect">
                                                    Version 1
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../dashboards/v-2.html" className="waves-effect">
                                                    Version 2
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../dashboards/v-3.html" className="waves-effect">
                                                    Version 3
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../dashboards/v-4.html" className="waves-effect">
                                                    Version 4
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../dashboards/v-5.html" className="waves-effect">
                                                    Version 5
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../dashboards/v-6.html" className="waves-effect">
                                                    Version 6
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a className="collapsible-header waves-effect arrow-r">
                                        <i className="fas fa-image"></i> Pages
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <a href="../pages/login.html" className="waves-effect">
                                                    Login
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../pages/register.html" className="waves-effect">
                                                    Register
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../pages/pricing.html" className="waves-effect">
                                                    Pricing
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../pages/about.html" className="waves-effect">
                                                    About us
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../pages/single.html" className="waves-effect">
                                                    Single post
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../pages/post.html" className="waves-effect">
                                                    Post listing
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../pages/landing.html" className="waves-effect">
                                                    Landing page
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../pages/customers.html" className="waves-effect">
                                                    Customers
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../pages/invoice.html" className="waves-effect">
                                                    Invoice
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../pages/page-creator.html" className="waves-effect">
                                                    Page Creator
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../pages/support.html" className="waves-effect">
                                                    Support
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../pages/chat.html" className="waves-effect">
                                                    Chat
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a className="collapsible-header waves-effect arrow-r">
                                        <i className="fas fa-user"></i> Profile
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <a href="../profile/basic-1.html" className="waves-effect">
                                                    Basic 1
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../profile/basic-2.html" className="waves-effect">
                                                    Basic 2
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../profile/extended.html" className="waves-effect">
                                                    Extended
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a className="collapsible-header waves-effect arrow-r">
                                        <i className="fab fa-css3"></i> CSS
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <a href="../css/grid.html" className="waves-effect">
                                                    Grid system
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/media.html" className="waves-effect">
                                                    Media object
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/utilities.html" className="waves-effect">
                                                    Utilities / helpers
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/code.html" className="waves-effect">
                                                    Code
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/icons.html" className="waves-effect">
                                                    Icons
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/images.html" className="waves-effect">
                                                    Images
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/typography.html" className="waves-effect">
                                                    Typography
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/animations.html" className="waves-effect">
                                                    Animations
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/colors.html" className="waves-effect">
                                                    Colors
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/hover.html" className="waves-effect">
                                                    Hover effects
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/masks.html" className="waves-effect">
                                                    Masks
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/shadows.html" className="waves-effect">
                                                    Shadows
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../css/skins.html" className="waves-effect">
                                                    Skins
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a className="collapsible-header waves-effect arrow-r">
                                        <i className="fas fa-th"></i> Components
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <a href="../components/buttons.html" className="waves-effect">
                                                    Buttons
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/cards.html" className="waves-effect">
                                                    Cards
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/collapse.html" className="waves-effect">
                                                    Collapse
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/date.html" className="waves-effect">
                                                    Date picker
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/list.html" className="waves-effect">
                                                    List group
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/panels.html" className="waves-effect">
                                                    Panels
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/pagination.html" className="waves-effect">
                                                    Pagination
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/popovers.html" className="waves-effect">
                                                    Popovers
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/progress.html" className="waves-effect">
                                                    Progress bars
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/stepper.html" className="waves-effect">
                                                    Stepper
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/tabs.html" className="waves-effect">
                                                    Tabs & pills
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/tags.html" className="waves-effect">
                                                    Tags, labels & badges
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/time.html" className="waves-effect">
                                                    Time picker
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../components/tooltips.html" className="waves-effect">
                                                    Tooltips
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a className="collapsible-header waves-effect arrow-r">
                                        <i className="far fa-check-square"></i> Forms
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <a href="../forms/basic.html" className="waves-effect">
                                                    Basic
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../forms/extended.html" className="waves-effect">
                                                    Extended
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a className="collapsible-header waves-effect arrow-r">
                                        <i className="fas fa-table"></i> Tables
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <a href="../tables/basic.html" className="waves-effect">
                                                    Basic
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../tables/extended.html" className="waves-effect">
                                                    Extended
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../tables/datatables.html" className="waves-effect">
                                                    DataTables.net
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a className="collapsible-header waves-effect arrow-r">
                                        <i className="fas fa-map"></i> Maps
                                        <i className="fas fa-angle-down rotate-icon"></i>
                                    </a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li>
                                                <a href="../maps/google.html" className="waves-effect">
                                                    Google Maps
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../maps/full.html" className="waves-effect">
                                                    Full screen map
                                                </a>
                                            </li>
                                            <li>
                                                <a href="../maps/vector.html" className="waves-effect">
                                                    Vector world map
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a href="../alerts/alerts.html" className="collapsible-header waves-effect">
                                        <i className=" far fa-bell"></i>
                                        Alerts
                                    </a>
                                </li>

                                <li>
                                    <a href="../modals/modals.html" className="collapsible-header waves-effect">
                                        <i className=" fas fa-bolt"></i>
                                        Modals
                                    </a>
                                </li>

                                <li>
                                    <a href="../charts/charts.html" className="collapsible-header waves-effect">
                                        <i className=" fas fa-chart-pie"></i>
                                        Charts
                                    </a>
                                </li>

                                <li>
                                    <a href="../calendar/calendar.html" className="collapsible-header waves-effect">
                                        <i className=" far fa-calendar-check"></i>
                                        Calendar
                                    </a>
                                </li>

                                <li>
                                    <a href="../sections/sections.html" className="collapsible-header waves-effect">
                                        <i className=" fas fa-th-large"></i>
                                        Sections
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="sidenav-bg mask-strong"></div>
                </div>

                <nav className="navbar fixed-top navbar-expand-lg scrolling-navbar double-nav">
                    <div className="float-left">
                        <a href="#" data-activates="slide-out" className="button-collapse black-text">
                            <i className="fas fa-bars"></i>
                        </a>
                    </div>

                    <div className="breadcrumb-dn mr-auto">
                        <p>Material Design for Bootstrap</p>
                    </div>

                    <ul className="nav navbar-nav nav-flex-icons ml-auto">
                        <li className="nav-item dropdown notifications-nav">
                            <a
                                className="nav-link dropdown-toggle waves-effect"
                                id="navbarDropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span className="badge red">3</span> <i className="fas fa-bell"></i>
                                <span className="d-none d-md-inline-block">Notifications</span>
                            </a>
                            <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-money mr-2" aria-hidden="true"></i>
                                    <span>New order received</span>
                                    <span className="float-right">
                                        <i className="far  fa-clock" aria-hidden="true"></i> 13 min
                                    </span>
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-money mr-2" aria-hidden="true"></i>
                                    <span>New order received</span>
                                    <span className="float-right">
                                        <i className="far  fa-clock" aria-hidden="true"></i> 33 min
                                    </span>
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-line-chart mr-2" aria-hidden="true"></i>
                                    <span>Your campaign is about to end</span>
                                    <span className="float-right">
                                        <i className="far  fa-clock" aria-hidden="true"></i> 53 min
                                    </span>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link waves-effect">
                                <i className="fas fa-envelope"></i>{' '}
                                <span className="clearfix d-none d-sm-inline-block">Contact</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link waves-effect">
                                <i className="far fa-comments"></i>{' '}
                                <span className="clearfix d-none d-sm-inline-block">Support</span>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle waves-effect"
                                href="#"
                                id="userDropdown"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-user"></i>{' '}
                                <span className="clearfix d-none d-sm-inline-block">Profile</span>
                            </a>

                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="#">
                                    Log Out
                                </a>
                                <a className="dropdown-item" href="#">
                                    My account
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        </body>
    );
}
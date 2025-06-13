import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import PageLogo from '../../assets/crown.svg'
import './navigation.styles.scss'


const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <img src={PageLogo} className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    <Link className="nav-link" to='/signin'>
                        SIGN-IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>

    )
}

export default Navigation;
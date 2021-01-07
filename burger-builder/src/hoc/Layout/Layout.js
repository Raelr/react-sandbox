import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = (props) => {
    
    const [useSideDrawer, setUseSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setUseSideDrawer(false)
    };

    const toggleSideDrawerHandler = () => {
        setUseSideDrawer(!useSideDrawer)
    }

    return (
        <Aux>
            <Toolbar toggleSideDrawer={toggleSideDrawerHandler}/>
            <SideDrawer open={useSideDrawer} closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default Layout;
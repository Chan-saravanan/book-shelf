import React from 'react';

//components!
import Header from '../components/header/header';

const Layout = (props)=>{
    return (
        <div>
            <Header/>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;
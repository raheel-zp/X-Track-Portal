import React from 'react';
import { Fragment } from 'react';

function Footer(props) {
    return (
        <Fragment>
           <div className="sidebar-brand sidebar-brand-bottom-0">
                <img style={{height: 55+'px', width: 140+'px'}} src={process.env.PUBLIC_URL + '/assets_2/images/dopasi.png'} alt="" />
                    
            </div>
            <div className="sidebar-brand sidebar-brand-bottom-14">
                <img src={process.env.PUBLIC_URL + '/assets_2/images/mc.png'} alt="" />
            </div> 
        </Fragment>
    );
}

export default Footer;
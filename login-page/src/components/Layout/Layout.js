import React from 'react'
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.module.css'

const layout = (props) => (
    <Aux>
        <div>Other Content</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;
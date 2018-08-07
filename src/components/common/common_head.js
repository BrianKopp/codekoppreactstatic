import React from 'react'
import { hot } from "react-hot-loader";

import Preloader from './preloader'
import Header from './header'
import Nav from './nav'
import TopSection from './top'

const CommonHead = ({title, type}) => (
    <div id="commonhead">
        <Preloader />
        <Header/>
        <Nav />
        <TopSection title={title} type={type}/>
    </div>
)
export default hot(module)(CommonHead)

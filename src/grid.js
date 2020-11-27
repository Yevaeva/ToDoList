import React,{Component} from 'react'
import './grid.css' 
import {Container,Row,Col} from 'react-bootstrap'; 


function Grid(props){
    return(
        <div className='grid'>
            {props.data}
        </div>
    )
}

export default Grid
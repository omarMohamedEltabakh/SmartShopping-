
import notFoundImage from '../Assets/Images/NotFound.svg'


import React from 'react'

export default function Notfound() {
    return (
        <div className='NotFound vh-100 d-flex justify-content-center align-items-center'>
            <img className='w-50' src={notFoundImage} alt="" />
        </div>
    )
}

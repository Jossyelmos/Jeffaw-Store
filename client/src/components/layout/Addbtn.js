import React from 'react'

const AddBtn = () => {
    return (
        <div className='fixed-action-btn'>
            <a href="#add-log-modal" className="btn-floating btn-large blue darken-2 modal-trigger">
                <i className="large material-icons no-bg">facebook</i>
            </a>
            <ul>
                <li>
                    <a href="#tech-list-modal" className="btn-floating green modal-trigger">
                        <i className="material-icons">assistant_photo</i>
                    </a>
                </li>
                <li>
                    <a href="#add-tech-modal" className="btn-floating red modal-trigger">
                        <i className="material-icons">phone</i>
                    </a>
                </li>
                <li>
                    <a href="#tech-list-modal" className="btn-floating yellow modal-trigger">
                        <i className="material-icons">email</i>
                    </a>
                </li>
                <li>
                    <a href="#add-tech-modal" className="btn-floating purple modal-trigger">
                        <i className="material-icons">comment</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default AddBtn;

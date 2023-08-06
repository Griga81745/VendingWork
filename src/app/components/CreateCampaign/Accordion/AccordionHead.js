import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core';

const AccordionHead = (props) => {
    const { name, numb, pos } = props;

    return (
        <ListItem className={`p-0 d-flex ${pos == "top" ? "align-items-start align-items-md-center" : "align-items-center"}`}>
            <div className={"smallDigit"}>{numb}</div>
            <div className={`d-flex ${pos == "top" ? "align-items-start align-items-md-center" : "align-items-center"}`}>
                <ListItemText primary={name} className={`fS18 fS-lg-20 c5E6366 m-0 ml-2 ml-lg-3`} />
                <button className={'bg-transparent border-0 ml-2 ml-lg-3 p-0'} >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="7" r="7" fill="#607D8B" />
                        <path
                            d="M6.07051 7.8C6.07051 7.52667 6.13051 7.27333 6.25051 7.04C6.37051 6.80667 6.51717 6.60667 6.69051 6.44C6.86384 6.26667 7.03717 6.10333 7.21051 5.95C7.38384 5.79 7.53051 5.62 7.65051 5.44C7.77051 5.25333 7.83051 5.06 7.83051 4.86C7.83051 4.58 7.73384 4.36667 7.54051 4.22C7.34717 4.06667 7.08717 3.99 6.76051 3.99C6.44717 3.99 6.17717 4.07 5.95051 4.23C5.72384 4.39 5.56051 4.61667 5.46051 4.91L4.47051 4.35C4.65717 3.87667 4.95717 3.51333 5.37051 3.26C5.79051 3 6.26384 2.87 6.79051 2.87C7.38384 2.87 7.89717 3.04 8.33051 3.38C8.76384 3.72 8.98051 4.19 8.98051 4.79C8.98051 5.07 8.92051 5.33333 8.80051 5.58C8.68051 5.82 8.53384 6.02667 8.36051 6.2C8.18717 6.37333 8.01384 6.54333 7.84051 6.71C7.66717 6.87 7.52051 7.04333 7.40051 7.23C7.28051 7.41667 7.22051 7.60667 7.22051 7.8H6.07051ZM7.18051 9.9C7.03384 10.0467 6.85717 10.12 6.65051 10.12C6.44384 10.12 6.26717 10.0467 6.12051 9.9C5.97384 9.75333 5.90051 9.57667 5.90051 9.37C5.90051 9.16333 5.97051 8.98667 6.11051 8.84C6.25717 8.69333 6.43717 8.62 6.65051 8.62C6.85717 8.62 7.03384 8.69333 7.18051 8.84C7.32717 8.98667 7.40051 9.16333 7.40051 9.37C7.40051 9.57667 7.32717 9.75333 7.18051 9.9Z"
                            fill="white" />
                    </svg>
                </button>
            </div>
        </ListItem>
    );
}

export default AccordionHead

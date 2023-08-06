import React from 'react'

const DeviceProperty = props => {

    return (
        <div style={{
            display: 'flex', 
            padding: '9px 23px 10px 16px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            alignItems: 'center'
        }}>
            <p className='' 
                style={{
                    width: '160px',
                    textAlign: 'right',
                    margin: '0',
                    fontSize: '14px',
                    fontWeight: '900'
            }}>
                {props.name}
            </p>
            <p className=''
                style ={{
                    padding: '0 0 0 16px',
                    margin: '0',
                    fontSize: '14px',
                    fontWeight: '100'
            }}>
                {props.property}
            </p>
        </div>
    )
}

export default DeviceProperty
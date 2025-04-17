import { styled } from '@mui/material'
import React from 'react'

const HiddenInputStyles = styled('input')({
    display: 'none'
    // clip: 'rect(0 0 0 0)',
    // clipPath: 'inset(50%)',
    // overflow: 'hidden',
    // position: 'absolute',
    // // bottom: 0, // Nếu docs thì sẽ phát sinh lỗi ở Modal ActiveCard mới làm click là scroll bị nhảy xuống bottom
    // // left: 0,
    // whiteSpace: 'nowrap',
    // width: 1
})


function VisuallyHiddenInput(props) {
    return (
        <HiddenInputStyles {...props} />
    )
}

export default VisuallyHiddenInput
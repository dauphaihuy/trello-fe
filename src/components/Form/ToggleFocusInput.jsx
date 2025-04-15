import { TextField } from '@mui/material'
import React, { useState } from 'react'
// Một trick nhỏ hay trong việc tạo UI UX khi cần ẩn hiển thị một cái input:
// Hiểu đơn giản là bạn phải tạo điều kiện đổi lại giữa thể Input và textarea
//  thông thường là sẽ CSS lại cho cái Input như text bình thường,
//  chỉ khi click vào focus vào nó thì style lại trở về như cái input ban đầu.
// Controlled input: https://mui.com/material-ui/react-text-field/#controlled-vs-uncontrolled
function ToggleFocusInput({ value, onChangedValue, inputFontSize = '16px', ...props }) {
    const [inputValue, setInputValue] = useState(value)
    const triggerBlur = () => {
        console.log('blur')
        // Nếu user xóa hết nội dung thì set lại giá trị góc ban đầu từ props và return luôn không làm thêm
        setInputValue(inputValue.trim())
        // Nếu giá trị có gì thay đổi thì cũng return luôn không làm gì.
        if (!inputValue || inputValue.trim() === value) {
            setInputValue(value)
            return
        }
        // console.log('New value: ', value)
        // console.log('inputValue: ', inputValue)
        // Khi giá trị có thay đổi ok thì gọi lên func ở props để xử lý
        onChangedValue(inputValue)
    }
    return (
        <TextField
            id="toggle-focus-input-controlled"
            fullWidth
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={(event) => { setInputValue(event.target.value) }}
            onBlur={triggerBlur}
            {...props}
            sx={{
                'label': { fontSize: inputFontSize, fontWeight: 'bold' },
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'transparent',
                    '& fieldset': { borderColor: 'transparent' }
                },
                '& .MuiOutlinedInput-root:hover': {
                    borderColor: 'transparent'
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#334B5D' : 'white',
                    '& fieldset': { borderColor: 'primary.main' }
                },
                '& .MuiOutlinedInput-input': {
                    px: '6px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                }
            }}
        >
        </TextField>
    )
}

export default ToggleFocusInput
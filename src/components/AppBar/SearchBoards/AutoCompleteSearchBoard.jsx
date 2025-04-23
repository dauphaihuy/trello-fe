import { Autocomplete, colors, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { fetchBoardsAPI } from '../../../apis';
import { useDebounceFn } from '../../customHooks/useDebounceFn';
function AutoCompleteSearchBoard() {
    const navigate = useNavigate()

    // State xử lý hiển thị kết quả fetch về từ API
    const [open, setOpen] = useState(false)
    const [boards, setBoards] = useState([])
    // State hiển loading khi bắt đầu gọi api fetch boards
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Khi đóng cái phần list kết quả lại thì dòng thôi clear cho boards về null
        if (!open) setBoards(null)
    }, [open])
    const handleInputSearchChange = (event) => {
        const searchValue = event.target?.value
        if (!searchValue) return
        console.log(searchValue)
        const searchPath = `?${createSearchParams({ 'q[title]': searchValue })}`
        console.log(searchPath)
        //goi api
        setLoading(true)
        fetchBoardsAPI(searchPath).then(res => {
            setBoards(res.boards || [])
        }).finally(() => {
            setLoading(false)
        })
    }
    //lam useDebounceFn
    const debounceSearchBoard = useDebounceFn(handleInputSearchChange, 1000)
    const handleSelectBoard = (event, selectedBoard) => {
        // Phải kiểm tra board tại một cái board có được select thì mới gọi điều hướng - navigate
        console.log(selectedBoard)
        if (selectedBoard) {
            navigate(`/boards/${selectedBoard._id}`)
        }
    }
    return (
        <Autocomplete
            sx={{ width: 200 }}
            id='asynchronous-search-board'
            noOptionsText={!boards ? 'Type to search ...' : 'No board found'}
            open={open}
            onOpen={() => { setOpen(true) }}
            onclose={() => { setOpen(false) }}
            getOptionLabel={(board) => board.title}
            options={boards || []}
            loading={loading}
            // onInputChange sẽ chạy khi gõ nội dung vào thẻ input, cần làm debounce để tránh việc bị spam gọi api
            onInputChange={debounceSearchBoard}
            //onchange của cả cái autocomplete sẽ chạy khi chúng ta select một kết quả (ở đây là board)
            onChange={handleSelectBoard}
            renderInput={(params) => (
                <TextField {...params}
                    label='Type to search...'
                    size='small'
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon sx={{ color: 'white' }} />
                            </InputAdornment>
                        )
                    }}
                />
            )}
        >

        </Autocomplete>
    )
}

export default AutoCompleteSearchBoard
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button, TextField } from '@mui/material'
import AddchartIcon from '@mui/icons-material/Addchart'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { generatePlaceholderCard } from '../../../../utils/formatters'
import { cloneDeep } from 'lodash'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '../../../../redux/activeBoard/activeBoardSlice'
import { addNewColumnAPI } from '../../../../apis'
import { useDispatch, useSelector } from 'react-redux'
function ListColumns({ columns }) {
    const dispatch = useDispatch()
    const board = useSelector(selectCurrentActiveBoard)
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const [newColTitle, setNewColTitle] = useState('')
    const toggleOpenNewColumn = () => setOpenNewColumnForm(!openNewColumnForm)
    const addNewCol = async () => {
        if (!newColTitle) {
            toast.error('column title khong duoc rong')
            return
        }

        const newColumnData = {
            title: newColTitle
        }
        const createdColumn = await addNewColumnAPI({
            ...newColumnData,
            boardId: board._id
        })
        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

        const newBoard = cloneDeep(board)
        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)
        dispatch(updateCurrentActiveBoard(newBoard))
        toggleOpenNewColumn()
        setNewColTitle('')
    }
    return (
        <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
            <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                '&::-webkit-scrollbar-track': {
                    m: 2
                }

            }}>
                {/*box column */}
                {columns?.map((column, i) => <Column
                    key={i}
                    column={column}
                />)}
                {
                    openNewColumnForm ? <Box sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        p: 1,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        <TextField
                            id='outlined-search'
                            label='Enter column title'
                            type="text"
                            size="small"
                            autoFocus
                            value={newColTitle}
                            onChange={e => setNewColTitle(e.target.value)}
                            sx={{
                                minWidth: '120px',
                                maxWidth: '180px',
                                '& label': { color: 'white' },
                                '& input': { color: 'white' },
                                '& label.Mui-focused': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldSet': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' }
                                }
                            }}
                        />
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <Button className='interceptor-loading' variant="contained"
                                color="success" size="small"
                                sx={{
                                    boxShadow: 'none',
                                    border: '0.5px solid',
                                    borderColor: (theme) => theme.palette.success.main,
                                    '&:hover:': { bgcolor: (theme) => theme.palette.success.main }
                                }}
                                onClick={addNewCol}
                            >Add column</Button>
                            <CloseIcon
                                fontSize="small"
                                sx={{
                                    color: '#333', cursor: 'pointer',
                                    '&:hover': { color: (theme) => theme.palette.warning.light }
                                }}
                                onClick={toggleOpenNewColumn}
                            />
                        </Box>
                    </Box> : <Box sx={{
                        minWidth: '170px',
                        maxWidth: '200px',
                        mx: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d'
                    }}>
                        <Button onClick={toggleOpenNewColumn} startIcon={<AddchartIcon />}
                            sx={{ color: 'white', justifyContent: 'flex-start', pl: 2.5 }}
                        >Add new Column</Button>
                    </Box>
                }

            </Box>
        </SortableContext>

    )
}

export default ListColumns
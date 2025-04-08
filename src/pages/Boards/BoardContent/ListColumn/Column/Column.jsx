import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCard from './ListCard/ListCard'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { cloneDeep } from 'lodash'
import { addNewCardAPI, deleteColumnAPI } from '../../../../../apis'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '../../../../../redux/activeBoard/activeBoardSlice'

function Column({ column }) {
    const board = useSelector(selectCurrentActiveBoard)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null)
    const [isClicked, setIsClicked] = useState(false)
    const open = Boolean(anchorEl)
    const handleClick = (event) => { setAnchorEl(event.currentTarget) }
    const handleClose = () => { setAnchorEl(null) }
    const orderedCards = column?.cards
    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform
    } = useSortable({ id: column?._id, data: { ...column } })
    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        touchAction: 'none',
        height: '100%'
    }
    //
    const [openNewCardForm, setOpenNewCardForm] = useState(false)
    const [newCardTitle, setNewCardTitle] = useState('')
    const toggleOpenNewCard = () => {
        setOpenNewCardForm(!openNewCardForm)
        setIsClicked(false)
    }
    const addNewCard = async () => {
        if (!newCardTitle) {
            toast.error('column card khong duoc rong')
            return
        }

        const newCardData = {
            title: newCardTitle,
            columnId: column._id
        }
        setIsClicked(true)
        const createdCard = await addNewCardAPI({
            ...newCardData,
            boardId: board._id
        })
        // const newBoard = cloneDeep(board)
        const newBoard = cloneDeep(board)
        const columnToUpdate = newBoard.columns.find(c => c._id === createdCard.columnId)
        if (columnToUpdate) {
            if (columnToUpdate.cards.some(c => c.FE_PlaceholderCard)) {
                columnToUpdate.cards = [createdCard]
                columnToUpdate.cardOrderIds = [createdCard._id]
            } else {
                columnToUpdate.cards.push(createdCard)
                columnToUpdate.cardOrderIds.push(createdCard._id)//vid69
            }
        }
        dispatch(updateCurrentActiveBoard(newBoard))
        // await createNewCard(newColumnData)
        setNewCardTitle('')
        toggleOpenNewCard()
    }
    const confirmDeleteColumn = useConfirm()
    const handleDeleteColumn = async () => {
        const { confirmed } = await confirmDeleteColumn({
            description: `This will permanently delete ${column.title}.`
        })
        if (confirmed) {
            const newBoard = cloneDeep(board)
            newBoard.columns = newBoard.columns.filter(c => c._id !== column._id)
            newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)
            dispatch(updateCurrentActiveBoard(newBoard))
            deleteColumnAPI(column._id).then(res => {
                toast.success(res?.deleteResult)
            })
            // deleteColumnDetail(column._id)
        }
    }
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <Box
                {...listeners}
                sx={{
                    minWidth: 300,
                    maxWidth: 300,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                    ml: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) => `$calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
                }}>
                {/* header */}
                <Box sx={{
                    height: (theme) => { theme.trello.columnHeaderHeight },
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {/* column title */}
                    <Typography sx={{ fontWeight: 'bold', cursor: 'pointer' }}>{column?.title}</Typography>
                    {/* drop down */}
                    <Box>
                        <Tooltip title="More options">
                            <ExpandMoreIcon sx={{ color: 'text.primary', cursor: 'pointer' }}
                                id="basic-button-dropdown"
                                aria-controls={open ? 'basic-menu-dropdown' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            />
                        </Tooltip>
                        <Menu
                            id="basic-menu-dropdown"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button-dropdown'
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><ContentPasteIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleDeleteColumn} sx={{
                                '&:hover': {
                                    color: 'warning.dark',
                                    '& .delete-forever-icon': {
                                        color: 'warning.dark'
                                    }
                                }
                            }}>
                                <ListItemIcon><DeleteOutlineIcon className='delete-forever-icon' fontSize="small" /></ListItemIcon>
                                <ListItemText>Remove this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><CloudQueueIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Archievie this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
                {/* list card */}
                <ListCard cards={orderedCards} />

                {/* footer */}
                <Box sx={{
                    height: (theme) => { theme.trello.columnFooterHeight },
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {!openNewCardForm ?
                        <Box
                            sx={{
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                            <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCard}>Add new card</Button>
                            <Tooltip title='drag to move'>
                                <DragHandleIcon sx={{ cursor: 'pointer' }} />
                            </Tooltip>
                        </Box> :
                        <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <TextField
                                id='outlined-search'
                                label='Enter cards title'
                                type="text"
                                size="small"
                                autoFocus
                                value={newCardTitle}
                                onChange={e => setNewCardTitle(e.target.value)}
                                sx={{
                                    '& label': { color: 'text.primary' },
                                    '& input': {
                                        color: (theme) => theme.palette.primary.main,
                                        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : 'white'
                                    },
                                    '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { color: (theme) => theme.palette.primary.main },
                                        '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                                        '&:Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: 1
                                    }
                                }}
                            />
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 1
                            }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    disabled={isClicked}
                                    sx={{
                                        boxShadow: 'none',
                                        border: '0.5px solid',
                                        borderColor: (theme) => theme.palette.success.main,
                                        '&:hover:': { bgcolor: (theme) => theme.palette.success.main }
                                    }}
                                    onClick={addNewCard}
                                >Add </Button>
                                <CloseIcon
                                    fontSize="small"
                                    sx={{
                                        color: (theme) => theme.palette.warning.light,
                                        cursor: 'pointer',
                                        '&:hover': { color: (theme) => theme.palette.warning.light }
                                    }}
                                    onClick={toggleOpenNewCard}
                                />
                            </Box>
                        </Box>}
                    <Box>
                    </Box>
                </Box>
            </Box>
        </div>

    )
}

export default Column
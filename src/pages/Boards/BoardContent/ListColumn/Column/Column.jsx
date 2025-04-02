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
import { mapOrder } from '../../../../../utils/formatters'

function Column({ column }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => { setAnchorEl(event.currentTarget) }
    const handleClose = () => { setAnchorEl(null) }
    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
    return (
        <Box sx={{
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
                            'aria-labelledby': 'basic-button-dropdown',
                        }}
                    >
                        <MenuItem>
                            <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                            <ListItemText>Add new card</ListItemText>
                        </MenuItem>
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
                        <MenuItem>
                            <ListItemIcon><DeleteOutlineIcon fontSize="small" /></ListItemIcon>
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
                <Button startIcon={<AddCardIcon />}>Add new card</Button>
                <Tooltip title='drag to move'> <DragHandleIcon sx={{
                    cursor: 'pointer'
                }} />
                </Tooltip>
            </Box>
        </Box>
    )
}

export default Column
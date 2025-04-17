import { Box, Button, Chip, Tooltip } from '@mui/material'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import LanguageIcon from '@mui/icons-material/Language'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { capitalizeFirstLetter } from '../../../utils/formatters'
import BoardUserGroup from './BoardUserGroup'
const MENU_STYLES = {
    color: 'white',
    bgcolor: 'transparent',
    border: 'none',
    paddingX: '5px',
    borderRadius: '4px',
    '.MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }
}
function BoardBar({ board }) {
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        }}>
            <Box sx={{
                display: 'flex', alignItems: 'center', gap: 2
            }}>
                <Chip
                    label={board?.title}
                    sx={MENU_STYLES} icon={<DashboardIcon />}
                    onClick={() => { }} variant="outlined" />
                {/*  */}
                <Chip
                    label={capitalizeFirstLetter(board?.type)}
                    sx={MENU_STYLES} icon={<LanguageIcon />}
                    onClick={() => { }} variant="outlined"
                />
                {/*  */}
                <Chip
                    label={'Add to drive'}
                    sx={MENU_STYLES} icon={<AddToDriveIcon />}
                    onClick={() => { }} variant="outlined"
                />
                {/*  */}

                <Chip
                    label={'Automation'}
                    sx={MENU_STYLES} icon={<BoltIcon />}
                    onClick={() => { }} variant="outlined"
                />
                {/*  */}

                <Chip
                    label={'Filter'}
                    sx={MENU_STYLES} icon={<FilterListIcon />}
                    onClick={() => { }} variant="outlined"
                />
            </Box>

            <Box sx={{
                display: 'flex', alignItems: 'center', gap: 2
            }}>

                <Button
                    variant='outlined'
                    startIcon={<PersonAddAltIcon />}
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            borderColor: 'white'
                        }
                    }}
                >Invite</Button>
                {/* hiển thị ds tv board */}
                <BoardUserGroup />
            </Box>
        </Box>
    )
}

export default BoardBar
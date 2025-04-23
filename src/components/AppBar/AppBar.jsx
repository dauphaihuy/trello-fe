import ModeSelect from '../ModeSelect/ModeSelect'
import { Box, Button, InputAdornment, SvgIcon, TextField, Tooltip, Typography } from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import AssessmentIcon from '@mui/icons-material/Assessment'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Started from './Menus/Started'
import Templates from './Menus/Templates'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'
function AppBar() {
    const [searchValue, setSearchValue] = useState('')
    return (
        <Box sx={{
            backgroundColor: '',
            width: '100%',
            height: (theme) => theme.trello.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            overflowX: 'auto',
            paddingX: 2,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                gap: 2
            }}>
                <AppsIcon sx={{ color: 'white' }} />
                <Link to={'/'}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        gap: 2
                    }}>
                        <AssessmentIcon sx={{ color: 'white', fontSize: 'x-large' }} />
                        <Typography variant='span'
                            sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
                            Trello
                        </Typography>
                    </Box>
                </Link>
                {/* menu */}
                <Box sx={{
                    display: {
                        xs: 'none', md: 'flex',
                        gap: 1
                    }
                }}>
                    <WorkSpaces />
                    <Recent />
                    <Started />
                    <Templates />

                    {/* end menu */}
                    <Button
                        sx={{
                            color: 'white',
                            border: 'none',
                            '&:hover': {
                                border: 'none'
                            }
                        }}
                        variant='outlined' startIcon={<LibraryAddIcon />}>Create</Button>
                </Box>

            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                {/* search */}
                <AutoCompleteSearchBoard />
                {/* <TextField
                    sx={{
                        minWidth: '120px',
                        maxWidth: 170,
                        '& label': { color: 'white' },
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: 'white' }
                        }

                    }}
                    type='text'
                    variant='outlined'
                    label='search'
                    size='small'
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'white' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <CloseIcon onClick={() => setSearchValue('')}
                                    sx={{ color: searchValue ? 'white' : 'transparent', fontSize: 'small', cursor: 'pointer' }} />
                            )
                        },
                    }}
                /> */}
                {/* chon theme */}
                <ModeSelect />
                {/* bell */}
                {/* <Tooltip title="Notifications">
                    <Badge color="warning" variant='dot' sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip> */}
                <Notifications />
                <Tooltip title="Help">
                    <Badge badgeContent={1} color="warning" sx={{ cursor: 'pointer' }}>
                        <HelpOutlineIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>
                <Profiles />
            </Box>
        </Box>
    )
}

export default AppBar
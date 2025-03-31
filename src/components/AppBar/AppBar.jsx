import ModeSelect from '../ModeSelect/ModeSelect'
import { Box, Button, SvgIcon, TextField, Tooltip, Typography } from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import AssessmentIcon from '@mui/icons-material/Assessment'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Started from './Menus/Started'
import Templates from './Menus/Templates'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Avatar from '@mui/material/Avatar'
import Profiles from './Menus/Profiles'
function AppBar() {
    return (
        <Box px={2} sx={{
            backgroundColor: '',
            width: '100%',
            height: (theme) => theme.trello.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                gap: 2
            }}>
                <AppsIcon sx={{ color: 'primary.main' }} />
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    gap: 2
                }}>
                    <AssessmentIcon sx={{ color: 'primary.main' }} />
                    <Typography variant='span'
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>
                        Trello
                    </Typography>
                </Box>
                <WorkSpaces />
                <Recent />
                <Started />
                <Templates />
                <Button variant='outlined'>Create</Button>
            </Box>
            <Box></Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <TextField type='search' variant='outlined' label='search' />
                <ModeSelect />
                <Tooltip title="Notifications">
                    <Badge badgeContent={4} color="primary" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon color="action" />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <Badge badgeContent={1} color="primary" sx={{ cursor: 'pointer' }}>
                        <HelpOutlineIcon color="action" />
                    </Badge>
                </Tooltip>
                <Profiles />
            </Box>
        </Box>
    )
}

export default AppBar
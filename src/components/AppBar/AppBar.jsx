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
            justifyContent: 'space-between',
            gap: 2,
            overflowX: 'auto'
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
                    <AssessmentIcon sx={{ color: 'primary.main', fontSize: 'x-large' }} />
                    <Typography variant='span'
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>
                        Trello
                    </Typography>
                </Box>
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
                </Box>

                {/* end menu */}
                <Button variant='outlined'>Create</Button>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <TextField sx={{ minWidth: '120px' }} type='search' variant='outlined' label='search' size='small' />
                {/* chon theme */}
                <ModeSelect />
                {/* bell */}
                <Tooltip title="Notifications">
                    <Badge badgeContent={4} color="primary" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <Badge badgeContent={1} color="primary" sx={{ cursor: 'pointer' }}>
                        <HelpOutlineIcon sx={{ color: 'primary.main' }} />
                    </Badge>
                </Tooltip>
                <Profiles />
            </Box>
        </Box>
    )
}

export default AppBar
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
const MENU_STYLES = {
    color: 'primary.main',
    bgcolor: 'white',
    border: 'none',
    paddingX: '5px',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
        color: 'primary.main'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }
}
function BoardBar() {
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
            borderTop: '1px solid #00bfa5'
        }}>
            <Box sx={{
                display: 'flex', alignItems: 'center', gap: 2
            }}>
                <Chip
                    label={'huy dz'}
                    sx={MENU_STYLES} icon={<DashboardIcon />}
                    onClick={() => { }} variant="outlined" />
                {/*  */}
                <Chip
                    label={'public/private Workspace'}
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

                <Button variant='outlined' startIcon={<PersonAddAltIcon />}>Invite</Button>
                <AvatarGroup max={4} sx={{
                    '& .MuiAvatar-root': {
                        width: 34,
                        height: 34,
                        fontSize: 16,
                        border: '1px solid',
                        color: 'white',
                        cursor: 'pointer',

                    }
                }}>
                    <Tooltip title='Huy dz'>
                        <Avatar alt="Remy Sharp" src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/465719988_1367877930859315_3999686439919652499_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6d9BAdeIgYgQ7kNvgGmVT4X&_nc_oc=AdniJorKGfwbHIkFZf0VLyheQhZHgyRsPxlOut9HFbDI5U2qY0gyun2c7bC1kRxRDnI&_nc_zt=23&_nc_ht=scontent.fdad1-2.fna&_nc_gid=rSwy0wsfah6KHw_jHhCNZg&oh=00_AYHk3FIZv6VCS9o8qq3HpcaDgFW77m-hNqx_JFmkL5h0HA&oe=67F0F34F" />
                    </Tooltip>
                    <Tooltip title='Huy dz'>
                        <Avatar alt="Remy Sharp" src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/465719988_1367877930859315_3999686439919652499_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6d9BAdeIgYgQ7kNvgGmVT4X&_nc_oc=AdniJorKGfwbHIkFZf0VLyheQhZHgyRsPxlOut9HFbDI5U2qY0gyun2c7bC1kRxRDnI&_nc_zt=23&_nc_ht=scontent.fdad1-2.fna&_nc_gid=rSwy0wsfah6KHw_jHhCNZg&oh=00_AYHk3FIZv6VCS9o8qq3HpcaDgFW77m-hNqx_JFmkL5h0HA&oe=67F0F34F" />
                    </Tooltip>
                    <Tooltip title='Huy dz'>
                        <Avatar alt="Remy Sharp" src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/465719988_1367877930859315_3999686439919652499_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6d9BAdeIgYgQ7kNvgGmVT4X&_nc_oc=AdniJorKGfwbHIkFZf0VLyheQhZHgyRsPxlOut9HFbDI5U2qY0gyun2c7bC1kRxRDnI&_nc_zt=23&_nc_ht=scontent.fdad1-2.fna&_nc_gid=rSwy0wsfah6KHw_jHhCNZg&oh=00_AYHk3FIZv6VCS9o8qq3HpcaDgFW77m-hNqx_JFmkL5h0HA&oe=67F0F34F" />
                    </Tooltip>
                    <Tooltip title='Huy dz'>
                        <Avatar alt="Remy Sharp" src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/465719988_1367877930859315_3999686439919652499_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6d9BAdeIgYgQ7kNvgGmVT4X&_nc_oc=AdniJorKGfwbHIkFZf0VLyheQhZHgyRsPxlOut9HFbDI5U2qY0gyun2c7bC1kRxRDnI&_nc_zt=23&_nc_ht=scontent.fdad1-2.fna&_nc_gid=rSwy0wsfah6KHw_jHhCNZg&oh=00_AYHk3FIZv6VCS9o8qq3HpcaDgFW77m-hNqx_JFmkL5h0HA&oe=67F0F34F" />
                    </Tooltip>
                    <Tooltip title='Huy dz'>
                        <Avatar alt="Remy Sharp" src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/465719988_1367877930859315_3999686439919652499_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6d9BAdeIgYgQ7kNvgGmVT4X&_nc_oc=AdniJorKGfwbHIkFZf0VLyheQhZHgyRsPxlOut9HFbDI5U2qY0gyun2c7bC1kRxRDnI&_nc_zt=23&_nc_ht=scontent.fdad1-2.fna&_nc_gid=rSwy0wsfah6KHw_jHhCNZg&oh=00_AYHk3FIZv6VCS9o8qq3HpcaDgFW77m-hNqx_JFmkL5h0HA&oe=67F0F34F" />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar
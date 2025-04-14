import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrentUser } from '../../../redux/user/UserSlice'
import { useConfirm } from 'material-ui-confirm'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function Profiles() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const confirmLogout = useConfirm()
    const handleLogout = async () => {
        const { confirmed } = await confirmLogout({
            title: 'Log out of your account?',
            confirmationText: 'Confirm',
            cancellationText: 'Cancel'
        })
        if (confirmed) {
            dispatch(logoutUserAPI())
        }
    }
    return (
        <>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ padding: 0 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 36, height: 36 }}
                        src={currentUser?.avatar}></Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu-recent"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button-recent'
                }}
            >
                <Link to={'/settings/account'}
                    style={{
                        color: 'inherit'
                    }}
                >
                    <MenuItem
                        sx={{
                            '&:hover': { color: 'success.light' }
                        }}>
                        <Avatar sx={{ mr: 2 }} src={currentUser?.avatar} /> Profile
                    </MenuItem>
                </Link>
                <Divider />
                <MenuItem >
                    <ListItemIcon>
                        <PersonAddIcon fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem >
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        '&:hover': {
                            color: 'warning.dark',
                            '& .logout-icon': { color: 'warning.dark' }
                        }

                    }}>
                    <ListItemIcon>
                        <Logout className='logout-icon' fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default Profiles
import { Box, Container, Tab } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import AppBar from '../../components/AppBar/AppBar'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import AccountTab from './AccountTab'
import SecurityTab from './SecurityTab'
const TABS = {
    ACCOUNT: 'account',
    SECURITY: 'security'
}
function Setting() {
    const location = useLocation()
    // Function đơn giản có nhiệm vụ lấy ra cái tab mặc định dựa theo url.

    const getDefaultTab = () => {
        if (location.pathname.includes(TABS.SECURITY)) return TABS.SECURITY
        return TABS.ACCOUNT
    }

    const [activeTab, setActiveTab] = useState(getDefaultTab())
    const handleChangeTab = (event, selectedTab) => { setActiveTab(selectedTab) }

    return (
        <Container disableGutters maxWidth={false}>
            <AppBar />
            <TabContext value={activeTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab}>
                        <Tab
                            label="Account"
                            value={TABS.ACCOUNT}
                            icon={<PersonIcon />}
                            iconPosition="start"
                            component={Link}
                            to='/settings/account'
                        />
                        <Tab
                            label="Security"
                            value={TABS.SECURITY}
                            icon={<SecurityIcon />}
                            iconPosition="start"
                            component={Link}
                            to='/settings/security'
                        />
                    </TabList>
                </Box>
                <TabPanel value={TABS.ACCOUNT}><AccountTab /></TabPanel>
                <TabPanel value={TABS.SECURITY}><SecurityTab /></TabPanel>
            </TabContext>
        </Container>
    )
}

export default Setting
import {
    Box,
    FormControl, InputLabel, MenuItem, Select, useColorScheme
} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ContrastIcon from '@mui/icons-material/Contrast'
function ModeSelect() {
    const { mode, setMode } = useColorScheme()

    const handleChange = (event) => {
        setMode(event.target.value)
    };

    return (
        <FormControl sx={{ minWidth: 100 }} size="small">
            <InputLabel
                id="label-select-dark-light-mode"
                sx={{
                    color: 'white',
                    '&.Mui-focused': { color: 'white' }
                }}
            >Mode</InputLabel>
            <Select
                labelId="label-select-dark-light-mode"
                id="select-dark-light-mode"
                value={mode}
                label="Mode"
                onChange={handleChange}
                sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '.MuiSvgIcon-root': { color: 'white' }
                }}
            >
                <MenuItem value='light'>
                    <Box style={{
                        display: 'flex', alignItems: 'center',
                        gap: 1
                    }}>
                        <LightModeIcon fontSize='small' /> Light
                    </Box>
                </MenuItem>
                <MenuItem value={'system'}>
                    <Box sx={{
                        display: 'flex', alignItems: 'center',
                        gap: 1
                    }}>
                        <ContrastIcon fontSize='small' />System
                    </Box>
                </MenuItem>
                <MenuItem value='dark'>
                    <Box sx={{
                        display: 'flex', alignItems: 'center',
                        gap: 2
                    }}>
                        <DarkModeIcon fontSize='small' /> Dark
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    )
}

export default ModeSelect
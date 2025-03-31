import Button from '@mui/material/Button'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import Typography from '@mui/material/Typography'
import {
  Box,
  FormControl, InputLabel, MenuItem, Select, useColorScheme, useMediaQuery

} from '@mui/material'
import { useState } from 'react'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ContrastIcon from '@mui/icons-material/Contrast'
function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value={'light'}>
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '8px'
          }}>
            <LightModeIcon fontSize='small' /> Light
          </div>
        </MenuItem>
        <MenuItem value={'system'}>
          <Box sx={{
            display: 'flex', alignItems: 'center',
            gap: '8px'
          }}>
            <ContrastIcon fontSize='small' />System
          </Box>
        </MenuItem>
        <MenuItem value={'dark'}>
          <Box sx={{
            display: 'flex', alignItems: 'center',
            gap: '8px'
          }}>
            <DarkModeIcon fontSize='small' /> Dark
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
function ModeToggle() {
  const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const preferLightMode = useMediaQuery('(prefers-color-scheme: light)')
  console.log(preferDarkMode)
  console.log(preferLightMode)
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

function App() {
  return (
    <>
      <ModeSelect />
      <hr />
      <div>vo quoc huy</div>
      <Typography color='text.secondary'>vo quoc huy second </Typography>
      <AcUnitIcon />
      <Button>
        vo quoc huy
      </Button>
    </>
  )
}

export default App

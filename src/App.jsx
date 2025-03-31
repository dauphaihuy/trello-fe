import Button from '@mui/material/Button'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import Typography from '@mui/material/Typography'
import {
  Box,
  Container,
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
            gap: 1
          }}>
            <ContrastIcon fontSize='small' />System
          </Box>
        </MenuItem>
        <MenuItem value={'dark'}>
          <Box sx={{
            display: 'flex', alignItems: 'center',
            gap: 2
          }}>
            <DarkModeIcon fontSize='small' /> Dark
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
function App() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{
        height: '100vh',
      }}>
        {/* appBar */}
        <Box sx={{
          backgroundColor: 'primary.light',
          width: '100%',
          height: (theme) => theme.trello.appBarHeight,
          display: 'flex',
          alignItems: 'center'
        }}>
          <ModeSelect />
        </Box>
        {/* boardBar */}
        <Box sx={{
          backgroundColor: 'primary.dark',
          width: '100%',
          height: (theme) => theme.trello.boardBarHeight,
          display: 'flex',
          alignItems: 'center'
        }}>boardBar</Box>
        {/* board content */}
        <Box sx={{
          backgroundColor: 'primary.dark',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          height: (theme) => theme.trello.boardContentHeight,
        }}>
          vo quoc huy
        </Box>
      </Container>
    </>
  )
}

export default App

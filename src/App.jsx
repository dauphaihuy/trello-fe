import Button from '@mui/material/Button'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material';
function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

function App() {
  return (
    <>
      <ModeToggle />
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

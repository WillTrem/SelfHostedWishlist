import { MemoryRouter, Route, Routes } from 'react-router';
import Home from './Home';
import ItemPicker from './ItemPicker';
import { Box } from '@chakra-ui/react/box';
import { useColorMode } from './components/ui/color-mode';
import { useEffect } from 'react';

function App() {
  const { setColorMode } = useColorMode();

  // Force light theme
  useEffect(() => {
    setColorMode('light');
  }, []);

  return (
    <MemoryRouter>
      <Box maxW={360} maxH={600}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/pick-item' element={<ItemPicker />}></Route>
        </Routes>
      </Box>
    </MemoryRouter>
  );
}

export default App;

import React, { useContext } from 'react';
import Switch from 'react-dark-mode-toggle';
import { ThemeContext } from 'styled-components';

interface Props {
  toggleTheme(): void;
}

const Switcher: React.FC<Props> = ({toggleTheme}) => {
  const { title } = useContext(ThemeContext);
  return (
    <Switch
      onChange={toggleTheme}
      checked={title === 'dark'}
      size={70}
    />
  )
}

export default Switcher;
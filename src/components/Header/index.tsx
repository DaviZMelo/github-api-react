import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { HeaderStyle } from './styles';

import logoImg from '../../assets/logo.svg';

const Header: React.FC = () => (
  <>
    <HeaderStyle>
      <Link to="/">
        <img src={logoImg} alt="Github Explorer" />
      </Link>
      <Link to="/">
        <FiChevronLeft size={16} />
        Início
      </Link>
    </HeaderStyle>
  </>
);

export default Header;

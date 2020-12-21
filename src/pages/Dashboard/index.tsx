import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Switcher from '../../components/Switcher'

import GlobalStyle from '../../styles/global';

import { darkTheme, lightTheme } from '../../styles/theme';

import usePersistedState from '../../utils/usePersistentState';

import logoImg from '../../assets/logo.svg';

import { Header, Title, Form, Repositories, Error } from './styles';
import { ThemeProvider, DefaultTheme } from 'styled-components';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [theme, setTheme] = usePersistedState<DefaultTheme>('light', lightTheme);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? darkTheme : lightTheme);
  }

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Repositório inválido');
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
      <GlobalStyle />
        <Header>
          <img src={logoImg} alt="Github Explorer" />
          <Switcher toggleTheme={toggleTheme} />
        </Header>

        <Title>Explore repositórios no Github</Title>
        <Form hasError={!!inputError} onSubmit={handleAddRepository}>
          <input
            value={newRepo}
            onChange={e => setNewRepo(e.target.value)}
            placeholder="Digite o nome do repositório"
          />
          <button type="submit">Pesquisar</button>
        </Form>

        {inputError && <Error>{inputError}</Error>}

        <Repositories>
          {repositories.map(repository => (
            <Link
              key={repository.full_name}
              to={`/repositories/${repository.full_name}`}
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>

              <FiChevronRight size={20} />
            </Link>
          ))}
        </Repositories>
      </ThemeProvider>

    </>
  );
};

export default Dashboard;

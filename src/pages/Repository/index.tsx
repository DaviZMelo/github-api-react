import React, { useEffect, useState } from 'react';
import { useRouteMatch, Redirect, useHistory } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import Header from '../../components/Header';

import api from '../../services/api';

import { RepositoryInfo, Issues } from './styles';
import usePersistedState from '../../utils/usePersistentState';
import { lightTheme } from '../../styles/theme';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import GlobalStyle from '../../styles/global';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: string;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState(false);
  const [ theme ] = usePersistedState<DefaultTheme>('light', lightTheme);
  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api
      .get(`repos/${params.repository}`)
      .then(response => {
        if (response.status !== 200) setError(true);
        setRepository(response.data);
      })
      .catch(() => setError(true));
    api
      .get(`repos/${params.repository}/issues`)
      .then(response => {
        if (response.status !== 200) setError(true);
        setIssues(response.data);
      })
      .catch(() => setError(true));
  }, [params.repository]);

  useHistory();

  return (
    <>
      <ThemeProvider theme={theme}>
      <GlobalStyle /> 
      <Header />
      {error && <Redirect to="/404" />}

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Starts</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
      </ThemeProvider>
    </>
  );
};

export default Repository;

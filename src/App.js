import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, [])

  async function handleAddRepository() {
    setRepositories([...repositories, `New repository ${Date.now()}`]);

    const response = await api.post('/repositories', {
      title: `New repository ${Date.now()}`
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);

    const repositoriesNew = repositories.slice();

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositoriesNew.splice(repositoryIndex, 1);

    setRepositories([...repositoriesNew]);    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
            <li key={repository.id}>  
              {repository.title} 

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>  
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
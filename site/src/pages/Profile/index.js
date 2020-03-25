import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch(e) {
      alert('Erro ao deletar caso, tente novamente!');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile">
      <header className="profile-header">
        <h1><img className="profile-logo" src={logoImg} alt="Be the Hero"/></h1>
        <span className="profile-welcome">Bem vindo(a), {ongName}</span>

        <Link className="btn profile-btn" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" className="profile-logout" onClick={handleLogout}>
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h2 className="profile-title">Casos cadastrados</h2>

      <ul className="profile-list">
        {incidents.map(incident => (
          <li className="profile-item" key={incident.id}>
            <strong className="profile-item_title">Caso:</strong>
            <p className="profile-item_text">{incident.title}</p>

            <strong className="profile-item_title">Descrição:</strong>
            <p className="profile-item_text">{incident.description}</p>

            <strong className="profile-item_title">Valor:</strong>
            <p className="profile-item_text">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button" className="profile-logout profile-btn_delete" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
        ))}
     </ul>
    </div>
  );
}
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import api from "../../services/api";

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');
  const  history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id })
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch(e) {
      alert('Falha no Logon, tente novamente!');
      console.error(e);
    }
  }
  return (
    <div className="logon">
      <section className="logon-content">
        <h1><img src={logoImg} alt="Be the Hero"/></h1>

        <form className="logon-form" onSubmit={handleLogin}>
          <h2 className="logon-form_title">Faça seu logon</h2>

          <input
            type="text"
            placeholder="Sua ID"
            className="input"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <button type="submit" className="btn">Entrar</button>

          <Link to="/register" className="link">
            <FiLogIn size={16} color="#E02041" className="link_icon"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
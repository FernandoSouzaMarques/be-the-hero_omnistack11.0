import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import './styles.css';
import api from '../../services/api';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile');
    } catch(e) {
      alert('Erro ao cadastrar caso, tente novamente!');
    }
  }
  return (
    <div className="newIncident">
      <div className="newIncident-cnt">
        <section className="newIncident-content">
          <h1><img src={logoImg} alt="Be the Hero"/></h1>
          <h2 className="newIncident-title">Cadastrar novo caso</h2>
          <p className="newIncident-text">
            Descreva o caso detalhadamente para encontrar um herói para resolver isso.
          </p>
          <Link to="/profile" className="link">
            <FiArrowLeft size={16} color="#E02041" className="link_icon"/>
            Voltar para home
          </Link>
        </section>
        <form className="newIncident-form" onSubmit={handleNewIncident}>
          <input
            type="text"
            placeholder="Título do caso"
            className="input newIncident-form_input"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            className="text-area newIncident-form_input"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Valor em reais"
            className="input newIncident-form_input"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="btn" type="subimit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
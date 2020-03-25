import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import './styles.css';
import api from '../../services/api'

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    const response = await api.post('ongs', data);

    try {
      alert(`Seu ID de acesso: ${response.data.id}`)

      history.push('/');
    } catch(e) {
      alert(`Erro no cadastro, tente novamente!`);
      console.error(e);
    }
  }

  return (
    <div className="register">
      <div className="register-cnt">
        <section className="register-content">
          <h1><img src={logoImg} alt="Be the Hero"/></h1>
          <h2 className="register-title">Cadastro</h2>
          <p className="register-text">
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.
          </p>
          <Link to="/" className="link">
            <FiArrowLeft size={16} color="#E02041" className="link_icon"/>
            Voltar para o logon
          </Link>
        </section>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            className="input register-form_input"
            value={name}
            onChange={e => setName(e.target.value)}/>
          <input
            type="email"
            placeholder="E-mail"
            className="input register-form_input"
            value={email}
            onChange={e => setEmail(e.target.value)}/>
          <input
            type="text"
            placeholder="WhatsApp"
            className="input register-form_input"
            value={whatsapp}
            onChange={e => setWatsapp(e.target.value)}/>
          <div className="register-form_city">
            <input
              type="text"
              placeholder="Cidade"
              className="input register-form_input"
              value={city}
              onChange={e => setCity(e.target.value)}/>
            <input
              type="text"
              placeholder="UF"
              className="input register-form_input register-form_input-sm"
              value={uf}
              onChange={e => setUf(e.target.value)}/>
          </div>

          <button className="btn" type="subimit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
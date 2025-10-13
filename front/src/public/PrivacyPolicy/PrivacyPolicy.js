import React from 'react';
import Menu from '../../components/Menu/Menu';
function Comandos() {

const email = 'contato@sarnento.app.br'
const ultimaAtualizacao = '19/12/2024'

      return (
      <React.Fragment>
        <Menu />
        <main className="content">

        <div className="container mt-5">

              
              
              <h3>Sarnento - Privacy Policy</h3>
              
              
<p className="align-right">Última atualização: {ultimaAtualizacao}</p>

<h4>1 - Informações Coletadas</h4>

<p>O bot coleta dados como IDs de usuário, mensagens enviadas para comandos e informações do servidor.</p>
<p>Não coletamos informações pessoais sensíveis.</p>


<h4>2 - Uso das Informações</h4>
<p>Os dados são usados exclusivamente para executar os comandos e funcionalidades do bot.</p>
<p>Não compartilhamos dados com terceiros.</p>

<h4>3 - Armazenamento de Dados</h4>
<p>Dados temporários são armazenados em memória do bot e excluídos após 30 dias.</p>
<p>Você pode solicitar a remoção de dados entrando em contato pelo e-mail: {email}.</p>

<h4>4 - Segurança</h4>

<p>Implementamos medidas de segurança para proteger as informações coletadas.</p>
<p>No entanto, nenhuma transmissão pela internet é completamente segura.</p>

<h4>5 - Alterações na Política</h4>

<p>Podemos atualizar esta Política de Privacidade a qualquer momento. Recomendamos que revise periodicamente.</p>

<h4>6 - Contato</h4>
<p>Para dúvidas ou solicitações sobre privacidade, entre em contato pelo e-mail: {email}.</p>

        </div>

            
        </main>
      </React.Fragment>
       
      );
};
    

export default Comandos;
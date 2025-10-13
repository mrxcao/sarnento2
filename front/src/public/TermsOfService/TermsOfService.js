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

              <h3>Sarnento - Termos de Serviço</h3>
              <p className="align-right">Última atualização: {ultimaAtualizacao}</p>


<h4>1 - Aceitação dos Termos</h4>
<p>Ao adicionar o Sarnento ao seu servidor Discord, você concorda com estes Termos de Serviço. Caso não concorde, remova o bot imediatamente.</p>

<h4>2 - Uso Permitido</h4>
<p>Você pode usar o bot apenas para fins legais e de acordo com as diretrizes do Discord.</p>
<p>O bot não deve ser usado para spam, assédio ou qualquer atividade que viole os Termos de Serviço do Discord.</p>

<h4>3 - Modificações</h4>
<p>Reservamo-nos o direito de modificar ou descontinuar o bot a qualquer momento, sem aviso prévio.</p>

<h4>4 - Limitação de Responsabilidade</h4>
<p>Não nos responsabilizamos por danos diretos, indiretos ou consequentes decorrentes do uso do bot.</p>

<h4>5 -Contato</h4>
<p>Para dúvidas, entre em contato pelo e-mail: {email}.</p>


        </div>

            
        </main>
      </React.Fragment>
       
      );
};
    

export default Comandos;
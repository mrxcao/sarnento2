import React from 'react';
import Menu from '../../components/Menu/Menu';
function SourceCode() {

  const dados = [
    { nome: 'Core', descricao:"O corção do Sarnento, é aqui que ele escuta e processa os comandos", link: 'https://github.com/mrxcao/sarnento2' },
    { nome: 'Taks', descricao:"Executa tarefas de tempos em tempos para manutenção e atualização do banco de dados", link: 'https://github.com/mrxcao/sarnento_taks' },
    { nome: 'Front', descricao:"Esta pagina, responsável pela manipulação dos dados e divulgação do Bot", link: 'https://github.com/mrxcao/sarnento_front' },
  ];

  const informacoes = [
    { col1: 'bilioteca', col2:"DiscordJs"},
    { col1: 'FrontEnd', col2:"React"},
    { col1: 'BaclEnd', col2:"NodeJS"},
    { col1: 'DataBase', col2:"MongoDB"},
  ];  

      return (
      <React.Fragment>
        <Menu />
        <main className="content">

        <div className="container mt-5">

              <h4> Sarnento: O que faz</h4>
              <p>É um bot para Discord com diversas funcionalidades. Ele serve para:</p>
              <ul>
                <li>Executar comandos com prefixos e hash: Isso permite que os usuários interajam com o bot através de comandos específicos.  </li>
                <li>Reagir a mensagens no chat: O bot pode ser programado para responder de forma automática a certas mensagens.</li>
                <li>Responder a menções usando IA: O bot utiliza inteligência artificial (IA) para responder a menções, com suporte para ChatGPT, Gemini e Copilot.</li>
              </ul>

              <p>Para manutenção e futuras funcionalidades, também é oferecido</p>
              <ul>
                <li>API REST: Uma API REST possibilita a manutenção e configuração do bot externamente.</li>
                <li>Integrar com Telegram e WhatsApp: O bot pode ser usado para consultas e comandos através desses aplicativos.</li>
              </ul>

              <h4>Código fonte</h4>
              <p>O bot foi desenvolvido usando JavaScript, HTML  e CSS. A versão atual do bot é a versão 2, utilizando DiscordJS 14.</p>
              <p> Todos os códigos estão disponíveis no GitHub</p>

             
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descriçãoo</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item) => (
            <tr key={item.nome}>
              <td>{item.nome}</td>
              <td>{item.descricao}</td>
              <td> <a target='_banck' href={item.link} > 
              <img height="32" width="32" src="https://unpkg.com/simple-icons@v10/icons/github.svg" />
              </a>  </td>
            </tr>
          ))}
        </tbody>
      </table>
          <p>Para mais informações, por favor, entre em contato</p>
          <h4>mais informações</h4>
          <ul>
            <li><a href ="mailto:contato@sarnento.app.br" target="_blank">contato@sarnento.app.br</a></li>
            <li><a href="https://discord.bots.gg/bots/722913076344782858" target="_blank">discord.bots.gg Sarnento</a></li>
            <li><a href="https://discord.gg/zyfruVFVEW" target="_blank">Servidor de Suporte</a>  </li>
          </ul>
        </div>

            
        </main>
      </React.Fragment>
       
      );
};
    

export default SourceCode;
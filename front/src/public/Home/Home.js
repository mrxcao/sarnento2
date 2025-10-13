import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getStatus } from '../../services/SettingsService';

function Home() {


    const [status, setStatus] = useState({
        STATUS: '',
        uptime: '',
        Users: 0,
        Servers: 0,
        lastUptime: 'null'
    })


    useEffect(()=>{
        const token = localStorage.getItem('token');
       
        getStatus(token).then(resp=> {
            setStatus(resp)
           // document.getElementById('email').removeAttribute('readOnly');
          }).catch(err=> {
            /*
            if (err.response && err.response.status === 401)
                    return history.push('admin/')
            setError(err)
            */
          })
    }, [])    

    const formatUserCount = (count) => {
      const threshold = Math.floor(count / 1000) * 1000;
      return `Mais de ${threshold/1000} MIL usuários`;
    };    

      return (
      <React.Fragment>
        
        <header>
        <Menu />
        </header>
        <main className="content">
        <section className="sec-1">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6">
              
              <br />
              <br />
              <br />
              
              <h1>Mais que um bot do <strong>​Discord</strong>, um companheiro ​para o seu servidor!</h1>
              <br />
              <br /> 
              <a target="_blank" href="https://discord.com/oauth2/authorize?client_id=722913076344782858&scope=bot&permissions=549755289087" 
                className="btn btn-primary invite-button">Convidar o Bot</a>


              
            </div>
            <div className="col-lg-6">              
              <img src="img/sarnento/1.png" />
            </div>
          </div>
        </div>

        <div className="row sec-1-1" hidden={status.STATUS !== 'ok'}>
          <div className="col-4">
              <div className="card card-body border-0 shadow d-flex ">
                  <div className="row">
                  <div className="col-1 align-items-left">                        
                      <span className={`status-indicator ${
                              status.STATUS === 'ok' ? 'status-ok' : 'status-not-ok'
                          }`} ></span>                    
                  </div>
                  <div className="col-11">                        
                    <h4 hidden={status.STATUS !== 'ok'} className="status-text" title={'UPTIME: '+status.uptime}  >Sarnento tá ON! </h4>
                      
                  </div>
                  </div>
              </div>
          </div>
          <div className="col-3">
              <div className="card card-body border-0 shadow  d-flex justify-content-center align-items-center">
                  <div className="text-center">
                      <h4>Em {status.Servers} servidores</h4> 
                  </div>
              </div>
          </div>
          <div className="col-4">
              <div className="card card-body border-0 shadow d-flex justify-content-center align-items-center">
                  <div className="text-center">
                      <h4 title={status.Users}>
                      {status.Users > 0 && formatUserCount(status.Users)}
                      </h4>
                  </div>
              </div>
          </div>                    
          
        </div>

        </section>
        <br />


        <section>        
          <h3>Co​mo assim?</h3>
          <div className="section">                      
              <div className="column">      
                <img src="img/sarnento/2.png" />
              </div>
              <div className="column">              
                <p>
                Além dos comandos de bot que ​todos tem, ele ainda fica atento ao ​que está acontecendo no seu ​servidor e reage aos comentários. ​Em breve, você poderá cadastrar ​suas​ ​próprias reações
                </p>
                <p>
                Para saber mais​, visite​ a página Reação.
                </p>
            </div>
          </div>  
        </section>

        <h3>O que mais?</h3>
        <section className="sec-1">        
        
          <div className="section">                      
            <div className="column">
              <img src="img/sarnento/3.png" /><br />
              <br />
              <h4>Co​mandos</h4>
os tradicionais comandos de ​todos os bots e ainda uns com ​informações como cotação ​financei​ra e resultados de loteria</div>
            <div className="column">
              <img src="img/sarnento/4.png" /><br />
              <br />
              <h4>  No​tificação de ações</h4>
Informe aos seus amigos quando ​alguém entrar numa call ou ​começar a transmitir a tela no ​Discor​d</div>
            <div className="column">
              <img src="img/sarnento/5.png" /><br />
              <br />
              <h4> Se​mpre online</h4>
Ele sempre te responderá se ​chamar​ por ele (em construção) </div>
          </div>
        </section>



        <section>
          <h3>Depoimentos</h3>

            <div className="testimonial-section">
              <div className="testimonial-name">@MRXCAO </div>
              <div className="testimonial-text">“Meu bot favorito que já fiz até hoje”</div>
            </div>

            <div className="testimonial-section">
              <div className="testimonial-name">MARIANA CRUZ </div>
              <div className="testimonial-text">“Depois que usei o Sarnento,, nunca mais meu ​servidor do Discord foi de F”</div>
            </div>          


            <div className="testimonial-section">
              <div className="testimonial-name">FERNANDO SOUZA </div>
              <div className="testimonial-text">“Às vezes fico conversando com ele … e ás vezes ​ele responde”</div>
            </div>
        </section>
        <br />
        <section className="sec-2"> 
          <img src="img/sarnento/6.png" /><br />
          <br />
          Como podemos melhorar?<br />
          <br />
          Suas ideias e opiniões são muito ​bem-​vindas!<br />
          <br />
        </section>

        <section className="sec-3">
        <div className="section">                      
            <div className="column">
            <img src="img/sarnento/7.png" />
            </div>
            <div className="column">
              <h3>Quer saber mais?</h3>
              <br />              
              <ul className="ul-items">
                <li><a href="/sourcecode">có​digo aberto</a></li>
                <li>E-mail: contato@sarnento.app​.br</li>
                <li><a href="google.com">Di​scord oficial do bot </a> </li>
              </ul>
              <br />
              <h3>Ou mande uma mensagem pra gente:</h3>
              <br />
              <form action="https://formspree.io/f/moqgwbjv" method="POST">
                
                <input type="text" id="name" name="name" placeholder="Nome" /><br />
                <br />
                
                <input type="email" id="email" name="_replyto" placeholder="E-mail" /><br />
                <br />
                
                <textarea id="message" name="message" placeholder="Mensagem"></textarea><br />
                <br />
                <button className="btn btn-primary invite-button"
                type="submit">Enviar</button>
              </form>
              

              </div>
          </div>
        </section>                        

        </main>
      </React.Fragment>
       
      );
};
    

export default Home;

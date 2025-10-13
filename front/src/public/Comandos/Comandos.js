import React from 'react';
import Menu from '../../components/Menu/Menu';
function Comandos() {

  const dados = [
    { nome: '', descricao:"", tipo:"" },
  ];


      return (
      <React.Fragment>
        <Menu />
        <main className="content">

        <div className="container mt-5">

              
              
              <h3>Comandos</h3>
              
              <p> Em construção </p>


                    
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descriçãoo</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((item) => (
                  <tr key={item.nome}>
                    <td>{item.nome}</td>
                    <td>{item.descricao}</td>
                    <td>{item.Tipo}</td>                   
                  </tr>
                ))}
              </tbody>
            </table>

        </div>

            
        </main>
      </React.Fragment>
       
      );
};
    

export default Comandos;
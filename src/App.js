import React, { useState, useEffect } from "react";
import "./App.css";

/*
  0.2k = 0k
  2k - 3k = 10%
  3k - 4k = 20%
  4 - 5k 25%;
  > 4.600k 27,5%

  pj 7%
*/

// criou => puxa aliquota

// alterou salario => puxa novamente aliquota

// saiu do dom / morrou => salva no localStorage

function CalculaIR() {
  const [salario, setSalario] = useState(localStorage.getItem('salario'));
  const [faixa, setFaixa] = useState(localStorage.getItem('faixa'));

  const puxarAliquota = () => {
    setTimeout(() => {
      if (salario < 2000) setFaixa(0);
      else if (salario < 3000) setFaixa(0.1);
      else if (salario < 4000) setFaixa(0.2);
      else if (salario < 5000) setFaixa(0.25);
      else setFaixa(0.275);
    }, 300);
  };

  const calcular = () => {};

  useEffect(puxarAliquota, []);

  useEffect(puxarAliquota, [salario]);

  useEffect(() => {
    return () => {
      localStorage.setItem("salario", salario);
      localStorage.setItem("faixa", faixa);
    };
  });

  return (
    <>
      Salário:{" "}
      <input
        type="text"
        value={salario}
        onChange={(event) => setSalario(event.target.value)}
      />
      Faixa imposto de renda:{" "}
      <input
        type="text"
        value={faixa}
        onChange={(event) => setFaixa(event.target.value)}
      />
      <button onClick={calcular}>Calcular</button>
    </>
  );
}

function InformarIdade({
  chamarEventoQueTrataraAMudancaDeIdadeQueNaoNecessariamenteSejaUmSetState,
  idade,
}) {
  return (
    <>
      Informe sua nova idade:{" "}
      <input
        id="xyz"
        type="text"
        value={idade}
        onChange={(event) =>
          chamarEventoQueTrataraAMudancaDeIdadeQueNaoNecessariamenteSejaUmSetState(
            event.target.value
          )
        }
      />
    </>
  );
}

function Botao({ meChamaram }) {
  return <button onClick={meChamaram}>Nao me clique</button>;
}

function App() {
  const [idade, setIdade] = useState(0);

  const [visao, setVisao] = useState("a");

  return (
    <div className="App">
      {visao === "a" && <div></div>}

      {visao === "b" && <CalculaIR />}

      {visao === "bb" && (
        <>
          <br />
          <hr />
          Sua idade é {idade}
          <br />
          <InformarIdade
            chamarEventoQueTrataraAMudancaDeIdadeQueNaoNecessariamenteSejaUmSetState={
              setIdade
            }
            idade={idade}
          />
        </>
      )}
      <br />
      <hr />
      Visao: <input type="text" value={visao} onChange={event => setVisao(event.target.value)} />
    </div>
  );
}

export default App;

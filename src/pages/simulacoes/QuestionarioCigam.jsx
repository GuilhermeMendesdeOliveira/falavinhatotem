import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderApp from "../../components/Header";
import Botoes from "../../components/Botoes";
import HeroApp from "../../components/Hero";
import FramerMotion from "../../components/FramerMotion";
import FooterApp from "../../components/Footer";
import fundo from "../../assets/image/FundoCigam.png";
import { GlobalContext } from "../../context/GlobalContextProvider";
import Formulario from "../../components/Formulario";
import { numberFormatter } from "../../utils";
import QuestionarioCigamState from "../../states/QuestionarioCigamState";
import gifWinner from "../../assets/gifs/winner.gif";

export default function QuestionarioCigam() {
  const navigate = useNavigate();
  const { moneyConverter, hasEmptyInputs, hasInputErrors, setResultadoCigam } =
    useContext(GlobalContext);
  const {
    cigamValues,
    setCigamValues,
    produtividade_mensal,
    produtividade_hora,
    produtividade_financeira,
    roi_meses_ano,
    roi_anual,
    roi_mensal,
    salario_hora,
    folha_pagamento,
  } = QuestionarioCigamState();
  const isValidValue = (val) => (isNaN(val) || !isFinite(val) ? "" : val);
  const [isFormVisible, setisFormVisible] = useState(false);
  const emptyValueFields =
    cigamValues.usuarios === "" ||
    cigamValues.salario_medio === "" ||
    cigamValues.implementacao === "" ||
    cigamValues.situacao_atual === "";

  const handleChange = (event) => {
    const { id, value } = event.target;
    // Permite apenas números
    const numericValue = value.replace(/[^0-9]/g, "");
    const parsedValue = numericValue === "" ? "" : parseInt(numericValue, 10);
    setCigamValues((prevValues) => ({
      ...prevValues,
      [id]:
        parsedValue > 0 || numericValue === "" ? numericValue : prevValues[id],
    }));
  };

  // Envia dados para o servidor
  const handleSubmitValues = () => {
    if (emptyValueFields) return;
    setResultadoCigam({
      ...cigamValues,
      folha_pagamento,
      salario_hora,
      produtividade_hora,
      produtividade_mensal,
      produtividade_financeira,
      roi_meses_ano,
    });
    navigate("/resultado-cigam");
  };

  return (
    <>
      <HeaderApp redirect={"/servicos"}>
        <h1 className="title">Faça uma pesquisa sobre sua empresa</h1>
      </HeaderApp>

      <HeroApp fundo={fundo}>
        <FramerMotion>
          <Formulario setisFormVisible={setisFormVisible} />
          <form className="form">
            <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center"
             }}>
              <p style={{backgroundColor: "#FE710E", padding: 15, borderRadius: 10, width: 200}}>Usuários:</p>
              <TextInput
                //title="Usuários:"
                nome="usuarios"
                type="text"
                id="usuarios"
                value={numberFormatter(cigamValues.usuarios)}
                onChange={handleChange}
                placeholder="Número de usuários"
              />
            </div>
            
            <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center"
             }}>
              <p style={{backgroundColor: "#FE710E", padding: 15, borderRadius: 10, width: 200}}>Salário médio:</p>
            <TextInput
              //title="Salário médio:"
              nome="salario_medio"
              type="text"
              id="salario_medio"
              value={
                cigamValues.salario_medio &&
                `R$ ${numberFormatter(cigamValues.salario_medio)}`
              }
              onChange={handleChange}
              placeholder="Salário médio do colaborador"
            />
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center"
             }}>
              <p style={{backgroundColor: "#FE710E", padding: 15, borderRadius: 10, width: 200}}>Implementação:</p>
            <TextInput
              //title="Implementação:"
              nome="implementacao"
              type="text"
              id="implementacao"
              value={
                cigamValues.implementacao &&
                `R$ ${numberFormatter(cigamValues.implementacao)}`
              }
              onChange={handleChange}
              placeholder="Valor de implementação"
            />
            </div>
            <label
              htmlFor="situacao_atual"
              className="input-label input-label__select"
            >
              <span >Situação atual:</span>
              <select
                className="input-element"
                name="situacao_atual"
                id="situacao_atual"
                value={cigamValues.situacao_atual}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value={15}>ERP Grande porte</option>
                <option value={20}>ERP Pequeno porte</option>
                <option value={30}>Não possui ERP/Micro ERP</option>
              </select>
            </label>
            {/* OUTPUTS
            <TextInput
              title="ROI mensal:"
              nome="roi_mensal"
              type="text"
              id="roi_mensal"
              value={moneyConverter(isValidValue(roi_mensal))}
              onChange={handleChange}
              placeholder="R$ 0,00"
              newClassName="input-element__output"
              isReadOnly={true}
            />

            <TextInput
              title="ROI anual - GP:"
              nome="roi_anual"
              type="text"
              id="roi_anual"
              value={moneyConverter(isValidValue(roi_anual))}
              onChange={handleChange}
              placeholder="R$ 0,00"
              newClassName="input-element__output"
              isReadOnly={true}
            />

            <TextInput
              title="ROI anual - GP:"
              nome="folha_pagamento"
              type="text"
              id="folha_pagamento"
              value={moneyConverter(isValidValue(folha_pagamento))}
              onChange={handleChange}
              placeholder="R$ 0,00"
              newClassName="input-element__output"
              isReadOnly={true}
            />

            <TextInput
              title="Salário/Hora:"
              nome="salario_hora"
              type="text"
              id="salario_hora"
              value={moneyConverter(isValidValue(salario_hora))}
              onChange={handleChange}
              placeholder="R$ 0,00"
              newClassName="input-element__output"
              isReadOnly={true}
            />

            <TextInput
              title="Ano/Meses para ROI:"
              nome="tempo_roi"
              type="text"
              id="tempo_roi"
              value={isValidValue(roi_meses_ano.toFixed(1)).replace(".", ",")}
              onChange={handleChange}
              placeholder="Tempo para ROI"
              newClassName="input-element__output"
              isReadOnly={true}
            /> */}
            <br />
          </form>
          <div className="consultoria-rh">
            <div className="consultoria-rh__item">
              <img src={gifWinner} alt="Winner" className="icon-topicos_rh"/>
              <p>Premiado como Melhor ERP para médias e Grandes empresas pelo B2B STACK</p>
            </div>
            <div className="consultoria-rh__item">
              <img src={gifWinner} alt="Winner" className="icon-topicos_rh"/>
              <p>Único ERP de grande porte que usa tecnologia LOW CODE - à prova de futuro (Magic)</p>
            </div>
          </div>
        </FramerMotion>
      </HeroApp>
      <FooterApp footerFixed>
        <Botoes
          type="button"
          className="botao"
          onClick={handleSubmitValues}
          disabled={
            (isFormVisible && hasEmptyInputs) ||
            hasInputErrors ||
            emptyValueFields
          }
        >
          Calcular
        </Botoes>
      </FooterApp>
    </>
  );
}

const TextInput = ({
  title,
  nome,
  value,
  onChange,
  placeholder,
  newClassName,
  isReadOnly,
}) => (
  <label htmlFor={nome} className="input-label">
    <span>{title}</span>
    <input
      className={`input-element ${newClassName}`}
      name={nome}
      placeholder={placeholder}
      autoComplete="off"
      value={value || ""}
      id={nome}
      onChange={onChange}
      readOnly={isReadOnly}
    />
  </label>
);

TextInput.propTypes = {
  title: PropTypes.string,
  nome: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  newClassName: PropTypes.string,
  isReadOnly: PropTypes.bool,
};

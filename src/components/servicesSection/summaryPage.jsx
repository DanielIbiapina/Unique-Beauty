import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import {
  SummaryContainer,
  SummaryTitle,
  SummaryItem,
  TotalPrice,
  ConfirmButton,
  BackButton,
  Input,
  Form,
  ErrorMessage,
  OrText,
  VerificationContainer,
  VerificationTitle,
  VerificationForm,
  InputGroup,
  StyledInput,
  ActionButton,
} from "./styles";

const SummaryPage = ({
  selectedServices,
  groupedServices,
  selectedProfessionals,
  professionals,
  selectedDates,
  selectedTimes,
  onConfirm,
  onBack,
}) => {
  const [step, setStep] = useState("verificacao");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [clientInfo, setClientInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState("");

  const getServiceDetails = (serviceId) => {
    return Object.values(groupedServices)
      .flat()
      .find((service) => service.id === serviceId);
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = getServiceDetails(serviceId);
      return total + (service ? service.price : 0);
    }, 0);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/clients/${phoneNumber}`
      );
      if (response.data) {
        console.log(response.data);
        setClientInfo(response.data);
        setStep("confirmacao");
      } else {
        setStep("cadastro");
      }
    } catch (error) {
      setError("Erro ao verificar cliente. Tente novamente.");
    }
  };

  const handleQuickRegistration = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/clients`,
        formData
      );
      setClientInfo(response.data);
      setStep("agendamento");
    } catch (error) {
      setError("Erro ao cadastrar cliente. Tente novamente.");
    }
  };

  const handleConfirm = () => {
    onConfirm(clientInfo);
  };

  const renderClientVerification = () => (
    <>
      <SummaryTitle>Área da Cliente</SummaryTitle>
      <VerificationContainer>
        <VerificationTitle>Você já tem cadastro?</VerificationTitle>
        <VerificationForm onSubmit={handlePhoneSubmit}>
          <StyledInput
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Seu número de telefone"
            required
          />
          <ActionButton
            type="submit"
            primary
            style={{ width: "100%", marginTop: "10px" }}
          >
            Verificar cadastro
          </ActionButton>
        </VerificationForm>
        <OrText>ou</OrText>
        <ActionButton
          onClick={() => setStep("cadastro")}
          style={{ width: "100%" }}
        >
          Não tenho cadastro
        </ActionButton>
      </VerificationContainer>
    </>
  );

  const renderClientConfirmation = () => (
    <VerificationContainer>
      <VerificationTitle>Confirmação de Identidade</VerificationTitle>
      <SummaryItem>
        <p>Olá, você é a {clientInfo.name}?</p>
      </SummaryItem>

      <ActionButton
        onClick={() => setStep("agendamento")}
        primary
        style={{ width: "100%", marginBottom: "10px" }}
      >
        Sim, sou eu
      </ActionButton>
      <ActionButton
        onClick={() => setStep("verificacao")}
        style={{ width: "100%" }}
      >
        Não, não sou eu
      </ActionButton>
    </VerificationContainer>
  );

  const renderQuickRegistration = () => (
    <>
      <SummaryTitle>Área da Cliente</SummaryTitle>
      <VerificationContainer>
        <VerificationTitle>Cadastro Rápido</VerificationTitle>
        <VerificationForm onSubmit={handleQuickRegistration}>
          <StyledInput
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nome"
            required
          />
          <StyledInput
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Telefone"
            required
          />
          <StyledInput
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="E-mail"
            required
          />
          <StyledInput
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Endereço"
            required
          />
          <ActionButton
            type="submit"
            primary
            style={{ width: "100%", marginTop: "10px" }}
          >
            Cadastrar
          </ActionButton>
        </VerificationForm>
        <OrText>ou</OrText>
        <ActionButton
          onClick={() => setStep("verificacao")}
          style={{ width: "100%" }}
        >
          Já tenho cadastro
        </ActionButton>
      </VerificationContainer>
    </>
  );

  return (
    <SummaryContainer>
      <BackButton onClick={onBack}>
        <FaArrowLeft /> Voltar
      </BackButton>
      <SummaryTitle>Resumo do Agendamento</SummaryTitle>
      {selectedServices.map((serviceId) => {
        const service = getServiceDetails(serviceId);
        const professional = professionals.find(
          (p) => p.id === selectedProfessionals[serviceId]
        );
        return (
          <SummaryItem key={serviceId}>
            <h3>{service.name}</h3>
            <p>
              Profissional:{" "}
              {professional ? professional.name : "Não selecionado"}
            </p>
            <p>Data: {selectedDates[serviceId]}</p>
            <p>Horário: {selectedTimes[serviceId]}</p>
            <p>Preço: R$ {service.price.toFixed(2)}</p>
          </SummaryItem>
        );
      })}
      <TotalPrice>
        Preço Total: <span>R$ {getTotalPrice().toFixed(2)}</span>
      </TotalPrice>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {step === "verificacao" && renderClientVerification()}
      {step === "confirmacao" && renderClientConfirmation()}
      {step === "cadastro" && renderQuickRegistration()}
      {step === "agendamento" && (
        <ActionButton onClick={handleConfirm} primary style={{ width: "100%" }}>
          Confirmar Agendamento
        </ActionButton>
      )}
    </SummaryContainer>
  );
};

export default SummaryPage;

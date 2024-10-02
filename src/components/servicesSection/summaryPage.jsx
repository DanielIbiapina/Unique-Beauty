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
        `http://localhost:4000/clients/${phoneNumber}`
      );
      if (response.data) {
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
        "http://localhost:4000/clients",
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
      <Form onSubmit={handlePhoneSubmit}>
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Seu número de telefone"
          required
        />
        <ConfirmButton type="submit">Verificar</ConfirmButton>
      </Form>
      <p>ou</p>
      <ConfirmButton onClick={() => setStep("cadastro")}>
        Não tenho cadastro
      </ConfirmButton>
    </>
  );

  const renderClientConfirmation = () => (
    <div>
      <p>Você é {clientInfo}?</p>
      <ConfirmButton onClick={() => setStep("agendamento")}>Sim</ConfirmButton>
      <BackButton onClick={() => setStep("verificacao")}>Não</BackButton>
    </div>
  );

  const renderQuickRegistration = () => (
    <Form onSubmit={handleQuickRegistration}>
      <Input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Nome completo"
        required
      />
      <Input
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="Telefone"
        required
      />
      <Input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="E-mail"
        required
      />
      <Input
        type="text"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        placeholder="Endereço"
        required
      />
      <ConfirmButton type="submit">Cadastrar</ConfirmButton>
    </Form>
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

      {step === "verificacao" && (
        <>
          <p>Já tem cadastro? Coloque o seu número de telefone aqui:</p>
          {renderClientVerification()}
        </>
      )}
      {step === "confirmacao" && renderClientConfirmation()}
      {step === "cadastro" && (
        <>
          <p>Preencha seus dados para um cadastro rápido:</p>
          {renderQuickRegistration()}
        </>
      )}
      {step === "agendamento" && (
        <ConfirmButton onClick={handleConfirm}>
          Confirmar Agendamento
        </ConfirmButton>
      )}
    </SummaryContainer>
  );
};

export default SummaryPage;

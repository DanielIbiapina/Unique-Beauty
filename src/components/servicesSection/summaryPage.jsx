import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  SummaryContainer,
  SummaryTitle,
  SummaryItem,
  TotalPrice,
  ConfirmButton,
  BackButton,
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
      <ConfirmButton onClick={onConfirm}>Confirmar Agendamento</ConfirmButton>
    </SummaryContainer>
  );
};

export default SummaryPage;

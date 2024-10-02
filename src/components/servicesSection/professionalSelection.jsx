import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  ProfessionalSelectionPage,
  BackButton,
  ServiceList,
  ServiceItem,
  ProfessionalList,
  ProfessionalItem,
  ConfirmButton,
  ProfessionalImage,
  ProfessionalInfo,
  ProfessionalName,
} from "./styles"; // Certifique-se de criar estes estilos
import { SectionTitle } from "../../pages/home/styles";

const ProfessionalSelection = ({
  selectedServices,
  groupedServices,
  professionals,
  selectedProfessionals,
  setSelectedProfessionals,
  onConfirm,
  onBack,
}) => {
  const handleProfessionalSelection = (serviceId, professionalId) => {
    setSelectedProfessionals((prev) => ({
      ...prev,
      [serviceId]: professionalId,
    }));
  };

  const allProfessionalsSelected = selectedServices.every(
    (serviceId) => selectedProfessionals[serviceId]
  );

  return (
    <ProfessionalSelectionPage>
      <BackButton onClick={onBack}>
        <FaArrowLeft /> Voltar
      </BackButton>
      <SectionTitle>Escolha o Profissional</SectionTitle>

      {selectedServices.map((serviceId) => {
        const service = Object.values(groupedServices)
          .flat()
          .find((s) => s.id === serviceId);

        return (
          <div key={serviceId}>
            <h3>{service.name}</h3>
            <ProfessionalList>
              {professionals.map((professional) => (
                <ProfessionalItem
                  key={professional.id}
                  selected={
                    selectedProfessionals[serviceId] === professional.id
                  }
                  onClick={() =>
                    handleProfessionalSelection(serviceId, professional.id)
                  }
                >
                  <ProfessionalImage
                    src={professional.imageUrl}
                    alt={professional.name}
                  />
                  <ProfessionalInfo>
                    <ProfessionalName>{professional.name}</ProfessionalName>
                  </ProfessionalInfo>
                </ProfessionalItem>
              ))}
            </ProfessionalList>
          </div>
        );
      })}

      <ConfirmButton onClick={onConfirm} disabled={!allProfessionalsSelected}>
        Confirmar Seleção
      </ConfirmButton>
    </ProfessionalSelectionPage>
  );
};

export default ProfessionalSelection;

import React from "react";
import {
  DetailedServiceSelectionPage,
  CategorySection,
  CategoryTitle,
  DetailedServiceList,
  DetailedServiceItem,
  ServiceName,
  ServicePrice,
  ServiceIcon,
  ConfirmButton,
  BackButton,
} from "./styles";
import { FaArrowLeft, FaCheck, FaPlus } from "react-icons/fa";
import { SectionTitle } from "../../pages/home/styles";

const DetailedServiceSelection = ({
  serviceCategories,
  groupedServices,
  selectedServices,
  handleDetailedServiceSelection,
  handleConfirmDetailedSelection,
  onBack,
}) => {
  return (
    <DetailedServiceSelectionPage>
      <BackButton onClick={onBack}>
        <FaArrowLeft /> Voltar
      </BackButton>
      <SectionTitle>Selecione os Serviços</SectionTitle>
      {Object.entries(groupedServices).map(([categoryName, services]) => (
        <CategorySection key={categoryName}>
          <CategoryTitle>{categoryName}</CategoryTitle>
          <DetailedServiceList>
            {services.map((serviceDetails) => (
              <DetailedServiceItem
                key={serviceDetails.id}
                onClick={() =>
                  handleDetailedServiceSelection(serviceDetails.id)
                }
                selected={selectedServices.includes(serviceDetails.id)}
              >
                <ServiceName>{serviceDetails.name}</ServiceName>
                <ServicePrice>
                  R$ {serviceDetails.price.toFixed(2)}
                </ServicePrice>
                <ServiceIcon>
                  {selectedServices.includes(serviceDetails.id) ? (
                    <FaCheck />
                  ) : (
                    <FaPlus />
                  )}
                </ServiceIcon>
              </DetailedServiceItem>
            ))}
          </DetailedServiceList>
        </CategorySection>
      ))}
      <ConfirmButton onClick={handleConfirmDetailedSelection}>
        Confirmar Seleção
      </ConfirmButton>
    </DetailedServiceSelectionPage>
  );
};

export default DetailedServiceSelection;

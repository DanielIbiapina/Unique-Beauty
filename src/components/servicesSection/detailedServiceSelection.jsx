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
import { SectionTitle } from "../../App.styles";

const DetailedServiceSelection = ({
  serviceCategories,
  groupedServices,
  selectedServices,
  handleDetailedServiceSelection,
  handleConfirmDetailedSelection,
  setShowDetailedServiceSelection,
}) => {
  return (
    <DetailedServiceSelectionPage>
      <BackButton onClick={() => setShowDetailedServiceSelection(false)}>
        <FaArrowLeft /> Voltar
      </BackButton>
      <SectionTitle>Selecione os Serviços</SectionTitle>
      {serviceCategories.map((category) => (
        <CategorySection key={category.name}>
          <CategoryTitle>{category.name}</CategoryTitle>
          <DetailedServiceList>
            {groupedServices[category.name]?.map((serviceDetails) => (
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

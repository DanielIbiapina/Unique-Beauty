import React, { useState, useEffect, forwardRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  ServiceCategories,
  ServiceCategory,
  CategoryImage,
  CategoryTitle,
  ServiceList,
  ServiceItem,
  ScheduleButton,
  DateTimeSelectionPage,
  DateList,
  DateItem,
  TimeList,
  TimeItem,
  BackButton,
  ConfirmButton,
  ShowMoreButton,
  SelectionLabel,
} from "./styles";
import { Section, SectionTitle } from "../../pages/home/styles";
import DetailedServiceSelection from "./detailedServiceSelection";
import ProfessionalSelection from "./professionalSelection";
import SummaryPage from "./summaryPage";

const ServicesSection = forwardRef((props, ref) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedProfessionals, setSelectedProfessionals] = useState({});
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTimes, setSelectedTimes] = useState({});
  const [showDetailedServiceSelection, setShowDetailedServiceSelection] =
    useState(false);
  const [showProfessionalSelection, setShowProfessionalSelection] =
    useState(false);
  const [showDateTimeSelection, setShowDateTimeSelection] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [groupedServices, setGroupedServices] = useState({});
  const [professionals, setProfessionals] = useState([]);
  const [availabilityByService, setAvailabilityByService] = useState({});
  const [visibleDays, setVisibleDays] = useState(7);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetchServices();
    fetchProfessionals();
  }, []);

  useEffect(() => {
    if (currentStep === 3) {
      fetchAvailability();
    }
  }, [currentStep, selectedServices, selectedProfessionals, visibleDays]);

  const fetchServices = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/services/grouped`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setGroupedServices(data);
    } catch (error) {
      console.error("Erro ao buscar serviços agrupados:", error);
    }
  };

  const fetchProfessionals = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/professionals`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProfessionals(data);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
    }
  };

  const fetchAvailability = async () => {
    const startDate = new Date().toISOString().split("T")[0];
    const promises = selectedServices.map(async (serviceId) => {
      const professionalId = selectedProfessionals[serviceId];
      if (professionalId) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/schedule/filtered/${professionalId}/${startDate}/${visibleDays}`
          );
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          const scheduleSlots = await response.json();

          return { serviceId, scheduleSlots };
        } catch (error) {
          console.error(
            `Erro ao buscar disponibilidade para o serviço ${serviceId}:`,
            error
          );
          return { serviceId, scheduleSlots: [] };
        }
      }
      return { serviceId, scheduleSlots: [] };
    });

    const results = await Promise.all(promises);
    const newAvailability = results.reduce(
      (acc, { serviceId, scheduleSlots }) => {
        acc[serviceId] = scheduleSlots;
        return acc;
      },
      {}
    );

    setAvailabilityByService(newAvailability);
  };

  const handleDateSelection = (serviceId, date) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [serviceId]: date,
    }));
    setSelectedTimes((prevTimes) => ({
      ...prevTimes,
      [serviceId]: null,
    }));
  };

  const handleTimeSelection = (serviceId, time) => {
    setSelectedTimes((prevTimes) => ({
      ...prevTimes,
      [serviceId]: time,
    }));
  };

  const handleShowMoreDays = () => {
    setVisibleDays((prevVisibleDays) => prevVisibleDays + 7);
  };

  const getNextNDays = (n) => {
    const today = new Date();
    return Array.from({ length: n }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date.toISOString().split("T")[0];
    });
  };

  const formatDate = (date) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    return new Date(date)
      .toLocaleDateString("pt-BR", options)
      .replace(".", "") // Remove o ponto após a abreviação do dia
      .replace(/(\d+)/, (match) => match.padStart(2, "0")); // Garante que o dia tenha sempre 2 dígitos
  };

  const renderInitialView = () => (
    <>
      <SectionTitle>Nossos Serviços</SectionTitle>
      <ServiceCategories>
        <ServiceCategory>
          <CategoryImage src="https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg" />
          <CategoryTitle>Cabelo</CategoryTitle>
          <ServiceList>
            <ServiceItem>Hidratação</ServiceItem>
            <ServiceItem>Corte</ServiceItem>
            <ServiceItem>Pintura</ServiceItem>
            <ServiceItem>Escova</ServiceItem>
          </ServiceList>
        </ServiceCategory>
        <ServiceCategory>
          <CategoryImage src="https://github.com/DanielIbiapina/Unique-Beauty/blob/adminpage/src/assets/unhas.jpg?raw=true" />
          <CategoryTitle>Unhas</CategoryTitle>
          <ServiceList>
            <ServiceItem>Verniz</ServiceItem>
            <ServiceItem>Com francesa</ServiceItem>
            <ServiceItem>Alongamento</ServiceItem>
            <ServiceItem>Manutenção</ServiceItem>
          </ServiceList>
        </ServiceCategory>
        <ServiceCategory>
          <CategoryImage src="https://www.cecilydayspa.co.uk/wp-content/uploads/2023/10/Berkhamsted-Beauty-Salon-How-to-Prepare-for-Your-First-Waxing-Appointment-in-a-While-Blog-Image.jpg" />
          <CategoryTitle>Depilação</CategoryTitle>
          <ServiceList>
            <ServiceItem>Axilas</ServiceItem>
            <ServiceItem>Virilha</ServiceItem>
            <ServiceItem>Perna</ServiceItem>
            <ServiceItem>Sobrancelhas</ServiceItem>
          </ServiceList>
        </ServiceCategory>
        <ServiceCategory>
          <CategoryImage src="https://github.com/DanielIbiapina/Unique-Beauty/blob/adminpage/src/assets/michele.jpg?raw=true" />
          <CategoryTitle>Outros</CategoryTitle>
          <ServiceList>
            <ServiceItem>Maquiagens</ServiceItem>
            <ServiceItem>Massagens</ServiceItem>
          </ServiceList>
        </ServiceCategory>
      </ServiceCategories>
      <ScheduleButton onClick={() => setCurrentStep(1)}>
        Ver Todos os Serviços e Agendar
      </ScheduleButton>
    </>
  );

  const renderDateTimeSelection = () => (
    <DateTimeSelectionPage>
      <BackButton onClick={handleBack}>
        <FaArrowLeft /> Voltar
      </BackButton>
      <SectionTitle>Escolha a Data e Horário</SectionTitle>
      {selectedServices.map((serviceId) => {
        const service = Object.values(groupedServices)
          .flat()
          .find((s) => s.id === serviceId);
        const professional = professionals.find(
          (p) => p.id === selectedProfessionals[serviceId]
        );
        const availability = availabilityByService[serviceId] || [];
        const nextDays = getNextNDays(visibleDays);

        return (
          <div key={serviceId}>
            <CategoryTitle>
              {service.name} com{" "}
              {professional ? professional.name : "Sem Preferência"}
            </CategoryTitle>
            {availability.length > 0 ? (
              <>
                <SelectionLabel>Selecione o dia:</SelectionLabel>
                <DateList>
                  {nextDays.map((date) => (
                    <DateItem
                      key={date}
                      onClick={() => handleDateSelection(serviceId, date)}
                      selected={selectedDates[serviceId] === date}
                      disabled={
                        !availability.some((slot) => slot.date.startsWith(date))
                      }
                    >
                      {formatDate(date)}
                    </DateItem>
                  ))}
                </DateList>
                {visibleDays < 28 && (
                  <ShowMoreButton onClick={handleShowMoreDays}>
                    Mostrar mais
                  </ShowMoreButton>
                )}
                {selectedDates[serviceId] && (
                  <>
                    <SelectionLabel>Selecione o horário:</SelectionLabel>
                    <TimeList>
                      {availability
                        .filter((slot) =>
                          slot.date.startsWith(selectedDates[serviceId])
                        )
                        .map((slot) => (
                          <TimeItem
                            key={slot.startTime}
                            onClick={() =>
                              handleTimeSelection(serviceId, slot.startTime)
                            }
                            selected={
                              selectedTimes[serviceId] === slot.startTime
                            }
                          >
                            {slot.startTime}
                          </TimeItem>
                        ))}
                    </TimeList>
                  </>
                )}
                {selectedDates[serviceId] &&
                  availability.filter((slot) =>
                    slot.date.startsWith(selectedDates[serviceId])
                  ).length === 0 && (
                    <p>Nenhum horário disponível para a data selecionada.</p>
                  )}
              </>
            ) : (
              <p>Nenhuma disponibilidade encontrada para este serviço.</p>
            )}
          </div>
        );
      })}
      <ConfirmButton
        onClick={() => setCurrentStep(4)}
        disabled={
          !Object.keys(selectedDates).length ||
          !Object.keys(selectedTimes).length
        }
      >
        Ver Resumo
      </ConfirmButton>
    </DateTimeSelectionPage>
  );

  const handleDetailedServiceSelection = (serviceId) => {
    setSelectedServices((prevServices) => {
      if (prevServices.includes(serviceId)) {
        return prevServices.filter((id) => id !== serviceId);
      } else {
        return [...prevServices, serviceId];
      }
    });
  };

  const handleFinalConfirmation = async (clientInfo) => {
    const appointmentData = {
      status: "confirmado",
      clientId: clientInfo.id,
      services: selectedServices.map((serviceId) => {
        const service = Object.values(groupedServices)
          .flat()
          .find((s) => s.id === serviceId);
        return {
          serviceId: service.id,
          professionalId: selectedProfessionals[serviceId] || null,
          price: service.price,
          dateTime: `${selectedDates[serviceId]}T${selectedTimes[serviceId]}:00Z`,
        };
      }),
    };

    try {
      // Criar o agendamento
      const appointmentResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );

      if (!appointmentResponse.ok) {
        throw new Error(`HTTP error! status: ${appointmentResponse.status}`);
      }

      const appointmentResult = await appointmentResponse.json();
      console.log("Agendamento confirmado:", appointmentResult);

      // Atualizar a disponibilidade do horário para cada profissional
      for (const service of appointmentData.services) {
        if (service.professionalId) {
          const scheduleUpdateResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/schedule/${
              service.professionalId
            }/${selectedDates[service.serviceId]}/${
              selectedTimes[service.serviceId]
            }`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ available: false }),
            }
          );

          if (!scheduleUpdateResponse.ok) {
            throw new Error(
              `HTTP error! status: ${scheduleUpdateResponse.status}`
            );
          }

          const scheduleUpdateResult = await scheduleUpdateResponse.json();
          console.log(
            "Horário atualizado para indisponível:",
            scheduleUpdateResult
          );
        }
      }

      // Resetar o estado após o agendamento bem-sucedido
      setShowSummary(false);
      setSelectedServices([]);
      setSelectedProfessionals({});
      setSelectedDates({});
      setSelectedTimes({});

      alert("Agendamento confirmado com sucesso!");
    } catch (error) {
      console.error("Erro ao confirmar o agendamento:", error);
      alert(
        "Ocorreu um erro ao confirmar o agendamento. Por favor, tente novamente."
      );
    }
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderInitialView();
      case 1:
        return (
          <DetailedServiceSelection
            groupedServices={groupedServices}
            selectedServices={selectedServices}
            handleDetailedServiceSelection={handleDetailedServiceSelection}
            handleConfirmDetailedSelection={() => setCurrentStep(2)}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <ProfessionalSelection
            selectedServices={selectedServices}
            groupedServices={groupedServices}
            professionals={professionals}
            selectedProfessionals={selectedProfessionals}
            setSelectedProfessionals={setSelectedProfessionals}
            onConfirm={() => setCurrentStep(3)}
            onBack={handleBack}
          />
        );
      case 3:
        return renderDateTimeSelection();
      case 4:
        return (
          <SummaryPage
            selectedServices={selectedServices}
            groupedServices={groupedServices}
            selectedProfessionals={selectedProfessionals}
            professionals={professionals}
            selectedDates={selectedDates}
            selectedTimes={selectedTimes}
            onConfirm={(clientInfo) => handleFinalConfirmation(clientInfo)}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return <Section ref={ref}>{renderCurrentStep()}</Section>;
});

export default ServicesSection;

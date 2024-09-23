import React, { useState, useEffect, forwardRef } from "react";
import DetailedServiceSelection from "./detailedServiceSelection";
import { FaCheck, FaPlus, FaArrowLeft } from "react-icons/fa";
import {
  ServiceCategories,
  ServiceCategory,
  CategoryImage,
  CategoryTitle,
  ServiceList,
  ServiceItem,
  ServiceIcon,
  ScheduleButton,
  DetailedServiceSelectionPage,
  CategorySection,
  DetailedServiceList,
  DetailedServiceItem,
  ServicePrice,
  ProfessionalSelectionPage,
  ProfessionalList,
  ProfessionalItem,
  ProfessionalImage,
  ProfessionalInfo,
  ProfessionalName,
  BackButton,
  ConfirmButton,
  DateTimeSelectionPage,
  DateList,
  DateItem,
  TimeList,
  TimeItem,
  SummaryPage,
  SummaryItem,
  ServiceName,
} from "./styles";
import { Section, SectionTitle } from "../../App.styles";
import Janyce from "../../assets/mamaeSalao.jpg";

const ServicesSection = forwardRef((props, ref) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [showDetailedServiceSelection, setShowDetailedServiceSelection] =
    useState(false);
  const [showProfessionalSelection, setShowProfessionalSelection] =
    useState(false);
  const [showDateTimeSelection, setShowDateTimeSelection] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedProfessionals, setSelectedProfessionals] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [groupedServices, setGroupedServices] = useState({});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:4000/services/grouped");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const groupedServices = await response.json();
        setGroupedServices(groupedServices);
      } catch (error) {
        console.error("Erro ao buscar serviços agrupados:", error);
      }
    };

    fetchServices();
  }, []);

  const professionals = [
    {
      id: 1,
      name: "Janyce Ibiapina",
      specialties: ["Tratamento facial", "Estética"],
      imageUrl: Janyce,
    },
    {
      id: 2,
      name: "Joana Silva",
      specialties: ["Manicure", "Pedicure"],
      imageUrl: Janyce,
    },
    {
      id: 3,
      name: "Carol Duarte",
      specialties: ["Maquiagem"],
      imageUrl: Janyce,
    },
    {
      id: 4,
      name: "Vanessa Silva",
      specialties: ["Massagem"],
      imageUrl: Janyce,
    },
  ];

  useEffect(() => {
    const fetchedDates = [
      "2023-05-20",
      "2023-05-21",
      "2023-05-22",
      "2023-05-23",
      "2023-05-24",
    ];
    setAvailableDates(fetchedDates);
  }, []);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    const fetchedTimes = ["10:00", "11:00", "14:00", "15:00", "16:00"];
    setAvailableTimes(fetchedTimes);
    setSelectedTime("");
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSchedule = () => {
    setShowDetailedServiceSelection(true);
  };

  const handleDetailedServiceSelection = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleConfirmDetailedSelection = () => {
    if (selectedServices.length === 0) {
      alert("Por favor, selecione pelo menos um serviço.");
      return;
    }
    setShowDetailedServiceSelection(false);
    setShowProfessionalSelection(true);
  };

  const handleSelectProfessional = (serviceId, professionalId) => {
    setSelectedProfessionals((prev) => ({
      ...prev,
      [serviceId]: professionalId === "sem-preferencia" ? null : professionalId,
    }));
  };

  const handleConfirmSelection = () => {
    setShowProfessionalSelection(false);
    setShowDateTimeSelection(true);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleShowSummary = () => {
    setShowDateTimeSelection(false);
    setShowSummary(true);
  };

  const handleFinalConfirmation = () => {
    const selection = Object.entries(selectedProfessionals).map(
      ([serviceId, professionalId]) => {
        const service = Object.values(groupedServices)
          .flat()
          .find((s) => s.id === parseInt(serviceId));
        return {
          service: service.name,
          professional:
            professionalId === null
              ? "Sem Preferência"
              : professionals.find((p) => p.id === professionalId).name,
        };
      }
    );

    console.log("Agendamento final:", {
      services: selection,
      date: selectedDate,
      time: selectedTime,
    });

    setShowSummary(false);
    setSelectedServices([]);
    setSelectedProfessionals({});
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <Section ref={ref}>
      {!showDetailedServiceSelection &&
      !showProfessionalSelection &&
      !showDateTimeSelection &&
      !showSummary ? (
        <>
          <SectionTitle>Nossos Serviços</SectionTitle>
          <ServiceCategories>
            <ServiceCategory>
              <CategoryImage src="https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg" />
              <CategoryTitle>Cabelo</CategoryTitle>
              <ServiceList>
                <ServiceItem>Hidratação</ServiceItem>
              </ServiceList>
            </ServiceCategory>
            <ServiceCategory>
              <CategoryImage src="https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg" />
              <CategoryTitle>Unhas</CategoryTitle>
              <ServiceList>
                <ServiceItem>Verniz</ServiceItem>
              </ServiceList>
            </ServiceCategory>
            <ServiceCategory>
              <CategoryImage src="https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg" />
              <CategoryTitle>Massagens</CategoryTitle>
              <ServiceList>
                <ServiceItem>Corpo todo</ServiceItem>
              </ServiceList>
            </ServiceCategory>
            <ServiceCategory>
              <CategoryImage src="https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg" />
              <CategoryTitle>Outros</CategoryTitle>
              <ServiceList>
                <ServiceItem>Maquiagens</ServiceItem>
              </ServiceList>
            </ServiceCategory>
          </ServiceCategories>
          <ScheduleButton onClick={handleSchedule}>
            Ver Todos os Serviços e Agendar
          </ScheduleButton>
        </>
      ) : showDetailedServiceSelection ? (
        <DetailedServiceSelection
          serviceCategories={Object.keys(groupedServices)}
          groupedServices={groupedServices}
          selectedServices={selectedServices}
          handleDetailedServiceSelection={handleDetailedServiceSelection}
          handleConfirmDetailedSelection={handleConfirmDetailedSelection}
          setShowDetailedServiceSelection={setShowDetailedServiceSelection}
        />
      ) : showProfessionalSelection ? (
        <ProfessionalSelectionPage>
          <BackButton onClick={() => setShowDetailedServiceSelection(true)}>
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
                  <ProfessionalItem
                    onClick={() =>
                      handleSelectProfessional(serviceId, "sem-preferencia")
                    }
                    selected={selectedProfessionals[serviceId] === null}
                  >
                    Sem Preferência
                  </ProfessionalItem>
                  {professionals.map((professional) => (
                    <ProfessionalItem
                      key={professional.id}
                      onClick={() =>
                        handleSelectProfessional(serviceId, professional.id)
                      }
                      selected={
                        selectedProfessionals[serviceId] === professional.id
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
          <ConfirmButton onClick={handleConfirmSelection}>
            Confirmar Seleção
          </ConfirmButton>
        </ProfessionalSelectionPage>
      ) : showDateTimeSelection ? (
        <DateTimeSelectionPage>
          <BackButton onClick={() => setShowProfessionalSelection(true)}>
            <FaArrowLeft /> Voltar
          </BackButton>
          <SectionTitle>Escolha a Data e Horário</SectionTitle>
          <h3>Datas Disponíveis</h3>
          <DateList>
            {availableDates.map((date) => (
              <DateItem
                key={date}
                onClick={() => handleDateSelection(date)}
                selected={selectedDate === date}
              >
                {new Date(date).toLocaleDateString("pt-BR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </DateItem>
            ))}
          </DateList>
          {selectedDate && (
            <>
              <h3>
                Horários Disponíveis para{" "}
                {new Date(selectedDate).toLocaleDateString("pt-BR")}
              </h3>
              <TimeList>
                {availableTimes.map((time) => (
                  <TimeItem
                    key={time}
                    onClick={() => handleTimeSelection(time)}
                    selected={selectedTime === time}
                  >
                    {time}
                  </TimeItem>
                ))}
              </TimeList>
            </>
          )}
          <ConfirmButton
            onClick={handleShowSummary}
            disabled={!selectedDate || !selectedTime}
          >
            Ver Resumo
          </ConfirmButton>
        </DateTimeSelectionPage>
      ) : (
        <SummaryPage>
          <BackButton onClick={() => setShowDateTimeSelection(true)}>
            <FaArrowLeft /> Voltar
          </BackButton>
          <SectionTitle>Resumo do Agendamento</SectionTitle>
          <SummaryItem>
            <strong>Data:</strong> {selectedDate}
          </SummaryItem>
          <SummaryItem>
            <strong>Horário:</strong> {selectedTime}
          </SummaryItem>
          <SummaryItem>
            <strong>Serviços e Profissionais:</strong>
            <ul>
              {Object.entries(selectedProfessionals).map(
                ([serviceId, professionalId]) => {
                  const service = Object.values(groupedServices)
                    .flat()
                    .find((s) => s.id === parseInt(serviceId));
                  return (
                    <li key={serviceId}>
                      {service.name} -{" "}
                      {professionalId === null
                        ? "Sem Preferência"
                        : professionals.find((p) => p.id === professionalId)
                            .name}
                    </li>
                  );
                }
              )}
            </ul>
          </SummaryItem>
          <ConfirmButton onClick={handleFinalConfirmation}>
            Confirmar Agendamento
          </ConfirmButton>
        </SummaryPage>
      )}
    </Section>
  );
});

export default ServicesSection;

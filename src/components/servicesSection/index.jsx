import React, { useState, useEffect, forwardRef } from "react";
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
  ProfessionalSelectionPage,
  ProfessionalList,
  ProfessionalItem,
  BackButton,
  ConfirmButton,
  DateTimeSelectionPage,
  DateList,
  DateItem,
  TimeList,
  TimeItem,
  SummaryPage,
  SummaryItem,
} from "./styles";
import { Section, SectionTitle } from "../../App.styles";

const ServicesSection = forwardRef((props, ref) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [showProfessionalSelection, setShowProfessionalSelection] =
    useState(false);
  const [showDateTimeSelection, setShowDateTimeSelection] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedProfessionals, setSelectedProfessionals] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const serviceCategories = [
    {
      name: "Cabelo",
      image:
        "https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg",
      services: ["Corte", "Tratamento", "Coloração", "Escova"],
    },
    {
      name: "Unhas",
      image:
        "https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg",
      services: ["Alongamento", "Esmaltação em gel", "Esmaltação comum"],
    },
    {
      name: "Massagens",
      image:
        "https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg",
      services: ["Massagem corporal", "SPA dos pés"],
    },
    {
      name: "Outros",
      image:
        "https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg",
      services: ["Maquiagem profissional", "Depilação com cera e pinça"],
    },
  ];

  const professionals = [
    {
      id: 1,
      name: "Janyce Ibiapina",
      specialties: ["Tratamento facial", "Estética"],
    },
    { id: 2, name: "Joana Silva", specialties: ["Manicure", "Pedicure"] },
    { id: 3, name: "Carol Duarte", specialties: ["Maquiagem"] },
    { id: 4, name: "Vanessa Silva", specialties: ["Massagem"] },
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
    if (selectedServices.length === 0) {
      alert("Por favor, selecione pelo menos um serviço.");
      return;
    }
    setShowProfessionalSelection(true);
  };

  const handleSelectProfessional = (service, professionalId) => {
    setSelectedProfessionals((prev) => ({
      ...prev,
      [service]: professionalId === "sem-preferencia" ? null : professionalId,
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
      ([service, professionalId]) => ({
        service,
        professional:
          professionalId === null
            ? "Sem Preferência"
            : professionals.find((p) => p.id === professionalId).name,
      })
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
      {!showProfessionalSelection && !showDateTimeSelection && !showSummary ? (
        <>
          <SectionTitle>Nossos Serviços</SectionTitle>
          <ServiceCategories>
            {serviceCategories.map((category) => (
              <ServiceCategory key={category.name}>
                <CategoryImage src={category.image} alt={category.name} />
                <CategoryTitle>{category.name}</CategoryTitle>
                <ServiceList>
                  {category.services.map((service) => (
                    <ServiceItem
                      key={service}
                      onClick={() => toggleService(service)}
                      selected={selectedServices.includes(service)}
                    >
                      {service}
                      <ServiceIcon>
                        {selectedServices.includes(service) ? (
                          <FaCheck />
                        ) : (
                          <FaPlus />
                        )}
                      </ServiceIcon>
                    </ServiceItem>
                  ))}
                </ServiceList>
              </ServiceCategory>
            ))}
          </ServiceCategories>
          <ScheduleButton onClick={handleSchedule}>
            Agendar Serviços Selecionados
          </ScheduleButton>
        </>
      ) : showProfessionalSelection ? (
        <ProfessionalSelectionPage>
          <BackButton onClick={() => setShowProfessionalSelection(false)}>
            <FaArrowLeft /> Voltar
          </BackButton>
          <SectionTitle>Escolha o Profissional</SectionTitle>
          {selectedServices.map((service) => (
            <div key={service}>
              <h3>{service}</h3>
              <ProfessionalList>
                <ProfessionalItem
                  onClick={() =>
                    handleSelectProfessional(service, "sem-preferencia")
                  }
                  selected={selectedProfessionals[service] === null}
                >
                  Sem Preferência
                </ProfessionalItem>
                {professionals.map((professional) => (
                  <ProfessionalItem
                    key={professional.id}
                    onClick={() =>
                      handleSelectProfessional(service, professional.id)
                    }
                    selected={
                      selectedProfessionals[service] === professional.id
                    }
                  >
                    {professional.name}
                  </ProfessionalItem>
                ))}
              </ProfessionalList>
            </div>
          ))}
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
                ([service, professionalId]) => (
                  <li key={service}>
                    {service} -{" "}
                    {professionalId === null
                      ? "Sem Preferência"
                      : professionals.find((p) => p.id === professionalId).name}
                  </li>
                )
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

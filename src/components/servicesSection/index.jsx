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
import { Section, SectionTitle } from "../../pages/home/styles";
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [professionals, setProfessionals] = useState([]);

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

    const fetchProfessionals = async () => {
      try {
        const response = await fetch("http://localhost:4000/professionals");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const professionalsData = await response.json();
        setProfessionals(professionalsData);
      } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
      }
    };

    const fetchedDates = [
      "2024-10-20",
      "2024-10-21",
      "2024-10-22",
      "2024-10-23",
      "2024-10-24",
    ];

    setAvailableDates(fetchedDates);

    fetchServices();
    fetchProfessionals();
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

    // Calcular o preço total
    const total = selectedServices.reduce((sum, serviceId) => {
      const service = Object.values(groupedServices)
        .flat()
        .find((s) => s.id === serviceId);
      return sum + service.price;
    }, 0);
    setTotalPrice(total);
  };

  const handleFinalConfirmation = async () => {
    const appointmentData = {
      dateTime: `${selectedDate}T${selectedTime}:00Z`,
      status: "confirmado",
      clientId: 1, // Assumindo que o ID do cliente é 1. Ajuste conforme necessário.
      services: selectedServices.map((serviceId) => {
        const service = Object.values(groupedServices)
          .flat()
          .find((s) => s.id === serviceId);
        return {
          serviceId: service.id,
          professionalId: selectedProfessionals[serviceId] || null,
          price: service.price,
        };
      }),
    };

    try {
      const response = await fetch("http://localhost:4000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Agendamento confirmado:", result);

      // Resetar o estado após o agendamento bem-sucedido
      setShowSummary(false);
      setSelectedServices([]);
      setSelectedProfessionals({});
      setSelectedDate("");
      setSelectedTime("");
    } catch (error) {
      console.error("Erro ao confirmar o agendamento:", error);
      alert(
        "Ocorreu um erro ao confirmar o agendamento. Por favor, tente novamente."
      );
    }
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
            <strong>Serviços, Profissionais e Preços:</strong>
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
                            .name}{" "}
                      - R$ {service.price.toFixed(2)}
                    </li>
                  );
                }
              )}
            </ul>
          </SummaryItem>
          <SummaryItem>
            <strong>Preço Total:</strong> R$ {totalPrice.toFixed(2)}
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

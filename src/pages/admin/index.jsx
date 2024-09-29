import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaTrash,
  FaPlus,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import {
  AdminContainer,
  AdminSection,
  SectionTitle,
  ProfessionalGrid,
  ProfessionalCard,
  ProfessionalImage,
  ProfessionalName,
  RemoveButton,
  AddButton,
  Modal,
  ModalContent,
  CloseButton,
  AddProfessionalForm,
  FormInput,
  SubmitButton,
  ConfirmationModal,
  ConfirmationButtons,
  ConfirmButton,
  CancelButton,
  RevenueSection,
  RevenueCard,
  RevenueTitle,
  RevenueAmount,
  MonthSelector,
  MonthSelectorButton,
  MonthDropdown,
  MonthOption,
  DateSelector,
  DateSelectorButton,
  DateDropdown,
  YearSelector,
  YearButton,
} from "./styles";

function AdminPage() {
  const [professionals, setProfessionals] = useState([]);
  const [newProfessional, setNewProfessional] = useState({
    name: "",
    imageUrl: "",
    role: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [professionalRevenues, setProfessionalRevenues] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);
  const [popularServices, setPopularServices] = useState([]);

  useEffect(() => {
    fetchProfessionals();
    fetchMonthlyRevenue();
    fetchProfessionalRevenues();
    fetchPopularServices(); // Nova chamada de função
  }, [selectedYear, selectedMonth]);

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get("http://localhost:4000/professionals");
      setProfessionals(response.data);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
    }
  };

  const fetchMonthlyRevenue = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/appointments/${selectedYear}/${selectedMonth}/faturamento`
      );

      setMonthlyRevenue(response.data.faturamento);
    } catch (error) {
      console.error("Erro ao buscar faturamento mensal:", error);
    }
  };

  const fetchProfessionalRevenues = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/appointments/${selectedYear}/${selectedMonth}/faturamento/profissional`
      );

      setProfessionalRevenues(response.data.faturamentoPorProfissional);
    } catch (error) {
      console.error("Erro ao buscar faturamento dos profissionais:", error);
    }
  };

  const fetchPopularServices = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/services/most-popular/${selectedYear}/${selectedMonth}`
      );

      setPopularServices(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços populares:", error);
    }
  };

  const handleDateChange = (e) => {
    const [year, month] = e.target.value.split("-");
    setSelectedYear(parseInt(year));
    setSelectedMonth(parseInt(month));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfessional((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProfessional = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/professionals", newProfessional);
      setNewProfessional({ name: "", imageUrl: "", role: "" });
      fetchProfessionals();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar profissional:", error);
    }
  };

  const handleRemoveProfessional = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/professionals/${id}`);
      fetchProfessionals();
      setConfirmDelete(null);
    } catch (error) {
      console.error("Erro ao remover profissional:", error);
    }
  };

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setIsMonthSelectorOpen(false);
  };

  const handleYearChange = (increment) => {
    setSelectedYear((prevYear) => prevYear + increment);
  };

  const closeDateSelector = () => {
    setIsDateSelectorOpen(false);
  };

  return (
    <AdminContainer>
      <RevenueSection>
        <SectionTitle>Faturamento</SectionTitle>
        <DateSelector>
          <DateSelectorButton
            onClick={() => setIsDateSelectorOpen(!isDateSelectorOpen)}
          >
            <FaCalendarAlt /> {monthNames[selectedMonth - 1]} {selectedYear}
          </DateSelectorButton>
          {isDateSelectorOpen && (
            <DateDropdown>
              <YearSelector>
                <YearButton onClick={() => handleYearChange(-1)}>
                  <FaChevronLeft />
                </YearButton>
                <span>{selectedYear}</span>
                <YearButton onClick={() => handleYearChange(1)}>
                  <FaChevronRight />
                </YearButton>
              </YearSelector>
              {monthNames.map((month, index) => (
                <MonthOption
                  key={index}
                  onClick={() => {
                    handleMonthSelect(index + 1);
                    closeDateSelector();
                  }}
                  selected={selectedMonth === index + 1}
                >
                  {month}
                </MonthOption>
              ))}
            </DateDropdown>
          )}
        </DateSelector>
        <RevenueCard>
          <RevenueTitle>Faturamento do Mês</RevenueTitle>
          <RevenueAmount>
            R$ {monthlyRevenue ? monthlyRevenue.toFixed(2) : "0.00"}
          </RevenueAmount>
        </RevenueCard>
      </RevenueSection>

      <RevenueSection>
        <SectionTitle>Faturamento por Profissional</SectionTitle>
        {professionalRevenues.map((prof) => (
          <RevenueCard key={prof.ProfessionalId}>
            <RevenueTitle>{prof.nome}</RevenueTitle>
            <RevenueAmount>
              R$ {prof.faturamento ? prof.faturamento.toFixed(2) : "0.00"}
            </RevenueAmount>
          </RevenueCard>
        ))}
      </RevenueSection>

      <AdminSection>
        <SectionTitle>Serviços Mais Populares</SectionTitle>
        <ProfessionalGrid>
          {popularServices.map((service) => (
            <RevenueCard key={service.service}>
              <RevenueTitle>{service.service}</RevenueTitle>
              <RevenueAmount>{service.count} vezes</RevenueAmount>
            </RevenueCard>
          ))}
        </ProfessionalGrid>
      </AdminSection>

      <AdminSection>
        <SectionTitle>Gerenciar Profissionais</SectionTitle>
        <ProfessionalGrid>
          {professionals.map((prof) => (
            <ProfessionalCard key={prof.id}>
              <ProfessionalImage src={prof.imageUrl} alt={prof.name} />
              <ProfessionalName>{prof.name}</ProfessionalName>
              <RemoveButton onClick={() => setConfirmDelete(prof)}>
                <FaTrash />
              </RemoveButton>
            </ProfessionalCard>
          ))}
          <AddButton onClick={() => setIsModalOpen(true)}>
            <FaPlus />
          </AddButton>
        </ProfessionalGrid>
      </AdminSection>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            <AddProfessionalForm onSubmit={handleAddProfessional}>
              <FormInput
                type="text"
                name="name"
                placeholder="Nome do Profissional"
                value={newProfessional.name}
                onChange={handleInputChange}
                required
              />
              <FormInput
                type="text"
                name="imageUrl"
                placeholder="URL da Imagem do Profissional"
                value={newProfessional.imageUrl}
                onChange={handleInputChange}
                required
              />
              <FormInput
                type="text"
                name="role"
                placeholder="Cargo do Profissional"
                value={newProfessional.role}
                onChange={handleInputChange}
                required
              />
              <SubmitButton type="submit">Adicionar Profissional</SubmitButton>
            </AddProfessionalForm>
          </ModalContent>
        </Modal>
      )}

      {confirmDelete && (
        <ConfirmationModal>
          <ModalContent>
            <p>
              Tem certeza que deseja remover o profissional {confirmDelete.name}
              ?
            </p>
            <ConfirmationButtons>
              <ConfirmButton
                onClick={() => handleRemoveProfessional(confirmDelete.id)}
              >
                Confirmar
              </ConfirmButton>
              <CancelButton onClick={() => setConfirmDelete(null)}>
                Cancelar
              </CancelButton>
            </ConfirmationButtons>
          </ModalContent>
        </ConfirmationModal>
      )}
    </AdminContainer>
  );
}

export default AdminPage;

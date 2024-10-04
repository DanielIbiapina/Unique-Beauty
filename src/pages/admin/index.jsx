import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaPlus,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCalendar,
  FaUserPlus,
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
  ScheduleButton,
  ScheduleTable,
} from "./styles";

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
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
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [professionalAppointments, setProfessionalAppointments] = useState([]);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "FUNCIONARIO",
  });

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (
      isAuthenticated &&
      (userRole === "ADMIN" || userRole === "FUNCIONARIO")
    ) {
      fetchProfessionals();
      fetchMonthlyRevenue();
      fetchPopularServices();
    }
  }, [isAuthenticated, userRole, selectedYear, selectedMonth]);

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      navigate("/login");
      return;
    }

    if (role !== "ADMIN" && role !== "FUNCIONARIO") {
      navigate("/"); // Redireciona para a página inicial se não for admin ou funcionário
      return;
    }

    setIsAuthenticated(true);
    setUserRole(role);
  };

  if (
    !isAuthenticated ||
    (userRole !== "ADMIN" && userRole !== "FUNCIONARIO")
  ) {
    return null;
  }

  // Função para verificar se o usuário tem permissão para realizar ações específicas
  const canPerformAdminAction = () => userRole === "ADMIN";

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
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:4000/admin/appointments/${selectedYear}/${selectedMonth}/faturamento`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setMonthlyRevenue(response.data.faturamentoTotal);
      setProfessionalRevenues(response.data.faturamentoPorProfissional);
    } catch (error) {
      console.error("Erro ao buscar faturamento mensal:", error);
      if (error.response && error.response.status === 401) {
        // Token expirado ou inválido
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      }
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

  const fetchProfessionalAppointments = async (professionalId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/appointments/professional/${professionalId}`
      );
      setProfessionalAppointments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos do profissional:", error);
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

  const handleShowAppointments = (professional) => {
    setSelectedProfessional(professional);
    fetchProfessionalAppointments(professional.id);
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

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/users/create",
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Usuário criado:", response.data);
      setIsCreateUserModalOpen(false);
      setNewUser({ username: "", password: "", role: "FUNCIONARIO" });

      // Adicione aqui qualquer lógica adicional após a criação bem-sucedida
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      // Adicione aqui tratamento de erro adequado
    }
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
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
          <RevenueCard key={prof.professionalId}>
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
              {canPerformAdminAction() && (
                <RemoveButton onClick={() => setConfirmDelete(prof)}>
                  <FaTrash />
                </RemoveButton>
              )}
              <ScheduleButton onClick={() => handleShowAppointments(prof)}>
                <FaCalendar />
              </ScheduleButton>
            </ProfessionalCard>
          ))}
          {canPerformAdminAction() && (
            <AddButton onClick={() => setIsModalOpen(true)}>
              <FaPlus />
            </AddButton>
          )}
        </ProfessionalGrid>
      </AdminSection>

      {selectedProfessional && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setSelectedProfessional(null)}>
              ×
            </CloseButton>
            <h2>Agendamentos de {selectedProfessional.name}</h2>
            <ScheduleTable>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Serviço</th>
                </tr>
              </thead>
              <tbody>
                {professionalAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      {new Date(appointment.dateTime).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(appointment.dateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>{appointment.client.name}</td>
                    <td>{appointment.serviceName}</td>
                  </tr>
                ))}
              </tbody>
            </ScheduleTable>
          </ModalContent>
        </Modal>
      )}

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

      {canPerformAdminAction() && (
        <AdminSection>
          <SectionTitle>Gerenciar Usuários</SectionTitle>
          <AddButton onClick={() => setIsCreateUserModalOpen(true)}>
            <FaUserPlus /> Criar Novo Usuário
          </AddButton>
        </AdminSection>
      )}

      {isCreateUserModalOpen && canPerformAdminAction() && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setIsCreateUserModalOpen(false)}>
              ×
            </CloseButton>
            <h2>Criar Novo Usuário</h2>
            <AddProfessionalForm onSubmit={handleCreateUser}>
              <FormInput
                type="text"
                name="username"
                placeholder="Nome de usuário"
                value={newUser.username}
                onChange={handleUserInputChange}
                required
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Senha"
                value={newUser.password}
                onChange={handleUserInputChange}
                required
              />
              <select
                name="role"
                value={newUser.role}
                onChange={handleUserInputChange}
                required
              >
                <option value="FUNCIONARIO">Funcionário</option>
                <option value="ADMIN">Administrador</option>
              </select>
              <SubmitButton type="submit">Criar Usuário</SubmitButton>
            </AddProfessionalForm>
          </ModalContent>
        </Modal>
      )}
    </AdminContainer>
  );
}

export default AdminPage;

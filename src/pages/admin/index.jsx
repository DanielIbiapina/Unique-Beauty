import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaPlus } from "react-icons/fa";
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
} from "./styles";

function AdminPage() {
  const [professionals, setProfessionals] = useState([]);
  const [newProfessional, setNewProfessional] = useState({
    name: "",
    imageUrl: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [professionalRevenues, setProfessionalRevenues] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    fetchProfessionals();
    fetchMonthlyRevenue();
    fetchProfessionalRevenues();
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
      console.log(response.data.faturamentoPorProfissional);
      setProfessionalRevenues(response.data.faturamentoPorProfissional);
    } catch (error) {
      console.error("Erro ao buscar faturamento dos profissionais:", error);
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
      setNewProfessional({ name: "", imageUrl: "" });
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

  return (
    <AdminContainer>
      <RevenueSection>
        <SectionTitle>Faturamento</SectionTitle>
        <input
          type="month"
          value={`${selectedYear}-${selectedMonth.toString().padStart(2, "0")}`}
          onChange={handleDateChange}
        />
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

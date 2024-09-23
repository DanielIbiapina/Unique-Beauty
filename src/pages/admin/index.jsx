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
} from "./styles";

function AdminPage() {
  const [professionals, setProfessionals] = useState([]);
  const [newProfessional, setNewProfessional] = useState({
    name: "",
    imageUrl: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get("http://localhost:4000/professionals");
      setProfessionals(response.data);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
    }
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

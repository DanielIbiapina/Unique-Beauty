import React, { useState, useEffect } from "react";
import {
  AdminContainer,
  AdminSection,
  SectionTitle,
  ProfessionalList,
  ProfessionalItem,
  AddProfessionalForm,
  FormInput,
  SubmitButton,
  DataSection,
  DataItem,
} from "./styles";

function AdminPage() {
  const [professionals, setProfessionals] = useState([]);
  const [newProfessional, setNewProfessional] = useState({
    name: "",
    role: "",
  });
  const [data, setData] = useState({
    monthlyRevenue: 0,
    revenueByProfessional: {},
    mostRequestedProduct: "",
  });

  useEffect(() => {
    // Carregar dados iniciais, como profissionais e dados de faturamento
    // Exemplo: setProfessionals([...]);
    // Exemplo: setData({...});
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfessional((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProfessional = (e) => {
    e.preventDefault();
    // Adicionar lógica para adicionar profissional
    setProfessionals([...professionals, newProfessional]);
    setNewProfessional({ name: "", role: "" });
  };

  const handleRemoveProfessional = (name) => {
    // Adicionar lógica para remover profissional
    setProfessionals(professionals.filter((prof) => prof.name !== name));
  };

  return (
    <AdminContainer>
      <AdminSection>
        <SectionTitle>Gerenciar Profissionais</SectionTitle>
        <ProfessionalList>
          {professionals.map((prof) => (
            <ProfessionalItem key={prof.name}>
              {prof.name} - {prof.role}
              <button onClick={() => handleRemoveProfessional(prof.name)}>
                Remover
              </button>
            </ProfessionalItem>
          ))}
        </ProfessionalList>
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
            name="role"
            placeholder="Função do Profissional"
            value={newProfessional.role}
            onChange={handleInputChange}
            required
          />
          <SubmitButton type="submit">Adicionar Profissional</SubmitButton>
        </AddProfessionalForm>
      </AdminSection>

      <DataSection>
        <SectionTitle>Dados Interessantes</SectionTitle>
        <DataItem>Faturamento do Mês: {data.monthlyRevenue}</DataItem>
        <DataItem>
          Faturamento por Profissional:{" "}
          {JSON.stringify(data.revenueByProfessional)}
        </DataItem>
        <DataItem>
          Produto Mais Solicitado: {data.mostRequestedProduct}
        </DataItem>
      </DataSection>
    </AdminContainer>
  );
}

export default AdminPage;

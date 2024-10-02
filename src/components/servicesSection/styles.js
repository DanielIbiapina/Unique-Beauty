import styled from "styled-components";

export const ServiceCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const ServiceCategory = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CategoryImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  cursor: pointer;
`;

export const ServiceList = styled.ul`
  list-style: none;
  padding: 1rem;
  margin: 0;
`;

export const ServiceItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.selected ? "#ffe4e1" : "transparent")};
  color: rgba(0, 0, 0);

  &:hover {
    background-color: #ffe4e1;
  }
`;

export const ServiceIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => (props.selected ? "#ff69b4" : "transparent")};
  color: ${(props) => (props.selected ? "white" : "#ff69b4")};
  transition: all 0.3s ease;
`;

export const ScheduleButton = styled.button`
  background-color: #ff69b4;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 2rem auto 0;

  &:hover {
    background-color: #ff1493;
  }
`;

export const ProfessionalSelectionPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
  overflow-y: auto;
  padding: 30px;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const ProfessionalList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
`;

export const ProfessionalItem = styled.li`
  /*display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ff69b4;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#ffe4e1" : "white")};
  transition: all 0.3s ease;

  &:hover {
    background-color: #ffe4e1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }*/

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background-color: ${(props) => (props.selected ? "#ffe4e1" : "#f8f8f8")};
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 58.6px;
  min-height: 50px;
  &:hover {
    background-color: #ffe4e1;
  }
`;

export const ProfessionalImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`;

export const ProfessionalInfo = styled.div`
  flex: 1;
`;

export const ProfessionalName = styled.span`
  font-weight: bold;
`;

export const BackButton = styled.button`
  background-color: white; // Fundo rosa claro
  color: #ff69b4; // Cor do texto rosa
  border: 2px solid #ff69b4; // Borda rosa
  border-radius: 25px; // Bordas arredondadas
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 20px;

  transition: all 0.3s ease;

  svg {
    margin-right: 10px;
    font-size: 20px;
  }

  &:hover {
    background-color: #ff69b4;
    color: white;
  }
`;

export const ConfirmButton = styled(ScheduleButton)`
  // Herda os estilos de ScheduleButton para manter consistência
  margin-top: 30px;
`;

export const DateTimeSelectionPage = styled(ProfessionalSelectionPage)`
  // Herda os estilos de ProfessionalSelectionPage
`;

export const DatePicker = styled.input`
  margin: 20px 0;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ff69b4;
  border-radius: 8px;
  background-color: white;
`;

export const SummaryContainer = styled(ProfessionalSelectionPage)`
  // Herda os estilos de ProfessionalSelectionPage
`;

export const SummaryList = styled.div`
  // Não precisamos de estilos específicos aqui, já que cada item terá seu próprio estilo
`;

export const SummaryItem = styled.div`
  margin: 15px 0;
  font-size: 16px;
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ff69b4;

  h3 {
    margin-top: 0;
    color: #ff69b4;
  }

  p {
    margin: 8px 0;
  }

  ul {
    margin-top: 10px;
    padding-left: 20px;
  }

  li {
    margin: 8px 0;
  }
`;

export const TotalPrice = styled.div`
  font-size: 1.2rem;
  color: #333;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background-color: #f8f8f8;
  border: 1px solid #ff69b4; // Borda rosa
  border-radius: 8px;
  display: flex;
  justify-content: flex-start; // Alinha o conteúdo à esquerda
  align-items: center;

  span {
    font-weight: bold;
    margin-left: 0.5rem;
  }
`;

export const DetailedServiceSelectionPage = styled(ProfessionalSelectionPage)`
  padding: 20px;
`;

export const CategorySection = styled.div`
  margin-bottom: 30px;
`;

export const CategoryTitle = styled.h2`
  color: #ff69b4;
  font-size: 24px;
  margin-bottom: 15px;
  border-bottom: 2px solid #ff69b4;
  padding-bottom: 5px;
`;

export const DetailedServiceList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
`;

export const DetailedServiceItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;

  border-radius: 8px;
  background-color: ${(props) => (props.selected ? "#ffe4e1" : "#f8f8f8")};
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  // Reduzindo a altura e adicionando uma altura mínima
  height: 45.6px;
  min-height: 40px;

  &:hover {
    background-color: #ffe4e1;
  }
`;

export const TimeList = styled(ProfessionalList)`
  // Herda os estilos de ProfessionalList
`;

export const TimeItem = styled(DetailedServiceItem)`
  // Herda os estilos de ProfessionalItem
`;

export const DateList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  width: 100%;
`;

export const DateItem = styled(DetailedServiceItem)`
  // Mantenha os estilos existentes, mas adicione:
  width: 100%;
  justify-content: center;
  text-align: center;
`;

export const ServiceName = styled.span`
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const ServicePrice = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  margin-right: 1rem;
`;

/*export const ServiceIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => (props.selected ? "#ff69b4" : "#ddd")};
  color: white;
  font-size: 0.8rem;
`;*/

export const ShowMoreButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
export const SummaryTitle = styled(CategoryTitle)``;

export const SelectionLabel = styled.h4`
  font-size: 1rem;
  color: #333;
  margin: 1rem 0 0.5rem;
  font-weight: 600;
`;

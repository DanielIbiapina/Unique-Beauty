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
  height: 200px;
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
  padding: 20px;
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
`;

export const ProfessionalItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#e0e0e0" : "white")};

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  svg {
    margin-right: 5px;
  }
`;

export const ConfirmButton = styled.button`
  background-color: #ff69b4;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff1493;
  }
`;

export const DateTimeSelectionPage = styled(ProfessionalSelectionPage)`
  // Herda os estilos de ProfessionalSelectionPage
`;

export const DatePicker = styled.input`
  margin: 20px 0;
  padding: 10px;
  font-size: 16px;
`;

export const TimeList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const TimeItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#e0e0e0" : "white")};

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const SummaryPage = styled(ProfessionalSelectionPage)`
  // Herda os estilos de ProfessionalSelectionPage
`;

export const SummaryItem = styled.div`
  margin: 15px 0;
  font-size: 16px;

  ul {
    margin-top: 5px;
    padding-left: 20px;
  }

  li {
    margin: 5px 0;
  }
`;

export const DateList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const DateItem = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#e0e0e0" : "white")};

  &:hover {
    background-color: #f0f0f0;
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
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ffb6c1;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#ffe4e1" : "white")};
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff0f5;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const ServiceName = styled.span`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

export const ServicePrice = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: #ff69b4;
  align-self: flex-end;
`;

import styled from "styled-components";

export const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f7fa;
`;

export const AdminSection = styled.section`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
`;

export const ProfessionalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

export const ProfessionalCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProfessionalImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ProfessionalName = styled.h3`
  font-size: 1rem;
  color: #333;
  padding: 0.5rem;
  text-align: center;
`;

export const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

export const RemoveButton = styled(Button)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

export const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 2rem;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const AddProfessionalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormInput = styled.input`
  padding: 8px;
  font-size: 16px;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  background-color: #0074d9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ConfirmationModal = styled(Modal)`
  // Herda os estilos do Modal original
`;

export const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #ff4136;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #d0342b;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #aaaaaa;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #999999;
  }
`;

export const RevenueAmount = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  color: #fff; // Cor verde para valores positivos
`;
export const RevenueSection = styled(AdminSection)`
  display: flex;
  flex-direction: column;
`;

export const RevenueCard = styled.div`
  background-color: #3498db;
  color: #fff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const RevenueTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const MonthSelector = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const MonthSelectorButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #e0e0e0;
  }

  svg {
    margin-right: 10px;
  }
`;

export const MonthDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const MonthOption = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#e0e0e0" : "transparent")};

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const DateSelector = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const DateSelectorButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #e0e0e0;
  }

  svg {
    margin-right: 10px;
  }
`;

export const DateDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 250px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const YearSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

export const YearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333;

  &:hover {
    color: #0074d9;
  }
`;

export const ScheduleButton = styled(RemoveButton)`
  background-color: #4caf50;
  margin-left: 5px;
  left: unset;
  right: 5px;
`;

export const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const AppointmentCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  max-height: 70vh;
  overflow-y: auto;
  padding: 1rem;
`;

export const AppointmentCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1rem;
`;

export const AppointmentDate = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 0.5rem;
`;

export const ClientName = styled.div`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const ServiceList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ServiceItem = styled.li`
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const ServiceName = styled.div`
  font-weight: bold;
  color: #2c3e50;
`;

export const ServiceTime = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

export const ServicePrice = styled.div`
  font-size: 0.9rem;
  color: #27ae60;
  font-weight: bold;
`;

export const TotalPrice = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #2980b9;
  margin-top: 0.5rem;
  text-align: right;
`;

export const AppointmentStatus = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${(props) => {
    switch (props.status.toLowerCase()) {
      case "confirmado":
        return "#2ecc71";
      case "pendente":
        return "#f39c12";
      case "cancelado":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  }};
  color: white;
`;

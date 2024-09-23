import styled from "styled-components";

export const AdminContainer = styled.div`
  padding: 20px;
`;

export const AdminSection = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
`;

export const ProfessionalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

export const ProfessionalCard = styled.div`
  position: relative;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProfessionalImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const ProfessionalName = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  color: #ff4136;
  cursor: pointer;
  font-size: 18px;
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0074d9;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 24px;
  cursor: pointer;
  height: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
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
  color: #4caf50; // Cor verde para valores positivos
`;
export const RevenueSection = styled.div`
  margin-bottom: 30px;
`;

export const RevenueCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

export const RevenueTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
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

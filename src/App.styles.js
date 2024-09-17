import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

export const AppContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  z-index: 1000;

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }

  .desktop-only {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const NavItem = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 1rem;
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    color: #ff69b4;
    font-size: 1.2rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid #ff69b4;
    width: 100%;
    text-align: left;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #fff0f5;
    }
  }
`;

export const Title = styled.h1`
  color: red;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const MainContent = styled.main`
  flex-grow: 1;
  margin: 0;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 3rem;
  color: #ff69b4;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100px;
    height: 3px;
    background-color: #ff69b4;
  }
`;

export const SectionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  & > div {
    flex: 1;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

export const SectionImage = styled.img`
  max-width: 40%;
  width: 30%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ServiceCard = styled.div`
  background-color: ${(props) => (props.selected ? "#ff69b4" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const ServiceName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

export const Footer = styled.footer`
  margin-top: 50px;
  text-align: center;
  font-size: 0.9rem;
  color: #666;

  @media (max-width: 768px) {
    margin-top: 30px;
    font-size: 0.8rem;
  }
`;

export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 70vh; // Altura para desktop

  @media (max-width: 768px) {
    height: 50vh; // Altura reduzida para dispositivos móveis
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const HeroBackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Section = styled.section`
  min-height: 100vh;
  padding: 2rem;
`;

export const InstagramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

export const InstagramPost = styled.a`
  display: block;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.05);
  }
`;

export const InstagramMedia = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`;

export const CheckboxInput = styled.input`
  margin-right: 0.5rem;
`;

export const CheckboxLabel = styled.label`
  cursor: pointer;
`;

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

export const CategoryTitle = styled.h3`
  text-align: center;
  padding: 1rem;
  margin: 0;
  background-color: #ff69b4;
  color: white;
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

export const TeamSection = styled(Section)`
  background-color: #f9f9f9;
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const TeamMemberCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const MemberImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const MemberName = styled.h3`
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
  text-align: center;
`;

export const MemberRole = styled.p`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  padding: 0 1rem 1rem;
`;

export const ContactSection = styled(Section)`
  background-color: #f9f9f9;
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const ContactInfoMap = styled.div`
  flex: 1;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const ContactItem = styled.p`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  font-size: 1.1rem;

  svg {
    margin-right: 0.5rem;
    color: #ff69b4;
  }
`;

export const MapContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  height: 300px;
`;

export const ContactFormContainer = styled.div`
  flex: 1;
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const FormTextArea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 150px;
`;

export const SubmitButton = styled.button`
  background-color: #ff69b4;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-start;

  &:hover {
    background-color: #ff1493;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #ff69b4;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.95);
    //padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-height: ${({ open }) => (open ? "300px" : "0")};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }
`;

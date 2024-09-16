import React, { useState, useRef } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import {
  AppContainer,
  Header,
  NavItem,
  MainContent,
  Section,
  SectionTitle,
  ServiceCategories,
  ServiceCategory,
  CategoryImage,
  CategoryTitle,
  ServiceList,
  ServiceItem,
  ServiceIcon,
  ScheduleButton,
  HeroSection,
  HeroImage,
  SectionContent,
  SectionImage,
  InstagramGrid,
  InstagramPost,
  Footer,
  TeamSection,
  TeamGrid,
  TeamMemberCard,
  MemberImage,
  MemberName,
  MemberRole,
} from "./App.styles";
import Logo from "./assets/logounique.png";

function App() {
  const [selectedServices, setSelectedServices] = useState([]);
  const whatsappNumber = "351938556873"; // Substitua pelo número real
  const sections = useRef({});
  const teamMembers = [
    {
      name: "Janyce Ibiapina",
      image:
        "https://lh5.googleusercontent.com/p/AF1QipN1dh9UY_KJHCueT9MNkM6JcEMmg9DC46-KYRVh=w500-h500-k-no",
      role: "Dona do Salão, Esteticista e especialista em tratamentos faciais",
    },
    {
      name: "Joana Silva",
      image:
        "https://lh5.googleusercontent.com/p/AF1QipN1dh9UY_KJHCueT9MNkM6JcEMmg9DC46-KYRVh=w500-h500-k-no",
      role: "Manicure especialista em unhas de pé e mão",
    },
    {
      name: "Carol Duarte",
      image:
        "https://lh5.googleusercontent.com/p/AF1QipN1dh9UY_KJHCueT9MNkM6JcEMmg9DC46-KYRVh=w500-h500-k-no",
      role: "Maquiadora profissional",
    },
    {
      name: "Jefferson Leite",
      image:
        "https://lh5.googleusercontent.com/p/AF1QipN1dh9UY_KJHCueT9MNkM6JcEMmg9DC46-KYRVh=w500-h500-k-no",
      role: "Massagista terapêutico",
    },

    // Adicione mais membros da equipe conforme necessário
  ];

  const serviceCategories = [
    {
      name: "Cabelo",
      image:
        "https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg",
      services: ["Corte", "Tratamento", "Coloração", "Escova"],
    },
    {
      name: "Unhas",
      image:
        "https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg",
      services: ["Alongamento", "Esmaltação em gel", "Esmaltação comum"],
    },
    {
      name: "Massagens",
      image:
        "https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg",
      services: ["Massagem corporal", "SPA dos pés"],
    },
    {
      name: "Outros",
      image:
        "https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg",
      services: ["Maquiagem profissional", "Depilação com cera e pinça"],
    },
  ];

  const scrollToSection = (sectionName) => {
    sections.current[sectionName]?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSchedule = () => {
    if (selectedServices.length === 0) {
      alert("Por favor, selecione pelo menos um serviço.");
      return;
    }

    const message = encodeURIComponent(
      `Olá, Janyce! Gostaria de agendar os seguintes serviços:\n-${selectedServices.join(
        "\n-"
      )}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <AppContainer>
      <Header>
        <NavItem onClick={() => scrollToSection("sobre")}>
          Sobre o Salão
        </NavItem>
        <NavItem onClick={() => scrollToSection("producoes")}>
          Produções
        </NavItem>
        <NavItem onClick={() => scrollToSection("servicos")}>Serviços</NavItem>
        <NavItem onClick={() => scrollToSection("equipe")}>Equipe</NavItem>
        <NavItem onClick={() => scrollToSection("contato")}>Contato</NavItem>
      </Header>

      <HeroSection>
        <HeroImage
          src="https://img.freepik.com/fotos-gratis/mulher-no-salao-de-cabeleireiro_144627-8812.jpg"
          alt="Pessoa hidratando o cabelo"
        />
      </HeroSection>

      <MainContent>
        <Section ref={(el) => (sections.current["sobre"] = el)}>
          <SectionTitle>Unique Beauty</SectionTitle>
          <SectionContent>
            <div>
              <p>
                União de sofisticação e modernidade, com o talento dos melhores
                e experientes profissionais do setor.
              </p>
              <p>
                Um salão minuciosamente planejado e concebido para oferecer
                todos os serviços voltados à beleza e estética, feminina e
                masculina. Salas estruturadas para noivas, estética
                especializada, espaços próprios para esmalteria, barbearia,
                maquiagem, podologia, massagem, depilação e Hair Stylists.
              </p>
              <p>
                Dispomos de um ambiente onde todos podem usufruir de lanches ou
                refeições saudáveis, carinhosamente preparadas para tornar sua
                permanência mais agradável. Além de um amplo espaço para
                eventos, cursos e reuniões empresariais.
              </p>
            </div>
            <SectionImage src={Logo} alt="Unique Beauty Logo" />
          </SectionContent>
        </Section>

        <Section ref={(el) => (sections.current["producoes"] = el)}>
          <SectionTitle>Produções</SectionTitle>
          <InstagramGrid>
            {[...Array(8)].map((_, index) => (
              <InstagramPost key={index}>
                <a
                  href={`https://www.instagram.com/reel/C8pm0Gut-NI/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://www.instagram.com/reel/C8pm0Gut-NI/-${
                      index + 1
                    }.jpg`}
                    alt={`Produção ${index + 1}`}
                  />
                </a>
              </InstagramPost>
            ))}
          </InstagramGrid>
        </Section>

        <Section ref={(el) => (sections.current["servicos"] = el)}>
          <SectionTitle>Nossos Serviços</SectionTitle>
          <ServiceCategories>
            {serviceCategories.map((category) => (
              <ServiceCategory key={category.name}>
                <CategoryImage src={category.image} alt={category.name} />
                <CategoryTitle>{category.name}</CategoryTitle>
                <ServiceList>
                  {category.services.map((service) => (
                    <ServiceItem
                      key={service}
                      onClick={() => toggleService(service)}
                      selected={selectedServices.includes(service)}
                    >
                      {service}
                      <ServiceIcon>
                        {selectedServices.includes(service) ? (
                          <FaCheck />
                        ) : (
                          <FaPlus />
                        )}
                      </ServiceIcon>
                    </ServiceItem>
                  ))}
                </ServiceList>
              </ServiceCategory>
            ))}
          </ServiceCategories>
          <ScheduleButton onClick={handleSchedule}>
            Agendar Serviços Selecionados
          </ScheduleButton>
        </Section>

        <TeamSection ref={(el) => (sections.current["equipe"] = el)}>
          <SectionTitle>Nossa Equipe</SectionTitle>
          <TeamGrid>
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name}>
                <MemberImage src={member.image} alt={member.name} />
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
              </TeamMemberCard>
            ))}
          </TeamGrid>
        </TeamSection>

        <Section ref={(el) => (sections.current["contato"] = el)}>
          <SectionTitle>Contato</SectionTitle>
          {/* Conteúdo da seção Contato */}
        </Section>
      </MainContent>

      <Footer>
        <p>© 2023 Unique Beauty. Todos os direitos reservados.</p>
      </Footer>
    </AppContainer>
  );
}

export default App;

import React, { useState, useRef, useEffect } from "react";
import {
  FaCheck,
  FaPlus,
  FaPlay,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { fetchInstagramPosts } from "./instagramApi";
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
  HeroBackgroundDiv,
  SectionContent,
  SectionImage,
  InstagramGrid,
  InstagramPost,
  InstagramMedia,
  VideoOverlay,
  Footer,
  TeamSection,
  TeamGrid,
  TeamMemberCard,
  MemberImage,
  MemberName,
  MemberRole,
  ContactSection,
  ContactContainer,
  ContactInfoMap,
  ContactInfo,
  ContactItem,
  MapContainer,
  ContactFormContainer,
  ContactForm,
  FormInput,
  FormTextArea,
  SubmitButton,
  MobileMenuButton,
  MobileMenu,
} from "./App.styles";
import Logo from "./assets/logounique.jpg";
import Fotosalao from "./assets/fotosalao.jpg";
import Fotosalao2 from "./assets/fotosalao2.jpg";
import Joana from "./assets/joanaSalao.jpg";
import Janyce from "./assets/mamaeSalao.jpg";
import Carol from "./assets/carolSalao.jpg";
import Vanessa from "./assets/vanessaSalao.jpg";
function App() {
  const [selectedServices, setSelectedServices] = useState([]);
  const whatsappNumber = "351938556873"; // Substitua pelo número real
  const sections = useRef({});
  const teamMembers = [
    {
      name: "Janyce Ibiapina",
      image: Janyce,
      role: "Dona do Salão, Esteticista e especialista em tratamentos faciais",
    },
    {
      name: "Joana Silva",
      image: Joana,
      role: "Manicure especialista em unhas de pé e mão",
    },
    {
      name: "Carol Duarte",
      image: Carol,
      role: "Maquiadora profissional",
    },
    {
      name: "Vanessa Silva",
      image: Vanessa,
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

  const [instagramPosts, setInstagramPosts] = useState([]);

  useEffect(() => {
    const loadInstagramPosts = async () => {
      const posts = await fetchInstagramPosts();
      setInstagramPosts(posts);
    };
    loadInstagramPosts();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para enviar o formulário
    console.log("Formulário enviado:", formData);
    // Limpar o formulário após o envio
    setFormData({ name: "", email: "", message: "" });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppContainer>
      <Header>
        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        <MobileMenu open={mobileMenuOpen}>
          <NavItem
            onClick={() => {
              scrollToSection("sobre");
              toggleMobileMenu();
            }}
          >
            Sobre o Salão
          </NavItem>
          <NavItem
            onClick={() => {
              scrollToSection("producoes");
              toggleMobileMenu();
            }}
          >
            Produções
          </NavItem>
          <NavItem
            onClick={() => {
              scrollToSection("servicos");
              toggleMobileMenu();
            }}
          >
            Serviços
          </NavItem>
          <NavItem
            onClick={() => {
              scrollToSection("equipe");
              toggleMobileMenu();
            }}
          >
            Equipe
          </NavItem>
          <NavItem
            onClick={() => {
              scrollToSection("contato");
              toggleMobileMenu();
            }}
          >
            Contato
          </NavItem>
        </MobileMenu>
        <NavItem
          className="desktop-only"
          onClick={() => scrollToSection("sobre")}
        >
          Sobre o Salão
        </NavItem>
        <NavItem
          className="desktop-only"
          onClick={() => scrollToSection("producoes")}
        >
          Produções
        </NavItem>
        <NavItem
          className="desktop-only"
          onClick={() => scrollToSection("servicos")}
        >
          Serviços
        </NavItem>
        <NavItem
          className="desktop-only"
          onClick={() => scrollToSection("equipe")}
        >
          Equipe
        </NavItem>
        <NavItem
          className="desktop-only"
          onClick={() => scrollToSection("contato")}
        >
          Contato
        </NavItem>
      </Header>

      <HeroSection>
        {/* Opção 1: Usar a tag img com object-fit */}
        <HeroImage src={Fotosalao2} alt="Pessoa hidratando o cabelo" />

        {/* Opção 2: Usar uma div com imagem de fundo */}
        {/* <HeroBackgroundDiv imageUrl={Fotosalao2} /> */}
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
          <SectionTitle>Nossas Produções</SectionTitle>
          <InstagramGrid>
            {instagramPosts.map((post) => (
              <InstagramPost
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.media_type === "VIDEO" ? (
                  <>
                    <InstagramMedia as="video" src={post.media_url} />
                    <VideoOverlay>
                      <FaPlay />
                    </VideoOverlay>
                  </>
                ) : (
                  <InstagramMedia src={post.media_url} alt={post.caption} />
                )}
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

        <ContactSection ref={(el) => (sections.current["contato"] = el)}>
          <SectionTitle>Entre em Contato</SectionTitle>
          <ContactContainer>
            <ContactInfoMap>
              <ContactInfo>
                <ContactItem>
                  <FaPhone /> (11) 1234-5678
                </ContactItem>
                <ContactItem>
                  <FaEnvelope /> contato@seusite.com
                </ContactItem>
                <ContactItem>
                  <FaMapMarkerAlt /> Rua do Salão, 123 - São Paulo, SP
                </ContactItem>
              </ContactInfo>
              <MapContainer>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3002.998318818821!2d-8.688835024132489!3d41.17820387132718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd246ff20b535c9b%3A0x5158139343a06331!2sUNIQUE%20BEAUTY%20by%20Janyce%20Ibiapina!5e0!3m2!1spt-BR!2sbr!4v1726542780063!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </MapContainer>
            </ContactInfoMap>
            <ContactFormContainer>
              <ContactForm onSubmit={handleSubmit}>
                <FormInput
                  type="text"
                  name="name"
                  placeholder="Seu Nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Seu E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <FormTextArea
                  name="message"
                  placeholder="Sua Mensagem"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></FormTextArea>
                <SubmitButton type="submit">Enviar Mensagem</SubmitButton>
              </ContactForm>
            </ContactFormContainer>
          </ContactContainer>
        </ContactSection>
      </MainContent>

      <Footer>
        <p>© 2023 Unique Beauty. Todos os direitos reservados.</p>
      </Footer>
    </AppContainer>
  );
}

export default App;

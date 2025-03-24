import React from 'react';
import NavbarComponent from '../navbar/navbar';
import Footer from '../footer';
import styles from './sobreCafeConnect.module.css';

const SobreCafeConnect = () => {
    return (
        <div className={styles.sobreCafeConnectPage}>
            <NavbarComponent />
            <div className={styles.contentWrapper}>
                <h1>Sobre Café Connect</h1>
                <p>
                    Aqui, no Café Connect, não apenas servimos café excepcional, mas também criamos um espaço onde as histórias se entrelaçam e as ideias ganham vida. Nossa equipe é uma verdadeira família que compartilha valores de amizade, comunicação e sustentabilidade.
                </p>
                <p>
                    O Café Connect não começou como um empreendimento comercial, mas como uma experiência compartilhada. Um antigo espaço abandonado foi transformado em um ambiente acolhedor, onde cada detalhe foi cuidadosamente concebido para proporcionar uma experiência única aos nossos clientes. Este local não é apenas uma cafeteria; é um ponto de encontro onde a comunidade se reúne para compartilhar momentos e criar memórias.
                </p>
                <h2>A Experiência no Café Connect</h2>
                <p>
                    No Café Connect, cada visita é uma oportunidade de vivenciar algo especial. Aqui estão alguns aspectos que tornam nossa cafeteria única:
                </p>
                <ul>
                    <li><strong>Ambiente Aconchegante:</strong> O design do espaço foi pensado para promover o conforto e a interação social, com áreas de estar que convidam à conversa.</li>
                    <li><strong>Eventos Culturais:</strong> Regularmente, organizamos exposições de arte local e eventos que destacam talentos da comunidade. Isso não apenas enriquece a experiência dos nossos clientes, mas também apoia artistas locais.</li>
                    <li><strong>Iniciativas Sustentáveis:</strong> Estamos comprometidos com práticas sustentáveis, desde o uso de ingredientes orgânicos até a redução de desperdícios. Promovemos a conscientização ambiental entre nossos clientes.</li>
                </ul>
                <h2>Conectando Pessoas</h2>
                <p>
                    No Café Connect, não servimos apenas café excepcional; criamos um ambiente onde as histórias fluem, as ideias ganham vida e os relacionamentos se fortalecem. Nossa equipe é como uma família, unida pelos valores da amizade, da comunicação e da responsabilidade social.
                </p>
                <p>
                    Além disso, incentivamos a participação de nossos clientes através de iniciativas interativas:
                </p>
                <ul>
                    <li><strong>Sessões de Perguntas e Respostas:</strong> Convidamos nossos clientes a interagir conosco sobre suas preferências de café e sugestões para o menu.</li>
                    <li><strong>Combinações de Livro e Café:</strong> Sugerimos livros que combinam perfeitamente com nossas bebidas, criando um espaço convidativo para os amantes da leitura.</li>
                </ul>
                <h2>O Futuro do Café Connect</h2>
                <p>
                    Estamos sempre buscando maneiras de inovar e melhorar a experiência no Café Connect. Com planos para integrar mais tecnologia em nosso serviço — como cardápios digitais interativos e opções de pedidos online — estamos prontos para atender às necessidades dos nossos clientes modernos.
                </p>
                <p>
                    Em resumo, o Café Connect é mais do que uma simples cafeteria; é um lugar onde cada xícara de café conta uma história e cada cliente é parte da nossa jornada. Venha nos visitar e faça parte dessa experiência única!
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default SobreCafeConnect;
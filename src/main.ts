// Fuentes: solo los pesos que usa el diseño
import "@fontsource/alexandria/300.css"; // Light: H1
import "@fontsource/alexandria/400.css"; // Regular: H2 y marca
import "@fontsource/manrope/400.css";    // Regular: textos
import "@fontsource/manrope/500.css";    // Medium: menú y rótulos
import "@fontsource/manrope/600.css";    // SemiBold: botones, H3 y sobretítulos
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/sections.css";
import "./styles/behaviors.css";
import "./styles/tokens.css";
import "./styles/base.css";
import { initHeaderCta } from "./scripts/header-cta";
import { initScrollSpy } from "./scripts/scroll-spy";

initHeaderCta();
initScrollSpy();

/**
 * Shop data for the Barbearia Leme single-page demo.
 * The served page is the static markup in index.html. Keep these values in sync with it.
 * Comments stay in English.
 */

/**
 * Destination of the discreet "Ver os 3 pacotes" link.
 * Will later point to the package comparison page.
 */
export const PACKAGES_URL = "https://barbearia-leme.vercel.app";

/** Public URL of this page. Canonical and Open Graph tags in index.html must match. */
export const SITE_URL = "https://barbearia-leme-pagina.vercel.app";

export const shop = {
  name: "Barbearia Leme",
  tagline: "Estilo e tradição em cada corte",
  seoDescription:
    "Barbearia Leme, no Centro de Lauro de Freitas. Corte, barba e pigmentação com horário marcado pelo WhatsApp. Terça a sábado.",
  /** Area code + number, digits only, without country code 55. */
  whatsapp: "71994130031",
  instagram: "barbearialeme",
  address: "Av. Santos Dumont, 450 — Centro, Lauro de Freitas — BA",
  mapQuery: "Av. Santos Dumont, 450, Centro, Lauro de Freitas, Bahia, Brasil",
  logo: "favicon.svg",
  hero: {
    alt: "Barbeiro em atendimento na cadeira",
    width: 1920,
    height: 1280,
    avif: [
      { src: "images/hero-640.avif", w: 640 },
      { src: "images/hero-960.avif", w: 960 },
      { src: "images/hero-1280.avif", w: 1280 },
      { src: "images/hero-1920.avif", w: 1920 },
    ],
    webp: [
      { src: "images/hero-640.webp", w: 640 },
      { src: "images/hero-960.webp", w: 960 },
      { src: "images/hero-1280.webp", w: 1280 },
      { src: "images/hero-1920.webp", w: 1920 },
    ],
  },
  services: [
    {
      id: "corte",
      name: "Corte",
      description: "Tesoura e máquina, com acabamento na navalha e alinhamento.",
      price: 45,
    },
    {
      id: "barba",
      name: "Barba",
      description: "Desenho, toalha quente e hidratação para fechar o visual.",
      price: 35,
    },
    {
      id: "combo",
      name: "Corte + Barba",
      description: "O ritual completo: cabelo, barba e finalização.",
      price: 75,
    },
    {
      id: "pigmentacao",
      name: "Pigmentação",
      description: "Disfarce de falhas e fios brancos, com efeito natural.",
      price: 40,
    },
    {
      id: "sobrancelha",
      name: "Sobrancelha",
      description: "Design masculino, limpo e proporcional ao rosto.",
      price: 20,
    },
    {
      id: "infantil",
      name: "Corte Infantil",
      description: "Corte com calma para crianças de até 12 anos.",
      price: 35,
    },
  ],
  /** Monday through Sunday, matching the list in index.html. */
  hours: [
    { day: 1, label: "Segunda-feira", closed: true },
    { day: 2, label: "Terça-feira", closed: false, open: "09:00", close: "19:00" },
    { day: 3, label: "Quarta-feira", closed: false, open: "09:00", close: "19:00" },
    { day: 4, label: "Quinta-feira", closed: false, open: "09:00", close: "19:00" },
    { day: 5, label: "Sexta-feira", closed: false, open: "09:00", close: "20:00" },
    { day: 6, label: "Sábado", closed: false, open: "08:00", close: "18:00" },
    { day: 0, label: "Domingo", closed: true },
  ],
};

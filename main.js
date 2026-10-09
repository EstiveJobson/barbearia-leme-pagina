import { PACKAGES_URL, shop } from "./config.js";

const BOOKING_MESSAGE = `Olá! Vi o site da ${shop.name} e quero marcar um horário.`;

function el(tag, props = {}, kids = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value == null) continue;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else node.setAttribute(key, value);
  }
  for (const kid of kids) node.append(kid);
  return node;
}

function waDigits(raw) {
  const digits = String(raw).replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("55") ? digits : `55${digits}`;
}

function waLink(message) {
  return `https://wa.me/${waDigits(shop.whatsapp)}?text=${encodeURIComponent(message)}`;
}

function serviceMessage(name) {
  return `Olá! Vi o site da ${shop.name} e quero agendar: ${name}.`;
}

function brl(value) {
  return `R$ ${Number(value).toLocaleString("pt-BR")}`;
}

function srcset(list) {
  return list.map((item) => `${item.src} ${item.w}w`).join(", ");
}

function setAttr(node, name, value) {
  if (node.getAttribute(name) !== value) node.setAttribute(name, value);
}

function icon(pathD, className) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  if (className) svg.setAttribute("class", className);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill", "currentColor");
  path.setAttribute("d", pathD);
  svg.append(path);
  return svg;
}

const WHATSAPP_PATH =
  "M20.5 3.5A11 11 0 0 0 2.1 16.8L1 23l6.4-1.1A11 11 0 0 0 12 22a11 11 0 0 0 8.5-18.5zM12 20.2a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.8.7.7-3.7-.2-.3A9.2 9.2 0 1 1 12 20.2zm5-6.8c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c-.1-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.5 4 4 4 0 0 0 2.6.5 2.5 2.5 0 0 0 1.7-1.1 2 2 0 0 0 .1-1.2c-.1-.2-.3-.2-.6-.4z";

const INSTAGRAM_PATH =
  "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 1.8H7A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10a2.2 2.2 0 0 0 2.2-2.2V7A2.2 2.2 0 0 0 17 4.8zM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.35 6.4a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z";

function applyHero() {
  const picture = document.querySelector("#hero-picture");
  const sources = picture.querySelectorAll("source");
  setAttr(sources[0], "srcset", srcset(shop.hero.avif));
  setAttr(sources[1], "srcset", srcset(shop.hero.webp));
  const img = document.querySelector("#hero-img");
  const webp = srcset(shop.hero.webp);
  setAttr(img, "srcset", webp);
  setAttr(img, "alt", shop.hero.alt);
  setAttr(img, "width", String(shop.hero.width));
  setAttr(img, "height", String(shop.hero.height));
  const fallback = shop.hero.webp.find((item) => item.w === 1280) ?? shop.hero.webp[0];
  setAttr(img, "src", fallback.src);
}

function renderHeroCopy() {
  const parts = shop.name.trim().split(/\s+/);
  const last = parts.pop() ?? shop.name;
  const lead = parts.join(" ");
  const title = el("h1", { class: "brand", "aria-label": shop.name });
  if (lead) title.append(el("span", { class: "brand-lead", text: lead }));
  title.append(document.createTextNode(" "));
  title.append(el("span", { class: "brand-name", text: last }));

  const copy = document.querySelector("#hero-copy");
  copy.replaceChildren(
    el("img", {
      class: "logo",
      src: shop.logo,
      width: "56",
      height: "56",
      alt: "",
    }),
    title,
    el("p", { class: "tagline", text: shop.tagline }),
    el("a", {
      class: "btn btn-gold hero-cta",
      href: waLink(BOOKING_MESSAGE),
      target: "_blank",
      rel: "noopener noreferrer",
      text: "Agendar pelo WhatsApp",
    }),
  );
}

function renderServices() {
  const list = el("ul", { class: "services" });
  shop.services.forEach((service, index) => {
    const info = el("div", {}, [
      el("p", { class: "service-index", text: String(index + 1).padStart(2, "0") }),
      el("h3", { text: service.name }),
    ]);
    if (service.description) info.append(el("p", { class: "service-desc", text: service.description }));
    list.append(
      el("li", { class: "service" }, [
        el("div", { class: "service-top" }, [info, el("p", { class: "price", text: brl(service.price) })]),
        el("a", {
          class: "btn btn-line",
          href: waLink(serviceMessage(service.name)),
          target: "_blank",
          rel: "noopener noreferrer",
          text: "Agendar",
        }),
      ]),
    );
  });

  document.querySelector("#servicos").replaceChildren(
    el("div", { class: "section-inner" }, [el("h2", { id: "servicos-title", text: "Serviços" }), list]),
  );
}

function renderHours() {
  const list = el("ul", { class: "hours" });
  for (const row of shop.hours) {
    const closed = Boolean(row.closed);
    list.append(
      el("li", { class: closed ? "is-closed" : "" }, [
        el("span", { class: "day", text: row.label }),
        el("span", {
          class: "when",
          text: closed ? "Fechado" : `${row.open} – ${row.close}`,
        }),
      ]),
    );
  }
  document.querySelector("#horario").replaceChildren(
    el("div", { class: "section-inner" }, [
      el("h2", { id: "horario-title", text: "Horário de funcionamento" }),
      list,
    ]),
  );
}

function renderAddress() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(shop.mapQuery)}&z=16&hl=pt-BR&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(shop.mapQuery)}`;
  const frame = el("iframe", {
    title: `Mapa — ${shop.name}`,
    src: mapSrc,
    width: "600",
    height: "450",
    loading: "lazy",
    referrerpolicy: "no-referrer-when-downgrade",
  });
  document.querySelector("#endereco").replaceChildren(
    el("div", { class: "section-inner" }, [
      el("h2", { id: "endereco-title", text: "Endereço" }),
      el("div", { class: "place" }, [
        el("div", {}, [
          el("p", { class: "address", text: shop.address }),
          el("a", {
            class: "btn btn-line directions",
            href: directions,
            target: "_blank",
            rel: "noopener noreferrer",
            text: "Como chegar",
          }),
        ]),
        el("div", { class: "map-wrap" }, [frame]),
      ]),
    ]),
  );
}

function renderFooter() {
  const handle = shop.instagram.replace(/^@/, "");
  document.querySelector("#footer").replaceChildren(
    el("div", { class: "footer-inner" }, [
      el("p", { class: "footer-name", text: shop.name }),
      el("p", { class: "footer-address", text: shop.address }),
      el(
        "a",
        {
          class: "ig",
          href: `https://instagram.com/${handle}`,
          target: "_blank",
          rel: "noopener noreferrer",
        },
        [icon(INSTAGRAM_PATH), el("span", { text: `@${handle}` })],
      ),
      el("div", {}, [
        el("a", {
          class: "packages",
          href: PACKAGES_URL,
          text: "Ver os 3 pacotes",
        }),
      ]),
      el("p", {
        class: "demo-note",
        text: "Site de demonstração. Barbearia Leme é um negócio fictício.",
      }),
    ]),
  );
}

function renderFloat() {
  const link = document.querySelector("#wa-float");
  link.href = waLink(BOOKING_MESSAGE);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.replaceChildren(icon(WHATSAPP_PATH));
}

// Static HTML in index.html is the page. Render from config only when that markup is missing.
if (!document.getElementById("servicos-title")) {
  applyHero();
  renderHeroCopy();
  renderServices();
  renderHours();
  renderAddress();
  renderFooter();
  renderFloat();
}

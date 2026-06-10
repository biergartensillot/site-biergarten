const nav = document.querySelector(".main-nav");
document.querySelector(".nav-toggle").addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
document.querySelector("#year").textContent = new Date().getFullYear();

const track = document.querySelector(".event-track");
const eventCards = [...track.querySelectorAll(".event-card")];
let eventIndex = 0;
let autoSlide;
function showEvent(index) {
  eventIndex = (index + eventCards.length) % eventCards.length;
  track.scrollTo({ left: eventCards[eventIndex].offsetLeft - track.offsetLeft, behavior: "smooth" });
  renderFeaturedEvent(eventIndex);
}
function startCarousel() {
  clearInterval(autoSlide);
  const progress = document.querySelector(".carousel-progress span");
  if (progress) { progress.style.animation = "none"; progress.offsetHeight; progress.style.animation = "progress 5s linear infinite"; }
  autoSlide = setInterval(() => showEvent(eventIndex + 1), 5000);
}
document.querySelector(".rail-next").addEventListener("click", () => { showEvent(eventIndex + 1); startCarousel(); });
document.querySelector(".rail-prev").addEventListener("click", () => { showEvent(eventIndex - 1); startCarousel(); });
track.addEventListener("pointerenter", () => clearInterval(autoSlide));
track.addEventListener("pointerleave", startCarousel);
startCarousel();

async function loadGoogleReviews() {
  if (location.protocol === "file:") return;
  try {
    const response = await fetch("/api/google-reviews");
    if (!response.ok) return;
    const data = await response.json();
    if (!Array.isArray(data.reviews) || !data.reviews.length) return;
    if (data.rating) document.querySelector(".score-line>strong").textContent = Number(data.rating).toFixed(1);
    const cards = document.querySelector(".review-cards");
    cards.innerHTML = data.reviews.slice(0, 2).map(review => `<article><div class="stars">${"★".repeat(Math.round(review.rating || 5))}</div><p>${review.text}</p><div class="review-author"><b>${review.author_name || "Google"}</b><small>${review.relative_time_description || "Google Review"}</small></div></article>`).join("");
  } catch (_) {
    // The designed fallback stays visible until the secure Google endpoint is configured.
  }
}
loadGoogleReviews();

document.querySelectorAll(".menu-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".menu-tab,.menu-panel").forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`[data-panel="${tab.dataset.menu}"]`).classList.add("active");
  });
});

const translations = {
  pt: {
    nav:["Início","Carta","O espaço","Contacto"], reserve:"Reservar", upcoming:"Próximos eventos",
    hero:"O seu lugar<br>para <em>desligar.</em>", heroText:"Comida feita para partilhar, cocktails ao sol e um jardim onde o tempo passa diferente.", explore:"Explorar a carta", book:"Reservar mesa",
    open:"Aberto hoje", social:["Siga o dia a dia","Resposta rápida","Veja e deixe a sua nota","Fique por dentro"],
    reviewHappy:"Clientes felizes no Google", reviewCopy:"Boas experiências merecem ser partilhadas. Veja o que os nossos clientes dizem e conte-nos como foi a sua visita.", reviews:"Ver avaliações",
    testimonials:["Atendimento, ambiente e comida entre os pontos mais elogiados.","Experiências cinco estrelas num jardim para aproveitar Mallorca sem pressa."],
    sectionSpace:"01 · O Biergarten", spaceTitle:"Um pequeno refúgio<br><b>com alma de Mallorca.</b>", spaceCopy:"Do primeiro café ao último cocktail, tudo aqui foi pensado para encontros sem pressa.", know:"Conhecer o espaço",
    menuEyebrow:"02 · A carta completa", menuTitle:"Escolha o seu<br><b>próximo favorito.</b>", menuCopy:"Todos os pratos e bebidas, organizados para consultar sem sair do site.", tabs:["Café da manhã · Novo","Para comer","Para beber","Doces & café"],
    categories:["Pastelaria doce","Tostas","Sanduíches","Bocadillos quentes","Bocadillos frios","Tapas","Carnes","Pasta & saladas","Hambúrgueres & infantil","Cerveja & vinho","Combinados","Sumos & refrigerantes","Sobremesas","Cafés","Chás"],
    eventDates:["Sábado · 20/06 · 13:00","Sexta · 27/06 · 18:00","Sextas, sábados e domingos"], events:["Próximo evento","Arraiá do Biergarten","Quadrilha · Pescaria · Sorteios · Comidas típicas · Música ao vivo ↗","Show especial","Renatinho da Bahia & Alê Brito","Samba · Boa gastronomia · Drinks especiais ↗","Novidade no Biergarten","Marmitex aos fins de semana","Feijoada · Coxinhas · Pastéis · Pratos brasileiros"], eventInfo:["Evento em destaque","Arraiá do Biergarten","Uma tarde inesquecível com tudo o que uma festa junina tem de melhor.","Data e horário","Sábado · 20/06","A partir das 13:00","Atração · DJ","DJ Fizileiro","Tocando todos os ritmos","Atração · Sertanejo","Filipe Ferreira & Marlon Carvalho","O melhor do sertanejo","Atração · Forró & Piseiro","Trio Brazuca","Os melhores do forró e piseiro","Experiência","Festa junina completa","Quadrilha · Pescaria · Barraca do beijo · Sorteios · Comidas típicas","Local","Biergarten Café-Bar","Carrer Llevant 13 · S'illot","Quero participar"],
    visit:"03 · Venha visitar", visitTitle:"Boa comida.<br>Bons encontros.", address:"Morada", hours:"Horário", hoursValue:"Todos os dias, exceto quarta · 09:00—00:00", booking:"Reservas", directions:"Como chegar", footerBio:"Link da bio"
  },
  es: {
    nav:["Inicio","Carta","El espacio","Contacto"], reserve:"Reservar", upcoming:"Próximos eventos",
    hero:"Tu lugar<br>para <em>desconectar.</em>", heroText:"Comida para compartir, cócteles al sol y un jardín donde el tiempo pasa diferente.", explore:"Explorar la carta", book:"Reservar mesa",
    open:"Abierto hoy", social:["Sigue nuestro día a día","Respuesta rápida","Mira y deja tu valoración","Mantente al día"],
    reviewHappy:"Clientes felices en Google", reviewCopy:"Las buenas experiencias merecen ser compartidas. Descubre lo que dicen nuestros clientes y cuéntanos cómo fue tu visita.", reviews:"Ver reseñas",
    testimonials:["Atención, ambiente y comida entre los puntos más elogiados.","Experiencias de cinco estrellas en un jardín para disfrutar de Mallorca sin prisas."],
    sectionSpace:"01 · El Biergarten", spaceTitle:"Un pequeño refugio<br><b>con alma de Mallorca.</b>", spaceCopy:"Desde el primer café hasta el último cóctel, todo está pensado para encuentros sin prisas.", know:"Conocer el espacio",
    menuEyebrow:"02 · La carta completa", menuTitle:"Elige tu<br><b>próximo favorito.</b>", menuCopy:"Todos nuestros platos y bebidas, organizados para consultar sin salir de la web.", tabs:["Desayunos · Nuevo","Para comer","Para beber","Dulces y café"],
    categories:["Pastas dulces","Tostadas","Sándwiches","Bocadillos calientes","Bocadillos fríos","Tapas","Carnes","Pasta y ensaladas","Hamburguesas e infantil","Cerveza y vino","Combinados","Zumos y refrescos","Postres","Cafés","Tés"],
    eventDates:["Sábado · 20/06 · 13:00","Viernes · 27/06 · 18:00","Viernes, sábados y domingos"], events:["Próximo evento","Arraiá do Biergarten","Cuadrilla · Pesca · Sorteos · Comidas típicas · Música en vivo ↗","Show especial","Renatinho da Bahia & Alê Brito","Samba · Buena gastronomía · Bebidas especiales ↗","Novedad en Biergarten","Marmitex los fines de semana","Feijoada · Coxinhas · Pasteles brasileños · Platos brasileños"], eventInfo:["Evento destacado","Arraiá do Biergarten","Una tarde inolvidable con lo mejor de una fiesta junina brasileña.","Fecha y horario","Sábado · 20/06","A partir de las 13:00","Artista · DJ","DJ Fizileiro","Todos los ritmos","Artistas · Sertanejo","Filipe Ferreira & Marlon Carvalho","Lo mejor del sertanejo","Artistas · Forró & Piseiro","Trio Brazuca","Lo mejor del forró y piseiro","Experiencia","Fiesta junina completa","Cuadrilla · Pesca · Puesto del beso · Sorteos · Comidas típicas","Lugar","Biergarten Café-Bar","Carrer Llevant 13 · S'illot","Quiero participar"],
    visit:"03 · Ven a visitarnos", visitTitle:"Buena comida.<br>Buenos encuentros.", address:"Dirección", hours:"Horario", hoursValue:"Todos los días excepto miércoles · 09:00—00:00", booking:"Reservas", directions:"Cómo llegar", footerBio:"Link de la bio"
  },
  en: {
    nav:["Home","Menu","The space","Contact"], reserve:"Book", upcoming:"Upcoming events",
    hero:"Your place<br>to <em>switch off.</em>", heroText:"Food made for sharing, cocktails in the sun and a garden where time moves differently.", explore:"Explore the menu", book:"Book a table",
    open:"Open today", social:["Follow our daily life","Quick reply","See and leave your rating","Stay up to date"],
    reviewHappy:"Happy customers on Google", reviewCopy:"Great experiences deserve to be shared. See what our guests say and tell us about your visit.", reviews:"See reviews",
    testimonials:["Service, atmosphere and food are among the most praised highlights.","Five-star experiences in a garden made for enjoying Mallorca at your own pace."],
    sectionSpace:"01 · The Biergarten", spaceTitle:"A little hideaway<br><b>with a Mallorcan soul.</b>", spaceCopy:"From the first coffee to the last cocktail, everything is made for unhurried moments together.", know:"Discover the space",
    menuEyebrow:"02 · Full menu", menuTitle:"Choose your<br><b>next favourite.</b>", menuCopy:"All our food and drinks, organised so you can browse without leaving the website.", tabs:["Breakfast · New","Food","Drinks","Desserts & coffee"],
    categories:["Sweet pastries","Toast","Sandwiches","Hot bocadillos","Cold bocadillos","Tapas","Meat","Pasta & salads","Burgers & kids","Beer & wine","Mixed drinks","Juices & soft drinks","Desserts","Coffee","Tea"],
    eventDates:["Saturday · 20/06 · 13:00","Friday · 27/06 · 18:00","Fridays, Saturdays and Sundays"], events:["Upcoming event","Biergarten Brazilian June Festival","Traditional dance · Games · Giveaways · Typical food · Live music ↗","Special show","Renatinho da Bahia & Alê Brito","Samba · Great food · Special drinks ↗","New at Biergarten","Weekend Brazilian meal boxes","Feijoada · Coxinhas · Brazilian pastels · Brazilian dishes"], eventInfo:["Featured event","Biergarten Brazilian June Festival","An unforgettable afternoon with the best of a traditional Brazilian June festival.","Date and time","Saturday · 20/06","From 13:00","Artist · DJ","DJ Fizileiro","Playing every rhythm","Artists · Sertanejo","Filipe Ferreira & Marlon Carvalho","The best of sertanejo","Artists · Forró & Piseiro","Trio Brazuca","The best of forró and piseiro","Experience","A complete Brazilian June festival","Traditional dance · Games · Kiss booth · Giveaways · Typical food","Location","Biergarten Café-Bar","Carrer Llevant 13 · S'illot","I want to join"],
    visit:"03 · Visit us", visitTitle:"Good food.<br>Good company.", address:"Address", hours:"Opening hours", hoursValue:"Every day except Wednesday · 09:00—00:00", booking:"Bookings", directions:"Get directions", footerBio:"Bio link"
  },
  de: {
    nav:["Start","Speisekarte","Der Ort","Kontakt"], reserve:"Reservieren", upcoming:"Nächste Events",
    hero:"Dein Ort<br>zum <em>Abschalten.</em>", heroText:"Essen zum Teilen, Cocktails in der Sonne und ein Garten, in dem die Zeit anders vergeht.", explore:"Speisekarte ansehen", book:"Tisch reservieren",
    open:"Heute geöffnet", social:["Folge unserem Alltag","Schnelle Antwort","Bewertung ansehen und abgeben","Bleib auf dem Laufenden"],
    reviewHappy:"Glückliche Gäste bei Google", reviewCopy:"Schöne Erlebnisse sollte man teilen. Lies, was unsere Gäste sagen, und erzähle uns von deinem Besuch.", reviews:"Bewertungen ansehen",
    testimonials:["Service, Atmosphäre und Essen gehören zu den meistgelobten Highlights.","Fünf-Sterne-Erlebnisse in einem Garten, um Mallorca entspannt zu genießen."],
    sectionSpace:"01 · Der Biergarten", spaceTitle:"Ein kleiner Rückzugsort<br><b>mit mallorquinischer Seele.</b>", spaceCopy:"Vom ersten Kaffee bis zum letzten Cocktail ist alles für entspannte gemeinsame Momente gemacht.", know:"Den Ort entdecken",
    menuEyebrow:"02 · Vollständige Speisekarte", menuTitle:"Wähle deinen<br><b>nächsten Favoriten.</b>", menuCopy:"Alle Speisen und Getränke übersichtlich direkt auf unserer Website.", tabs:["Frühstück · Neu","Essen","Getränke","Desserts & Kaffee"],
    categories:["Süßes Gebäck","Toast","Sandwiches","Warme Bocadillos","Kalte Bocadillos","Tapas","Fleisch","Pasta & Salate","Burger & Kinder","Bier & Wein","Longdrinks","Säfte & Softdrinks","Desserts","Kaffee","Tee"],
    eventDates:["Samstag · 20/06 · 13:00","Freitag · 27/06 · 18:00","Freitags, samstags und sonntags"], events:["Nächstes Event","Brasilianisches Junifest im Biergarten","Traditioneller Tanz · Spiele · Verlosungen · Typisches Essen · Live-Musik ↗","Sondershow","Renatinho da Bahia & Alê Brito","Samba · Gutes Essen · Besondere Drinks ↗","Neu im Biergarten","Brasilianische Gerichte am Wochenende","Feijoada · Coxinhas · Brasilianische Pastéis · Brasilianische Gerichte"], eventInfo:["Event-Highlight","Brasilianisches Junifest im Biergarten","Ein unvergesslicher Nachmittag mit dem Besten eines brasilianischen Junifests.","Datum und Uhrzeit","Samstag · 20/06","Ab 13:00 Uhr","Künstler · DJ","DJ Fizileiro","Alle Rhythmen","Künstler · Sertanejo","Filipe Ferreira & Marlon Carvalho","Das Beste des Sertanejo","Künstler · Forró & Piseiro","Trio Brazuca","Das Beste aus Forró und Piseiro","Erlebnis","Komplettes brasilianisches Junifest","Traditioneller Tanz · Spiele · Kussstand · Verlosungen · Typisches Essen","Ort","Biergarten Café-Bar","Carrer Llevant 13 · S'illot","Ich möchte teilnehmen"],
    visit:"03 · Besuche uns", visitTitle:"Gutes Essen.<br>Gute Begegnungen.", address:"Adresse", hours:"Öffnungszeiten", hoursValue:"Täglich außer Mittwoch · 09:00—00:00", booking:"Reservierungen", directions:"Route planen", footerBio:"Bio-Link"
  }
};

const featuredEventDetails = {
  pt: [
    { eyebrow:"Evento em destaque", title:"Arraiá do Biergarten", copy:"Uma tarde inesquecível com tudo o que uma festa junina tem de melhor.", cta:"Quero participar", facts:[["Data e horário","Sábado · 20/06","A partir das 13:00"],["Atração · DJ","DJ Fizileiro","Tocando todos os ritmos"],["Atração · Sertanejo","Filipe Ferreira & Marlon Carvalho","O melhor do sertanejo"],["Atração · Forró & Piseiro","Trio Brazuca","Os melhores do forró e piseiro"],["Experiência","Festa junina completa","Quadrilha · Pescaria · Barraca do beijo · Sorteios · Comidas típicas"],["Local","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]},
    { eyebrow:"Show especial", title:"Renatinho da Bahia & Alê Brito", copy:"Uma tarde-noite de samba, alegria, boa gastronomia e drinks especiais.", cta:"Fazer reserva", facts:[["Data e horário","Sexta · 27/06","A partir das 18:00"],["Atração","Renatinho da Bahia","Show especial de samba"],["Atração","Alê Brito","Show especial de samba"],["Gastronomia","Feijoada completa","Coxinhas · Pastéis"],["Bebidas","Caipirinhas & cocktails","Drinks especiais"],["Local","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]},
    { eyebrow:"Novidade no Biergarten", title:"Marmitex aos fins de semana", copy:"Comida brasileira pronta para levar ou receber em casa.", cta:"Pedir pelo WhatsApp", facts:[["Disponível","Sábados e domingos","Para levar ou receber em casa"],["Destaque","Feijoada","Sabor brasileiro"],["Petiscos","Coxinhas & pastéis","Perfeitos para partilhar"],["Pratos","Comida brasileira","Opções variadas"],["Pedidos","WhatsApp","Atendimento rápido"],["Retirada","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]}
  ],
  es: [
    { eyebrow:"Evento destacado", title:"Arraiá do Biergarten", copy:"Una tarde inolvidable con lo mejor de una fiesta junina brasileña.", cta:"Quiero participar", facts:[["Fecha y horario","Sábado · 20/06","A partir de las 13:00"],["Artista · DJ","DJ Fizileiro","Todos los ritmos"],["Artistas · Sertanejo","Filipe Ferreira & Marlon Carvalho","Lo mejor del sertanejo"],["Artistas · Forró & Piseiro","Trio Brazuca","Lo mejor del forró y piseiro"],["Experiencia","Fiesta junina completa","Cuadrilla · Pesca · Puesto del beso · Sorteos · Comidas típicas"],["Lugar","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]},
    { eyebrow:"Show especial", title:"Renatinho da Bahia & Alê Brito", copy:"Una tarde-noche de samba, alegría, buena gastronomía y bebidas especiales.", cta:"Reservar", facts:[["Fecha y horario","Viernes · 27/06","A partir de las 18:00"],["Artista","Renatinho da Bahia","Show especial de samba"],["Artista","Alê Brito","Show especial de samba"],["Gastronomía","Feijoada completa","Coxinhas · Pasteles brasileños"],["Bebidas","Caipirinhas y cócteles","Bebidas especiales"],["Lugar","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]},
    { eyebrow:"Novedad en Biergarten", title:"Marmitex los fines de semana", copy:"Comida brasileña lista para llevar o recibir en casa.", cta:"Pedir por WhatsApp", facts:[["Disponible","Sábados y domingos","Para llevar o recibir en casa"],["Especialidad","Feijoada","Sabor brasileño"],["Aperitivos","Coxinhas y pasteles brasileños","Perfectos para compartir"],["Platos","Comida brasileña","Opciones variadas"],["Pedidos","WhatsApp","Respuesta rápida"],["Recogida","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]}
  ],
  en: [
    { eyebrow:"Featured event", title:"Biergarten Brazilian June Festival", copy:"An unforgettable afternoon with the best of a traditional Brazilian June festival.", cta:"I want to join", facts:[["Date and time","Saturday · 20/06","From 13:00"],["Artist · DJ","DJ Fizileiro","Playing every rhythm"],["Artists · Sertanejo","Filipe Ferreira & Marlon Carvalho","The best of sertanejo"],["Artists · Forró & Piseiro","Trio Brazuca","The best of forró and piseiro"],["Experience","Complete Brazilian June festival","Traditional dance · Games · Kiss booth · Giveaways · Typical food"],["Location","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]},
    { eyebrow:"Special show", title:"Renatinho da Bahia & Alê Brito", copy:"An afternoon and evening of samba, joy, great food and special drinks.", cta:"Book now", facts:[["Date and time","Friday · 27/06","From 18:00"],["Artist","Renatinho da Bahia","Special samba show"],["Artist","Alê Brito","Special samba show"],["Food","Complete feijoada","Coxinhas · Brazilian pastels"],["Drinks","Caipirinhas & cocktails","Special drinks"],["Location","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]},
    { eyebrow:"New at Biergarten", title:"Weekend Brazilian meal boxes", copy:"Brazilian food ready to collect or delivered to your home.", cta:"Order on WhatsApp", facts:[["Available","Fridays, Saturdays and Sundays","Collection or home delivery"],["Highlight","Feijoada","Brazilian flavour"],["Snacks","Coxinhas & Brazilian pastels","Perfect for sharing"],["Meals","Brazilian dishes","A variety of options"],["Orders","WhatsApp","Quick response"],["Collection","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]}
  ],
  de: [
    { eyebrow:"Event-Highlight", title:"Brasilianisches Junifest im Biergarten", copy:"Ein unvergesslicher Nachmittag mit dem Besten eines brasilianischen Junifests.", cta:"Ich möchte teilnehmen", facts:[["Datum und Uhrzeit","Samstag · 20/06","Ab 13:00 Uhr"],["Künstler · DJ","DJ Fizileiro","Alle Rhythmen"],["Künstler · Sertanejo","Filipe Ferreira & Marlon Carvalho","Das Beste des Sertanejo"],["Künstler · Forró & Piseiro","Trio Brazuca","Das Beste aus Forró und Piseiro"],["Erlebnis","Komplettes brasilianisches Junifest","Traditioneller Tanz · Spiele · Kussstand · Verlosungen · Typisches Essen"],["Ort","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]},
    { eyebrow:"Sondershow", title:"Renatinho da Bahia & Alê Brito", copy:"Ein Nachmittag und Abend mit Samba, Freude, gutem Essen und besonderen Drinks.", cta:"Jetzt reservieren", facts:[["Datum und Uhrzeit","Freitag · 27/06","Ab 18:00 Uhr"],["Künstler","Renatinho da Bahia","Samba-Sondershow"],["Künstlerin","Alê Brito","Samba-Sondershow"],["Essen","Komplette Feijoada","Coxinhas · Brasilianische Pastéis"],["Getränke","Caipirinhas & Cocktails","Besondere Drinks"],["Ort","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]},
    { eyebrow:"Neu im Biergarten", title:"Brasilianische Gerichte am Wochenende", copy:"Brasilianisches Essen zum Mitnehmen oder für die Lieferung nach Hause.", cta:"Über WhatsApp bestellen", facts:[["Verfügbar","Freitags, samstags und sonntags","Abholung oder Lieferung"],["Highlight","Feijoada","Brasilianischer Geschmack"],["Snacks","Coxinhas & brasilianische Pastéis","Perfekt zum Teilen"],["Gerichte","Brasilianisches Essen","Verschiedene Optionen"],["Bestellung","WhatsApp","Schnelle Antwort"],["Abholung","Biergarten Café-Bar","Carrer Llevant 13 · S'illot"]]}
  ]
};

let currentLanguage = "pt";
function renderFeaturedEvent(index) {
  const detail = featuredEventDetails[currentLanguage]?.[index];
  const section = document.querySelector(".featured-event-info");
  if (!section) return;
  if (!detail) {
    const card = eventCards[index];
    section.querySelector(".featured-event-title>span").textContent = card?.querySelector("small")?.textContent || "";
    section.querySelector(".featured-event-title h2").textContent = card?.querySelector("strong")?.textContent || "";
    section.querySelector(".featured-event-title p").textContent = card?.querySelector("em")?.textContent?.replace("↗","") || "";
    section.querySelector(".featured-event-facts").innerHTML = "";
    section.querySelector(".pill").style.display = "none";
    return;
  }
  section.querySelector(".featured-event-title>span").textContent = detail.eyebrow;
  section.querySelector(".featured-event-title h2").textContent = detail.title;
  section.querySelector(".featured-event-title p").textContent = detail.copy;
  section.querySelector(".featured-event-facts").innerHTML = detail.facts.map((fact, factIndex) => `<article class="${factIndex > 0 && factIndex < 4 ? "artist-highlight" : ""}"><small>${fact[0]}</small><strong>${fact[1]}</strong><span>${fact[2]}</span></article>`).join("");
  section.querySelector(".pill").style.display = "inline-flex";
  const selectedCard = eventCards[index];
  if (selectedCard?.href) section.querySelector(".pill").href = selectedCard.href;
  setPill(".featured-event-info>.pill", detail.cta, "↗");
}

const menuTerms = {
  "Rebozados y fritos":["Empanados e fritos","Breaded and fried","Paniert und frittiert"],
  "Calamares rebozados y fritos":["Lulas empanadas e fritas","Breaded and fried squid","Panierte und frittierte Tintenfischringe"],
  "Aceite, ajo y guindilla":["Azeite, alho e malagueta","Olive oil, garlic and chilli","Olivenöl, Knoblauch und Chili"],
  "Tomate, albahaca, miel y queso":["Tomate, manjericão, mel e queijo","Tomato, basil, honey and cheese","Tomate, Basilikum, Honig und Käse"],
  "Tomate y albahaca":["Tomate e manjericão","Tomato and basil","Tomate und Basilikum"],
  "En salsa de tomate":["Em molho de tomate","In tomato sauce","In Tomatensauce"],
  "Vinagreta, arroz y farofa":["Vinagrete, arroz e farofa","Vinaigrette, rice and farofa","Vinaigrette, Reis und Farofa"],
  "Patatas fritas y ensalada":["Batatas fritas e salada","Fries and salad","Pommes und Salat"],
  "A la plancha":["Grelhado","Grilled","Gegrillt"],
  "Jamón york y queso":["Fiambre e queijo","Ham and cheese","Schinken und Käse"],
  "Ajo, guindilla y parmesano":["Alho, malagueta e parmesão","Garlic, chilli and parmesan","Knoblauch, Chili und Parmesan"],
  "Queso de cabra y bacon":["Queijo de cabra e bacon","Goat cheese and bacon","Ziegenkäse und Bacon"],
  "Queso, huevo, bacon y ensalada":["Queijo, ovo, bacon e salada","Cheese, egg, bacon and salad","Käse, Ei, Bacon und Salat"],
  "Tinto, blanco o rosado":["Tinto, branco ou rosé","Red, white or rosé","Rot, weiß oder rosé"],
  "Naranja, piña, manzana o melocotón":["Laranja, ananás, maçã ou pêssego","Orange, pineapple, apple or peach","Orange, Ananas, Apfel oder Pfirsich"],
  "Fresa, chocolate o vainilla":["Morango, chocolate ou baunilha","Strawberry, chocolate or vanilla","Erdbeere, Schokolade oder Vanille"],
  "Patatas fritas":["Batatas fritas","French fries","Pommes frites"],
  "Pechuga de pollo":["Peito de frango","Chicken breast","Hähnchenbrust"],
  "Pescado frito":["Peixe frito","Fried fish","Frittierter Fisch"],
  "Tarta de chocolate":["Tarte de chocolate","Chocolate cake","Schokoladenkuchen"],
  "Tarta de arándanos y queso":["Cheesecake de mirtilos","Blueberry cheesecake","Blaubeer-Cheesecake"],
  "Café con leche":["Café com leite","Coffee with milk","Milchkaffee"],
  "Zumos":["Sumos","Juices","Säfte"],
  "Refrescos":["Refrigerantes","Soft drinks","Softdrinks"]
};
document.querySelectorAll(".menu-items b,.menu-items small").forEach(el => el.dataset.originalText = el.textContent.trim());

function setText(selector, value, html = false) {
  const element = document.querySelector(selector);
  if (element) element[html ? "innerHTML" : "textContent"] = value;
}
function setPill(selector, label, arrow) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = `${label}<span>${arrow}</span>`;
}
function setLanguage(lang) {
  const t = translations[lang] || translations.pt;
  currentLanguage = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll(".main-nav a").forEach((el,i) => el.textContent = t.nav[i]);
  setPill(".header-actions .pill", t.reserve, "↗");
  setText(".rail-head strong", t.upcoming);
  document.querySelectorAll(".event-date").forEach((el,i)=>el.textContent=t.eventDates[i]);
  document.querySelectorAll(".event-card").forEach((card,i)=>{
    const parts=[card.querySelector("small"),card.querySelector("strong"),card.querySelector("em")];
    parts.forEach((el,j)=>{const value=t.events[i*3+j];if(el&&value!==undefined)el.textContent=value});
  });
  renderFeaturedEvent(eventIndex);
  setText(".hero h1", t.hero, true); setText(".hero-copy>p", t.heroText);
  setPill(".hero-actions .pill:first-child", t.explore, "↓"); setPill(".hero-actions .pill:last-child", t.book, "↗"); setText(".hero-meta span", t.open);
  document.querySelectorAll(".social-button small").forEach((el,i)=>el.textContent=t.social[i]);
  setText(".score-line small",t.reviewHappy); setText(".reviews-score>p",t.reviewCopy); setPill(".reviews-score .pill",t.reviews,"↗");
  document.querySelectorAll(".review-cards article>p").forEach((el,i)=>el.textContent=t.testimonials[i]);
  setText(".section-title>span",t.sectionSpace); setText(".section-title h2",t.spaceTitle,true); setText(".experience-lead p",t.spaceCopy); setText(".round-link",`${t.know} ↘`);
  setText(".menu-hero>span",t.menuEyebrow); setText(".menu-hero h2",t.menuTitle,true); setText(".menu-hero p",t.menuCopy);
  const hasBreakfast = Boolean(document.querySelector('[data-panel="desayuno"]'));
  const translatedTabs = hasBreakfast ? t.tabs : t.tabs.slice(1);
  const translatedCategories = hasBreakfast ? t.categories : t.categories.slice(5);
  document.querySelectorAll(".menu-tab").forEach((el,i)=>el.textContent=translatedTabs[i]);
  document.querySelectorAll(".menu-category h3").forEach((el,i)=>el.textContent=translatedCategories[i]);
  document.querySelectorAll(".menu-items b,.menu-items small").forEach(el => {
    const original=el.dataset.originalText;
    const term=menuTerms[original];
    el.textContent=lang==="es"||!term ? original : term[lang==="pt"?0:lang==="en"?1:2];
  });
  setText(".visit-info>span",t.visit); setText(".visit h2",t.visitTitle,true);
  const labels=document.querySelectorAll(".visit-lines small"); [t.address,t.hours,t.booking].forEach((v,i)=>labels[i].textContent=v);
  const visitLines=document.querySelectorAll(".visit-lines p"); if(visitLines[1]) visitLines[1].lastChild.textContent=t.hoursValue;
  setPill(".visit-info .pill",t.directions,"↗");
  const footerLinks=document.querySelectorAll("footer a"); if(footerLinks[2]) footerLinks[2].textContent=t.footerBio;
  localStorage.setItem("biergarten-language",lang);
}
const languageSelect=document.querySelector("#languageSelect");
languageSelect.value=localStorage.getItem("biergarten-language")||"pt";
setLanguage(languageSelect.value);
languageSelect.addEventListener("change",e=>setLanguage(e.target.value));

/* FNDI Language System — EN / ES (Latin American Spanish)
   Auto-detects Spanish browsers + manual toggle */
(function(){
  'use strict';

  // ─── CSS ───
  var css = document.createElement('style');
  css.textContent = [
    '.lang-btn{position:relative;background:transparent;border:1.5px solid rgba(124,58,237,0.4);color:var(--text-primary,#1a1a2e);font-size:0.8rem;font-weight:700;padding:0.35rem 0.7rem;border-radius:6px;cursor:pointer;transition:all 0.25s;font-family:"Inter",-apple-system,sans-serif;letter-spacing:0.5px;margin-left:0.5rem}',
    '.lang-btn:hover{background:rgba(124,58,237,0.1);border-color:#7c3aed;color:#7c3aed}',
    'nav:not(.scrolled) .lang-btn{color:#fff;border-color:rgba(255,255,255,0.3)}',
    'nav:not(.scrolled) .lang-btn:hover{border-color:#fff;background:rgba(255,255,255,0.1)}',
    'nav.scrolled .lang-btn,nav[style] .lang-btn{color:var(--text-primary,#1a1a2e);border-color:rgba(124,58,237,0.4)}',
    '.mob-lang-btn{display:block;text-align:center;padding:0.6rem;margin:0.5rem 1rem;border:1.5px solid rgba(124,58,237,0.4);border-radius:6px;color:#4a4a68;font-weight:600;font-size:0.9rem;cursor:pointer;background:transparent;font-family:"Inter",sans-serif}',
    '.mob-lang-btn:hover{background:rgba(124,58,237,0.08);color:#7c3aed}'
  ].join('');
  document.head.appendChild(css);

  // ─── Language detection & storage ───
  function getLang(){
    try{var s=localStorage.getItem('fndi-lang');if(s)return s;}catch(e){}
    var bl=navigator.language||navigator.userLanguage||'en';
    return bl.toLowerCase().startsWith('es')?'es':'en';
  }
  function setLang(l){try{localStorage.setItem('fndi-lang',l);}catch(e){}}

  // ─── Translation dictionary ───
  // Shared translations (nav, footer, CTAs, common elements)
  var shared = {
    'Get in touch':'Contáctanos','How It Works':'Cómo Funciona','FAQ':'Preguntas Frecuentes','Websites':'Sitios Web','More customers for local businesses.':'Más clientes para negocios locales.',
    // Nav
    'Future Native Digital Intelligence':'Inteligencia Digital Nativa del Futuro',
    'Services':'Servicios','Industries':'Industrias','Pricing':'Precios',
    'About':'Nosotros','Portfolio':'Portafolio','Blog':'Blog',
    'Contact':'Contacto','Get Started':'Comenzar','Book a Call':'Agenda una Llamada',
    'Book a Free Call':'Agenda una Llamada Gratis',
    'AI Voice Agents':'Agentes de Voz IA','Website Chatbots':'Chatbots para Sitios Web',
    'Web Development':'Desarrollo Web','Automation':'Automatización',
    'CRM Solutions':'Soluciones CRM','Social Media':'Redes Sociales','Meta Ads':'Meta Ads',
    'Dental Offices':'Consultorios Dentales','Med Spas':'Spas Médicos',
    'Law Firms':'Bufetes de Abogados','Restaurants':'Restaurantes',
    'Salons':'Salones','Salons & Barbershops':'Salones y Barberías',
    'Home Services':'Servicios del Hogar','More':'Más',
    // Footer
    'Solutions':'Soluciones','Company':'Empresa','Resources':'Recursos',
    'AI solutions for small businesses.':'Soluciones de IA para pequeños negocios.',
    'Based in Miami, FL':'Con sede en Miami, FL',
    'Voice Agents':'Agentes de Voz','Chatbots':'Chatbots','Websites':'Sitios Web',
    'CRM':'CRM','About Us':'Sobre Nosotros','Careers':'Carreras',
    'Case Studies':'Casos de Éxito','FAQ':'Preguntas Frecuentes',
    'Partners':'Socios','Compare':'Comparar','How It Works':'Cómo Funciona',
    'Demos':'Demos','Free Assessment':'Evaluación Gratuita',
    'Client Onboarding':'Incorporación de Clientes',
    'Terms of Service':'Términos de Servicio','Privacy Policy':'Política de Privacidad',
    // Common CTAs & labels
    'Learn More':'Más Información','Learn more →':'Más información →',
    'Learn About Us →':'Conócenos →','View all FAQs →':'Ver todas las preguntas →',
    'Get My Free Audit':'Obtener Mi Auditoría Gratis',
    'Submit':'Enviar','Send Message':'Enviar Mensaje','Send':'Enviar',
    'Your Name':'Tu Nombre','Email Address':'Correo Electrónico',
    'Website (optional)':'Sitio Web (opcional)','Type of Business':'Tipo de Negocio',
    'Select your industry...':'Selecciona tu industria...',
    'Dental Office':'Consultorio Dental','Med Spa':'Spa Médico',
    'Law Firm':'Bufete de Abogados','Restaurant':'Restaurante',
    'Salon & Barbershop':'Salón y Barbería','Home Services':'Servicios del Hogar',
    'Other':'Otro','Phone':'Teléfono','Message':'Mensaje',
    'Type a message...':'Escribe un mensaje...',
    // Chat widget
    'FNDI AI Advisor':'Asesor IA de FNDI',
    'Ask me anything about our services':'Pregúntame sobre nuestros servicios',
    'Online now':'En línea ahora',
    "Hey! I'm the FNDI AI Advisor. What kind of business do you run? I'd love to show you how AI can help you grow.":"¡Hola! Soy el Asesor IA de FNDI. ¿Qué tipo de negocio tienes? Me encantaría mostrarte cómo la IA puede ayudarte a crecer.",
    'Your services':'Nuestros servicios',
    'I have a dental office':'Tengo un consultorio dental',
    'Book a call':'Agendar una llamada',
    // Common section headings
    'Frequently Asked Questions':'Preguntas Frecuentes',
    'Ready to Scale Your Business?':'¿Listo para Escalar tu Negocio?',
    "Let's Build Something for Your Business":"Construyamos Algo para Tu Negocio",
    'MOST POPULAR':'MÁS POPULAR','Most Popular':'Más Popular',
    // Stats
    'Calls Answered':'Llamadas Contestadas','Booking Rate':'Tasa de Reservas',
    'Revenue Recovered':'Ingresos Recuperados','Setup Time':'Tiempo de Configuración',
    'Always on':'Siempre activo',
    // Common phrases
    'No long-term contracts':'Sin contratos a largo plazo',
    'Priority support':'Soporte prioritario',
    '© 2026 FNDI. All rights reserved.':'© 2026 FNDI. Todos los derechos reservados.'
  };

  // Page-specific translations
  var pages = {
    '/': {
      'Example ad. Tap through it.':'Anuncio de ejemplo. Tócalo y avanza.',
      'Quote request':'Solicitud de cotización',
      '1 of 3':'1 de 3',
      '2 of 3':'2 de 3',
      '3 of 3':'3 de 3',
      'Your photo or video':'Tu foto o video',
      'Sent.':'Enviado.',
      'Your Business Here will reach out soon.':'Tu Negocio Aquí te contactará pronto.',
      'New lead':'Nuevo prospecto',
      'Just now':'Ahora mismo',
      'Example lead ad':'Anuncio de ejemplo',
      'Try it. This is what your customers see.':'Pruébalo. Esto es lo que ven tus clientes.',
      'Your Business Here':'Tu Negocio Aquí',
      'Sponsored':'Publicidad',
      'Your offer here':'Tu oferta aquí',
      'Leaky roof? We inspect it free this week.':'¿Goteras? Revisamos tu techo gratis esta semana.',
      'Free roof inspection':'Inspección de techo gratis',
      'Book this week':'Agenda esta semana',
      'Roof repair':'Reparación de techo',
      'New roof':'Techo nuevo',
      'Free inspection':'Inspección gratis',
      'Shown to people near you':'Se muestra a personas cerca de ti',
      'Get a free quote':'Recibe una cotización gratis',
      'Takes 30 seconds':'Toma 30 segundos',
      'Get Quote':'Cotizar',
      'What are you looking for?':'¿Qué estás buscando?',
      'A quote':'Una cotización',
      'To book an appointment':'Agendar una cita',
      'Just a question':'Solo una pregunta',
      'When do you need it?':'¿Para cuándo lo necesitas?',
      'As soon as possible':'Lo antes posible',
      'This week':'Esta semana',
      'This month':'Este mes',
      'Confirm your contact info':'Confirma tus datos de contacto',
      'Name':'Nombre',
      'Phone':'Teléfono',
      'Email':'Correo',
      'Filled in automatically from their profile.':'Se llena automáticamente desde su perfil.',
      'Submit':'Enviar',
      'New lead for Your Business Here':'Nuevo prospecto para Tu Negocio Aquí',
      'Wants':'Quiere',
      'When':'Cuándo',
      'This is what lands with you, ready for a call back.':'Esto es lo que te llega, listo para devolverle la llamada.',
      'Start over':'Empezar de nuevo',
      'More customers':'Más clientes',
      'for your business.':'para tu negocio.',
      'We run Facebook and Instagram ads, then back them with the website and follow-up that turn people nearby into paying customers.':'Manejamos anuncios en Facebook e Instagram, y los respaldamos con el sitio web y el seguimiento que convierten a la gente cercana en clientes que pagan.',
      'See what we do':'Mira lo que hacemos',
      'Example customer':'Cliente de ejemplo',
      'How someone new finds you':'Cómo te encuentra alguien nuevo',
      'Instagram ad':'Anuncio en Instagram',
      'Your website':'Tu sitio web',
      'Booking':'Reserva',
      'Reminder text':'Mensaje recordatorio',
      'Sees your offer while scrolling a few blocks away.':'Ve tu oferta mientras navega a unas cuadras de distancia.',
      'Taps through and likes what they see.':'Entra y le gusta lo que ve.',
      'Picks Thursday at 2:30 and confirms.':'Elige el jueves a las 2:30 y confirma.',
      'Gets a nudge the day before, and shows up.':'Recibe un recordatorio el día anterior, y llega.',
      'New customer.':'Cliente nuevo.',
      'Booked, reminded, and through your door.':'Agendado, recordado y en tu puerta.',
      'We plan, build, and manage the marketing that brings customers in.':'Planeamos, construimos y gestionamos el marketing que te trae clientes.',
      'Facebook and Instagram campaigns that put your business in front of people nearby who are ready to book.':'Campañas en Facebook e Instagram que ponen tu negocio frente a gente cercana lista para agendar.',
      'Fast, modern websites built to turn visitors into paying customers.':'Sitios web rápidos y modernos hechos para convertir visitantes en clientes que pagan.',
      'Content, posting, and engagement that keep your business in front of local customers.':'Contenido, publicaciones e interacción que mantienen tu negocio frente a los clientes locales.',
      'Track every lead and follow up on time, so fewer customers slip away.':'Registra cada prospecto y da seguimiento a tiempo, para que se te escapen menos clientes.',
      'Automatic texts, emails, and reminders that keep leads warm and calendars full.':'Mensajes, correos y recordatorios automáticos que mantienen a los prospectos interesados y la agenda llena.',
      'Tell us about your business and where you want more customers.':'Cuéntanos sobre tu negocio y dónde quieres más clientes.',
      'We set up your ads, website, and follow-up. Most projects launch within 7 to 14 business days.':'Configuramos tus anuncios, sitio web y seguimiento. La mayoría de los proyectos salen en 7 a 14 días hábiles.',
      'Go live, start getting leads, and turn them into paying customers.':'Sal en vivo, empieza a recibir prospectos y conviértelos en clientes que pagan.',
      "We're founders doing real work for real businesses. Every plan is custom, every client gets our full attention, and we don't stop until it works.":'Somos fundadores haciendo trabajo real para negocios reales. Cada plan es a medida, cada cliente recibe toda nuestra atención y no paramos hasta que funcione.',
      'Fast Follow-Up':'Seguimiento Rápido',
      "Every lead gets a quick reply, so interest doesn't go cold.":'Cada prospecto recibe una respuesta rápida, para que el interés no se enfríe.',
      'Nothing off-the-shelf. Every campaign and website is built for your business and your area.':'Nada genérico. Cada campaña y sitio web se construye para tu negocio y tu zona.',
      'More new patient bookings and fewer empty chairs.':'Más citas de pacientes nuevos y menos sillas vacías.',
      'More consultations booked from Instagram and search.':'Más consultas agendadas desde Instagram y búsquedas.',
      'More qualified inquiries and booked consultations.':'Más consultas calificadas y citas agendadas.',
      'More reservations, more orders, more regulars.':'Más reservaciones, más pedidos, más clientes frecuentes.',
      'A fuller calendar and clients who rebook.':'Una agenda más llena y clientes que regresan.',
      'More quote requests and booked jobs.':'Más solicitudes de cotización y trabajos agendados.',
      'Find Out How to Get More Customers':'Descubre Cómo Conseguir Más Clientes',
      "Get a free analysis of your business. We'll show you exactly where you're losing customers and how to win them.":'Recibe un análisis gratis de tu negocio. Te mostramos exactamente dónde estás perdiendo clientes y cómo ganarlos.',
      'What does FNDI do?':'¿Qué hace FNDI?',
      'We help local businesses get more customers. That means ads on Facebook and Instagram, a website that converts, social media, and follow-up that turns leads into bookings.':'Ayudamos a los negocios locales a conseguir más clientes. Eso significa anuncios en Facebook e Instagram, un sitio web que convierte, redes sociales y seguimiento que convierte prospectos en citas.',
      'How is FNDI different from other agencies?':'¿En qué se diferencia FNDI de otras agencias?',
      'You work directly with the founders, Stefano and Douglas. We build a custom plan for your specific business, not templates. Every dollar you spend is meant to grow your business, and we treat your success like our own.':'Trabajas directamente con los fundadores, Stefano y Douglas. Construimos un plan a medida para tu negocio, no plantillas. Cada dólar que inviertes es para hacer crecer tu negocio, y tratamos tu éxito como el nuestro.',
      'Most projects launch within 7-14 business days. We give you a specific timeline after our initial call.':'La mayoría de los proyectos salen en 7 a 14 días hábiles. Te damos un plazo específico después de la primera llamada.',
      'More customers for local businesses.':'Más clientes para negocios locales.',
      'Every call answered.':'Cada llamada contestada.',
      'Every lead followed up.':'Cada prospecto atendido.',
      'We build AI voice agents, chatbots, and automations for local businesses, so the phone gets picked up and the calendar fills, day or night.':'Construimos agentes de voz IA, chatbots y automatizaciones para negocios locales, para que el teléfono siempre se conteste y la agenda se llene, de día o de noche.',
      'See what we build':'Mira lo que construimos',
      'Example call':'Llamada de ejemplo',
      'A dental office, after closing':'Un consultorio dental, después de cerrar',
      'Caller':'Cliente',
      'AI agent':'Agente IA',
      'Hi, do you have anything open for a cleaning this week?':'Hola, ¿tienen algún espacio para una limpieza esta semana?',
      'We do. I have Thursday at 2:30 or Friday at 9:00. Which works better?':'Sí. Tengo el jueves a las 2:30 o el viernes a las 9:00. ¿Cuál le queda mejor?',
      'Thursday works.':'El jueves está bien.',
      "You're booked for Thursday at 2:30. I'll text you a confirmation now.":'Queda agendado para el jueves a las 2:30. Le envío la confirmación por mensaje ahora.',
      'Booked.':'Agendado.',
      'Added to the calendar, confirmation sent.':'Agregado al calendario, confirmación enviada.',
      'An AI receptionist that answers every call in natural conversation. It books appointments, answers questions, qualifies leads, and transfers urgent calls to your team.':'Una recepcionista IA que contesta cada llamada con conversación natural. Agenda citas, responde preguntas, califica prospectos y transfiere llamadas urgentes a tu equipo.',
      'Answers 24/7':'Contesta 24/7',
      'Live in as little as 48 hours':'En vivo en tan solo 48 horas',
      'Learn more':'Más información',
      'We design and build your custom AI tools. Voice agents and chatbots can go live in as little as 48 hours.':'Diseñamos y construimos tus herramientas de IA a medida. Los agentes de voz y chatbots pueden estar en vivo en tan solo 48 horas.',
      'Go live, start capturing leads, and stop losing customers to voicemail.':'Sal en vivo, empieza a captar prospectos y deja de perder clientes en el buzón de voz.',
      'Learn About Us':'Conócenos',
      'Your AI tools never sleep. They answer calls, capture leads, and book appointments around the clock.':'Tus herramientas de IA nunca duermen. Contestan llamadas, captan prospectos y agendan citas las 24 horas.',
      'Work directly with the founding team. No runaround, no outsourcing.':'Trabaja directamente con el equipo fundador. Sin rodeos, sin subcontratar.',
      "Get a free analysis of your business. We'll show you exactly where AI can save you time and make you money.":'Recibe un análisis gratis de tu negocio. Te mostramos exactamente dónde la IA puede ahorrarte tiempo y generarte dinero.',
      'View all FAQs':'Ver todas las preguntas',
      'AI-POWERED GROWTH':'CRECIMIENTO IMPULSADO POR IA',
      'Grow Your Business With Us':'Haz Crecer Tu Negocio Con Nosotros',
      'We build AI voice agents, chatbots, and automation tools that help small businesses answer every call, book more appointments, and grow revenue — 24/7.':'Construimos agentes de voz IA, chatbots y herramientas de automatización que ayudan a los pequeños negocios a contestar cada llamada, agendar más citas y aumentar sus ingresos — 24/7.',
      'Our Solutions':'Nuestras Soluciones',
      'Everything Your Business Needs to Grow':'Todo lo que Tu Negocio Necesita para Crecer',
      'We design, build, and manage AI-powered tools tailored to your business.':'Diseñamos, construimos y gestionamos herramientas de IA adaptadas a tu negocio.',
      'Your AI receptionist answers every call 24/7 with natural conversation. It books appointments, answers FAQs, qualifies leads, and transfers urgent calls — so you never miss a customer again.':'Tu recepcionista IA contesta cada llamada 24/7 con conversación natural. Agenda citas, responde preguntas, califica prospectos y transfiere llamadas urgentes — para que nunca pierdas un cliente.',
      'Sounds human. Works 24/7.':'Suena humano. Funciona 24/7.',
      'Handles calls, books appointments, qualifies leads':'Maneja llamadas, agenda citas, califica prospectos',
      'AI chat that engages visitors, captures leads, and books meetings automatically.':'Chat IA que interactúa con visitantes, captura prospectos y agenda reuniones automáticamente.',
      'Fast, modern websites built to convert visitors into paying customers.':'Sitios web rápidos y modernos diseñados para convertir visitantes en clientes.',
      'Custom workflows that eliminate manual tasks and save you hours every week.':'Flujos de trabajo personalizados que eliminan tareas manuales y te ahorran horas cada semana.',
      'Track every lead, automate follow-ups, and close more deals with smart CRM.':'Rastrea cada prospecto, automatiza seguimientos y cierra más tratos con un CRM inteligente.',
      'Content strategy, posting, and engagement management across all platforms.':'Estrategia de contenido, publicaciones y gestión de interacciones en todas las plataformas.',
      'High-converting Facebook & Instagram campaigns that bring real customers.':'Campañas de Facebook e Instagram de alta conversión que traen clientes reales.',
      'Get Started in Three Simple Steps':'Comienza en Tres Simples Pasos',
      'Tell us about your business and where you need help.':'Cuéntanos sobre tu negocio y dónde necesitas ayuda.',
      'We Build It':'Lo Construimos',
      'Our team designs and builds your custom AI tools in 48 hours.':'Nuestro equipo diseña y construye tus herramientas de IA personalizadas en 48 horas.',
      'You Grow':'Tú Creces',
      'Go live, start capturing leads, and watch your revenue grow.':'Lánzate, empieza a capturar prospectos y mira cómo crecen tus ingresos.',
      'Why FNDI':'Por Qué FNDI',
      "We're not a big agency that treats you like a number.":"No somos una agencia grande que te trata como un número.",
      "We're founders building real tools for real businesses. Every solution is custom, every client gets our full attention, and we don't stop until it works.":"Somos fundadores construyendo herramientas reales para negocios reales. Cada solución es personalizada, cada cliente recibe toda nuestra atención, y no paramos hasta que funcione.",
      '24/7 Coverage':'Cobertura 24/7',
      'Your AI tools never sleep — answering calls, capturing leads, and booking appointments around the clock.':'Tus herramientas de IA nunca duermen — contestando llamadas, capturando prospectos y agendando citas las 24 horas.',
      'Personal Attention':'Atención Personal',
      'Work directly with the founding team. No runaround, no outsourcing — just dedicated support.':'Trabaja directamente con el equipo fundador. Sin vueltas, sin subcontratación — solo soporte dedicado.',
      '100% Custom Built':'100% Hecho a la Medida',
      'Nothing off-the-shelf. Every solution is designed specifically for your business and industry.':'Nada genérico. Cada solución está diseñada específicamente para tu negocio e industria.',
      'Who We Help':'A Quién Ayudamos',
      'Built for Businesses Like Yours':'Hecho para Negocios Como el Tuyo',
      'Automated appointment booking and patient engagement for dental practices.':'Agendamiento automatizado de citas y comunicación con pacientes para consultorios dentales.',
      '24/7 booking, consultation scheduling, and customer service automation.':'Reservas 24/7, programación de consultas y automatización de servicio al cliente.',
      'Client intake automation, consultation booking, and secure communications.':'Automatización de recepción de clientes, agendamiento de consultas y comunicaciones seguras.',
      'Order management, reservation booking, and customer support automation.':'Gestión de pedidos, reservas y automatización de atención al cliente.',
      'Appointment scheduling, customer retention, and service bookings.':'Programación de citas, retención de clientes y reservas de servicios.',
      'Lead capture, service scheduling, and customer communication automation.':'Captura de prospectos, programación de servicios y automatización de comunicación con clientes.',
      'Find Out How AI Can Grow Your Business':'Descubre Cómo la IA Puede Hacer Crecer Tu Negocio',
      "Get a free analysis of your business — we'll show you exactly where AI can save you time and make you money.":"Obtén un análisis gratuito de tu negocio — te mostraremos exactamente dónde la IA puede ahorrarte tiempo y generarte dinero.",
      'Quick answers to the questions we hear most.':'Respuestas rápidas a las preguntas que más escuchamos.',
      'What is an AI voice agent?':'¿Qué es un agente de voz IA?',
      'An AI voice agent answers your business phone calls naturally, 24/7. It understands speech, answers questions, books appointments, qualifies leads, and transfers urgent calls to your team. No more missed calls or voicemail.':'Un agente de voz IA contesta las llamadas de tu negocio de forma natural, 24/7. Entiende el habla, responde preguntas, agenda citas, califica prospectos y transfiere llamadas urgentes a tu equipo. No más llamadas perdidas ni buzón de voz.',
      'How is FNDI different from other AI companies?':'¿En qué se diferencia FNDI de otras empresas de IA?',
      'You work directly with the founders, Stefano and Douglas. We build custom solutions for your specific business, not templates. Every dollar you spend is meant to grow your business, and we treat your success like our own.':'Trabajas directamente con los fundadores, Stefano y Douglas. Construimos soluciones personalizadas para tu negocio específico, no plantillas. Cada dólar que inviertes está destinado a hacer crecer tu negocio, y tratamos tu éxito como el nuestro.',
      'How long does setup take?':'¿Cuánto tiempo toma la configuración?',
      'Most projects launch within 7-14 business days. Voice agents and chatbots can go live in as little as 48 hours. We give you a specific timeline after our initial call.':'La mayoría de los proyectos se lanzan en 7-14 días hábiles. Los agentes de voz y chatbots pueden estar activos en tan solo 48 horas. Te damos un cronograma específico después de nuestra llamada inicial.',
      'Will it work with my existing systems?':'¿Funcionará con mis sistemas actuales?',
      'Yes. We integrate with most popular booking systems (Acuity, Calendly), CRMs (Salesforce, Pipedrive), and business tools. If we don\'t support something yet, we can build a custom integration.':'Sí. Nos integramos con los sistemas de reservas más populares (Acuity, Calendly), CRMs (Salesforce, Pipedrive) y herramientas de negocio. Si aún no soportamos algo, podemos construir una integración personalizada.',
      'Can I upgrade or downgrade anytime?':'¿Puedo cambiar de plan en cualquier momento?',
      'Absolutely. Change plans anytime with prorated billing. No penalties, no hassles, no long-term contracts required.':'Por supuesto. Cambia de plan cuando quieras con facturación prorrateada. Sin penalidades, sin complicaciones, sin contratos a largo plazo.'
    },
    '/pricing/': {
      'Custom Pricing for Your Business':'Precios Personalizados para Tu Negocio',
      "Every business is different. We build a package around exactly what you need — no cookie-cutter plans, no paying for what you don't use.":"Cada negocio es diferente. Construimos un paquete alrededor de exactamente lo que necesitas — sin planes genéricos, sin pagar por lo que no usas.",
      'Three steps to a solution built around your business.':'Tres pasos hacia una solución construida para tu negocio.',
      "Tell us about your business, your goals, and what's not working. We'll listen and ask the right questions.":"Cuéntanos sobre tu negocio, tus metas y lo que no está funcionando. Escucharemos y haremos las preguntas correctas.",
      'Get Your Plan':'Recibe Tu Plan',
      "We'll put together a custom proposal with only the services you need — and a price that makes sense for your budget.":"Armaremos una propuesta personalizada con solo los servicios que necesitas — y un precio que tenga sentido para tu presupuesto.",
      'We Build & Launch':'Construimos y Lanzamos',
      "Our team gets to work. Most projects go live within 7–14 days. You get a dedicated point of contact the entire way.":"Nuestro equipo se pone a trabajar. La mayoría de los proyectos se lanzan en 7–14 días. Tienes un punto de contacto dedicado durante todo el proceso.",
      'What We Can Build for You':'Lo Que Podemos Construir para Ti',
      "Pick what you need. Leave what you don't. We'll price it based on your scope.":"Elige lo que necesitas. Deja lo que no. Lo cotizaremos según tu alcance.",
      'AI Automations':'Automatizaciones IA',
      'Contact capture, cart recovery, appointment follow-ups, missed-call text back, and custom workflows tailored to your operations.':'Captura de contactos, recuperación de carritos, seguimiento de citas, respuesta automática a llamadas perdidas y flujos de trabajo personalizados para tus operaciones.',
      "AI-powered phone receptionist that answers calls, books appointments, and handles inquiries 24/7 — so you never miss a lead.":"Recepcionista telefónico con IA que contesta llamadas, agenda citas y maneja consultas 24/7 — para que nunca pierdas un prospecto.",
      "Smart chat widgets that capture leads, answer FAQs, and push contacts straight to your CRM — live on your site in 48 hours.":"Widgets de chat inteligentes que capturan prospectos, responden preguntas y envían contactos directo a tu CRM — activos en tu sitio en 48 horas.",
      'CRM & Dashboard':'CRM y Dashboard',
      'Your own FNDI dashboard to track leads, conversations, campaigns, and performance — everything in one place.':'Tu propio dashboard FNDI para rastrear prospectos, conversaciones, campañas y rendimiento — todo en un solo lugar.',
      'Ads Management':'Gestión de Anuncios',
      'Meta Ads, Google Ads, and paid campaigns — fully managed. We handle the strategy, creative, and optimization.':'Meta Ads, Google Ads y campañas pagadas — completamente gestionadas. Nos encargamos de la estrategia, creativos y optimización.',
      'Fast, modern websites and landing pages built to convert. SEO-optimized and mobile-ready out of the box.':'Sitios web y landing pages rápidos y modernos diseñados para convertir. Optimizados para SEO y listos para móvil.',
      'SEO & Content':'SEO y Contenido',
      'On-page optimization, keyword strategy, and monthly SEO articles to help you rank higher and get found organically.':'Optimización on-page, estrategia de palabras clave y artículos SEO mensuales para ayudarte a posicionarte mejor y ser encontrado orgánicamente.',
      'Email & SMS Campaigns':'Campañas de Email y SMS',
      'Targeted email and SMS campaigns, drip sequences, review requests, and re-engagement flows that keep your pipeline warm.':'Campañas de email y SMS dirigidas, secuencias de goteo, solicitudes de reseñas y flujos de re-engagement que mantienen tu pipeline activo.',
      'Content strategy, post creation, and community management across Instagram, LinkedIn, Facebook, and more.':'Estrategia de contenido, creación de publicaciones y gestión de comunidad en Instagram, LinkedIn, Facebook y más.',
      'Why Custom Pricing?':'¿Por Qué Precios Personalizados?',
      'You only pay for what you need':'Solo pagas por lo que necesitas',
      "No bloated packages with features you'll never use. Every dollar goes toward what actually moves your business forward.":"Sin paquetes inflados con funciones que nunca usarás. Cada dólar va hacia lo que realmente mueve tu negocio.",
      'Scales with you':'Escala contigo',
      "Start with the essentials, add more as you grow. Your plan evolves with your business — not the other way around.":"Comienza con lo esencial, agrega más mientras creces. Tu plan evoluciona con tu negocio — no al revés.",
      "We work on a month-to-month basis. Stay because it's working, not because you're locked in.":"Trabajamos mes a mes. Quédate porque funciona, no porque estés atado.",
      'Built for your industry':'Hecho para tu industria',
      "A dental office and a restaurant have very different needs. We tailor solutions to how your specific business operates.":"Un consultorio dental y un restaurante tienen necesidades muy diferentes. Adaptamos soluciones a cómo opera tu negocio específico.",
      'How much does it cost?':'¿Cuánto cuesta?',
      "It depends on what you need. After our discovery call, we'll put together a custom proposal with clear pricing — no surprises, no hidden fees. Most clients invest between $300–$1,500/month depending on scope.":"Depende de lo que necesites. Después de nuestra llamada, armaremos una propuesta personalizada con precios claros — sin sorpresas, sin cargos ocultos. La mayoría de los clientes invierten entre $300–$1,500/mes según el alcance.",
      'Is there a long-term contract?':'¿Hay contrato a largo plazo?',
      "No. We operate month-to-month. You can adjust your services or cancel anytime with 30 days' notice.":"No. Operamos mes a mes. Puedes ajustar tus servicios o cancelar en cualquier momento con 30 días de aviso.",
      "Most projects launch within 7–14 business days. Voice agents and chatbots can be live in as little as 48 hours. Websites and custom integrations take a bit longer.":"La mayoría de los proyectos se lanzan en 7–14 días hábiles. Los agentes de voz y chatbots pueden estar activos en tan solo 48 horas. Los sitios web e integraciones personalizadas toman un poco más.",
      'Will it integrate with my existing systems?':'¿Se integrará con mis sistemas actuales?',
      "Yes. We integrate with most popular booking systems, CRMs, and business tools. If we don't support something yet, we'll build the integration for you.":"Sí. Nos integramos con los sistemas de reservas, CRMs y herramientas de negocio más populares. Si aún no soportamos algo, construiremos la integración para ti.",
      'What if I only need one or two services?':'¿Qué pasa si solo necesito uno o dos servicios?',
      "That's totally fine. You're not locked into a full package. Need just a chatbot and some automations? We'll price it accordingly. Need everything? We'll build that too.":"Está perfecto. No estás atado a un paquete completo. ¿Necesitas solo un chatbot y algunas automatizaciones? Lo cotizamos según eso. ¿Necesitas todo? También lo construimos.",
      'What happens on the discovery call?':'¿Qué pasa en la llamada de descubrimiento?',
      "It's a quick 15–20 minute conversation. We'll learn about your business, identify the biggest opportunities, and explain how we can help. No pressure, no sales pitch — just a real conversation.":"Es una conversación rápida de 15–20 minutos. Conoceremos tu negocio, identificaremos las mayores oportunidades y explicaremos cómo podemos ayudar. Sin presión, sin discurso de ventas — solo una conversación real.",
      "Book a free call and we'll put together a custom plan that fits your goals and your budget.":"Agenda una llamada gratuita y armaremos un plan personalizado que se ajuste a tus metas y tu presupuesto."
    },
    '/about/': {
      'Our Story':'Nuestra Historia',
      'Meet the Founders':'Conoce a los Fundadores',
      'Our Team':'Nuestro Equipo',
      'Co-Founder':'Cofundador',
      'Head of Sales':'Director de Ventas',
      'Get in Touch':'Contáctanos',
      'Based in Miami, Florida':'Con sede en Miami, Florida',
      'Ready to work with us?':'¿Listo para trabajar con nosotros?'
    },
    '/book/': {
      'Book a Call':'Agenda una Llamada',
      'Schedule a free consultation':'Agenda una consulta gratuita',
      "Let's talk about your business":"Hablemos sobre tu negocio",
      'Pick a time that works for you':'Elige un horario que te funcione'
    },
    '/contact/': {
      'Get in Touch':'Contáctanos',
      "We'd love to hear from you":"Nos encantaría saber de ti",
      'First Name':'Nombre','Last Name':'Apellido',
      'How can we help?':'¿Cómo podemos ayudarte?',
      'Phone Number':'Número de Teléfono'
    },
    '/faq/': {
      'All Your Questions, Answered':'Todas Tus Preguntas, Respondidas'
    },
    '/how-it-works/': {
      'See How It Works':'Mira Cómo Funciona',
      'From first call to going live':'Desde la primera llamada hasta el lanzamiento',
      'Step':'Paso','Discovery Call':'Llamada de Descubrimiento',
      'Custom Build':'Construcción Personalizada','Launch':'Lanzamiento',
      'Ongoing Support':'Soporte Continuo'
    },
    '/services/voice-agents/':{
      'AI Voice Agents':'Agentes de Voz IA',
      'Never miss a call again':'Nunca pierdas una llamada otra vez',
      'Your AI receptionist answers every call':'Tu recepcionista IA contesta cada llamada',
      'How It Works':'Cómo Funciona',
      'Features':'Características','Benefits':'Beneficios',
      'Natural Conversation':'Conversación Natural',
      'Appointment Booking':'Agendamiento de Citas',
      'Lead Qualification':'Calificación de Prospectos',
      'Call Transfer':'Transferencia de Llamadas',
      'Works 24/7':'Funciona 24/7',
      'Speaks multiple languages':'Habla múltiples idiomas'
    },
    '/services/chatbots/':{
      'Website Chatbots':'Chatbots para Sitios Web',
      'Convert visitors into customers':'Convierte visitantes en clientes',
      'Capture leads while you sleep':'Captura prospectos mientras duermes',
      'Features':'Características','Benefits':'Beneficios'
    },
    '/services/websites/':{
      'Web Development':'Desarrollo Web',
      'Websites that convert':'Sitios web que convierten',
      'Built for speed and conversions':'Construidos para velocidad y conversiones',
      'Features':'Características'
    },
    '/services/automation/':{
      'Business Automation':'Automatización de Negocios',
      'Save hours every week':'Ahorra horas cada semana',
      'Features':'Características'
    },
    '/services/crm/':{
      'CRM Solutions':'Soluciones CRM',
      'Track every lead':'Rastrea cada prospecto',
      'Features':'Características'
    },
    '/services/social-media/':{
      'Social Media Management':'Gestión de Redes Sociales',
      'Grow your presence':'Haz crecer tu presencia',
      'Features':'Características'
    },
    '/services/meta-ads/':{
      'Meta Ads Management':'Gestión de Meta Ads',
      'Get more customers':'Consigue más clientes',
      'Features':'Características'
    },
    '/industries/dental/':{
      'AI for Dental Offices':'IA para Consultorios Dentales',
      'Never miss a patient call again':'Nunca pierdas la llamada de un paciente otra vez'
    },
    '/industries/med-spas/':{
      'AI for Med Spas':'IA para Spas Médicos',
      'Book more consultations':'Agenda más consultas'
    },
    '/industries/law-firms/':{
      'AI for Law Firms':'IA para Bufetes de Abogados',
      'Never miss a potential client':'Nunca pierdas un cliente potencial'
    },
    '/industries/restaurants/':{
      'AI for Restaurants':'IA para Restaurantes',
      'Handle reservations and orders':'Gestiona reservas y pedidos'
    },
    '/industries/salons/':{
      'AI for Salons & Barbershops':'IA para Salones y Barberías',
      'Fill your appointment book':'Llena tu agenda de citas'
    },
    '/industries/home-services/':{
      'AI for Home Services':'IA para Servicios del Hogar',
      'Capture every lead':'Captura cada prospecto'
    },
    '/portfolio/':{
      'Our Work':'Nuestro Trabajo','View Project':'Ver Proyecto',
      'See what we\'ve built':'Mira lo que hemos construido'
    },
    '/careers/':{
      'Careers':'Carreras','Join Our Team':'Únete a Nuestro Equipo',
      'Open Positions':'Posiciones Abiertas','Apply Now':'Aplicar Ahora',
      "We're building the future of AI for small businesses.":"Estamos construyendo el futuro de la IA para pequeños negocios."
    },
    '/case-studies/':{
      'Case Studies':'Casos de Éxito','Real Results':'Resultados Reales',
      'See how we help businesses grow':'Mira cómo ayudamos a crecer a los negocios'
    },
    '/compare/':{
      'Compare':'Comparar','See how FNDI stacks up':'Mira cómo se compara FNDI'
    },
    '/testimonials/':{
      'Testimonials':'Testimonios',
      'What Our Clients Say':'Lo Que Dicen Nuestros Clientes'
    },
    '/partners/':{
      'Partners':'Socios','Become a Partner':'Conviértete en Socio'
    },
    '/resources/':{
      'Resources':'Recursos',
      'Guides, tools, and insights':'Guías, herramientas e información'
    },
    '/onboarding/':{
      'Client Onboarding':'Incorporación de Clientes',
      'Welcome aboard':'Bienvenido a bordo'
    },
    '/assessment/':{
      'Free Business Assessment':'Evaluación Empresarial Gratuita',
      'Find out where AI can help':'Descubre dónde la IA puede ayudar'
    },
    '/thank-you/':{
      'Thank You!':'¡Gracias!',
      "We'll be in touch soon":"Estaremos en contacto pronto"
    },
    '/demos/':{
      'Live Demos':'Demos en Vivo',
      'See our tools in action':'Mira nuestras herramientas en acción'
    },
    '/terms/':{
      'Terms of Service':'Términos de Servicio'
    },
    '/privacy/':{
      'Privacy Policy':'Política de Privacidad'
    },
    '/404/':{
      'Page Not Found':'Página No Encontrada',
      'Go Home':'Ir al Inicio'
    },
    '/blog/':{
      'Blog':'Blog','Read More':'Leer Más',
      'Latest insights and updates':'Últimas novedades y actualizaciones'
    },
    '/dashboard/':{
      'Client Dashboard':'Panel de Cliente','Login':'Iniciar Sesión',
      'Email':'Correo','Password':'Contraseña'
    },
    '/tools/roi-calculator/':{
      'ROI Calculator':'Calculadora de ROI',
      'Calculate your return on investment':'Calcula tu retorno de inversión'
    }
  };

  // i18n:generated:start
  var generated = {
 "/404/": {
  "Page Not Found": "Página no encontrada",
  "Sorry, the page you are looking for doesn't exist. It may have been moved or deleted.": "Lo sentimos, la página que buscas no existe. Puede que se haya movido o eliminado.",
  "Back to Home": "Volver al inicio",
  "Contact Us": "Contáctanos"
 },
 "/about/": {
  "About FNDI": "Sobre FNDI",
  "We are a small Miami agency that helps local businesses get more customers. Most of that work is Facebook and Instagram advertising.": "Somos una agencia pequeña de Miami que ayuda a negocios locales a conseguir más clientes. La mayor parte de ese trabajo es publicidad en Facebook e Instagram.",
  "Book a Free Call": "Agenda una llamada gratis",
  "See How It Works": "Mira cómo funciona",
  "Our Story": "Nuestra historia",
  "Stefano Fernandini and Douglas O'Keefe met in middle school in Miami. They always knew they would build something together.": "Stefano Fernandini y Douglas O'Keefe se conocieron en la secundaria en Miami. Siempre supieron que iban a construir algo juntos.",
  "They kept seeing good local businesses struggle to bring in new customers, while bigger companies had whole marketing teams and budgets to match. So they started FNDI to do that work for the businesses around them.": "Veían una y otra vez a buenos negocios locales batallar para atraer clientes nuevos, mientras las empresas grandes tenían equipos completos de marketing y presupuestos a la altura. Por eso crearon FNDI, para hacer ese trabajo por los negocios de su zona.",
  "FNDI stands for Future Native Digital Intelligence.": "FNDI significa Future Native Digital Intelligence.",
  "Where it started": "Cómo empezó",
  "Two friends from Miami who saw local owners doing great work and not getting found.": "Dos amigos de Miami que vieron a dueños de negocios locales hacer un gran trabajo sin que nadie los encontrara.",
  "March 2026": "Marzo de 2026",
  "Stefano and Douglas launch FNDI.": "Stefano y Douglas lanzan FNDI.",
  "Today": "Hoy",
  "We run Meta ads for local businesses and build the websites, CRM and follow-up that turn those ads into customers.": "Manejamos anuncios de Meta para negocios locales y creamos los sitios web, el CRM y el seguimiento que convierten esos anuncios en clientes.",
  "The Team": "El equipo",
  "You work with the people who do the work.": "Trabajas con las personas que hacen el trabajo.",
  "Stefano Fernandini": "Stefano Fernandini",
  "Co-Founder, Vision and Strategy": "Cofundador, visión y estrategia",
  "Born and raised in Miami, and a doer by nature. Stefano leads vision, strategy and client relationships, working directly with each business to plan campaigns that bring in customers.": "Nacido y criado en Miami, y una persona de acción por naturaleza. Stefano lidera la visión, la estrategia y la relación con los clientes, y trabaja directamente con cada negocio para planear campañas que traigan clientes.",
  "Douglas O'Keefe": "Douglas O'Keefe",
  "Co-Founder, Systems and Engineering": "Cofundador, sistemas e ingeniería",
  "A mechanical engineer by training. Douglas builds the systems, tracking and websites behind the campaigns, with an engineer's approach: systematic and reliable.": "Ingeniero mecánico de formación. Douglas construye los sistemas, la medición y los sitios web que están detrás de las campañas, con el enfoque de un ingeniero: sistemático y confiable.",
  "Pablo Lopez Athie": "Pablo Lopez Athie",
  "Head of Sales": "Director de ventas",
  "Pablo leads outreach and sales. He owns the full sales cycle from first contact through onboarding, and makes sure the plan is built around each client's goals.": "Pablo lidera la prospección y las ventas. Lleva todo el ciclo de venta, desde el primer contacto hasta la incorporación, y se asegura de que el plan se arme alrededor de las metas de cada cliente.",
  "Our Values": "Nuestros valores",
  "Results First": "Resultados primero",
  "We don't build things that look good but don't work. We measure success by one thing: did your business grow?": "No hacemos cosas que se ven bien pero no funcionan. Medimos el éxito con una sola pregunta: ¿creció tu negocio?",
  "Move Fast": "Rapidez",
  "We don't take months to deliver. We build quickly, test with real data, and adjust based on what the numbers say.": "No tardamos meses en entregar. Construimos rápido, probamos con datos reales y ajustamos según lo que digan los números.",
  "Direct Access": "Acceso directo",
  "You work with the founders. We put our names on everything we build.": "Trabajas con los fundadores. Ponemos nuestro nombre en todo lo que hacemos.",
  "Long-term Partners": "Socios a largo plazo",
  "We are not here for one project. We want to keep working with you month after month.": "No estamos aquí por un solo proyecto. Queremos seguir trabajando contigo mes tras mes.",
  "Ready to Build Together?": "¿Listo para construir juntos?",
  "Book a free call with our team. No pitch decks and no pressure, just a real conversation about getting your business more customers.": "Agenda una llamada gratis con nuestro equipo. Sin presentaciones ni presión, solo una conversación real sobre cómo conseguir más clientes para tu negocio."
 },
 "/book/": {
  "Book a free 30 minute strategy call": "Agenda una llamada de estrategia gratis de 30 minutos",
  "We talk about your business and how to get more customers through your door. No cost and no obligation.": "Hablamos de tu negocio y de cómo hacer que lleguen más clientes. Sin costo y sin compromiso.",
  "Request your call": "Solicita tu llamada",
  "Fill out the form and pick a date that works for you. We will reply by email to confirm a time.": "Llena el formulario y elige una fecha que te funcione. Te responderemos por correo para confirmar la hora.",
  "Your Name": "Tu nombre",
  "Email Address": "Correo electrónico",
  "Phone Number": "Teléfono",
  "Company Name": "Nombre del negocio",
  "Preferred Date": "Fecha preferida",
  "Quick Note (optional)": "Nota breve (opcional)",
  "Request My Call": "Solicitar mi llamada",
  "We ask about your business, your customers, and your area": "Te preguntamos por tu negocio, tus clientes y tu zona",
  "We look at how people find you today and where they drop off": "Vemos cómo te encuentra la gente hoy y en qué punto se pierde",
  "We explain how Meta ads could bring in more customers for you": "Te explicamos cómo los anuncios en Meta podrían traerte más clientes",
  "We cover which supporting pieces you need, like a website or follow-up": "Vemos qué piezas de apoyo necesitas, como un sitio web o seguimiento",
  "You get a custom plan and a price afterward, with no pressure to buy": "Después recibes un plan a la medida y un precio, sin presión para comprar",
  "What happens on the call": "Qué pasa en la llamada",
  "It is a conversation with the founders, not a sales script. You leave with a clear idea of what would help, whether or not you work with us.": "Es una conversación con los fundadores, no un guion de ventas. Te vas con una idea clara de qué te ayudaría, trabajes o no con nosotros.",
  "After the call": "Después de la llamada",
  "You get a plan": "Recibes un plan",
  "A proposal with only the services you need and a clear price.": "Una propuesta solo con los servicios que necesitas y un precio claro.",
  "You decide": "Tú decides",
  "Take your time. There is no obligation to move forward.": "Tómate tu tiempo. No tienes ninguna obligación de seguir adelante.",
  "We build and launch": "Lo armamos y lo lanzamos",
  "If you say yes, most projects launch within 7 to 14 business days.": "Si dices que sí, la mayoría de los proyectos se lanzan en un plazo de 7 a 14 días hábiles.",
  "See the full process": "Mira el proceso completo"
 },
 "/careers/": {
  "Work With FNDI": "Trabaja con FNDI",
  "We are a small, founder-led agency in Miami that helps local businesses get more customers. The team is small, so your work shows up directly in client results.": "Somos una agencia pequeña en Miami, dirigida por sus fundadores, que ayuda a negocios locales a conseguir más clientes. El equipo es pequeño, así que tu trabajo se nota directamente en los resultados de los clientes.",
  "Email Us": "Escríbenos",
  "Meet the Team": "Conoce al equipo",
  "Who We Want to Hear From": "A quién queremos conocer",
  "We don't run a formal hiring process yet. These are the people we would like to talk to.": "Todavía no tenemos un proceso formal de contratación. Estas son las personas con las que nos gustaría hablar.",
  "Sales Representative": "Representante de ventas",
  "Build relationships with local business owners and close deals. You would talk with owners across several industries and help them see how we can bring them more customers.": "Construye relaciones con dueños de negocios locales y cierra ventas. Hablarías con dueños de varias industrias y los ayudarías a ver cómo podemos traerles más clientes.",
  "Ads and Creative": "Anuncios y creatividad",
  "We have no formal openings here right now. If you are good at ad creative, media buying or web design and want to work with local businesses, we still want to hear from you.": "Por ahora no tenemos vacantes formales en esta área. Si eres bueno en creatividad para anuncios, compra de medios o diseño web y quieres trabajar con negocios locales, igual queremos saber de ti.",
  "How to Reach Us": "Cómo contactarnos",
  "Send an email to support@fndi.tech. One of the founders reads every message.": "Envía un correo a support@fndi.tech. Uno de los fundadores lee cada mensaje.",
  "Email support@fndi.tech": "Escribe a support@fndi.tech",
  "A short note about who you are and what you do": "Una nota breve sobre quién eres y qué haces",
  "Examples of your work, or results you have gotten": "Ejemplos de tu trabajo o resultados que has logrado",
  "The kind of role you are looking for": "El tipo de puesto que buscas"
 },
 "/contact/": {
  "Get in Touch": "Ponte en contacto",
  "Have a question about FNDI, or want to talk about getting your business more customers? We would like to hear from you.": "¿Tienes una pregunta sobre FNDI o quieres hablar de cómo conseguir más clientes para tu negocio? Nos gustaría saber de ti.",
  "Contact Details": "Datos de contacto",
  "Email": "Correo",
  "support@fndi.tech": "support@fndi.tech",
  "Phone": "Teléfono",
  "(786) 843-0145": "(786) 843-0145",
  "Location": "Ubicación",
  "Miami, FL. We serve clients across South Florida and beyond.": "Miami, FL. Atendemos clientes en todo el sur de Florida y más allá.",
  "Hours": "Horario",
  "Monday to Friday, 9am to 6pm EST": "Lunes a viernes, de 9am a 6pm EST",
  "Response time": "Tiempo de respuesta",
  "We respond to all inquiries within one business day.": "Respondemos todas las consultas en un día hábil.",
  "Send Us a Message": "Envíanos un mensaje",
  "Tell us a little about your business and what you need. We will reply by email.": "Cuéntanos un poco sobre tu negocio y lo que necesitas. Te responderemos por correo.",
  "Your Name": "Tu nombre",
  "Email Address": "Correo electrónico",
  "Phone Number": "Número de teléfono",
  "Company Name": "Nombre de la empresa",
  "Tell Us About Your Project": "Cuéntanos sobre tu proyecto",
  "Send Message": "Enviar mensaje"
 },
 "/faq/": {
  "Frequently asked questions": "Preguntas frecuentes",
  "Straight answers about Meta ads, working with us, pricing, and the pieces that support your ads.": "Respuestas directas sobre anuncios en Meta, cómo trabajamos, precios y las piezas que apoyan tus anuncios.",
  "Meta ads": "Anuncios en Meta",
  "What are Meta ads?": "¿Qué son los anuncios en Meta?",
  "They are paid ads on Facebook and Instagram. We use them to put your business in front of people in your area who are likely to need what you offer.": "Son anuncios pagados en Facebook e Instagram. Los usamos para poner tu negocio frente a personas de tu zona que probablemente necesiten lo que ofreces.",
  "How much should I spend on ads?": "¿Cuánto debería invertir en anuncios?",
  "There is no single right number. It depends on your area, your industry, and how many new customers you can take on. We talk through a starting budget on the call.": "No hay un número único correcto. Depende de tu zona, tu industria y cuántos clientes nuevos puedes atender. En la llamada platicamos sobre un presupuesto inicial.",
  "Is the ad budget separate from your fee?": "¿El presupuesto de anuncios es aparte de su tarifa?",
  "Yes. Your ad budget goes to Meta to show the ads. Our fee covers the planning, building, and management. Your proposal shows both.": "Sí. Tu presupuesto de anuncios va a Meta para mostrar los anuncios. Nuestra tarifa cubre la planeación, el armado y la gestión. Tu propuesta muestra ambos.",
  "How soon will I see results?": "¿Qué tan pronto voy a ver resultados?",
  "Ads can start reaching people as soon as they are live, but the first weeks are for testing what works. We will not promise a number before we have real data from your campaigns.": "Los anuncios pueden empezar a llegar a la gente en cuanto están activos, pero las primeras semanas son para probar qué funciona. No te vamos a prometer un número antes de tener datos reales de tus campañas.",
  "Do you guarantee results?": "¿Garantizan resultados?",
  "No. Nobody can honestly guarantee what an ad platform will do. What we can do is track everything, show you the numbers, and keep improving the campaigns.": "No. Nadie puede garantizar con honestidad lo que hará una plataforma de anuncios. Lo que sí podemos hacer es medir todo, mostrarte los números y seguir mejorando las campañas.",
  "Who makes the ads?": "¿Quién hace los anuncios?",
  "We do. We write the copy and design the ads, and you approve them before they run.": "Nosotros. Escribimos los textos y diseñamos los anuncios, y tú los apruebas antes de que salgan.",
  "Working with FNDI": "Trabajar con FNDI",
  "What does FNDI do?": "¿Qué hace FNDI?",
  "We help local businesses get more customers. Mostly that means ads on Facebook and Instagram, backed by a website, social media, a CRM, and follow-up that turn leads into bookings.": "Ayudamos a negocios locales a conseguir más clientes. Sobre todo con anuncios en Facebook e Instagram, apoyados por un sitio web, redes sociales, un CRM y un seguimiento que convierten prospectos en reservas.",
  "How is FNDI different from other agencies?": "¿En qué se diferencia FNDI de otras agencias?",
  "You work directly with the founders, Stefano and Douglas. We build a custom plan for your business instead of using templates.": "Trabajas directamente con los fundadores, Stefano y Douglas. Armamos un plan a la medida para tu negocio en lugar de usar plantillas.",
  "What industries do you work with?": "¿Con qué industrias trabajan?",
  "Mostly local service businesses, including dental offices, med spas, law firms, restaurants, salons, and home services. If you are not sure you fit, book a call and we will tell you honestly.": "Sobre todo con negocios locales de servicios, como consultorios dentales, med spas, despachos de abogados, restaurantes, salones y servicios para el hogar. Si no sabes si encajas, agenda una llamada y te lo diremos con honestidad.",
  "How long does setup take?": "¿Cuánto tarda la puesta en marcha?",
  "Most projects launch within 7 to 14 business days. We give you a specific timeline after the first call.": "La mayoría de los proyectos se lanzan en un plazo de 7 a 14 días hábiles. Te damos un calendario específico después de la primera llamada.",
  "How will I know if it is working?": "¿Cómo voy a saber si está funcionando?",
  "We track leads and bookings from your ads and send you reports. You see what was spent and what came back.": "Medimos los prospectos y las reservas que vienen de tus anuncios y te enviamos reportes. Ves cuánto se gastó y qué regresó.",
  "How do I get started?": "¿Cómo empiezo?",
  "Book a free call. We ask about your business and goals, then recommend a plan and a timeline. There is no obligation.": "Agenda una llamada gratis. Te preguntamos por tu negocio y tus metas, y luego te recomendamos un plan y un calendario. No hay ningún compromiso.",
  "Pricing and terms": "Precios y condiciones",
  "How much does it cost?": "¿Cuánto cuesta?",
  "Pricing is custom. It depends on your ad budget, which services you include, and how many locations you have. You get a clear proposal after the call.": "El precio es a la medida. Depende de tu presupuesto de anuncios, de los servicios que incluyas y de cuántas sucursales tengas. Recibes una propuesta clara después de la llamada.",
  "Is there a long-term contract?": "¿Hay contrato a largo plazo?",
  "No. We work month to month. You can adjust your services or cancel with 30 days notice.": "No. Trabajamos mes a mes. Puedes ajustar tus servicios o cancelar avisando con 30 días de anticipación.",
  "Can I change my plan later?": "¿Puedo cambiar mi plan después?",
  "Yes. You can add or remove services anytime, and we adjust the price to match.": "Sí. Puedes agregar o quitar servicios en cualquier momento, y ajustamos el precio según corresponda.",
  "Can I start with just one service?": "¿Puedo empezar con un solo servicio?",
  "Yes. Many clients start with ads and add the rest when it makes sense.": "Sí. Muchos clientes empiezan con anuncios y agregan lo demás cuando tiene sentido.",
  "Websites and follow-up": "Sitios web y seguimiento",
  "Do I need a new website to run ads?": "¿Necesito un sitio web nuevo para anunciarme?",
  "Not always. If your current site turns visitors into calls and bookings, we can use it. If it does not, we will recommend a landing page built for the ads.": "No siempre. Si tu sitio actual convierte visitantes en llamadas y reservas, podemos usarlo. Si no, te recomendaremos una página de destino hecha para los anuncios.",
  "Will it work with my existing systems?": "¿Funciona con los sistemas que ya uso?",
  "Usually, yes. We connect with common booking tools like Acuity and Calendly and CRMs like Salesforce and Pipedrive. Tell us what you use on the call and we will confirm.": "Por lo general, sí. Nos conectamos con herramientas de reservas comunes como Acuity y Calendly y con CRM como Salesforce y Pipedrive. Dinos qué usas en la llamada y te lo confirmamos.",
  "What does follow-up automation mean?": "¿Qué significa seguimiento automático?",
  "When someone fills out a form or books, they get texts, emails, and reminders on a schedule. Leads hear back quickly and fewer appointments get forgotten.": "Cuando alguien llena un formulario o reserva, recibe mensajes de texto, correos y recordatorios programados. Los prospectos reciben respuesta rápido y se olvidan menos citas.",
  "Do I need a CRM?": "¿Necesito un CRM?",
  "Only if leads are slipping through. A CRM keeps every lead in one place so you can see who needs a reply. If you already have one, we can work with it.": "Solo si se te están escapando prospectos. Un CRM guarda cada prospecto en un solo lugar para que veas quién necesita respuesta. Si ya tienes uno, podemos trabajar con él.",
  "Do you manage social media too?": "¿También manejan redes sociales?",
  "Yes. We can plan and post content so your profiles look active when people coming from your ads check you out.": "Sí. Podemos planear y publicar contenido para que tus perfiles se vean activos cuando la gente que llega por tus anuncios te busca.",
  "Still have questions?": "¿Todavía tienes preguntas?",
  "Book a free call and ask us anything about getting more customers for your business.": "Agenda una llamada gratis y pregúntanos lo que quieras sobre cómo conseguir más clientes para tu negocio.",
  "Book a Free Call": "Agenda una llamada gratis"
 },
 "/how-it-works/": {
  "Book a Free Call": "Agenda una llamada gratis",
  "See pricing": "Ver precios",
  "How it works": "Cómo funciona",
  "From the first call to ads that are live and bringing in customers. Here is what happens at each stage and what we handle for you.": "Desde la primera llamada hasta tener anuncios activos que traen clientes. Esto es lo que pasa en cada etapa y lo que hacemos por ti.",
  "Most projects launch within 7 to 14 business days of the first call.": "La mayoría de los proyectos se lanzan en un plazo de 7 a 14 días hábiles después de la primera llamada.",
  "Four stages, in order": "Cuatro etapas, en orden",
  "Stage 1. Discovery call": "Etapa 1. Llamada inicial",
  "A free 30 minute call. We ask about your business, your customers, your area, and what you have already tried. Afterward you get a custom plan and a price.": "Una llamada gratis de 30 minutos. Te preguntamos por tu negocio, tus clientes, tu zona y lo que ya has probado. Después recibes un plan a la medida y un precio.",
  "Stage 2. We build": "Etapa 2. Lo armamos",
  "We write and design your ads, build the landing page they point to, set up tracking, and put the follow-up in place so new leads get a quick reply.": "Escribimos y diseñamos tus anuncios, armamos la página de destino a la que llevan, configuramos la medición y dejamos listo el seguimiento para que cada prospecto nuevo reciba una respuesta rápida.",
  "Stage 3. Launch": "Etapa 3. Lanzamiento",
  "You review everything before it goes live. Then we turn the campaigns on and watch the first days closely.": "Revisas todo antes de que salga al aire. Luego activamos las campañas y seguimos de cerca los primeros días.",
  "Stage 4. Optimize and report": "Etapa 4. Optimización y reportes",
  "We keep testing ads and audiences, move budget toward what works, and send you reports that show what your money did.": "Seguimos probando anuncios y audiencias, movemos el presupuesto hacia lo que funciona y te enviamos reportes que muestran qué hizo tu dinero.",
  "Meta ads": "Anuncios en Meta",
  "Facebook and Instagram campaigns aimed at people near your business.": "Campañas en Facebook e Instagram dirigidas a personas cerca de tu negocio.",
  "Landing page": "Página de destino",
  "A page with one job, which is to get the visitor to call or book.": "Una página con una sola tarea, que es lograr que el visitante llame o reserve.",
  "Tracking": "Medición",
  "So we both know which ads bring in leads and which do not.": "Para que los dos sepamos qué anuncios traen prospectos y cuáles no.",
  "Follow-up": "Seguimiento",
  "Texts, emails, and reminders that keep a new lead from going cold.": "Mensajes de texto, correos y recordatorios que evitan que un prospecto nuevo se enfríe.",
  "What gets built": "Qué se arma",
  "Ads alone rarely do the job. People who click need somewhere good to land, and someone has to follow up. We set up the whole path.": "Los anuncios solos rara vez bastan. Quien hace clic necesita llegar a un buen lugar, y alguien tiene que dar seguimiento. Nosotros armamos el camino completo.",
  "Access to your Facebook and Instagram pages": "Acceso a tus páginas de Facebook e Instagram",
  "Your services, prices, and any current offers": "Tus servicios, precios y cualquier oferta vigente",
  "Photos or video of your business, if you have them": "Fotos o video de tu negocio, si los tienes",
  "The booking tool or CRM you already use, if any": "La herramienta de reservas o el CRM que ya usas, si tienes alguno",
  "A quick review before anything goes live": "Una revisión rápida antes de que algo salga al aire",
  "What we need from you": "Qué necesitamos de ti",
  "We do the building. A few things only you can give us.": "Nosotros hacemos el trabajo. Hay algunas cosas que solo tú nos puedes dar.",
  "You work directly with the founders the whole way, so questions get answered by the people doing the work.": "Trabajas directamente con los fundadores todo el tiempo, así que tus preguntas las responde la gente que hace el trabajo.",
  "Start with a free call": "Empieza con una llamada gratis",
  "Thirty minutes to talk about your business and where more customers could come from.": "Treinta minutos para hablar de tu negocio y de dónde podrían venir más clientes."
 },
 "/industries/dental/": {
  "More new patients for your dental office": "Más pacientes nuevos para tu consultorio dental",
  "We run Facebook and Instagram ads that put a clear new patient offer in front of people near your practice. Then we make sure every request gets a fast reply and a spot on the schedule.": "Manejamos anuncios en Facebook e Instagram que muestran una oferta clara para pacientes nuevos a la gente cerca de tu consultorio. Después nos aseguramos de que cada solicitud reciba una respuesta rápida y un lugar en la agenda.",
  "Book a Free Call": "Agenda una llamada gratis",
  "See pricing": "Ver precios",
  "Ads built around a reason to book": "Anuncios con una razón para agendar",
  "People rarely switch dentists on a whim. A good ad gives someone nearby a simple reason to choose you now.": "La gente rara vez cambia de dentista por impulso. Un buen anuncio le da a alguien cercano una razón sencilla para elegirte ahora.",
  "A new patient special": "Una oferta para pacientes nuevos",
  "An exam, cleaning and X-rays at a set price, or whatever first visit offer fits your practice. You choose the offer and we build the ad around it.": "Examen, limpieza y radiografías a un precio fijo, o la oferta de primera visita que mejor le quede a tu consultorio. Tú eliges la oferta y nosotros armamos el anuncio.",
  "The right neighborhoods": "Los vecindarios correctos",
  "We target the area people will realistically drive from, and shape the message for families, people new to the area, or adults who have not been in for a while.": "Apuntamos a la zona desde la que la gente realmente está dispuesta a manejar, y ajustamos el mensaje para familias, personas recién llegadas o adultos que llevan tiempo sin ir al dentista.",
  "The services you want more of": "Los servicios que quieres llenar",
  "Separate campaigns for whitening, clear aligners, implants or emergency visits, so the budget goes toward the appointments you want on the schedule.": "Campañas separadas para blanqueamiento, alineadores, implantes o urgencias, para que el presupuesto vaya a las citas que quieres en tu agenda.",
  "From a tap on an ad to a booked visit": "Del toque en un anuncio a una cita agendada",
  "An ad only starts the conversation. What happens in the next few minutes decides whether that person becomes a patient.": "Un anuncio solo empieza la conversación. Lo que pasa en los siguientes minutos decide si esa persona se vuelve paciente.",
  "A page that matches the ad": "Una página que coincide con el anuncio",
  "The offer, your hours, your location and a short request form. Nothing to hunt for.": "La oferta, tu horario, tu ubicación y un formulario corto. Nada que buscar.",
  "A fast reply": "Una respuesta rápida",
  "New requests get a text and an email right away, and your front desk sees the lead with everything needed to call back.": "Las solicitudes nuevas reciben un mensaje de texto y un correo de inmediato, y tu recepción ve el contacto con todo lo necesario para devolver la llamada.",
  "Reminders before the visit": "Recordatorios antes de la cita",
  "Confirmation and reminder messages go out on their own, so new patients remember the appointment.": "Los mensajes de confirmación y recordatorio salen solos, para que los pacientes nuevos recuerden su cita.",
  "Honest ads": "Anuncios honestos",
  "We keep health claims out of the copy. No promised results, just a clear offer and accurate information about your practice.": "Dejamos las promesas de salud fuera del texto. Sin resultados garantizados, solo una oferta clara e información correcta sobre tu consultorio.",
  "How we get started": "Cómo empezamos",
  "Book a free call": "Agenda una llamada gratis",
  "Tell us about your practice, the area you serve and which appointments you want more of.": "Cuéntanos sobre tu consultorio, la zona que atiendes y qué citas quieres aumentar.",
  "We build the campaign": "Armamos la campaña",
  "We set up the offer, the ads, the landing page and the follow-up. Most projects launch within 7 to 14 business days.": "Preparamos la oferta, los anuncios, la página y el seguimiento. La mayoría de los proyectos se lanzan en 7 a 14 días hábiles.",
  "We adjust together": "Ajustamos juntos",
  "We look at which ads bring in requests and tune the offer, audience and budget with you.": "Revisamos qué anuncios traen solicitudes y afinamos contigo la oferta, la audiencia y el presupuesto.",
  "Tell us about your practice": "Cuéntanos sobre tu consultorio",
  "Send a few details and one of the founders will get back to you to set up a free call.": "Envíanos algunos datos y uno de los fundadores te contactará para coordinar una llamada gratis.",
  "Practice Name": "Nombre del consultorio",
  "Email Address": "Correo electrónico",
  "Phone Number (optional)": "Teléfono (opcional)",
  "About your practice (optional)": "Sobre tu consultorio (opcional)",
  "Request a Free Call": "Solicita una llamada gratis"
 },
 "/industries/home-services/": {
  "More quote requests for your home service business": "Más solicitudes de cotización para tu negocio de servicios para el hogar",
  "We run Facebook and Instagram ads inside your service area, collect the job details you need to quote, and follow up fast so the request turns into a booked job.": "Manejamos anuncios en Facebook e Instagram dentro de tu zona de servicio, recogemos los detalles que necesitas para cotizar y damos seguimiento rápido para que la solicitud se convierta en un trabajo agendado.",
  "Book a Free Call": "Agenda una llamada gratis",
  "See pricing": "Ver precios",
  "Ads that stay inside your service area": "Anuncios que se quedan en tu zona de servicio",
  "Every mile your crew drives costs money. We target homeowners where you actually want to work.": "Cada milla que maneja tu equipo cuesta dinero. Segmentamos a los dueños de casa donde de verdad quieres trabajar.",
  "Your zip codes, not the whole county": "Tus códigos postales, no todo el condado",
  "We set the targeting by radius or zip code to match the area you cover, and leave out the places you would turn down anyway.": "Definimos la segmentación por radio o código postal según la zona que cubres, y dejamos fuera los lugares que de todos modos rechazarías.",
  "An offer that fits the trade": "Una oferta que encaja con el oficio",
  "A free estimate for roofing or remodeling, a seasonal tune-up for air conditioning, a first visit price for cleaning, lawn care or pest control.": "Un estimado gratis para techos o remodelaciones, un mantenimiento de temporada para aire acondicionado, un precio de primera visita para limpieza, jardinería o control de plagas.",
  "Proof from real jobs": "Pruebas de trabajos reales",
  "Photos and short clips of your finished work and your crew on site. Homeowners want to see who is coming to their house.": "Fotos y videos cortos de tus trabajos terminados y de tu equipo en el sitio. Los dueños de casa quieren ver quién va a llegar a su hogar.",
  "Requests your office can quote from": "Solicitudes con las que tu oficina puede cotizar",
  "A name and a phone number are not much to go on. We build the request form around what you need to know before you call.": "Un nombre y un teléfono no dicen mucho. Armamos el formulario según lo que necesitas saber antes de llamar.",
  "What service the homeowner needs": "Qué servicio necesita el dueño de casa",
  "The address or zip code of the job": "La dirección o el código postal del trabajo",
  "How soon they want it done": "Qué tan pronto lo quieren",
  "The best time to reach them": "El mejor momento para contactarlos",
  "What happens after someone asks for a quote": "Qué pasa después de que alguien pide una cotización",
  "Homeowners often ask more than one company. A quick, organized reply puts you in the running.": "Los dueños de casa suelen preguntar a más de una empresa. Una respuesta rápida y ordenada te mantiene en la competencia.",
  "They hear back right away": "Reciben respuesta de inmediato",
  "A text and an email confirm the request and tell them what to expect next.": "Un mensaje de texto y un correo confirman la solicitud y les dicen qué esperar.",
  "You get the details": "Tú recibes los detalles",
  "The lead lands in one place with the job information, ready for your office to call or schedule an estimate.": "El contacto llega a un solo lugar con la información del trabajo, listo para que tu oficina llame o agende un estimado.",
  "Quotes get followed up": "Las cotizaciones reciben seguimiento",
  "If a quote goes unanswered, a reminder goes out on its own. After the job, the customer gets a request for a review.": "Si una cotización queda sin respuesta, sale un recordatorio por sí solo. Después del trabajo, el cliente recibe una invitación a dejar una reseña.",
  "Tell us about your business": "Cuéntanos sobre tu negocio",
  "Send a few details and one of the founders will get back to you to set up a free call. Pricing is custom, and most projects launch within 7 to 14 business days.": "Envíanos algunos datos y uno de los fundadores te contactará para coordinar una llamada gratis. Los precios son a la medida, y la mayoría de los proyectos se lanzan en 7 a 14 días hábiles.",
  "Your Name": "Tu nombre",
  "Email Address": "Correo electrónico",
  "Phone Number (optional)": "Teléfono (opcional)",
  "Services you offer (optional)": "Servicios que ofreces (opcional)",
  "Request a Free Call": "Solicita una llamada gratis"
 },
 "/industries/law-firms/": {
  "More consultation requests for your law firm": "Más solicitudes de consulta para tu bufete",
  "We run Facebook and Instagram ads built around the kinds of cases you take, send people to a simple intake page, and make sure each inquiry gets a prompt reply from your office.": "Manejamos anuncios en Facebook e Instagram pensados para los tipos de casos que tomas, llevamos a la gente a una página de admisión sencilla y nos aseguramos de que cada consulta reciba una respuesta pronta de tu oficina.",
  "Book a Free Call": "Agenda una llamada gratis",
  "See pricing": "Ver precios",
  "Campaigns organized by case type": "Campañas organizadas por tipo de caso",
  "Someone dealing with an immigration question and someone hurt in a car accident need to hear different things. We do not run one general ad for the whole firm.": "Alguien con una duda de inmigración y alguien lesionado en un accidente de auto necesitan escuchar cosas distintas. No hacemos un solo anuncio general para todo el bufete.",
  "One practice area per campaign": "Un área de práctica por campaña",
  "Personal injury, immigration, family law and estate planning each get their own ads and budget, so you can put more behind the matters you want.": "Lesiones personales, inmigración, derecho de familia y planificación patrimonial tienen sus propios anuncios y presupuesto, para que inviertas más en los asuntos que te interesan.",
  "A message that fits the situation": "Un mensaje que encaja con la situación",
  "Each ad speaks to what the person is going through and offers a clear next step, usually a consultation with your office.": "Cada anuncio le habla a lo que la persona está viviendo y ofrece un siguiente paso claro, por lo general una consulta con tu oficina.",
  "The area and language you serve": "La zona y el idioma que atiendes",
  "We target the counties you practice in and can run ads in English and Spanish to reach the people your firm serves.": "Segmentamos los condados donde ejerces y podemos publicar anuncios en inglés y en español para llegar a las personas que tu bufete atiende.",
  "Advertising that respects the rules": "Publicidad que respeta las reglas",
  "Lawyer advertising is regulated, and your name is on every ad. We are marketers, not attorneys, so nothing runs without your review.": "La publicidad de abogados está regulada, y tu nombre va en cada anuncio. Somos especialistas en marketing, no abogados, así que nada se publica sin tu revisión.",
  "What we leave out": "Lo que dejamos fuera",
  "Promises or predictions about case results": "Promesas o predicciones sobre el resultado de un caso",
  "Comparisons with other firms that cannot be backed up": "Comparaciones con otros bufetes que no se pueden sustentar",
  "Pressure tactics aimed at people in a hard moment": "Tácticas de presión dirigidas a personas en un momento difícil",
  "What we do": "Lo que hacemos",
  "Describe your practice areas and how a consultation works": "Describir tus áreas de práctica y cómo funciona una consulta",
  "Include the disclaimers your firm requires": "Incluir los avisos legales que tu bufete exige",
  "Send every ad and page to you for approval before it goes live": "Enviarte cada anuncio y página para tu aprobación antes de publicarlos",
  "An intake process that does not lose people": "Un proceso de admisión que no pierde a nadie",
  "People looking for a lawyer often contact more than one firm. A simple form and a prompt reply give your office a fair chance at the conversation.": "Quien busca un abogado suele contactar a más de un bufete. Un formulario sencillo y una respuesta pronta le dan a tu oficina una oportunidad justa en la conversación.",
  "A short intake page": "Una página de admisión corta",
  "A page for each practice area with a few questions about the matter, so your staff knows what the inquiry is about before calling.": "Una página por área de práctica con algunas preguntas sobre el asunto, para que tu personal sepa de qué trata la consulta antes de llamar.",
  "Prompt acknowledgment": "Confirmación inmediata",
  "Each person gets a text and an email confirming you received the request, with a link to schedule a consultation.": "Cada persona recibe un mensaje de texto y un correo que confirman que recibiste su solicitud, con un enlace para agendar una consulta.",
  "A clear list for your staff": "Una lista clara para tu personal",
  "Every inquiry is tracked in one place with its case type and status, so no one is left waiting for a call back.": "Cada consulta queda registrada en un solo lugar con su tipo de caso y estado, para que nadie se quede esperando una llamada.",
  "Tell us about your firm": "Cuéntanos sobre tu bufete",
  "Send a few details and one of the founders will get back to you to set up a free call. Pricing is custom, and most projects launch within 7 to 14 business days.": "Envíanos algunos datos y uno de los fundadores te contactará para coordinar una llamada gratis. Los precios son a la medida, y la mayoría de los proyectos se lanzan en 7 a 14 días hábiles.",
  "Your Name": "Tu nombre",
  "Email Address": "Correo electrónico",
  "Phone Number (optional)": "Teléfono (opcional)",
  "Your practice areas (optional)": "Tus áreas de práctica (opcional)",
  "Request a Free Call": "Solicita una llamada gratis"
 },
 "/industries/med-spas/": {
  "More consultations for your med spa": "Más consultas para tu med spa",
  "Your future clients are already on Instagram. We run ads that invite them to a consultation, send them to a page that answers their questions, and follow up until they pick a time.": "Tus futuros clientes ya están en Instagram. Manejamos anuncios que los invitan a una consulta, los llevan a una página que responde sus dudas y les damos seguimiento hasta que eligen un horario.",
  "Book a Free Call": "Agenda una llamada gratis",
  "See pricing": "Ver precios",
  "What a good med spa ad looks like": "Cómo se ve un buen anuncio para un med spa",
  "Most people think about a treatment for a while before they book. The ad's job is to make the first step feel easy.": "La mayoría de la gente piensa en un tratamiento por un tiempo antes de agendar. El trabajo del anuncio es que el primer paso se sienta fácil.",
  "A consultation offer": "Una oferta de consulta",
  "A free or low cost consultation is an easy yes. It gets someone in the door to talk with your provider before committing to anything.": "Una consulta gratis o de bajo costo es un sí fácil. Lleva a la persona a hablar con tu especialista antes de comprometerse con algo.",
  "One treatment per campaign": "Un tratamiento por campaña",
  "Injectables, laser hair removal, facials and body treatments attract different people. Each gets its own ad, message and page.": "Los inyectables, la depilación láser, los faciales y los tratamientos corporales atraen a personas distintas. Cada uno tiene su propio anuncio, mensaje y página.",
  "People close enough to come back": "Gente lo bastante cerca para volver",
  "We target by distance from your location and by interest in beauty and skincare, so the budget reaches people who can become regulars.": "Segmentamos por distancia a tu local y por interés en belleza y cuidado de la piel, para que el presupuesto llegue a quienes pueden volverse clientes frecuentes.",
  "Your real space and team": "Tu espacio y tu equipo reales",
  "Photos and short videos of your rooms and providers do better than stock images. We help you plan what to film.": "Las fotos y videos cortos de tus salas y tu equipo funcionan mejor que las imágenes de archivo. Te ayudamos a planear qué grabar.",
  "Careful claims, clear information": "Afirmaciones cuidadosas, información clara",
  "Aesthetic treatments are medical services, and the ad platforms have rules about how they can be advertised. We write with that in mind.": "Los tratamientos estéticos son servicios médicos, y las plataformas de anuncios tienen reglas sobre cómo se pueden promocionar. Escribimos con eso en mente.",
  "No promised results in any ad or page": "Sin resultados prometidos en ningún anuncio ni página",
  "Plain descriptions of the treatment and who performs it": "Descripciones sencillas del tratamiento y de quién lo realiza",
  "Offers stated clearly, with any conditions spelled out": "Ofertas claras, con sus condiciones bien explicadas",
  "You review and approve everything before it runs": "Tú revisas y apruebas todo antes de que se publique",
  "Follow-up that turns interest into a booking": "Seguimiento que convierte el interés en una cita",
  "Someone who fills out a form at night is easy to lose by morning. We set up the follow-up so they hear from you while they are still thinking about it.": "Alguien que llena un formulario en la noche es fácil de perder a la mañana siguiente. Preparamos el seguimiento para que sepa de ti mientras todavía lo está pensando.",
  "A landing page for each treatment": "Una página para cada tratamiento",
  "What it is, what a first visit looks like, and a short form or booking link.": "Qué es, cómo es la primera visita y un formulario corto o enlace para agendar.",
  "A reply within minutes": "Una respuesta en minutos",
  "A text and an email go out right away with a link to choose a consultation time.": "Un mensaje de texto y un correo salen de inmediato con un enlace para elegir el horario de la consulta.",
  "Every lead in one place": "Todos los contactos en un solo lugar",
  "Your team sees who asked about what, who booked and who still needs a call.": "Tu equipo ve quién preguntó por qué, quién agendó y a quién todavía hay que llamar.",
  "Tell us about your med spa": "Cuéntanos sobre tu med spa",
  "Send a few details and one of the founders will get back to you to set up a free call. Pricing is custom, and most projects launch within 7 to 14 business days.": "Envíanos algunos datos y uno de los fundadores te contactará para coordinar una llamada gratis. Los precios son a la medida, y la mayoría de los proyectos se lanzan en 7 a 14 días hábiles.",
  "Spa Name": "Nombre del spa",
  "Email Address": "Correo electrónico",
  "Phone Number (optional)": "Teléfono (opcional)",
  "Treatments you offer (optional)": "Tratamientos que ofreces (opcional)",
  "Request a Free Call": "Solicita una llamada gratis"
 },
 "/industries/restaurants/": {
  "More guests through the door of your restaurant": "Más comensales en la puerta de tu restaurante",
  "We run Facebook and Instagram ads that reach people a short drive from your tables, give them a reason to come in this week, and help you bring them back.": "Manejamos anuncios en Facebook e Instagram que llegan a la gente a pocos minutos de tus mesas, les dan una razón para venir esta semana y te ayudan a que regresen.",
  "Book a Free Call": "Agenda una llamada gratis",
  "See pricing": "Ver precios",
  "Ads for the people who can actually show up": "Anuncios para la gente que de verdad puede llegar",
  "A restaurant's customers live, work or stay nearby. We keep the budget inside that circle.": "Los clientes de un restaurante viven, trabajan o se hospedan cerca. Mantenemos el presupuesto dentro de ese círculo.",
  "A tight local radius": "Un radio local ajustado",
  "We target a few miles around your location, and can add nearby offices for lunch or hotels for visitors.": "Segmentamos unas pocas millas alrededor de tu local, y podemos sumar oficinas cercanas para el almuerzo u hoteles para los visitantes.",
  "A reason to come this week": "Una razón para venir esta semana",
  "A lunch special, happy hour, weekend brunch, a new menu or an event night. Specific offers get more attention than a general ad about the restaurant.": "Un especial de almuerzo, happy hour, brunch de fin de semana, un menú nuevo o una noche de evento. Las ofertas concretas llaman más la atención que un anuncio general del restaurante.",
  "Your food on camera": "Tu comida frente a la cámara",
  "Short videos and photos of real plates and your real room. We help you plan what to shoot and turn it into ads.": "Videos cortos y fotos de platos reales y de tu salón real. Te ayudamos a planear qué grabar y lo convertimos en anuncios.",
  "Fill the slow nights, not just Saturday": "Llena las noches lentas, no solo el sábado",
  "Ads work best when they point at a specific goal. We set up separate campaigns for the parts of the business you want to grow.": "Los anuncios funcionan mejor cuando apuntan a una meta concreta. Armamos campañas separadas para las partes del negocio que quieres hacer crecer.",
  "Reservations on quieter weeknights": "Reservaciones en las noches más tranquilas entre semana",
  "Online orders for pickup and delivery": "Pedidos en línea para recoger y a domicilio",
  "Catering and private event inquiries": "Solicitudes de catering y eventos privados",
  "Opening weeks for a new location or menu": "Semanas de apertura de un nuevo local o menú",
  "Turn a first visit into a regular": "Convierte una primera visita en un cliente frecuente",
  "Getting someone in once is half the job. The rest is staying in touch so they think of you next time.": "Lograr que alguien venga una vez es la mitad del trabajo. El resto es mantener el contacto para que piense en ti la próxima vez.",
  "A website that answers the basics": "Un sitio web que responde lo básico",
  "Menu, hours, location, and clear buttons to reserve or order. Fast on a phone, where most people will see it.": "Menú, horario, ubicación y botones claros para reservar o pedir. Rápido en el celular, donde la mayoría lo va a ver.",
  "A guest list you own": "Una lista de clientes que es tuya",
  "Offers that collect a name, email or phone number, so you can reach past guests without paying for another ad.": "Ofertas que recogen nombre, correo o teléfono, para que puedas contactar a clientes anteriores sin pagar otro anuncio.",
  "Messages that bring people back": "Mensajes que hacen volver a la gente",
  "Texts and emails about specials, events and birthdays, sent on a schedule so you do not have to remember.": "Mensajes de texto y correos sobre especiales, eventos y cumpleaños, enviados de forma programada para que no tengas que acordarte.",
  "Tell us about your restaurant": "Cuéntanos sobre tu restaurante",
  "Send a few details and one of the founders will get back to you to set up a free call. Pricing is custom, and most projects launch within 7 to 14 business days.": "Envíanos algunos datos y uno de los fundadores te contactará para coordinar una llamada gratis. Los precios son a la medida, y la mayoría de los proyectos se lanzan en 7 a 14 días hábiles.",
  "Restaurant Name": "Nombre del restaurante",
  "Email Address": "Correo electrónico",
  "Phone Number (optional)": "Teléfono (opcional)",
  "About your restaurant (optional)": "Sobre tu restaurante (opcional)",
  "Request a Free Call": "Solicita una llamada gratis"
 },
 "/industries/salons/": {
  "A fuller calendar for your salon or barbershop": "Una agenda más llena para tu salón o barbería",
  "Your work already looks good on Instagram. We turn it into ads that reach new people nearby, send them straight to booking, and remind them to come back.": "Tu trabajo ya se ve bien en Instagram. Lo convertimos en anuncios que llegan a gente nueva cerca de ti, la llevan directo a agendar y le recuerdan volver.",
  "Book a Free Call": "Agenda una llamada gratis",
  "See pricing": "Ver precios",
  "Let the work do the selling": "Deja que el trabajo venda",
  "People choose a stylist or barber by what they see. The best ad is usually a real cut or color from your own chairs.": "La gente elige a su estilista o barbero por lo que ve. El mejor anuncio suele ser un corte o color real hecho en tus propias sillas.",
  "Real results from your chairs": "Resultados reales de tus sillas",
  "We build ads from photos and short videos of your actual work, with the client's permission, not stock images.": "Armamos los anuncios con fotos y videos cortos de tu trabajo real, con permiso del cliente, no con imágenes de archivo.",
  "A first visit offer": "Una oferta de primera visita",
  "A new client price on a cut, color or beard service gives someone a reason to try you instead of staying where they are.": "Un precio para clientes nuevos en corte, color o servicio de barba le da a alguien una razón para probarte en lugar de quedarse donde está.",
  "People who live close by": "Gente que vive cerca",
  "We target the neighborhoods around your shop, since most clients will not cross the city for a regular appointment.": "Segmentamos los vecindarios alrededor de tu local, porque la mayoría de los clientes no cruza la ciudad para una cita habitual.",
  "Put the bookings where you need them": "Lleva las citas a donde las necesitas",
  "Not every hour on the calendar is equal. We point campaigns at the gaps you want filled.": "No todas las horas de la agenda valen lo mismo. Dirigimos las campañas a los espacios que quieres llenar.",
  "A new stylist or barber building a client list": "Un estilista o barbero nuevo que está formando su clientela",
  "Slow weekdays and midday openings": "Días lentos entre semana y espacios al mediodía",
  "Higher value services like color, extensions or treatments": "Servicios de mayor valor como color, extensiones o tratamientos",
  "A second location that needs to get known": "Un segundo local que necesita darse a conocer",
  "From the ad to the chair, and back again": "Del anuncio a la silla, y de vuelta",
  "A new client is worth the most when they return. We set up the steps that make booking easy and rebooking a habit.": "Un cliente nuevo vale más cuando regresa. Preparamos los pasos que hacen fácil agendar y convierten el volver en costumbre.",
  "Straight to booking": "Directo a agendar",
  "The ad leads to a simple page with your services, prices and a link to the booking tool you already use.": "El anuncio lleva a una página sencilla con tus servicios, precios y un enlace a la herramienta de reservas que ya usas.",
  "Appointment reminders": "Recordatorios de cita",
  "Clients get a text before their appointment, so fewer of them forget.": "Los clientes reciben un mensaje de texto antes de su cita, para que menos de ellos la olviden.",
  "A nudge to rebook": "Un empujón para volver a agendar",
  "A few weeks after a visit, clients get a friendly message with a link to book the next one.": "Unas semanas después de la visita, los clientes reciben un mensaje amable con un enlace para agendar la siguiente.",
  "Tell us about your shop": "Cuéntanos sobre tu negocio",
  "Send a few details and one of the founders will get back to you to set up a free call. Pricing is custom, and most projects launch within 7 to 14 business days.": "Envíanos algunos datos y uno de los fundadores te contactará para coordinar una llamada gratis. Los precios son a la medida, y la mayoría de los proyectos se lanzan en 7 a 14 días hábiles.",
  "Salon or Shop Name": "Nombre del salón o barbería",
  "Email Address": "Correo electrónico",
  "Phone Number (optional)": "Teléfono (opcional)",
  "Size of your team (optional)": "Tamaño de tu equipo (opcional)",
  "Request a Free Call": "Solicita una llamada gratis"
 },
 "/pricing/": {
  "Book a Free Call": "Agenda una llamada gratis",
  "See how it works": "Mira cómo funciona",
  "Pricing that fits your business": "Precios que se ajustan a tu negocio",
  "We do not sell fixed packages. We look at what your business needs, plan it with you, and price that plan. You see the full cost before you decide anything.": "No vendemos paquetes fijos. Vemos qué necesita tu negocio, lo planeamos contigo y le ponemos precio a ese plan. Ves el costo completo antes de decidir cualquier cosa.",
  "Three steps to your plan": "Tres pasos para tener tu plan",
  "Book a call": "Agenda una llamada",
  "Tell us about your business, your goals, and what is not working today. The call is free.": "Cuéntanos de tu negocio, tus metas y lo que hoy no está funcionando. La llamada es gratis.",
  "Get your plan": "Recibe tu plan",
  "We send a proposal with only the services you need and a clear price for each part.": "Te enviamos una propuesta solo con los servicios que necesitas y un precio claro para cada parte.",
  "We build and launch": "Lo armamos y lo lanzamos",
  "Once you approve it, we get to work. Most projects launch within 7 to 14 business days.": "Cuando la apruebas, nos ponemos a trabajar. La mayoría de los proyectos se lanzan en un plazo de 7 a 14 días hábiles.",
  "Three things decide what your plan costs.": "Tres cosas definen cuánto cuesta tu plan.",
  "What drives the price": "Qué determina el precio",
  "Ad budget and management": "Presupuesto de anuncios y gestión",
  "These are two separate numbers. Your ad budget is what goes to Meta to show your ads. Our fee covers planning, building, and managing the campaigns. We go over both on the call.": "Son dos números distintos. Tu presupuesto de anuncios es lo que va a Meta para mostrar tus anuncios. Nuestra tarifa cubre planear, armar y gestionar las campañas. Revisamos ambos en la llamada.",
  "Which services are included": "Qué servicios se incluyen",
  "Ads on their own cost less than ads plus a new website, a CRM, and follow-up. We only quote the pieces you need.": "Los anuncios solos cuestan menos que los anuncios con un sitio web nuevo, un CRM y seguimiento. Solo cotizamos las piezas que necesitas.",
  "Number of locations": "Cantidad de sucursales",
  "Each location needs its own targeting, pages, and tracking. More locations means more work to set up and manage.": "Cada sucursal necesita su propia segmentación, sus páginas y su medición. Más sucursales significa más trabajo de configuración y gestión.",
  "Most plans start with Meta ads. The rest is there to make the ads pay off.": "La mayoría de los planes empieza con anuncios en Meta. Lo demás está para que los anuncios rindan.",
  "What can be included": "Qué se puede incluir",
  "Meta ads management": "Gestión de anuncios en Meta",
  "Facebook and Instagram campaigns planned, built, and managed for you.": "Campañas en Facebook e Instagram que planeamos, armamos y gestionamos por ti.",
  "Website": "Sitio web",
  "A site or landing page built to turn ad clicks into calls and bookings.": "Un sitio o una página de destino hecha para convertir los clics de tus anuncios en llamadas y reservas.",
  "Social media": "Redes sociales",
  "Regular content so your profiles look active when people check you out.": "Contenido constante para que tus perfiles se vean activos cuando la gente te busca.",
  "CRM": "CRM",
  "One place to see every lead and where each one stands.": "Un solo lugar para ver cada prospecto y en qué punto está.",
  "Follow-up automation": "Seguimiento automático",
  "Texts, emails, and reminders that go out on time without anyone having to remember.": "Mensajes de texto, correos y recordatorios que salen a tiempo sin que nadie tenga que acordarse.",
  "You only pay for what you need": "Solo pagas por lo que necesitas",
  "No bundles padded with extras you will never use.": "Sin paquetes inflados con extras que nunca vas a usar.",
  "It grows with you": "Crece contigo",
  "Start with the essentials and add more when it makes sense.": "Empieza con lo esencial y agrega más cuando tenga sentido.",
  "Month to month": "Mes a mes",
  "No long-term contract. You can change your services or cancel with 30 days notice.": "Sin contrato a largo plazo. Puedes cambiar tus servicios o cancelar avisando con 30 días de anticipación.",
  "Built for your industry": "Hecho para tu industria",
  "The plan follows how your business actually runs.": "El plan se adapta a cómo funciona tu negocio en la práctica.",
  "Why custom pricing": "Por qué precios a la medida",
  "A dental office and a restaurant need very different things. A fixed package would have one of them paying for work that does not help.": "Un consultorio dental y un restaurante necesitan cosas muy distintas. Con un paquete fijo, uno de los dos terminaría pagando por trabajo que no le sirve.",
  "Pricing questions": "Preguntas sobre precios",
  "How much does it cost?": "¿Cuánto cuesta?",
  "It depends on what you need. After the call we send a proposal with clear pricing and no hidden fees, so you know the full cost before you commit.": "Depende de lo que necesites. Después de la llamada te enviamos una propuesta con precios claros y sin cargos ocultos, para que conozcas el costo completo antes de comprometerte.",
  "What if I only need one or two services?": "¿Y si solo necesito uno o dos servicios?",
  "That is fine. You are not locked into a full package. We price the pieces you pick.": "No hay problema. No estás atado a un paquete completo. Cotizamos las piezas que elijas.",
  "Is the call really free?": "¿La llamada de verdad es gratis?",
  "Yes. It is a conversation about your business and whether we can help. There is no obligation to buy anything.": "Sí. Es una conversación sobre tu negocio y sobre si podemos ayudarte. No tienes ninguna obligación de comprar nada.",
  "Get a plan and a price for your business": "Recibe un plan y un precio para tu negocio",
  "Book a free call. We will learn what you need and send you a custom proposal.": "Agenda una llamada gratis. Vamos a entender qué necesitas y te enviaremos una propuesta a la medida."
 },
 "/services/automation/": {
  "Book a Free Call": "Agenda una Llamada Gratis",
  "See Meta Ads": "Ver Meta Ads",
  "Follow-up that happens on its own.": "Seguimiento que ocurre por sí solo.",
  "We set up automatic texts, emails and reminders, so every lead from your ads hears back quickly and booked customers show up.": "Configuramos mensajes, correos y recordatorios automáticos, para que cada prospecto de tus anuncios reciba respuesta rápido y los clientes agendados sí lleguen.",
  "Simple messages, sent at the right moment, written in your words.": "Mensajes sencillos, enviados en el momento correcto y escritos con tus palabras.",
  "What we automate": "Lo que automatizamos",
  "Instant reply to new leads": "Respuesta inmediata a prospectos nuevos",
  "When someone fills out a form, they get a text or email right away with the next step.": "Cuando alguien llena un formulario, recibe de inmediato un mensaje o correo con el siguiente paso.",
  "Follow-up messages": "Mensajes de seguimiento",
  "If a lead does not answer, a short series of messages checks in over the following days.": "Si un prospecto no responde, una serie corta de mensajes lo contacta en los días siguientes.",
  "Appointment reminders": "Recordatorios de citas",
  "Booked customers get a reminder before their appointment, which helps reduce no-shows.": "Los clientes agendados reciben un recordatorio antes de su cita, lo que ayuda a reducir las ausencias.",
  "Alerts for your team": "Avisos para tu equipo",
  "You get a notification when a new lead comes in, so you can reach out while they are still interested.": "Recibes un aviso cuando entra un prospecto nuevo, para que lo contactes mientras sigue interesado.",
  "Review requests": "Solicitudes de reseñas",
  "After a visit, customers get a message asking them to leave a review.": "Después de una visita, los clientes reciben un mensaje pidiéndoles que dejen una reseña.",
  "Check-ins with past customers": "Contacto con clientes anteriores",
  "Past customers get a message inviting them to come back.": "Los clientes anteriores reciben un mensaje invitándolos a regresar.",
  "Why it matters for your ads": "Por qué importa para tus anuncios",
  "You pay for every lead an ad brings in. If nobody answers for a day, that person has often moved on. Automatic follow-up makes sure each lead gets a reply, even when you are busy with customers.": "Pagas por cada prospecto que trae un anuncio. Si nadie responde en un día, esa persona muchas veces ya siguió con otra opción. El seguimiento automático asegura que cada prospecto reciba respuesta, incluso cuando estás ocupado con clientes.",
  "Written in your words": "Escrito con tus palabras",
  "Every message is written with you, so it sounds like your business.": "Cada mensaje se escribe contigo, para que suene como tu negocio.",
  "You stay in control": "Tú mantienes el control",
  "You approve the messages and the timing before anything goes out.": "Apruebas los mensajes y los tiempos antes de que se envíe cualquier cosa.",
  "Connected to your CRM": "Conectado a tu CRM",
  "Messages and replies are saved with each lead, so you can see the full history.": "Los mensajes y las respuestas se guardan con cada prospecto, para que veas todo el historial.",
  "How we set it up": "Cómo lo configuramos",
  "We map your follow-up": "Mapeamos tu seguimiento",
  "On the call we go through what should happen after someone contacts you or books.": "En la llamada repasamos qué debe pasar después de que alguien te contacta o agenda.",
  "We write and build it": "Lo escribimos y lo construimos",
  "We write the messages and connect them to your forms, calendar and CRM. Most projects launch within 7 to 14 business days.": "Escribimos los mensajes y los conectamos a tus formularios, tu calendario y tu CRM. La mayoría de los proyectos se lanzan en 7 a 14 días hábiles.",
  "We test it and switch it on": "Lo probamos y lo activamos",
  "We run test leads through every step, then turn it on and adjust as replies come in.": "Pasamos prospectos de prueba por cada paso, luego lo activamos y ajustamos según llegan las respuestas.",
  "Make sure every lead hears back.": "Asegúrate de que cada prospecto reciba respuesta.",
  "Book a free call. We will go through your current follow-up and show you what we would automate.": "Agenda una llamada gratis. Revisamos tu seguimiento actual y te mostramos qué automatizaríamos."
 },
 "/services/crm/": {
  "Book a Free Call": "Agenda una Llamada Gratis",
  "See Meta Ads": "Ver Meta Ads",
  "Every lead in one place, and none forgotten.": "Todos tus prospectos en un solo lugar, y ninguno olvidado.",
  "We set up a CRM that collects every inquiry from your ads, website and social pages, so you always know who to contact next.": "Configuramos un CRM que reúne cada consulta de tus anuncios, tu sitio web y tus redes sociales, para que siempre sepas a quién contactar después.",
  "A CRM is a shared list of every lead and customer, with notes on where each one stands.": "Un CRM es una lista compartida de cada prospecto y cliente, con notas sobre en qué punto está cada uno.",
  "What a CRM does for you": "Lo que un CRM hace por ti",
  "One list of leads": "Una sola lista de prospectos",
  "Names, phone numbers, messages and notes are kept together, not spread across inboxes and notebooks.": "Nombres, teléfonos, mensajes y notas se guardan juntos, no repartidos entre bandejas de entrada y libretas.",
  "A clear pipeline": "Un proceso claro",
  "See who is new, who has been contacted, who booked, and who became a customer.": "Mira quién es nuevo, a quién ya se contactó, quién agendó y quién se volvió cliente.",
  "Reminders to follow up": "Recordatorios de seguimiento",
  "Each lead has a next step and a date, so follow-up does not depend on memory.": "Cada prospecto tiene un siguiente paso y una fecha, para que el seguimiento no dependa de la memoria.",
  "Why it matters for your ads": "Por qué importa para tus anuncios",
  "Ads bring leads in. Without a system, some of them sit in an inbox until they lose interest. A CRM also shows which ads produced actual customers, which helps us spend your budget better.": "Los anuncios traen prospectos. Sin un sistema, algunos se quedan en una bandeja de entrada hasta que pierden el interés. Un CRM también muestra qué anuncios generaron clientes reales, lo que nos ayuda a invertir mejor tu presupuesto.",
  "Leads from Meta ad forms go straight into the CRM": "Los prospectos de los formularios de Meta entran directo al CRM",
  "Website forms and booking requests are added too": "Los formularios del sitio web y las solicitudes de reserva también se agregan",
  "Each lead is tagged with the ad or page it came from": "Cada prospecto se etiqueta con el anuncio o la página de donde vino",
  "Automatic texts and emails can start from the CRM": "Los mensajes y correos automáticos pueden iniciar desde el CRM",
  "How we set it up": "Cómo lo configuramos",
  "We map your process": "Mapeamos tu proceso",
  "On the call we go through how a lead becomes a customer in your business.": "En la llamada repasamos cómo un prospecto se convierte en cliente en tu negocio.",
  "We build and connect it": "Lo construimos y lo conectamos",
  "We set up the pipeline and connect your ads, website and forms. Most projects launch within 7 to 14 business days.": "Configuramos el proceso y conectamos tus anuncios, tu sitio web y tus formularios. La mayoría de los proyectos se lanzan en 7 a 14 días hábiles.",
  "We show you how to use it": "Te enseñamos a usarlo",
  "We walk you and your team through it, and adjust it as you start using it.": "Te lo explicamos a ti y a tu equipo, y lo ajustamos a medida que lo empiezan a usar.",
  "Already using a CRM or booking system? Tell us on the call and we will see whether we can work with what you have.": "¿Ya usas un CRM o un sistema de reservas? Cuéntanos en la llamada y vemos si podemos trabajar con lo que tienes.",
  "Stop losing track of the people who contact you.": "Deja de perderle la pista a quienes te contactan.",
  "Book a free call. We will look at how leads reach you today and show you how we would organize them.": "Agenda una llamada gratis. Revisamos cómo te llegan los prospectos hoy y te mostramos cómo los organizaríamos."
 },
 "/services/meta-ads/": {
  "Book a Free Call": "Agenda una Llamada Gratis",
  "See pricing": "Ver precios",
  "Facebook and Instagram ads that bring in local customers.": "Anuncios en Facebook e Instagram que te traen clientes locales.",
  "We plan, build and manage your Meta ads from start to finish, so people near you see your offer, reach out, and book.": "Planeamos, creamos y administramos tus anuncios de Meta de principio a fin, para que la gente cerca de ti vea tu oferta, te contacte y agende.",
  "Local businesses that want a steady flow of new customers and do not have time to run ads themselves.": "Negocios locales que quieren un flujo constante de clientes nuevos y no tienen tiempo para manejar anuncios por su cuenta.",
  "Who this is for": "Para quién es",
  "You have never run ads": "Nunca has hecho anuncios",
  "We set up everything from scratch, including your ad account, tracking and first campaign.": "Configuramos todo desde cero, incluyendo tu cuenta publicitaria, el seguimiento y tu primera campaña.",
  "You have tried boosting posts": "Has probado promocionar publicaciones",
  "Boosted posts mostly get likes. We build campaigns aimed at calls, messages and bookings.": "Las publicaciones promocionadas consiguen sobre todo likes. Nosotros creamos campañas enfocadas en llamadas, mensajes y reservas.",
  "You are running ads now": "Ya tienes anuncios activos",
  "We review what you have, keep what works, and fix what is wasting budget.": "Revisamos lo que tienes, mantenemos lo que funciona y corregimos lo que desperdicia presupuesto.",
  "Running ads is ongoing work. This is what we handle for you.": "Manejar anuncios es un trabajo continuo. Esto es lo que hacemos por ti.",
  "What we do, week to week": "Lo que hacemos, semana a semana",
  "Targeting": "Segmentación",
  "We choose who sees your ads by location, age and interests, then narrow it down as we learn who responds.": "Elegimos quién ve tus anuncios por ubicación, edad e intereses, y lo afinamos a medida que aprendemos quién responde.",
  "Creative": "Creativos",
  "We write the copy and put together the images and video. New versions go in regularly so your ads do not get stale.": "Escribimos los textos y armamos las imágenes y el video. Subimos versiones nuevas con regularidad para que tus anuncios no se desgasten.",
  "Landing page": "Página de aterrizaje",
  "Your ads send people to a page built around one offer and one action, like booking or requesting a quote.": "Tus anuncios llevan a la gente a una página hecha para una sola oferta y una sola acción, como agendar o pedir una cotización.",
  "Tracking": "Seguimiento",
  "We set up the Meta pixel and conversion tracking, so we know which ads lead to real inquiries.": "Configuramos el píxel de Meta y el seguimiento de conversiones, para saber qué anuncios generan consultas reales.",
  "Follow-up": "Seguimiento a prospectos",
  "New leads get a quick text or email and are saved in your CRM, so nobody is left waiting.": "Los prospectos nuevos reciben un mensaje o correo rápido y quedan guardados en tu CRM, para que nadie se quede esperando.",
  "Reporting": "Reportes",
  "You get a regular report in plain language. It covers what was spent, how many leads came in, and what we are changing next.": "Recibes un reporte periódico en lenguaje claro. Incluye cuánto se gastó, cuántos prospectos llegaron y qué vamos a cambiar después.",
  "How it works": "Cómo funciona",
  "Book a free call": "Agenda una llamada gratis",
  "Tell us about your business, your area, and the customers you want more of.": "Cuéntanos sobre tu negocio, tu zona y el tipo de clientes que quieres atraer.",
  "We build your campaign": "Creamos tu campaña",
  "We set up targeting, ads, the landing page and tracking. Most projects launch within 7 to 14 business days.": "Configuramos la segmentación, los anuncios, la página de aterrizaje y el seguimiento. La mayoría de los proyectos se lanzan en 7 a 14 días hábiles.",
  "We manage and improve it": "La administramos y la mejoramos",
  "Once your ads are live we watch the numbers, test new versions, and move budget to what works.": "Cuando tus anuncios están activos, revisamos los números, probamos versiones nuevas y movemos el presupuesto a lo que funciona.",
  "An ad only starts the conversation. What happens after the click decides whether you get a customer.": "Un anuncio solo inicia la conversación. Lo que pasa después del clic decide si ganas un cliente.",
  "What makes the ads pay off": "Lo que hace que los anuncios rindan",
  "Websites": "Sitios Web",
  "A fast page built around your offer, so the people who click have a clear way to book.": "Una página rápida hecha alrededor de tu oferta, para que quien haga clic tenga una forma clara de agendar.",
  "Learn more": "Más información",
  "Social Media": "Redes Sociales",
  "An active profile that gives people a reason to trust you when they look you up.": "Un perfil activo que le da a la gente una razón para confiar en ti cuando te busca.",
  "CRM": "CRM",
  "Every lead saved in one place, with a clear next step.": "Cada prospecto guardado en un solo lugar, con un siguiente paso claro.",
  "Automation": "Automatización",
  "Automatic texts, emails and reminders, so leads hear back quickly.": "Mensajes, correos y recordatorios automáticos, para que los prospectos reciban respuesta rápido.",
  "Questions about Meta ads": "Preguntas sobre los anuncios de Meta",
  "How much should I spend on ads?": "¿Cuánto debería invertir en anuncios?",
  "It depends on your area, your service, and how many new customers you can take on. We recommend a starting budget on the call. Pricing for our work is custom, and the pricing page explains how it works.": "Depende de tu zona, tu servicio y cuántos clientes nuevos puedes atender. En la llamada te recomendamos un presupuesto inicial. El precio de nuestro trabajo es personalizado, y la página de precios explica cómo funciona.",
  "How soon will I see leads?": "¿Qué tan pronto veré prospectos?",
  "Most campaigns launch within 7 to 14 business days. The first weeks are for testing which audiences and ads get a response. Results depend on your market and your offer, and we do not promise specific numbers.": "La mayoría de las campañas se lanzan en 7 a 14 días hábiles. Las primeras semanas son para probar qué audiencias y anuncios generan respuesta. Los resultados dependen de tu mercado y de tu oferta, y no prometemos cifras específicas.",
  "Do I need a website first?": "¿Necesito un sitio web primero?",
  "No. If you do not have one, or yours is not built for bookings, we can build a landing page as part of the setup.": "No. Si no tienes uno, o el tuyo no está hecho para recibir reservas, podemos crear una página de aterrizaje como parte de la configuración.",
  "Who will I be working with?": "¿Con quién voy a trabajar?",
  "You work directly with the founders, Stefano and Douglas. There is no account manager in between.": "Trabajas directamente con los fundadores, Stefano y Douglas. No hay un ejecutivo de cuenta de por medio.",
  "Do you only run ads on Facebook and Instagram?": "¿Solo hacen anuncios en Facebook e Instagram?",
  "Yes. Meta ads are our main focus. We also build the website, CRM and follow-up around them.": "Sí. Los anuncios de Meta son nuestro enfoque principal. También creamos el sitio web, el CRM y el seguimiento que los acompañan.",
  "View all FAQs": "Ver todas las preguntas",
  "Ready to get more customers from Facebook and Instagram?": "¿Listo para conseguir más clientes desde Facebook e Instagram?",
  "Book a free call. We will look at your business and tell you honestly whether Meta ads are a good fit.": "Agenda una llamada gratis. Revisamos tu negocio y te decimos con honestidad si los anuncios de Meta te convienen."
 },
 "/services/social-media/": {
  "Book a Free Call": "Agenda una Llamada Gratis",
  "See Meta Ads": "Ver Meta Ads",
  "Social media that keeps your business in front of local customers.": "Redes sociales que mantienen tu negocio frente a los clientes locales.",
  "We plan the content, write the captions, post on schedule, and reply to comments and messages, so your pages stay active without taking up your time.": "Planeamos el contenido, escribimos los textos, publicamos a tiempo y respondemos comentarios y mensajes, para que tus páginas sigan activas sin quitarte tiempo.",
  "We manage your Facebook and Instagram pages so they look cared for every week.": "Administramos tus páginas de Facebook e Instagram para que se vean cuidadas cada semana.",
  "What we handle": "De qué nos encargamos",
  "Content plan": "Plan de contenido",
  "We agree with you on what to post each month, based on your services, offers and what is coming up.": "Acordamos contigo qué publicar cada mes, según tus servicios, tus ofertas y lo que viene.",
  "Posts and captions": "Publicaciones y textos",
  "We write the captions and prepare the images and video, using real photos of your business where we can.": "Escribimos los textos y preparamos las imágenes y el video, usando fotos reales de tu negocio siempre que se pueda.",
  "Scheduling": "Programación",
  "Posts go out on a set schedule, so there are no long gaps on your page.": "Las publicaciones salen en un calendario fijo, para que tu página no tenga largos silencios.",
  "Comments and messages": "Comentarios y mensajes",
  "We reply to comments and direct messages, and pass along anyone who is ready to book.": "Respondemos comentarios y mensajes directos, y te pasamos a quien esté listo para agendar.",
  "How it supports your ads": "Cómo apoya a tus anuncios",
  "People who see your ad often check your profile before they contact you. An active page with real photos and recent posts gives them a reason to trust you.": "Quien ve tu anuncio suele revisar tu perfil antes de contactarte. Una página activa, con fotos reales y publicaciones recientes, le da una razón para confiar en ti.",
  "A profile worth visiting": "Un perfil que vale la pena visitar",
  "Recent posts show that your business is open, busy and looked after.": "Las publicaciones recientes muestran que tu negocio está abierto, activo y bien cuidado.",
  "Content we can reuse": "Contenido que podemos reutilizar",
  "Photos and videos that do well as posts can be tested as ads.": "Las fotos y videos que funcionan bien como publicaciones se pueden probar como anuncios.",
  "One consistent look": "Una imagen consistente",
  "Your posts, ads and website look and sound like the same business.": "Tus publicaciones, anuncios y sitio web se ven y se leen como el mismo negocio.",
  "Doing it yourself, or with us": "Hacerlo por tu cuenta, o con nosotros",
  "Doing it yourself": "Por tu cuenta",
  "Posting when you find the time": "Publicar cuando encuentras tiempo",
  "Coming up with new ideas every week": "Pensar ideas nuevas cada semana",
  "Messages answered late or missed": "Mensajes respondidos tarde o sin responder",
  "Posts and ads planned separately": "Publicaciones y anuncios planeados por separado",
  "With FNDI": "Con FNDI",
  "A set posting schedule": "Un calendario fijo de publicaciones",
  "Content planned ahead with you": "Contenido planeado contigo por adelantado",
  "Comments and messages answered": "Comentarios y mensajes respondidos",
  "Posts and ads working together": "Publicaciones y anuncios trabajando juntos",
  "Want your pages to stay active without the extra work?": "¿Quieres que tus páginas sigan activas sin el trabajo extra?",
  "Book a free call. We will look at your Facebook and Instagram and tell you what we would post.": "Agenda una llamada gratis. Revisamos tu Facebook e Instagram y te decimos qué publicaríamos."
 },
 "/services/websites/": {
  "Book a Free Call": "Agenda una Llamada Gratis",
  "See Meta Ads": "Ver Meta Ads",
  "A website that turns visitors into customers.": "Un sitio web que convierte visitantes en clientes.",
  "We build fast, clear websites for local businesses. Every page is designed to get a visitor to call, message, or book.": "Creamos sitios web rápidos y claros para negocios locales. Cada página está diseñada para que el visitante llame, escriba o agende.",
  "A site built for your business and your area, not a template with your logo on it.": "Un sitio hecho para tu negocio y tu zona, no una plantilla con tu logo encima.",
  "What you get": "Lo que recibes",
  "Built for phones": "Hecho para celulares",
  "Your site is designed for small screens first, then scaled up for desktop.": "Tu sitio se diseña primero para pantallas pequeñas y luego se adapta a computadora.",
  "Fast to load": "Carga rápida",
  "Clean, light pages that open quickly, so visitors do not leave before they see your offer.": "Páginas limpias y ligeras que abren rápido, para que los visitantes no se vayan antes de ver tu oferta.",
  "A clear next step": "Un siguiente paso claro",
  "Each page points to one action, such as booking, calling, or requesting a quote.": "Cada página lleva a una sola acción, como agendar, llamar o pedir una cotización.",
  "Forms and booking": "Formularios y reservas",
  "Forms and booking links connect to your CRM, so every inquiry is saved and followed up.": "Los formularios y enlaces de reserva se conectan a tu CRM, para que cada consulta quede guardada y reciba seguimiento.",
  "Search basics": "Lo básico para buscadores",
  "Page titles, descriptions and structure are set up so Google can read and list your business properly.": "Los títulos, descripciones y la estructura de las páginas se configuran para que Google pueda leer y mostrar tu negocio correctamente.",
  "Tracking": "Seguimiento",
  "We install analytics and the Meta pixel, so you can see where visitors come from and what they do.": "Instalamos analítica y el píxel de Meta, para que veas de dónde vienen los visitantes y qué hacen.",
  "Why it matters for your ads": "Por qué importa para tus anuncios",
  "An ad can only get someone to click. The page they land on decides whether they reach out. We build landing pages around a single offer, so the money you spend on ads has somewhere good to go.": "Un anuncio solo logra que alguien haga clic. La página a la que llega decide si te contacta. Creamos páginas de aterrizaje alrededor de una sola oferta, para que el dinero que inviertes en anuncios tenga un buen destino.",
  "One offer per page": "Una oferta por página",
  "A headline that matches the ad": "Un título que coincide con el anuncio",
  "A short form or booking button near the top": "Un formulario corto o botón de reserva cerca del inicio",
  "Tracking that shows which ad brought each lead": "Seguimiento que muestra qué anuncio trajo a cada prospecto",
  "How it works": "Cómo funciona",
  "Book a free call": "Agenda una llamada gratis",
  "Tell us what your business does, who your customers are, and what you want the site to do.": "Cuéntanos qué hace tu negocio, quiénes son tus clientes y qué quieres lograr con el sitio.",
  "We design and build": "Diseñamos y construimos",
  "We write the pages, design them, and connect your forms and booking. Most projects launch within 7 to 14 business days.": "Escribimos las páginas, las diseñamos y conectamos tus formularios y reservas. La mayoría de los proyectos se lanzan en 7 a 14 días hábiles.",
  "You review, we launch": "Tú revisas, nosotros lanzamos",
  "You see the site before it goes live. We make your changes, then publish it.": "Ves el sitio antes de que salga en vivo. Hacemos tus cambios y luego lo publicamos.",
  "Need a website that brings in customers?": "¿Necesitas un sitio web que te traiga clientes?",
  "Book a free call. We will look at your current site, or start from nothing, and tell you what we would build.": "Agenda una llamada gratis. Revisamos tu sitio actual, o empezamos desde cero, y te decimos qué construiríamos."
 },
 "/thank-you/": {
  "We Got Your Message": "Recibimos tu mensaje",
  "Thanks for reaching out to FNDI. We read every submission personally and will get back to you within one business day.": "Gracias por escribir a FNDI. Leemos cada mensaje personalmente y te responderemos en un día hábil.",
  "Back to Home": "Volver al inicio",
  "Text Us on WhatsApp": "Escríbenos por WhatsApp",
  "What Happens Next": "Qué sigue ahora",
  "We review your info": "Revisamos tu información",
  "We look at your business and your goals so we come prepared.": "Vemos tu negocio y tus metas para llegar preparados.",
  "We reach out to you": "Te contactamos",
  "You will hear from us by email to set up a call.": "Te escribiremos por correo para agendar una llamada.",
  "Free strategy call": "Llamada de estrategia gratis",
  "We walk you through how we would bring your business more customers.": "Te explicamos cómo le traeríamos más clientes a tu negocio."
 }
};
  for (var gp in generated) {
    pages[gp] = pages[gp] || {};
    for (var gk in generated[gp]) pages[gp][gk] = generated[gp][gk];
    // the not-found page can be served at any path
    if (gp === '/404/') for (var nk in generated[gp]) shared[nk] = shared[nk] || generated[gp][nk];
  }
  // i18n:generated:end

  // ─── Build a flat lookup for current page ───
  var path = window.location.pathname.replace(/index\.html$/,'');
  if(path !== '/' && !path.endsWith('/')) path += '/';

  function buildDict(){
    var dict = {};
    // Add shared translations
    for(var k in shared) dict[k] = shared[k];
    // Add page-specific (override shared if needed)
    var pg = pages[path];
    if(pg) for(var k2 in pg) dict[k2] = pg[k2];
    // Also check parent paths for partial matches (e.g., blog posts)
    for(var p in pages){
      if(p !== path && path.indexOf(p) === 0 && p !== '/'){
        var sub = pages[p];
        for(var k3 in sub){ if(!dict[k3]) dict[k3] = sub[k3]; }
      }
    }
    return dict;
  }

  var dict = buildDict();
  // Build reverse dictionary
  var reverseDict = {};
  for(var ek in dict) reverseDict[dict[ek]] = ek;

  // ─── DOM Translation Engine ───
  function getTextNodes(root){
    var nodes = [];
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    while(walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function translateElement(el, toLang){
    // Skip script, style, SVG elements
    var tag = el.tagName;
    if(tag === 'SCRIPT' || tag === 'STYLE' || tag === 'SVG' || tag === 'NOSCRIPT') return;

    // Handle input placeholders
    if(el.placeholder){
      var ph = el.placeholder.trim();
      if(toLang === 'es' && dict[ph]) el.placeholder = dict[ph];
      else if(toLang === 'en' && reverseDict[ph]) el.placeholder = reverseDict[ph];
    }

    // Handle select options
    if(tag === 'OPTION'){
      var ot = el.textContent.trim();
      if(toLang === 'es' && dict[ot]) el.textContent = dict[ot];
      else if(toLang === 'en' && reverseDict[ot]) el.textContent = reverseDict[ot];
      return;
    }

    // Handle elements with simple text content (no child elements with text)
    var children = el.children;
    var hasTextChildren = false;
    for(var i=0;i<children.length;i++){
      if(children[i].tagName !== 'SVG' && children[i].tagName !== 'BR' && children[i].tagName !== 'SPAN'){
        hasTextChildren = true;
        break;
      }
    }

    if(!hasTextChildren){
      // Check full text of element (trimmed)
      var fullText = el.textContent.trim();
      if(toLang === 'es' && dict[fullText]){
        replaceTextContent(el, fullText, dict[fullText]);
        return;
      } else if(toLang === 'en' && reverseDict[fullText]){
        replaceTextContent(el, fullText, reverseDict[fullText]);
        return;
      }
    }

    // Recurse into child elements
    for(var j=0;j<children.length;j++){
      translateElement(children[j], toLang);
    }

    // Handle direct text nodes
    var textNodes = [];
    for(var c = el.firstChild; c; c = c.nextSibling){
      if(c.nodeType === 3 && c.textContent.trim()) textNodes.push(c);
    }
    textNodes.forEach(function(tn){
      var t = tn.textContent.trim();
      if(toLang === 'es' && dict[t]){
        tn.textContent = tn.textContent.replace(t, dict[t]);
      } else if(toLang === 'en' && reverseDict[t]){
        tn.textContent = tn.textContent.replace(t, reverseDict[t]);
      }
    });
  }

  function replaceTextContent(el, oldText, newText){
    // Preserve child elements (SVG icons, spans etc.) while replacing text
    var childNodes = el.childNodes;
    for(var i=0;i<childNodes.length;i++){
      if(childNodes[i].nodeType === 3){
        var nt = childNodes[i].textContent;
        if(nt.trim() === oldText || nt.indexOf(oldText) !== -1){
          childNodes[i].textContent = nt.replace(oldText, newText);
          return;
        }
      }
    }
    // Fallback: if no text node found, check if element only has text
    if(childNodes.length === 1 && childNodes[0].nodeType === 3){
      childNodes[0].textContent = newText;
    }
  }

  function translatePage(lang){
    translateElement(document.body, lang);
    document.documentElement.lang = lang;

    // Update toggle buttons
    var btn = document.getElementById('fndi-lang-toggle');
    var mobBtn = document.getElementById('fndi-lang-toggle-mob');
    if(btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
    if(mobBtn) mobBtn.textContent = lang === 'es' ? 'EN 🇺🇸' : 'ES 🇲🇽';

    setLang(lang);
  }

  // ─── Toggle button injection ───
  function injectToggle(){
    // Desktop nav toggle
    var navLinks = document.querySelector('.nav-links, ul.nav-links');
    if(navLinks){
      var li = document.createElement('li');
      li.style.cssText = 'list-style:none;display:flex;align-items:center;';
      var btn = document.createElement('button');
      btn.id = 'fndi-lang-toggle';
      btn.className = 'lang-btn';
      btn.textContent = getLang() === 'es' ? 'EN' : 'ES';
      btn.setAttribute('aria-label','Switch language');
      btn.onclick = function(e){
        e.preventDefault();
        var current = document.documentElement.lang || 'en';
        translatePage(current === 'es' ? 'en' : 'es');
      };
      li.appendChild(btn);
      // Insert before the last item (Get Started CTA)
      navLinks.appendChild(li);
    }

    // Mobile menu toggle
    var mobMenu = document.querySelector('.mobile-menu, #mob-menu');
    if(mobMenu){
      var mobBtn = document.createElement('button');
      mobBtn.id = 'fndi-lang-toggle-mob';
      mobBtn.className = 'mob-lang-btn';
      mobBtn.textContent = getLang() === 'es' ? 'EN 🇺🇸' : 'ES 🇲🇽';
      mobBtn.onclick = function(e){
        e.preventDefault();
        var current = document.documentElement.lang || 'en';
        translatePage(current === 'es' ? 'en' : 'es');
      };
      // Insert before the Get Started button
      var ctaBtn = mobMenu.querySelector('.btn-primary, [href="/book/"]');
      if(ctaBtn) mobMenu.insertBefore(mobBtn, ctaBtn);
      else mobMenu.appendChild(mobBtn);
    }
  }

  // ─── Initialize ───
  function init(){
    injectToggle();
    var lang = getLang();
    if(lang === 'es'){
      translatePage('es');
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

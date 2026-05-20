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

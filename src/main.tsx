import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowRight,
  ChevronDown,
  ClipboardCheck,
  Dumbbell,
  HeartPulse,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import gsap from "gsap";
import { contactData } from "./contactData";
import "./styles.css";

const navItems = [
  ["Quiénes somos", "/#about"],
  ["Servicios", "/#services"],
  ["Centro", "/#facility"],
  ["Testimonios", "/#testimonios"],
  ["FAQ", "/#faq"],
  ["Contacto", "/#contact"],
];

const homeServiceAreas = [
  {
    id: "evaluaciones",
    number: "01",
    title: "Evaluaciones y apto físico",
    label: "Medir antes de exigir",
    description:
      "Evaluaciones integrales para conocer tu condición actual, detectar factores de riesgo y determinar si estás preparado para entrenar o competir.",
    services: ["Apto físico", "Evaluaciones precompetitivas", "Evaluaciones posturales", "Escaneo ecográfico", "Prueba cardiopulmonar"],
    cta: "Conocer evaluaciones",
    href: "/servicios#evaluaciones",
    icon: ClipboardCheck,
  },
  {
    id: "medicina-deportiva",
    number: "02",
    title: "Medicina deportiva",
    label: "Criterio profesional",
    description:
      "Atención especializada para prevenir lesiones, acompañar procesos deportivos y tomar decisiones basadas en una evaluación profesional.",
    services: ["Consultas cardiológicas", "Consultas traumatológicas", "Sport Medicine", "Seguimiento deportivo"],
    cta: "Conocer medicina deportiva",
    href: "/servicios#medicina-deportiva",
    icon: HeartPulse,
  },
  {
    id: "rendimiento",
    number: "03",
    title: "Rendimiento y prevención",
    label: "Entrenar con datos",
    description: "Evaluaciones y planes personalizados para mejorar la movilidad, la fuerza, la coordinación y la capacidad física.",
    services: ["Entrenamiento personalizado", "Gym y prevención", "Preparación física", "Pretemporada", "Postemporada", "Simulador de remo"],
    cta: "Mejorar mi rendimiento",
    href: "/servicios#rendimiento",
    icon: Dumbbell,
  },
  {
    id: "recovery",
    number: "04",
    title: "Recovery y rehabilitación",
    label: "Volver con precisión",
    description: "Protocolos personalizados para favorecer la recuperación, reducir molestias y acompañar la vuelta al entrenamiento.",
    services: ["Kinesiología", "Recovery Full", "Masajes", "Stretching", "Botas de compresión", "Criocompresión"],
    cta: "Conocer Recovery",
    href: "/servicios#recovery",
    icon: Activity,
  },
];

type ServiceDetail = {
  name: string;
  shortDescription: string | null;
  audience: string | null;
  benefits: string[];
  includes: string[];
  preparation: string | null;
  duration: string | null;
  notes: string | null;
  bookingUrl: string | null;
  image?: string | null;
  imageAlt?: string | null;
  imagePosition?: string | null;
  imageFocalPoint?: string | null;
};

type ServiceCategory = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  services: ServiceDetail[];
};

const createService = (name: string, shortDescription: string | null = null, data: Partial<ServiceDetail> = {}): ServiceDetail => ({
  name,
  shortDescription,
  audience: null,
  benefits: [],
  includes: [],
  preparation: null,
  duration: null,
  notes: null,
  bookingUrl: null,
  image: null,
  imageAlt: null,
  imagePosition: null,
  imageFocalPoint: null,
  ...data,
});

const serviceCategories: ServiceCategory[] = [
  {
    id: "evaluaciones",
    title: "Evaluaciones y diagnóstico",
    eyebrow: "Evaluar",
    description: "Instancias de medición y diagnóstico deportivo para conocer la condición física actual y orientar decisiones de entrenamiento.",
    services: [
      createService("Apto físico", "Evaluación médica destinada a determinar la aptitud para realizar actividad física de forma segura."),
      createService(
        "Evaluaciones precompetitivas",
        "Estudios orientados a conocer el estado físico del deportista antes de competir y detectar posibles factores de riesgo.",
      ),
      createService(
        "Evaluaciones posturales",
        "Análisis de la postura y la movilidad para detectar desequilibrios que puedan afectar el rendimiento o favorecer lesiones.",
      ),
      createService(
        "Escaneo ecográfico miotendinoso y ligamentario",
        "Estudio destinado a detectar factores de riesgo que afectan la continuidad y calidad del entrenamiento. Permite trabajar preventivamente antes de que aparezcan lesiones.",
      ),
      createService("Prueba de ejercicio cardiopulmonar", "Evaluación funcional para medir la respuesta del organismo durante el ejercicio.", {
        includes: [
          "Volumen ventilatorio",
          "VO₂ Máximo",
          "VCO₂",
          "Frecuencia cardíaca máxima",
          "Umbrales ventilatorios",
          "Velocidad aeróbica máxima (VAM)",
          "Economía de carrera",
          "Consumo energético",
          "Calorimetría indirecta",
        ],
      }),
    ],
  },
  {
    id: "medicina-deportiva",
    title: "Medicina deportiva",
    eyebrow: "Acompañar",
    description: "Consultas profesionales asociadas a la práctica deportiva, prevención y seguimiento del proceso físico.",
    services: [
      createService("Consultas cardiológicas", "Evaluación médica orientada a la salud cardiovascular aplicada al deporte."),
      createService("Consultas traumatológicas", "Diagnóstico y seguimiento de lesiones del aparato locomotor relacionadas con la actividad física."),
      createService("Sport Medicine", "Abordaje integral de la práctica deportiva desde la medicina especializada."),
    ],
  },
  {
    id: "rendimiento",
    title: "Entrenamiento y rendimiento",
    eyebrow: "Rendir",
    description: "Programas y evaluaciones orientadas a desarrollar capacidad física, técnica de movimiento y prevención.",
    services: [
      createService("Entrenamiento personalizado", "Programa diseñado a partir de una evaluación integral del cuerpo.", {
        includes: ["Movilidad articular", "Postura", "Tono muscular", "Plan de entrenamiento específico"],
      }),
      createService("Gym y prevención", "Programas orientados a mejorar el rendimiento y prevenir lesiones."),
      createService("Preparación física", "Programas personalizados para mejorar el rendimiento deportivo.", {
        includes: ["Pretemporada", "Postemporada", "Rendimiento deportivo"],
      }),
      createService("Programa de postemporada", "Programa orientado a incrementar el rendimiento y generar bases sólidas para la siguiente temporada.", {
        includes: [
          "10 semanas",
          "5 estímulos por semana",
          "Evaluación de objetivos",
          "Postura",
          "Movilidad articular",
          "Balance muscular",
          "Estabilidad",
          "Fuerza",
          "Coordinación",
          "Evaluación nutricional",
          "Relación de resultados con antecedentes",
          "Prueba de ejercicio cardiopulmonar",
        ],
      }),
      createService("Simulador de remo profesional", "Actividad cardiovascular y de musculación con resistencia de agua.", {
        benefits: [
          "Trabaja piernas",
          "Trabaja abdominales",
          "Trabaja brazos",
          "Trabaja espalda",
          "Mejora el trabajo cardiovascular",
          "Permite desconectar durante el entrenamiento",
        ],
      }),
    ],
  },
  {
    id: "recovery",
    title: "Recovery y rehabilitación",
    eyebrow: "Recuperar",
    description: "Recursos de kinesiología, recuperación y acompañamiento para volver al entrenamiento de forma progresiva.",
    services: [
      createService("Recovery Full", "Servicio orientado a optimizar el rendimiento deportivo y favorecer la recuperación.", {
        benefits: [
          "Favorece el retorno venoso",
          "Oxigena los tejidos",
          "Elimina rápidamente desechos metabólicos",
          "Disminuye inflamación",
          "Reduce edema",
          "Disminuye la sensación de fatiga",
          "Reduce la sensación de pesadez",
        ],
        includes: ["Evaluaciones", "Masajes miofasciales", "Stretching", "Botas de compresión", "Criocompresión"],
      }),
      createService("Kinesiología", "Sesiones personalizadas de aproximadamente una hora, complementadas con ejercicios en gimnasio cuando corresponde."),
      createService("Masajes de recuperación", "Tratamiento orientado a favorecer la recuperación muscular.", {
        benefits: [
          "Aumenta el flujo sanguíneo",
          "Favorece el drenaje linfático",
          "Alivia espasmos musculares",
          "Disminuye la rigidez",
          "Favorece la recuperación muscular",
          "Mejora la eliminación del ácido láctico",
          "Activa el sistema nervioso y muscular",
        ],
      }),
      createService("Botas de compresión", "Sistema de compresión orientado a acelerar la recuperación muscular.", {
        benefits: [
          "Acelera la recuperación",
          "Favorece el retorno venoso",
          "Oxigena los tejidos",
          "Elimina metabolitos",
          "Disminuye inflamación",
          "Reduce edema",
          "Disminuye dolor",
          "Reduce hormigueo",
          "Disminuye sensación de pesadez",
          "Optimiza la presión muscular",
          "Mejora el rendimiento",
          "Promueve bienestar",
        ],
        notes: "También recomendadas para recuperación postoperatoria de ligamentos de rodilla bajo indicación médica.",
      }),
      createService("CryoPush / Criocompresión", "Sistema que integra terapia de frío y compresión.", {
        benefits: ["Favorece la recuperación", "Indicado para lesiones osteomusculares", "Útil durante procesos postoperatorios", "Complementa la rehabilitación"],
      }),
      createService("Radiofrecuencia selectiva", "Tratamiento mediante radiofrecuencia orientado a la recuperación muscular.", {
        benefits: ["Relajación muscular", "Regeneración de tejidos", "Favorece la cicatrización", "Reduce edema", "Ayuda a aliviar el dolor"],
      }),
      createService("Sistema súper inductivo", "Tecnología basada en campos electromagnéticos de alta intensidad.", {
        benefits: ["Tratamiento del sistema neuromuscular", "Tratamiento musculoesquelético"],
      }),
    ],
  },
  {
    id: "nutricion",
    title: "Nutrición y complementarios",
    eyebrow: "Complementar",
    description: "Servicios nutricionales y complementarios confirmados para acompañar objetivos de salud, actividad física y rendimiento.",
    services: [
      createService("Nutrición", "Plan nutricional personalizado orientado a acompañar los objetivos de salud y rendimiento.", {
        includes: [
          "Evaluación clínica",
          "Evaluación de laboratorio",
          "Evaluación antropométrica",
          "Anamnesis alimentaria",
          "Diseño de pautas generales",
          "Plan de alimentación personalizado",
          "Menú semanal",
          "Plan de suplementación cuando corresponde",
        ],
      }),
      createService("Osteopatía", "Servicio disponible dentro del centro."),
      createService("Depilación definitiva para deportistas", "Servicio orientado específicamente a deportistas."),
    ],
  },
];

const faqs = [
  {
    q: "¿Cómo sé qué servicio necesito?",
    a: "El primer paso es definir tu objetivo y tu condición actual. Desde ahí se orienta la consulta hacia evaluación, medicina deportiva, rendimiento, recovery o nutrición.",
  },
  {
    q: "¿Puedo consultar si entreno o compito?",
    a: "Sí. Nova trabaja con servicios vinculados a evaluación, apto físico, entrenamiento, prevención, recuperación y acompañamiento deportivo.",
  },
  {
    q: "¿Dónde veo todos los servicios?",
    a: "La página de servicios reúne las áreas confirmadas: evaluaciones, medicina deportiva, rendimiento, recovery, nutrición y complementarios.",
  },
];

const testimonials = [
  {
    name: "Martín R.",
    source: "Testimonio",
    quote: "Llegué buscando ordenar mi recuperación y encontré un lugar preciso, moderno y muy enfocado en el deportista.",
  },
  {
    name: "Sofía M.",
    source: "Testimonio",
    quote: "La atención se siente personalizada desde el primer minuto. Evaluaron mi caso y me explicaron cada paso con mucha claridad.",
  },
  {
    name: "Juan P.",
    source: "Testimonio",
    quote: "El espacio, la tecnología y el seguimiento hacen que la recuperación se sienta como parte real del entrenamiento.",
  },
  {
    name: "Valentina G.",
    source: "Testimonio",
    quote: "Fui después de una semana intensa de competencia y la experiencia fue excelente: calma, precisión y muy buen trato.",
  },
  {
    name: "Nicolás A.",
    source: "Testimonio",
    quote: "Me gustó que no fuera una sesión genérica. Todo estuvo orientado a mi objetivo y a cómo venía entrenando.",
  },
  {
    name: "Camila S.",
    source: "Testimonio",
    quote: "Se nota un estándar alto en los detalles: el ambiente, los equipos, la comunicación y la forma de trabajar.",
  },
  {
    name: "Federico L.",
    source: "Testimonio",
    quote: "Nova transmite confianza. Es un lugar al que volvería antes y después de una competencia importante.",
  },
  {
    name: "Agustina P.",
    source: "Testimonio",
    quote: "La combinación entre evaluación, recuperación y criterio deportivo me ayudó a entender mejor qué necesitaba mi cuerpo.",
  },
  {
    name: "Tomás B.",
    source: "Testimonio",
    quote: "La experiencia es muy distinta a una consulta tradicional. Se siente como un centro pensado para rendimiento.",
  },
  {
    name: "Lucía V.",
    source: "Testimonio",
    quote: "Me fui con una sensación de orden y profesionalismo. Todo el proceso fue claro, cómodo y muy cuidado.",
  },
];

const testimonialRows = [testimonials.map((item) => ({ ...item, role: item.source }))];

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.04 2.2a9.72 9.72 0 0 0-8.42 14.6L2.5 21.8l5.1-1.07a9.74 9.74 0 1 0 4.44-18.53Zm0 1.86a7.88 7.88 0 0 1 6.68 12.05 7.88 7.88 0 0 1-10.62 2.8l-.32-.19-2.94.62.64-2.86-.21-.33a7.86 7.86 0 0 1 6.77-12.09Zm-3.14 3.7c-.18 0-.48.07-.73.35-.25.27-.96.94-.96 2.3 0 1.35.99 2.66 1.12 2.84.14.18 1.91 3.05 4.75 4.16 2.36.92 2.84.74 3.35.69.51-.05 1.66-.68 1.9-1.34.23-.66.23-1.23.16-1.34-.07-.12-.26-.18-.55-.32-.28-.14-1.66-.82-1.92-.91-.25-.1-.44-.14-.62.14-.18.28-.72.91-.88 1.1-.16.18-.33.2-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.43.12-.57.13-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.19.04-.35-.03-.49-.07-.14-.62-1.5-.85-2.06-.22-.54-.46-.47-.62-.48h-.54Z"
      />
    </svg>
  );
}

function ContactActions({ className = "" }: { className?: string }) {
  return (
    <div className={`contact-actions ${className}`}>
      <a className="button primary" href={contactData.whatsappUrl} target="_blank" rel="noopener noreferrer">
        Consultar por WhatsApp <WhatsAppIcon size={18} />
      </a>
    </div>
  );
}

function LocationMap() {
  return (
    <div className="location-map">
      <iframe src={contactData.mapsEmbedUrl} title="Ubicación de Nova Sports & Recovery" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <a className="map-link" href={contactData.mapsUrl} target="_blank" rel="noopener noreferrer">
        Cómo llegar <MapPin size={16} />
      </a>
    </div>
  );
}

function FloatingWhatsAppButton() {
  return (
    <a className="floating-whatsapp" href={contactData.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp">
      <WhatsAppIcon />
      <span>Consultar por WhatsApp</span>
    </a>
  );
}

function FooterContact() {
  const footerLinks = navItems;

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="brand" href="/#top" aria-label="Nova Sports & Recovery inicio">
          <img className="brand-logo" src="/logonova.png" alt="" aria-hidden="true" />
          <small>Sports & Recovery</small>
        </a>
        <p>Centro de Alto Rendimiento Deportivo.</p>
        <LocationMap />
      </div>
      <nav aria-label="Footer">
        {footerLinks.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="footer-contact">
        <strong>{contactData.businessName}</strong>
        <p>
          {contactData.addressStreet}
          <br />
          {contactData.addressLocality}, {contactData.addressRegion}
          <br />
          {contactData.addressDetails}
        </p>
        <p>
          {contactData.openingHoursLines[0]}
          <br />
          {contactData.openingHoursLines[1]}
        </p>
        <a href={contactData.phoneTel}>
          <Phone size={16} /> {contactData.phoneDisplay}
        </a>
        <a href={contactData.instagramUrl} target="_blank" rel="noopener noreferrer">
          <Instagram size={16} /> {contactData.instagramHandle}
        </a>
      </div>
      <p className="footer-legal">© 2026 Nova Sports & Recovery.</p>
    </footer>
  );
}

function ServiceAccordion({ service, categoryId, index }: { service: ServiceDetail; categoryId: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `${categoryId}-service-${index}`;

  return (
    <article className="service-accordion">
      <button className="service-accordion-trigger" type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
        <span>
          <small>{String(index + 1).padStart(2, "0")}</small>
          <h3>{service.name}</h3>
        </span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      <div className="service-accordion-panel" id={panelId} data-open={open}>
        {service.shortDescription && <p>{service.shortDescription}</p>}
        {service.audience && (
          <div>
            <strong>Para quién está indicado</strong>
            <p>{service.audience}</p>
          </div>
        )}
        {service.benefits.length > 0 && (
          <div>
            <strong>Beneficios</strong>
            <ul>
              {service.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {service.includes.length > 0 && (
          <div>
            <strong>Qué incluye</strong>
            <ul>
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {service.preparation && (
          <div>
            <strong>Preparación previa</strong>
            <p>{service.preparation}</p>
          </div>
        )}
        {service.duration && (
          <div>
            <strong>Duración</strong>
            <p>{service.duration}</p>
          </div>
        )}
        {service.notes && (
          <div>
            <strong>Notas</strong>
            <p>{service.notes}</p>
          </div>
        )}
        <a className="service-booking" href={service.bookingUrl ?? contactData.whatsappUrl} target="_blank" rel="noopener noreferrer">
          Solicitar turno <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}

function ServicesPage() {
  useEffect(() => {
    document.title = "Servicios de medicina deportiva y recovery | Nova Sports & Recovery";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      "Conocé los servicios de Nova Sports & Recovery: apto físico, evaluaciones deportivas, cardiología, traumatología, entrenamiento, kinesiología, recovery y nutrición.",
    );
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", "https://novasportsrecovery.com/servicios");
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", "Servicios de medicina deportiva y recovery | Nova Sports & Recovery");
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute(
        "content",
        "Conocé los servicios de Nova Sports & Recovery: apto físico, evaluaciones deportivas, cardiología, traumatología, entrenamiento, kinesiología, recovery y nutrición.",
      );
  }, []);

  useEffect(() => {
    const scrollToCurrentHash = () => {
      const targetId = window.location.hash.replace("#", "");
      if (!targetId) return;
      window.setTimeout(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
      }, 80);
    };

    scrollToCurrentHash();
    window.addEventListener("hashchange", scrollToCurrentHash);

    return () => window.removeEventListener("hashchange", scrollToCurrentHash);
  }, []);

  return (
    <main id="top" className="services-page">
      <section className="services-hero section-shell">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Inicio</a>
          <span>/</span>
          <span>Servicios</span>
        </nav>
        <p className="eyebrow">Servicios</p>
        <h1>Servicios de medicina deportiva y recovery</h1>
        <p>
          Conocé la oferta confirmada de Nova Sports & Recovery, organizada para evaluar, acompañar, entrenar y recuperar con criterio profesional.
        </p>
      </section>

      <section className="service-index section-shell" aria-label="Índice de servicios">
        {serviceCategories.map((category) => (
          <a key={category.id} href={`#${category.id}`}>
            <span>{category.eyebrow}</span>
            {category.title}
          </a>
        ))}
      </section>

      {serviceCategories.map((category) => (
        <section className="services-category section-shell" id={category.id} key={category.id}>
          <div className="services-category-heading">
            <p className="eyebrow">{category.eyebrow}</p>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
          </div>
          <div className="services-accordion-list">
            {category.services.map((service, index) => (
              <ServiceAccordion service={service} categoryId={category.id} index={index} key={service.name} />
            ))}
          </div>
        </section>
      ))}

      <section className="services-page-cta section-shell">
        <h2>¿Querés definir el servicio adecuado?</h2>
        <p>Escribinos para orientar la consulta según tu objetivo deportivo, condición actual y etapa de entrenamiento.</p>
        <a className="button primary" href={contactData.whatsappUrl} target="_blank" rel="noopener noreferrer">
          Solicitar turno <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isServicesPage = window.location.pathname === "/servicios";

  useEffect(() => {
    if (isServicesPage) return;

    const scrollToCurrentHash = () => {
      const targetId = window.location.hash.replace("#", "");
      if (!targetId) return;
      window.setTimeout(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
      }, 80);
    };

    scrollToCurrentHash();
    window.addEventListener("hashchange", scrollToCurrentHash);

    return () => window.removeEventListener("hashchange", scrollToCurrentHash);
  }, [isServicesPage]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-copy > *", { y: 34, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power3.out" });
    });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.18 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "SportsActivityLocation"],
        "@id": "https://novasportsrecovery.com/#business",
        name: contactData.businessName,
        description: "Centro de Alto Rendimiento Deportivo orientado a recuperación deportiva.",
        url: "https://novasportsrecovery.com/",
        telephone: contactData.phoneRaw,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${contactData.addressStreet}, ${contactData.addressDetails}`,
          addressLocality: contactData.addressLocality,
          addressRegion: contactData.addressRegion,
          addressCountry: contactData.addressCountry,
        },
        openingHours: "Mo-Fr 08:00-20:00",
        sameAs: [contactData.instagramUrl],
        areaServed: "Argentina",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Nova Sports & Recovery inicio">
          <img className="brand-logo" src="/logonova.png" alt="" aria-hidden="true" />
          <small>Sports & Recovery</small>
        </a>
        <nav className="desktop-nav" aria-label="Principal">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href={contactData.whatsappUrl} target="_blank" rel="noopener noreferrer">
          Reservar <ArrowRight size={16} />
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir navegación">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-panel">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      )}

      {isServicesPage ? (
        <ServicesPage />
      ) : (
      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-banner-desktop">
            <img src="/BannerHero-3840.png" alt="" />
          </div>
          <div className="hero-atmosphere" />
          <div className="hero-copy">
            <p className="eyebrow">Centro de Alto Rendimiento Deportivo</p>
            <h1 id="hero-title">Recovery lab para volver a competir mejor.</h1>
            <p className="hero-text">
              Nova Sports & Recovery combina performance, tecnología y criterio deportivo en una experiencia premium para atletas que entrenan fuerte.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={contactData.whatsappUrl} target="_blank" rel="noopener noreferrer">
                Solicitar turno <ArrowRight size={18} />
              </a>
              <a className="button secondary" href="#services">
                Ver servicios <ChevronDown size={18} />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/BannerMobile.png" alt="Nova Sports Recovery" className="hero-logo-image" />
          </div>
        </section>

        <section id="about" className="manifest section-shell" data-reveal>
          <div className="manifest-copy">
            <p className="eyebrow">No es pausa. Es preparación.</p>
            <h2>Recuperación pensada como una ventaja competitiva.</h2>
            <p>
              El atleta moderno no separa entrenamiento, descanso y ciencia. Nova se posiciona como un espacio de alto rendimiento donde cada sesión debe sentirse medida, precisa y enfocada en volver al cuerpo disponible para el próximo estímulo.
            </p>
          </div>
          <figure className="manifest-photo">
            <img src="/fotoqs.png" alt="Instalaciones de Nova Sports Recovery" />
          </figure>
        </section>

        <section id="services" className="services section-shell" data-reveal>
          <div className="section-kicker">
            <span>Servicios</span>
            <div>
              <h2>Evaluamos tu cuerpo para ayudarte a rendir mejor</h2>
              <p>
                En Nova evaluamos, medimos e investigamos con herramientas precisas para comprender tu condición física particular.
                Diseñamos estrategias para ayudarte a incorporar la actividad física, cuidar tu salud y alcanzar tus objetivos deportivos.
              </p>
            </div>
          </div>
          <div className="service-area-grid">
            {homeServiceAreas.map((area) => {
              const Icon = area.icon;
              return (
              <article className="service-area" key={area.id}>
                <div className="service-area-top">
                  <span className="service-area-number">{area.number}</span>
                  <Icon size={24} aria-hidden="true" />
                </div>
                <span className="service-area-label">{area.label}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <div className="service-area-tags" aria-label="Servicios representados">
                  {area.services.slice(0, 3).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <a className="service-area-cta" href={area.href}>
                  {area.cta} <ArrowRight size={16} />
                </a>
              </article>
              );
            })}
          </div>
          <div className="services-secondary">
            <p>También contamos con nutrición deportiva, osteopatía y otros servicios complementarios.</p>
            <a className="button secondary" href="/servicios">
              Ver todos los servicios <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section id="facility" className="facility section-shell" data-reveal>
          <div className="facility-copy">
            <p className="eyebrow">Centro</p>
            <h2>Un espacio oscuro, preciso y silencioso para bajar ruido y subir respuesta.</h2>
            <p>
              Galería preparada para fotografías reales del centro: boxes, lounge, equipamiento, staff y atletas. Hasta contar con material definitivo, las placas visuales funcionan como placeholders premium.
            </p>
          </div>
          <div className="gallery" aria-label="Galería placeholder del centro">
            <figure className="gallery-tile tile-a">
              <img src="/centro1.png" alt="Vista del centro Nova Sports Recovery" />
            </figure>
            <figure className="gallery-tile tile-b">
              <img src="/centro2.png" alt="Equipamiento del centro Nova Sports Recovery" />
            </figure>
            <figure className="gallery-tile tile-c">
              <img src="/centro3.png" alt="Espacio de atención de Nova Sports Recovery" />
            </figure>
          </div>
        </section>

        <section id="testimonios" className="testimonials" data-reveal aria-labelledby="testimonials-title">
          <div className="testimonials-heading section-shell">
            <p className="eyebrow">Testimonios</p>
            <h2 id="testimonials-title">Experiencias que hablan de rendimiento, confianza y recuperación.</h2>
          </div>
          <div className="testimonial-marquee-stack" aria-label="Testimonios destacados">
            {testimonialRows.slice(0, 1).map((row, rowIndex) => (
              <div className={`testimonial-marquee row-${rowIndex + 1}`} key={rowIndex}>
                <div className="testimonial-track">
                  {[0, 1].map((groupIndex) => (
                    <div className="testimonial-group" key={groupIndex} aria-hidden={groupIndex === 1}>
                  {row.map((item, index) => (
                    <article className="testimonial-card" key={`${item.name}-${groupIndex}-${index}`}>
                      <div className="testimonial-card-top">
                        <span className="testimonial-stars" aria-label="5 de 5 estrellas">
                          ★★★★★
                        </span>
                      </div>
                      <p>“{item.quote}”</p>
                      <div className="testimonial-author">
                        <strong>{item.name}</strong>
                      </div>
                    </article>
                  ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="faq section-shell" data-reveal>
          <p className="eyebrow">FAQ</p>
          <h2>Información clara antes de reservar.</h2>
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section id="contact" className="contact-section section-shell" data-reveal>
          <div className="contact-copy">
            <Sparkles className="closing-icon" />
            <p className="eyebrow">Contacto</p>
            <h2>Coordiná tu próxima sesión</h2>
            <p>Escribinos para consultar por evaluaciones, medicina deportiva, entrenamiento, kinesiología, recovery y nutrición.</p>
            <ContactActions />
          </div>
        </section>
      </main>
      )}

      <FloatingWhatsAppButton />
      <FooterContact />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

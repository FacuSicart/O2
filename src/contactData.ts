const whatsappMessage = "Hola, quisiera consultar por los servicios de Nova Sports & Recovery y solicitar un turno.";
const encodedAddress = "Av.%20Carabobo%20100%2C%20Buenos%20Aires%2C%20Argentina";

export const contactData = {
  businessName: "Nova Sports & Recovery",
  phoneDisplay: "+54 9 11 12345678",
  phoneRaw: "+5491112345678",
  phoneTel: "tel:+5491112345678",
  whatsappUrl: `https://api.whatsapp.com/send?phone=5491112345678&text=${encodeURIComponent(whatsappMessage)}`,
  address: "Av. Carabobo 100, Buenos Aires",
  addressStreet: "Av. Carabobo 100",
  addressLocality: "Buenos Aires",
  addressRegion: "Buenos Aires",
  addressCountry: "AR",
  addressDetails: "",
  openingHours: "Lunes a viernes de 8:00 a 20:00",
  openingHoursLines: ["Lunes a viernes", "8:00 a 20:00"],
  instagramHandle: "@novasportsrecovery",
  instagramUrl: "https://www.instagram.com/novasportsrecovery/",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${encodedAddress}&output=embed`,
};

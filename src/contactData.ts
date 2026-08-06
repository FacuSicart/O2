const whatsappMessage = "Hola, quisiera consultar por los servicios de Nova Sports & Recovery y solicitar un turno.";
const encodedAddress = "Av.%20del%20Libertador%20101%2C%20Vicente%20L%C3%B3pez%2C%20Buenos%20Aires%2C%20Argentina";

export const contactData = {
  businessName: "Nova Sports & Recovery",
  phoneDisplay: "+54 9 11 3100-0002",
  phoneRaw: "+5491131000002",
  phoneTel: "tel:+5491131000002",
  whatsappUrl: `https://api.whatsapp.com/send?phone=5491131000002&text=${encodeURIComponent(whatsappMessage)}`,
  address: "Av. del Libertador 101, Vicente López, Buenos Aires",
  addressStreet: "Av. del Libertador 101",
  addressLocality: "Vicente López",
  addressRegion: "Buenos Aires",
  addressCountry: "AR",
  addressDetails: "Complejo Al Río, Núcleo 2, Oficina 205",
  openingHours: "Lunes a viernes de 8:00 a 20:00",
  openingHoursLines: ["Lunes a viernes", "8:00 a 20:00"],
  instagramHandle: "@novasportsrecovery",
  instagramUrl: "https://www.instagram.com/novasportsrecovery/",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${encodedAddress}&output=embed`,
};

/* ============================================================
   MOLSA PREDICTIVE MODELS · ARCHIVO DE DATOS (el único que editas)

   CADA SEMANA: copia la última línea de MODELOS, pégala debajo,
   cambia la fecha (AAAA-MM-DD) y los porcentajes (deben sumar 100).
   Los modelos anteriores se guardan solos en la pestaña
   "Modelos anteriores" y en el gráfico de evolución.
   ============================================================ */

const CONFIG = {
  cafe: "https://www.buymeacoffee.com/TU_USUARIO", // <- pon aquí tu enlace de "Buy Me a Coffee"
  bonusFA: 1.0,  // Frente Amplio = suma de sus partidos x este número (1.05 = +5 % de efecto "lista unida")
};

// Datos de EJEMPLO: sustitúyelos por los de tu modelo
const MODELOS = [
  { fecha: "2026-09-13", PP: 31.8, PSOE: 26.4, VOX: 17.6, SUMAR: 6.8, POD: 3.4, ERC: 1.8, JUNTS: 1.4, BILDU: 1.4, PNV: 1.2, BNG: 0.7, CC: 0.5, UPN: 0.2, COMPROMIS: 0.5, OTROS: 6.3 },
  { fecha: "2026-09-20", PP: 32.0, PSOE: 26.1, VOX: 17.9, SUMAR: 6.7, POD: 3.3, ERC: 1.8, JUNTS: 1.4, BILDU: 1.4, PNV: 1.2, BNG: 0.7, CC: 0.5, UPN: 0.2, COMPROMIS: 0.5, OTROS: 6.3 },
  { fecha: "2026-09-27", PP: 32.3, PSOE: 25.8, VOX: 18.1, SUMAR: 6.6, POD: 3.3, ERC: 1.8, JUNTS: 1.4, BILDU: 1.4, PNV: 1.2, BNG: 0.7, CC: 0.5, UPN: 0.2, COMPROMIS: 0.5, OTROS: 6.2 },
  { fecha: "2026-10-04", PP: 32.6, PSOE: 25.6, VOX: 18.3, SUMAR: 6.6, POD: 3.3, ERC: 1.8, JUNTS: 1.4, BILDU: 1.4, PNV: 1.2, BNG: 0.7, CC: 0.5, UPN: 0.2, COMPROMIS: 0.5, OTROS: 5.9 },
];

/* Partidos que se unen en el escenario "Frente Amplio" (botón de la web).
   Quita o añade códigos a tu gusto. */
const FRENTE = ["SUMAR", "POD", "ERC", "BILDU", "COMPROMIS", "BNG"];

/* Orden izquierda -> derecha en el hemiciclo. reg = comunidades donde se presenta
   (los partidos regionales solo reciben voto ahí). */
const ORDEN = ["FA","BNG","POD","SUMAR","BILDU","ERC","COMPROMIS","PSOE","OTROS","PNV","JUNTS","CC","UPN","PP","VOX"];
const PARTIDOS = {
  PP:        { n: "PP",             c: "#2a8cf0" },
  PSOE:      { n: "PSOE",           c: "#e8331f" },
  VOX:       { n: "Vox",            c: "#5cb82a" },
  SUMAR:     { n: "Sumar",          c: "#d6389a" },
  POD:       { n: "Podemos",        c: "#b05cf0" },
  FA:        { n: "Frente Amplio",  c: "#5b1a8f" },
  ERC:       { n: "ERC",            c: "#f2a900", reg: ["CAT"] },
  JUNTS:     { n: "Junts",          c: "#16bfb0", reg: ["CAT"] },
  BILDU:     { n: "EH Bildu",       c: "#a8c814", reg: ["PV", "NAV"] },
  PNV:       { n: "PNV",            c: "#3f9e5a", reg: ["PV"] },
  BNG:       { n: "BNG",            c: "#7fbce6", reg: ["GAL"] },
  CC:        { n: "CC",             c: "#e6c800", reg: ["CNR"] },
  UPN:       { n: "UPN",            c: "#8a2132", reg: ["NAV"] },
  COMPROMIS: { n: "Compromís",      c: "#e8742a", reg: ["VAL"] },
  OTROS:     { n: "Otros",          c: "#9aa3b2" },
};
/* LOGOS: guarda el logo de cada partido en assets/logos/CODIGO.png (PP.png, PSOE.png,
   VOX.png, SUMAR.png, POD.png, FA.png, ERC.png, JUNTS.png, BILDU.png, PNV.png, BNG.png,
   CC.png, UPN.png, COMPROMIS.png). Si falta alguno, se muestra un círculo con el color. */

/* Escaños por provincia (Congreso, reparto de 2023). Cuando se publique el decreto
   de convocatoria de las próximas generales, cámbialos aquí. Deben sumar 350. */
const ESCANOS = {
  Madrid:37, Barcelona:32, Valencia:16, Alicante:12, Sevilla:12, Málaga:11, Murcia:10, Cádiz:9,
  Baleares:8, "A Coruña":8, "Las Palmas":8, Vizcaya:8, Asturias:7, Granada:7, Pontevedra:7,
  "Santa Cruz de Tenerife":7, Zaragoza:7, Almería:6, Córdoba:6, Gerona:6, Guipúzcoa:6, Tarragona:6,
  Toledo:6, Badajoz:5, Cantabria:5, Castellón:5, "Ciudad Real":5, Huelva:5, Jaén:5, Navarra:5,
  Valladolid:5, Albacete:4, Álava:4, Burgos:4, Cáceres:4, León:4, Lleida:4, Lugo:4, Ourense:4,
  "La Rioja":4, Salamanca:4, Ávila:3, Cuenca:3, Guadalajara:3, Huesca:3, Palencia:3, Segovia:3,
  Teruel:3, Zamora:3, Soria:2, Ceuta:1, Melilla:1,
};

/* Ajuste territorial de los partidos estatales por comunidad.
   Orden: [PP, PSOE, VOX, SUMAR, POD]. 1 = igual que la media nacional. */
const FACTORES = {
  GAL: [1.20, 0.95, 0.60, 0.70, 0.80], AST: [0.95, 1.10, 0.70, 1.20, 1.00],
  CAN: [1.05, 1.10, 0.70, 1.00, 0.90], PV:  [0.50, 0.90, 0.30, 0.90, 0.90],
  NAV: [0.90, 1.00, 0.70, 0.80, 0.80], RIO: [1.30, 0.90, 1.00, 0.80, 0.70],
  ARA: [1.10, 1.00, 1.00, 0.80, 0.90], CAT: [0.45, 1.10, 0.60, 1.00, 1.00],
  CYL: [1.30, 0.95, 1.00, 0.70, 0.70], MAD: [1.25, 0.80, 1.05, 1.20, 1.10],
  CLM: [1.15, 1.10, 1.15, 0.60, 0.80], VAL: [1.10, 0.95, 1.15, 0.90, 0.90],
  EXT: [1.00, 1.30, 0.95, 0.60, 0.80], AND: [1.10, 1.05, 1.00, 0.85, 1.00],
  MUR: [1.20, 0.80, 1.60, 0.40, 0.60], BAL: [1.15, 0.90, 1.00, 0.90, 0.80],
  CNR: [0.95, 1.00, 0.80, 0.90, 1.10], CYM: [1.60, 1.00, 1.40, 0.30, 0.30],
};

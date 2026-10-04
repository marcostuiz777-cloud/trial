/* ============================================================
   MOLSA PREDICTIVE MODELS · ARCHIVO DE DATOS (el único que editas)

   CADA SEMANA: copia la última línea de MODELOS, pégala debajo,
   cambia la fecha (AAAA-MM-DD) y los porcentajes. Deben sumar 100.
   Los modelos anteriores NO se borran: aparecen solos en la pestaña
   "Modelos anteriores" y en el gráfico de evolución.
   Los escaños se calculan solos (D'Hondt por provincia, umbral 3%).
   ============================================================ */

const MODELOS = [
  // Datos de EJEMPLO: sustitúyelos por los resultados de tu modelo
  { fecha: "2026-09-13", PP: 31.8, PSOE: 26.4, VOX: 17.6, SUMAR: 6.8, POD: 3.4, OTROS: 14.0 },
  { fecha: "2026-09-20", PP: 32.0, PSOE: 26.1, VOX: 17.9, SUMAR: 6.7, POD: 3.3, OTROS: 14.0 },
  { fecha: "2026-09-27", PP: 32.3, PSOE: 25.8, VOX: 18.1, SUMAR: 6.6, POD: 3.3, OTROS: 13.9 },
  { fecha: "2026-10-04", PP: 32.6, PSOE: 25.6, VOX: 18.3, SUMAR: 6.6, POD: 3.3, OTROS: 13.6 },
];

const PARTIDOS = {
  PP:    { n: "PP",      c: "#2a8cf0" },
  PSOE:  { n: "PSOE",    c: "#e8331f" },
  VOX:   { n: "Vox",     c: "#5cb82a" },
  SUMAR: { n: "Sumar",   c: "#d6389a" },
  POD:   { n: "Podemos", c: "#8f3df0" },
  OTROS: { n: "Otros",   c: "#9aa3b2" },
};

/* Ajuste territorial por comunidad: multiplica el % nacional de cada partido
   en sus provincias. Orden: [PP, PSOE, VOX, SUMAR, POD, OTROS].
   1 = igual que la media nacional. Afínalo con tu modelo. */
const FACTORES = {
  GAL: [1.20, 0.95, 0.60, 0.70, 0.80, 0.90],
  AST: [0.95, 1.10, 0.70, 1.20, 1.00, 0.50],
  CAN: [1.05, 1.10, 0.70, 1.00, 0.90, 0.50],
  PV:  [0.50, 0.90, 0.30, 0.90, 0.90, 3.20],
  NAV: [0.90, 1.00, 0.70, 0.80, 0.80, 2.00],
  RIO: [1.30, 0.90, 1.00, 0.80, 0.70, 0.30],
  ARA: [1.10, 1.00, 1.00, 0.80, 0.90, 0.80],
  CAT: [0.45, 1.10, 0.60, 1.00, 1.00, 2.80],
  CYL: [1.30, 0.95, 1.00, 0.70, 0.70, 0.30],
  MAD: [1.25, 0.80, 1.05, 1.20, 1.10, 0.10],
  CLM: [1.15, 1.10, 1.15, 0.60, 0.80, 0.10],
  VAL: [1.10, 0.95, 1.15, 0.90, 0.90, 0.80],
  EXT: [1.00, 1.30, 0.95, 0.60, 0.80, 0.10],
  AND: [1.10, 1.05, 1.00, 0.85, 1.00, 0.30],
  MUR: [1.20, 0.80, 1.60, 0.40, 0.60, 0.10],
  BAL: [1.15, 0.90, 1.00, 0.90, 0.80, 0.80],
  CNR: [0.95, 1.00, 0.80, 0.90, 1.10, 1.50],
  CYM: [1.60, 1.00, 1.40, 0.30, 0.30, 0.30],
};

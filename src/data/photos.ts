import type { Photo, PhotoKey } from "@/lib/types";

const photo = (file: string, width: number, height: number, subject: string, credit: string): Photo => ({
  src: `/images/${file}.webp`,
  width,
  height,
  subject,
  credit,
});

export const photos: Record<PhotoKey, Photo> = {
  eglise11: photo("eglise11", 1920, 1123, "Église Saint-Laurent, vue latérale", "Renhour48, CC0"),
  hero: photo("hero", 1920, 1280, "Église Saint-Laurent et pelouse", "Renhour48, CC0"),
  eglise: photo("eglise", 1280, 857, "Façade de l'église", "William Ellison, CC BY-SA 4.0"),
  modillons: photo("modillons", 1920, 1285, "Modillons de l'église", "William Ellison, CC BY-SA 4.0"),
  mairie: photo("mairie", 1280, 960, "Mairie", "Jack ma, CC BY-SA 3.0"),
  ecole: photo("ecole", 1280, 960, "Groupe scolaire", "Jack ma, CC BY-SA 3.0"),
  college: photo("college", 960, 720, "Collège", "Jack ma, CC BY-SA 3.0"),
  poste: photo("poste", 960, 720, "Bureau de poste", "Jack ma, CC BY-SA 3.0"),
  monument: photo("monument", 960, 1280, "Monument aux morts", "Jack ma, CC BY-SA 3.0"),
  gareHD: photo("gareHD", 1920, 1080, "Gare de Saint-Mariens – Saint-Yzan", "Cramos, CC BY-SA 4.0"),
  gare: photo("gare", 1280, 720, "Gare de Saint-Mariens – Saint-Yzan", "Cramos, CC BY-SA 4.0"),
  bourg: photo("bourg", 1280, 804, "Carte postale : rue principale", "domaine public"),
  lac: photo("lac", 899, 566, "Carte postale : l'étang", "domaine public"),
};

export const creditsLine =
  "Photos Wikimedia Commons : Renhour48 (CC0), William Ellison & Cramos (CC BY-SA 4.0), Jack ma (CC BY-SA 3.0), cartes postales (domaine public)";

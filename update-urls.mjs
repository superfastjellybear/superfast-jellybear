import { readFile, writeFile } from "fs/promises";
import { extname, basename } from "path";

const INPUT = "./src/App.jsx";
const OUTPUT = "./src/App.jsx";

// Mapping : nom de fichier Cloudinary (sans extension) -> dossier local dans public/Images/
const FOLDER_MAP = {
  // Volvo Orkan — Design
  "ORKAN-1_o77q2i": "VolvoConceptDesign_2026",
  "ORKAN-2_sb0nml": "VolvoConceptDesign_2026",
  "ORKAN-3_ibcd7m": "VolvoConceptDesign_2026",
  "ORKAN-4_qslaat": "VolvoConceptDesign_2026",
  "ORKAN-5_gvfoqr": "VolvoConceptDesign_2026",
  "ORKAN-6_nykrek": "VolvoConceptDesign_2026",
  "ORKAN-7_kpaxr0": "VolvoConceptDesign_2026",
  "ORKAN-8_tl4xb7": "VolvoConceptDesign_2026",

  // Volvo Orkan — Hero Visuals
  "Orkan-Beauty_1_w6rqt6": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_2_zj7ylq": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_3_kjie5a": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_4_nvp4m5": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_5_zxzyge": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_6_x1gyde": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_7_bhgg1i": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_8_j85u6m": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_9_axhdho": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_10_chkrme": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_11_b9rzuq": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_12_gbg9pi": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_13_ktwrj0": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_14_ofha7k": "VolvoConceptHeroes_2026",
  "Orkan-Beauty_15_jenall": "VolvoConceptHeroes_2026",

  // Volvo Orkan — Cinematic
  "01-Cine_ynfel7": "VolvoConceptCinematic_2026",
  "02-Cine_sbo1ql": "VolvoConceptCinematic_2026",
  "03-Cine_xnqimd": "VolvoConceptCinematic_2026",
  "04-Cine_v5mcxc": "VolvoConceptCinematic_2026",
  "05-Cine_plc9v3": "VolvoConceptCinematic_2026",
  "06-Cine_zvt1f7": "VolvoConceptCinematic_2026",
  "07-Cine_v03j5v": "VolvoConceptCinematic_2026",
  "08-Cine_agkrai": "VolvoConceptCinematic_2026",
  "09-Cine_bfaczk": "VolvoConceptCinematic_2026",

  // Hinomaru
  "Hinomaru_3_sea4ic": "Hinomaru_2026",

  // From Mood to Material (TRENDTOCMF)
  "1_d0kf2b": "TRENDTOCMF_2026",
  "2_tfpt6g": "TRENDTOCMF_2026",
  "3_i9rora": "TRENDTOCMF_2026",
  "4_mcbpmj": "TRENDTOCMF_2026",
  "5_rgpo6r": "TRENDTOCMF_2026",
  "6_qwusm4": "TRENDTOCMF_2026",
  "7_ygrjqf": "TRENDTOCMF_2026",
  "8_jehxos": "TRENDTOCMF_2026",
  "9_pfrjfg": "TRENDTOCMF_2026",
  "10_d0zpny": "TRENDTOCMF_2026",
  "11_ugk08g": "TRENDTOCMF_2026",
  "12_gy61s1": "TRENDTOCMF_2026",
  "13_nf9s3z": "TRENDTOCMF_2026",
  "14_v9fxpg": "TRENDTOCMF_2026",

  // Freework
  "NoName-1_nb4yfl": "FreeWork_2026",
  "ToyotaMr2Mk1-Illustration-1_tksbqx": "FreeWork_2026",
  "ToyotaMr2Mk1-Illustration-2_x2xm8o": "FreeWork_2026",
  "AesethicStudyNeon-1_grnuaz": "FreeWork_2026",
  "AesethicStudyNeon-2_sydant": "FreeWork_2026",
  "DesignPartsToFinalRender-1_xz60yg": "FreeWork_2026",
  "RoadsterVolvoSketch-1_gc8y5q": "FreeWork_2026",
  "RoadsterVolvoSketch-2_blsshn": "FreeWork_2026",
  "RoadsterVolvoSketch-3_p4eldp": "FreeWork_2026",
  "TOYOTA-LeMans_vwdybt": "FreeWork_2026",

  // Honda Monkey
  "1_soaban": "HondaMonkey_2026",
  "2_ebrljb": "HondaMonkey_2026",
  "3_mngzua": "HondaMonkey_2026",
  "4_q4srlo": "HondaMonkey_2026",
  "5_rfhi2y": "HondaMonkey_2026",
  "6_a0xy13": "HondaMonkey_2026",
  "7_kzju9p": "HondaMonkey_2026",
  "8_x2gk7m": "HondaMonkey_2026",
  "9_easa1o": "HondaMonkey_2026",
  "10_zpwpqp": "HondaMonkey_2026",
  "15_hknkip": "HondaMonkey_2026",
  "16_tptnhd": "HondaMonkey_2026",
  "17_lch9ib": "HondaMonkey_2026",
  "18_bwppyj": "HondaMonkey_2026",
  "19_sgp8cd": "HondaMonkey_2026",

  // Gin 44°
  "Gin44_1_yjbfta": "Gin44_2026",
  "Gin44_2_wowetd": "Gin44_2026",
  "Gin44_3_wtbt2d": "Gin44_2026",
  "Gin44_4_kjtkgp": "Gin44_2026",
  "Gin44_5_fyrtmi": "Gin44_2026",
  "Gin44_6_jl2rck": "Gin44_2026",
  "Gin44_7_ab4fnr": "Gin44_2026",
  "Gin44_8_dlyllx": "Gin44_2026",
  "Gin44_9_abb9bf": "Gin44_2026",
  "Gin44_10_tqu1o7": "Gin44_2026",
  "Gin44_11_kqgwnw": "Gin44_2026",
  "Gin44_12_o8tkxp": "Gin44_2026",
  "Gin44_13_uwqw28": "Gin44_2026",
  "Gin44_14_z2ssn7": "Gin44_2026",
  "Gin44_15_ymk3hr": "Gin44_2026",
  "Gin44_16_naauwy": "Gin44_2026",

  // 77R — Design
  "77R-Design_0_vb2nn3": "77R-SPEEDKULT-Design",
  "77R-Design_1_h9gdgm": "77R-SPEEDKULT-Design",
  "77R-Design_2_e1rkqr": "77R-SPEEDKULT-Design",
  "77R-Design_3_o4yl9d": "77R-SPEEDKULT-Design",
  "77R-Design_4_qzpin2": "77R-SPEEDKULT-Design",
  "77R-Design_5_we6z9c": "77R-SPEEDKULT-Design",
  "77R-Design_7_cj0ttp": "77R-SPEEDKULT-Design",
  "77R-Design_8_lnt9j6": "77R-SPEEDKULT-Design",
  "77R-Design_10_z4ajfz": "77R-SPEEDKULT-Design",
  "77R-Design_11_xl9uiq": "77R-SPEEDKULT-Design",
  "77R-Design_13_kll0b7": "77R-SPEEDKULT-Design",
  "77R-Design_14_jfmcue": "77R-SPEEDKULT-Design",
  "77R-Design_17_ki512s": "77R-SPEEDKULT-Design",
  "77R-Design_18_geyq3h": "77R-SPEEDKULT-Design",

  // 77R — Hero Visuals
  "77R-Hero_1_wauenk": "77R-SPEEDKULT",
  "77R-Hero_2_y1jke2": "77R-SPEEDKULT",
  "77R-Hero_4_s6danv": "77R-SPEEDKULT",
  "77R-Hero_5_afi7j1": "77R-SPEEDKULT",
  "77R-Hero_6_qzsfzg": "77R-SPEEDKULT",
  "77R-Hero_8_pykfzf": "77R-SPEEDKULT",
  "77R-Hero_9_wzvjai": "77R-SPEEDKULT",
  "77R-Hero_10_c8cguu": "77R-SPEEDKULT",
  "77R-Hero_11_ujucgb": "77R-SPEEDKULT",
  "77R-Hero_12_ssn8xf": "77R-SPEEDKULT",
  "77R-Hero_13_e05osq": "77R-SPEEDKULT",
  "77R-Hero_16_mhfy04": "77R-SPEEDKULT",
  "77R-Hero_17_jxnwbs": "77R-SPEEDKULT",
  "77R-Hero_18_z7rqd9": "77R-SPEEDKULT",
  "77R-Hero_19_dqa0lz": "77R-SPEEDKULT",
  "77R-Hero_20_wd0xig": "77R-SPEEDKULT",
  "77R-Hero_21_m0xpfs": "77R-SPEEDKULT",
  "77R-Hero_22_refj52": "77R-SPEEDKULT",
  "77R-Hero_23_rayyir": "77R-SPEEDKULT",
  "77R-Hero_24_kc2nko": "77R-SPEEDKULT",
  "77R-Hero_25_gfggif": "77R-SPEEDKULT",
  "77R-Hero_26_fbucvn": "77R-SPEEDKULT",
  "77R-Hero_28_au7mbd": "77R-SPEEDKULT",
  "77R-Hero_29_cze5f2": "77R-SPEEDKULT",

  // 25 Years — 3D Modelling
  "LEXUS-LS-MICRO-CONCEPT_1_jfdjmk": "3DModeling-3DProjectLead",
  "LEXUS-LS-MICRO-CONCEPT_2_dqiauu": "3DModeling-3DProjectLead",
  "LEXUS-LF-30_1_jxd4ud": "3DModeling-3DProjectLead",
  "LEXUS-LF-30_2_po6tvj": "3DModeling-3DProjectLead",
  "BLACKTRACK-BT-05_1_nhwhmr": "3DModeling-3DProjectLead",
  "BLACKTRACK-BT-05_2_dbbhp1": "3DModeling-3DProjectLead",
  "TOYOTA-E-RACER_2_ewiext": "3DModeling-3DProjectLead",
  "TOYOTA-E-RACER_1_c61tk5": "3DModeling-3DProjectLead",
  "TOYOTA-E-RACER_3_twekhh": "3DModeling-3DProjectLead",
  "TOYOTA-E-Palette_hckmdx": "3DModeling-3DProjectLead",
  "TOYOTA-E-CARE_2_uuxnq5": "3DModeling-3DProjectLead",
  "TOYOTA-E-CARE_1_zubkar": "3DModeling-3DProjectLead",
  "TOYOTA-MICRO-BOX_nwhkec": "3DModeling-3DProjectLead",
  "LEXUS-UX-CONCEPT_1_hogmbd": "3DModeling-3DProjectLead",
  "LEXUS-UX-CONCEPT_2_kpwy5t": "3DModeling-3DProjectLead",
  "LEXUS-Skyjet-Valerian-1_nwdfyf": "3DModeling-3DProjectLead",
  "LEXUS-LFSA-EXTER-2_v7tsyj": "3DModeling-3DProjectLead",
  "LEXUS-LFSA-EXTER_za09me": "3DModeling-3DProjectLead",
  "LEXUS-LFSA-INTER_mhirwh": "3DModeling-3DProjectLead",
  "EQUUS-BASS-770_1_heynev": "3DModeling-3DProjectLead",
  "ADVANCED-CONFIDENTIAL-ONES_zwipzn": "3DModeling-3DProjectLead",
  "AndMuchMore_tiefxk": "3DModeling-3DProjectLead",
};

// Regex pour matcher une URL Cloudinary image complète
const CLOUDINARY_IMG_RE = /https:\/\/res\.cloudinary\.com\/dwsm6vx7d\/image\/upload\/[^"]+/g;

let content = await readFile(INPUT, "utf-8");
let replaced = 0;
let missed = [];

content = content.replace(CLOUDINARY_IMG_RE, (url) => {
  // Extraire le nom de fichier (avec extension) depuis l'URL
  const filename = url.split("/").pop(); // ex: ORKAN-1_o77q2i.png
  const ext = extname(filename); // .png / .jpg / .webp
  const stem = basename(filename, ext); // ORKAN-1_o77q2i

  const folder = FOLDER_MAP[stem];
  if (!folder) {
    missed.push(stem);
    return url; // laisser inchangé si pas trouvé
  }

  replaced++;
  return `/Images/${folder}/${stem}.webp`;
});

await writeFile(OUTPUT, content, "utf-8");

console.log(`\n✓ ${replaced} URLs remplacées`);
if (missed.length > 0) {
  console.log(`\n⚠ Non trouvés dans le mapping (${missed.length}) :`);
  [...new Set(missed)].forEach((m) => console.log(`  - ${m}`));
} else {
  console.log("✓ Aucune URL manquante — migration complète !");
}

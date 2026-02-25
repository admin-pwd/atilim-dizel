/**
 * Google Sheets CSV veri katmanı – mevcut script.js ile aynı URL ve parse mantığı
 */

import Papa from 'papaparse';

export const GENERAL_INFO_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSQMMbG7JOQfSbuF_BdVDx3XOJxwU2oNPcrxi_KOs6EPfpmSH_jfqz-6unw16GABYUSVsDtXt8cL3W/pub?gid=0&single=true&output=csv';
export const SERVICES_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSQMMbG7JOQfSbuF_BdVDx3XOJxwU2oNPcrxi_KOs6EPfpmSH_jfqz-6unw16GABYUSVsDtXt8cL3W/pub?gid=503120322&single=true&output=csv';
export const FAQ_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSQMMbG7JOQfSbuF_BdVDx3XOJxwU2oNPcrxi_KOs6EPfpmSH_jfqz-6unw16GABYUSVsDtXt8cL3W/pub?gid=2057522771&single=true&output=csv';
export const REVIEWS_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSQMMbG7JOQfSbuF_BdVDx3XOJxwU2oNPcrxi_KOs6EPfpmSH_jfqz-6unw16GABYUSVsDtXt8cL3W/pub?gid=2000620792&single=true&output=csv';

export const MAP_COORDS = { lat: 41.14724384144144, lng: 27.839888293549183 };
export const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24265.795!2d27.839888293549183!3d41.14724384144144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b4b7e0c2e8f8f%3A0x0!2zQ8O2cmx1!5e0!3m2!1str!2str!4v1';
export const DIRECTIONS_URL = `https://www.google.com/maps?q=${MAP_COORDS.lat},${MAP_COORDS.lng}`;

export const DEFAULT_SERVICE_IMAGE =
  'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=800';

export async function fetchCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const text = await response.text();
    return new Promise((resolve) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (r) => resolve(r.data && r.data.length ? r.data : null),
        error: () => resolve(null),
      });
    });
  } catch {
    return null;
  }
}

export function normalizeKey(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\uFEFF/g, '')
    .trim()
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i');
}

export function getRowValue(row, keys) {
  if (!row || typeof row !== 'object') return '';
  const normalized = {};
  for (const k of Object.keys(row)) {
    const n = normalizeKey(k);
    if (n) normalized[n] = row[k];
  }
  for (const key of keys) {
    const n = normalizeKey(key);
    if (!n) continue;
    const val = normalized[n];
    if (val !== undefined && val !== null && String(val).trim() !== '') return String(val).trim();
  }
  return '';
}

function findFirstKey(infoMap, keys) {
  for (const key of keys) {
    const n = normalizeKey(key);
    if (infoMap[n]) return infoMap[n];
  }
  return '';
}

export function parseGeneralInfo(data) {
  if (!data || !data.length) return {};
  const infoMap = {};
  data.forEach((row) => {
    const key = (row.Key || row.key || '').trim().toLowerCase();
    const value = (row.Value || row.value || '').trim();
    if (key) infoMap[key] = value;
  });
  const g = (keys) => findFirstKey(infoMap, keys);
  const phone = g(['telefon', 'phone', 'telefon numarası', 'phone_display']);
  const cleanPhone = phone ? phone.replace(/\s+/g, '').replace(/[()\-]/g, '') : '';
  return {
    siteName: g(['siteadi', 'site_adi', 'site name', 'site']),
    phone,
    phoneHref: cleanPhone ? `tel:${cleanPhone}` : 'tel:',
    email: g(['email', 'e-posta', 'eposta', 'mail']),
    address: g(['adres', 'address']),
    heroTitle: g(['hero_title', 'hero başlık', 'herotitle', 'slogan']),
    heroSubtext: g(['hero_subtext', 'hero alt metin', 'heroaltmetin']),
    aboutTitle: g(['hakkımızda başlık', 'hakkimizdasbaslik', 'about_title']),
    aboutText: g(['hakkımızda metni', 'hakkimizdasmetin', 'about', 'hakkimizda']),
    workHoursWeekday: g(['çalışma hafta içi', 'calisma_haftaici', 'work_hours_weekday']),
    workHoursSaturday: g(['çalışma cumartesi', 'calisma_cumartesi', 'work_hours_saturday']),
    workHoursSunday: g(['çalışma pazar', 'calisma_pazar', 'work_hours_sunday']),
    whatsapp: g(['whatsapp_num', 'whatsapp num', 'whatsapp']),
    whatsappMsg: g(['whatsapp_msg', 'whatsapp mesaj', 'whatsapp_message']) || 'Merhaba, randevu almak istiyorum.',
    mapEmbed: g(['harita_embed', 'harita embed', 'map_embed']),
  };
}

const titleKeys = ['hizmet_adi', 'hizmet adi', 'hizmet adı', 'name', 'title', 'baslik', 'hizmet', 'servis', 'service', 'ad'];
const descKeys = ['hizmet_aciklama', 'hizmet aciklama', 'hizmet açıklama', 'description', 'aciklama', 'açıklama', 'desc', 'detay', 'content'];
const photoKeys = ['photo_url', 'photo url', 'foto linki', 'gorsel linki', 'image url', 'image_url', 'photos', 'photo', 'foto', 'resim', 'gorsel', 'image', 'img', 'foto_url', 'resim_url'];

function parseImageUrlFromCell(val) {
  const v = String(val || '').trim();
  if (!v) return '';
  const direct = /^https?:\/\/[^\s"']+/i.exec(v);
  if (direct) return direct[0];
  const formula = /=\s*IMAGE\s*\(\s*["'](https?:\/\/[^"']+)["']/i.exec(v);
  if (formula) return formula[1];
  const quoted = /["'](https?:\/\/[^"']+)["']/.exec(v);
  return quoted ? quoted[1] : '';
}

function getFirstImageUrlFromRow(row) {
  if (!row || typeof row !== 'object') return '';
  for (const k of Object.keys(row)) {
    const url = parseImageUrlFromCell(row[k]);
    if (url) return url;
  }
  return '';
}

export function toDirectImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const u = String(url).replace(/^["'\s]+|["'\s]+$/g, '').trim();
  if (!u) return '';
  let id;
  if ((id = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/.exec(u))) return `https://drive.google.com/thumbnail?id=${id[1]}&sz=w800`;
  if ((id = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/.exec(u))) return `https://drive.google.com/thumbnail?id=${id[1]}&sz=w800`;
  if ((id = /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/.exec(u))) return `https://drive.google.com/thumbnail?id=${id[1]}&sz=w800`;
  return u;
}

export function parseServices(data) {
  if (!data || !data.length) return [];
  const out = [];
  data.forEach((row) => {
    let title = getRowValue(row, titleKeys);
    let desc = getRowValue(row, descKeys);
    if (!title) {
      const keys = Object.keys(row);
      const vals = keys.map((k) => String(row[k] || '').trim()).filter(Boolean);
      title = vals[0] || '';
      if (!desc) desc = vals[1] || '';
    }
    if (!title || !String(title).trim()) return;
    let photoUrl = getRowValue(row, photoKeys);
    photoUrl = photoUrl ? parseImageUrlFromCell(photoUrl) || photoUrl : getFirstImageUrlFromRow(row);
    photoUrl = photoUrl ? toDirectImageUrl(photoUrl) : '';
    out.push({ title: title.trim(), desc: (desc || '').trim(), photoUrl: photoUrl || DEFAULT_SERVICE_IMAGE });
  });
  return out;
}

const questionKeys = ['soru (question)', 'soru', 'question'];
const answerKeys = ['cevap (answer)', 'cevap', 'answer'];

export function parseFAQs(data) {
  if (!data || !data.length) return [];
  const out = [];
  data.forEach((row) => {
    const question = getRowValue(row, questionKeys);
    const answer = getRowValue(row, answerKeys);
    if (question && answer) out.push({ question, answer });
  });
  return out;
}

export function parseReviews(data) {
  if (!data || !data.length) return [];
  const nameKeys = ['isim', 'name', 'müşteri', 'yazar'];
  const textKeys = ['yorum', 'comment', 'mesaj', 'text', 'icerik'];
  const out = [];
  data.forEach((row) => {
    const name = getRowValue(row, nameKeys) || 'Müşteri';
    const text = getRowValue(row, textKeys);
    if (text) out.push({ name, text });
  });
  return out;
}

/*
  Atılım Dizel - Ana JS Dosyası
  Manus Generation 1 tasarımı için güncellenmiş veri çekme sistemi
  Google Sheets CSV'den verileri çekmek için PapaParse kullanır.
*/

document.addEventListener("DOMContentLoaded", () => {
    // Google Sheets CSV URL'leri
    const GENERAL_INFO_URL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSQMMbG7JOQfSbuF_BdVDx3XOJxwU2oNPcrxi_KOs6EPfpmSH_jfqz-6unw16GABYUSVsDtXt8cL3W/pub?gid=0&single=true&output=csv";

    const SERVICES_URL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSQMMbG7JOQfSbuF_BdVDx3XOJxwU2oNPcrxi_KOs6EPfpmSH_jfqz-6unw16GABYUSVsDtXt8cL3W/pub?gid=503120322&single=true&output=csv";

    const REVIEWS_URL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSQMMbG7JOQfSbuF_BdVDx3XOJxwU2oNPcrxi_KOs6EPfpmSH_jfqz-6unw16GABYUSVsDtXt8cL3W/pub?gid=2000620792&single=true&output=csv";

    const FAQ_URL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSQMMbG7JOQfSbuF_BdVDx3XOJxwU2oNPcrxi_KOs6EPfpmSH_jfqz-6unw16GABYUSVsDtXt8cL3W/pub?gid=2057522771&single=true&output=csv";

    initCurrentYear();
    initNavigation();
    initFAQ();
    initContactForm();
    initQuoteForm();
    loadGeneralInfo(GENERAL_INFO_URL);
    loadServices(SERVICES_URL);
    loadFAQsFromSheet(FAQ_URL);
    loadTestimonials(REVIEWS_URL);
});

/**
 * İletişim formu: FormSubmit.co'ya native POST (JS müdahalesi yok).
 */
function initContactForm() {
    // Form action="https://formsubmit.co/osmanfaruk21@gmail.com" method="POST ile gönderiliyor.
}

/**
 * Teklif formu: FormSubmit.co'ya native POST (JS müdahalesi yok).
 */
function initQuoteForm() {
    // Form action="https://formsubmit.co/osmanfaruk21@gmail.com" method="POST ile gönderiliyor.
}

/**
 * Footer yıl bilgisini dinamik doldurur.
 */
function initCurrentYear() {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * Header scroll (transparent/solid) ve mobil menü.
 */
function initNavigation() {
    const header = document.getElementById("site-header");
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const navDesktop = document.querySelector(".nav-desktop");
    const logoLink = document.getElementById("logo-link");
    const logoIcon = document.querySelector(".logo-icon");
    const logoText = document.querySelector(".logo-text");

    if (header) {
        window.addEventListener("scroll", () => {
            const scrolled = window.scrollY > 50;
            if (scrolled) {
                header.classList.remove("header-transparent");
                header.classList.add("header-solid");
                if (logoIcon) { logoIcon.classList.remove("logo-icon-transparent"); logoIcon.classList.add("logo-icon-solid"); }
                if (logoText) { logoText.classList.remove("text-white"); logoText.classList.add("text-blue-900"); }
                if (navDesktop) { navDesktop.classList.remove("nav-desktop-transparent"); navDesktop.classList.add("nav-desktop-solid"); }
                if (mobileBtn) { mobileBtn.classList.remove("text-white"); mobileBtn.classList.add("text-slate-900"); }
            } else {
                header.classList.add("header-transparent");
                header.classList.remove("header-solid");
                if (logoIcon) { logoIcon.classList.add("logo-icon-transparent"); logoIcon.classList.remove("logo-icon-solid"); }
                if (logoText) { logoText.classList.add("text-white"); logoText.classList.remove("text-blue-900"); }
                if (navDesktop) { navDesktop.classList.add("nav-desktop-transparent"); navDesktop.classList.remove("nav-desktop-solid"); }
                if (mobileBtn) { mobileBtn.classList.add("text-white"); mobileBtn.classList.remove("text-slate-900"); }
            }
        });
    }

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener("click", () => {
            const isOpen = !mobileMenu.hidden;
            mobileMenu.hidden = isOpen;
            mobileBtn.setAttribute("aria-expanded", String(!isOpen));
        });
        mobileMenu.querySelectorAll(".mobile-menu-link").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.hidden = true;
                mobileBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Logo tıklanınca başa scroll
    if (logoLink) {
        logoLink.addEventListener("click", (e) => {
            if (window.location.hash === "" || logoLink.getAttribute("href") === "#") {
                e.preventDefault();
                document.getElementById("main-content").scrollIntoView({ behavior: "smooth" });
            }
        });
    }
}

/**
 * FAQ accordion işlevselliği
 */
function initFAQ() {
    // Mevcut event listener'ları temizle (yeniden çağrıldığında çift eklenmesin)
    const faqContainer = document.getElementById("faq-container");
    if (!faqContainer) return;

    // Tüm mevcut listener'ları kaldır ve yeniden ekle
    const faqQuestions = faqContainer.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
        // Yeni bir event listener ekle (eski olanlar varsa override edilir)
        question.onclick = () => {
            const faqItem = question.closest(".faq-item");
            const isExpanded = faqItem.getAttribute("aria-expanded") === "true";

            // Tüm FAQ'leri kapat
            document.querySelectorAll(".faq-item").forEach((item) => {
                item.setAttribute("aria-expanded", "false");
            });

            // Tıklananı aç/kapat
            if (!isExpanded) {
                faqItem.setAttribute("aria-expanded", "true");
            }
        };
    });
}

/**
 * CSV verisini çeker ve PapaParse ile parse eder.
 * Hata olursa null döner, böylece placeholder içerik kullanılmaya devam eder.
 */
async function fetchCSV(url) {
    try {
        if (typeof Papa === "undefined") {
            console.warn("PapaParse bulunamadı, CSV verisi yüklenmeyecek:", url);
            return null;
        }

        const response = await fetch(url);

        if (!response.ok) {
            console.error("CSV isteği başarısız:", response.status, url);
            return null;
        }

        const text = await response.text();

        return new Promise((resolve) => {
            Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if (!results.data || results.data.length === 0) {
                        console.warn("CSV boş veya geçersiz:", url);
                        resolve(null);
                    } else {
                        resolve(results.data);
                    }
                },
                error: (error) => {
                    console.error("PapaParse hatası:", error, url);
                    resolve(null);
                },
            });
        });
    } catch (error) {
        console.error("CSV fetch hatası:", error, url);
        return null;
    }
}

/**
 * Genel bilgiler sayfasındaki alanlara doldurulur.
 * Beklenen kolonlar: Key, Value
 */
async function loadGeneralInfo(url) {
    const data = await fetchCSV(url);
    if (!data) {
        return;
    }

    // Verileri key-value map'e çeviriyoruz
    const infoMap = {};
    data.forEach((row) => {
        const key = (row.Key || row.key || "").trim().toLowerCase();
        const value = (row.Value || row.value || "").trim();
        if (key) {
            infoMap[key] = value;
        }
    });

    // Site adı
    const siteAdi = findFirstKey(infoMap, ["siteadi", "site_adi", "site name", "site"]);
    if (siteAdi) {
        updateElement("site-name", siteAdi);
        updateElement("footer-site-name", siteAdi);
    }

    // Telefon
    const phoneKeys = ["telefon", "phone", "telefon numarası", "phone_display"];
    const phoneValue = findFirstKey(infoMap, phoneKeys);
    if (phoneValue) {
        updatePhoneNumbers(phoneValue);
    }

    // GSM
    const gsmKeys = ["gsm", "gsm_display", "mobil", "mobile"];
    const gsmValue = findFirstKey(infoMap, gsmKeys);
    if (gsmValue) {
        const gsmLink = gsmValue.replace(/\s+/g, "").replace(/[()\-]/g, "");
        updateElement("contact-gsm", gsmValue, `tel:${gsmLink}`);
    }

    // E-posta
    const emailKeys = ["email", "e-posta", "eposta", "mail"];
    const emailValue = findFirstKey(infoMap, emailKeys);
    if (emailValue) {
        updateElement("email-link", emailValue, `mailto:${emailValue}`);
        updateElement("contact-email", emailValue, `mailto:${emailValue}`);
        updateElement("footer-email", emailValue, `mailto:${emailValue}`);
    }

    // Adres
    const addressKeys = ["adres", "address"];
    const addressValue = findFirstKey(infoMap, addressKeys);
    if (addressValue) {
        updateElement("address-text", addressValue);
        updateElement("contact-address", addressValue);
        updateElement("footer-address", addressValue);
        const mobileLocation = document.getElementById("mobile-location");
        if (mobileLocation) mobileLocation.textContent = addressValue;
    }
    // Yol tarifi: Sheets'te harita_link varsa onu kullan (geçerli URL veya en,boy), yoksa varsayılan
    const defaultMapUrl = "https://www.google.com/maps?q=41.14724384144144,27.839888293549183";
    const mapLinkKeys = ["harita_link", "harita link", "map_link", "map link", "yol_tarifi", "yol tarifi", "konum_link", "directions"];
    const rawMap = findFirstKey(infoMap, mapLinkKeys);
    const trimmed = (rawMap && String(rawMap).trim()) ? String(rawMap).trim() : "";
    let mapUrl = defaultMapUrl;
    if (trimmed) {
        if (/^https?:\/\//i.test(trimmed)) {
            mapUrl = trimmed;
        } else if (/^-?\d+\.?\d*\s*,\s*-?\d+\.?\d*$/.test(trimmed.replace(/\s/g, ""))) {
            mapUrl = "https://www.google.com/maps?q=" + encodeURIComponent(trimmed.replace(/\s/g, ""));
        }
    }
    document.querySelectorAll("#hero-map-btn").forEach(function (btn) {
        btn.setAttribute("href", mapUrl);
        btn.setAttribute("target", "_blank");
        btn.setAttribute("rel", "noopener noreferrer");
    });

    // Hero etiket
    const heroBadgeKeys = ["badge"];
    const heroBadgeValue = findFirstKey(infoMap, heroBadgeKeys);
    if (heroBadgeValue) {
        updateElement("hero-badge", heroBadgeValue);
    }

    // Hero başlık
    const heroTitleKeys = ["hero_title", "hero başlık", "herotitle", "slogan"];
    const heroTitleValue = findFirstKey(infoMap, heroTitleKeys);
    if (heroTitleValue) {
        updateElement("hero-title", heroTitleValue);
    }

    // Hero alt metin
    const heroSubtextKeys = ["hero_subtext", "hero alt metin", "heroaltmetin"];
    const heroSubtextValue = findFirstKey(infoMap, heroSubtextKeys);
    if (heroSubtextValue) {
        updateElement("hero-subtext", heroSubtextValue);
    }

    // Hakkımızda
    const aboutKeys = ["hakkımızda metni", "hakkimizdasmetin", "about", "hakkimizda"];
    const aboutValue = findFirstKey(infoMap, aboutKeys);
    if (aboutValue) {
        updateElement("about-text", aboutValue);
    }

    const aboutTitleKeys = ["hakkımızda başlık", "hakkimizdasbaslik", "about_title"];
    const aboutTitleValue = findFirstKey(infoMap, aboutTitleKeys);
    if (aboutTitleValue) {
        updateElement("about-title", aboutTitleValue);
    }

    // Çalışma saatleri
    const workHoursKeys = ["çalışma hafta içi", "calisma_haftaici", "work_hours_weekday"];
    const workHoursValue = findFirstKey(infoMap, workHoursKeys);
    if (workHoursValue) {
        updateElement("work-hours-weekday", workHoursValue);
        const workHoursText = document.getElementById("work-hours-text");
        if (workHoursText) {
            const saturday = findFirstKey(infoMap, ["çalışma cumartesi", "calisma_cumartesi", "work_hours_saturday"]) || "08:30 - 19:00";
            workHoursText.textContent = `Hafta içi: ${workHoursValue} | Cumartesi: ${saturday}`;
        }
    }

    const saturdayKeys = ["çalışma cumartesi", "calisma_cumartesi", "work_hours_saturday"];
    const saturdayValue = findFirstKey(infoMap, saturdayKeys);
    if (saturdayValue) {
        updateElement("work-hours-saturday", saturdayValue);
    }

    const sundayKeys = ["çalışma pazar", "calisma_pazar", "work_hours_sunday"];
    const sundayValue = findFirstKey(infoMap, sundayKeys);
    if (sundayValue) {
        updateElement("work-hours-sunday", sundayValue);
    }

    // Footer çalışma saatleri
    if (workHoursValue) {
        updateElement("footer-hours-weekday", workHoursValue);
    }
    if (saturdayValue) {
        updateElement("footer-hours-saturday", saturdayValue);
    }
    if (sundayValue) {
        updateElement("footer-hours-sunday", sundayValue);
    }

    // Mobil menü telefon (telefon zaten updatePhoneNumbers ile güncelleniyor; mobil metin için tekrar al)
    var phoneForMobile = findFirstKey(infoMap, ["telefon", "phone", "telefon numarası", "phone_display"]);
    if (phoneForMobile) {
        var mobilePhoneText = document.getElementById("mobile-phone-text");
        if (mobilePhoneText) mobilePhoneText.textContent = phoneForMobile;
        var mobilePhoneLink = document.getElementById("mobile-phone-link");
        if (mobilePhoneLink) mobilePhoneLink.setAttribute("href", "tel:" + String(phoneForMobile).replace(/\s+/g, "").replace(/[()\-]/g, ""));
    }

    // Harita embed (iframe HTML) – Sheets’teki key: harita_embed / map_embed / harita_iframe / embed vb.
    const haritaEmbedKeys = ["harita_embed", "harita embed", "map_embed", "harita_iframe", "map_iframe", "embed", "harita", "map"];
    const haritaEmbedValue = findFirstKey(infoMap, haritaEmbedKeys);
    if (haritaEmbedValue && String(haritaEmbedValue).trim()) {
        const heroMapContainer = document.getElementById("hero-map-container");
        if (heroMapContainer) {
            heroMapContainer.innerHTML = String(haritaEmbedValue).trim();
        }
    }

    // WhatsApp
    const whatsappKeys = ["whatsapp_num", "whatsapp num", "whatsapp"];
    const whatsappValue = findFirstKey(infoMap, whatsappKeys);
    if (whatsappValue) {
        const cleanWhatsapp = whatsappValue.replace(/\s+/g, "").replace(/[()\-]/g, "");
        const whatsappMsg = findFirstKey(infoMap, ["whatsapp_msg", "whatsapp mesaj", "whatsapp_message"]) || "Merhaba, randevu almak istiyorum.";
        const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(whatsappMsg)}`;
        
        const whatsappButtons = document.querySelectorAll(".whatsapp-button, .whatsapp-float, #hero-whatsapp-btn");
        whatsappButtons.forEach((btn) => {
            btn.setAttribute("href", whatsappUrl);
        });
    }
}

/**
 * Element güncelleme yardımcı fonksiyonu
 */
function updateElement(id, text, href = null) {
    const element = document.getElementById(id);
    if (element) {
        if (href && element.tagName.toLowerCase() === "a") {
            element.textContent = text;
            element.setAttribute("href", href);
        } else {
            element.textContent = text;
        }
    }
}

/**
 * Telefon numaralarını günceller
 */
function updatePhoneNumbers(phone) {
    const cleanPhoneForHref = phone.replace(/\s+/g, "").replace(/[()\-]/g, "");

    // Header telefon
    const headerPhone = document.getElementById("header-phone");
    if (headerPhone) {
        headerPhone.setAttribute("href", `tel:${cleanPhoneForHref}`);
    }
    updateElement("header-phone-text", phone);

    // Hero telefon butonu
    const heroPhoneBtn = document.getElementById("hero-phone-btn");
    if (heroPhoneBtn) {
        heroPhoneBtn.setAttribute("href", `tel:${cleanPhoneForHref}`);
    }
    updateElement("hero-phone-text", phone);

    // İletişim telefon (liste + CTA butonu)
    updateElement("contact-phone", phone, `tel:${cleanPhoneForHref}`);
    const contactCtaPhone = document.getElementById("contact-cta-phone");
    if (contactCtaPhone) contactCtaPhone.setAttribute("href", `tel:${cleanPhoneForHref}`);
    const contactPhoneDisplay = document.getElementById("contact-phone-display");
    if (contactPhoneDisplay) contactPhoneDisplay.textContent = phone;
    updateElement("footer-phone", phone, `tel:${cleanPhoneForHref}`);
}

/** Türkçe karakterleri ASCII'ye çevirir (kolon eşlemesi için) */
function normalizeKey(str) {
    if (typeof str !== "string") return "";
    return str
        .replace(/\uFEFF/g, "")
        .trim()
        .toLowerCase()
        .replace(/ı/g, "i")
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/İ/g, "i")
        .replace(/I/g, "i");
}

/** CSV satırından anahtar adına göre (BOM/Türkçe duyarsız) değer döner */
function getRowValue(row, keys) {
    if (!row || typeof row !== "object") return "";
    const normalized = {};
    for (const k of Object.keys(row)) {
        const n = normalizeKey(k);
        if (n) normalized[n] = row[k];
    }
    for (const key of keys) {
        const n = normalizeKey(key);
        if (!n) continue;
        const val = normalized[n];
        if (val !== undefined && val !== null && String(val).trim() !== "") return String(val).trim();
    }
    return "";
}

/** Genel bilgi anahtarları (hizmet satırı sanmayalım) */
var GENEL_BILGI_KEYS = ["telefon", "email", "adres", "siteadi", "site_adi", "harita", "whatsapp", "calisma", "calisma_haftaici", "hero_title", "hakkimizda", "key", "value"];

/** Hücre değerinden görsel URL'sini çıkarır; =IMAGE("url") formülü veya düz URL kabul eder */
function parseImageUrlFromCell(val) {
    const v = String(val || "").trim();
    if (!v) return "";
    const directUrl = /^https?:\/\/[^\s"']+/i.exec(v);
    if (directUrl) return directUrl[0];
    const fromFormula = /=\s*IMAGE\s*\(\s*["'](https?:\/\/[^"']+)["']/i.exec(v);
    if (fromFormula) return fromFormula[1];
    const quotedUrl = /["'](https?:\/\/[^"']+)["']/.exec(v);
    if (quotedUrl) return quotedUrl[1];
    return "";
}

/** Satırda URL gibi görünen ilk değeri döner (foto kolonu farklı isimdeyse fallback) */
function getFirstImageUrlFromRow(row) {
    if (!row || typeof row !== "object") return "";
    for (const k of Object.keys(row)) {
        const v = String(row[k] || "").trim();
        if (!v) continue;
        const url = parseImageUrlFromCell(v);
        if (url) return url;
    }
    return "";
}

/** Satırdaki ilk ve ikinci dolu kolonun değerini döner (başlık/açıklama fallback) */
function getFirstTwoColumns(row) {
    if (!row || typeof row !== "object") return { title: "", desc: "" };
    const keys = Object.keys(row);
    const values = keys.map(function (k) {
        return String((row[k] || "")).trim();
    }).filter(Boolean);
    const title = values[0] || "";
    const desc = values[1] || "";
    if (GENEL_BILGI_KEYS.indexOf(normalizeKey(title)) >= 0) return { title: "", desc: "" };
    return { title: title, desc: desc };
}

/** Hizmetler sayfası URL (Detaylı Bilgi butonu) */
var SERVICES_PAGE_URL = "hizmetler.html";
/** Foto yoksa kullanılacak varsayılan görsel */
var DEFAULT_SERVICE_IMAGE = "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=800";

/** Görsel URL'sini temizler; Google Drive linklerini gömülebilir formata çevirir */
function toDirectImageUrl(url) {
    if (!url || typeof url !== "string") return "";
    const u = String(url).replace(/^["'\s]+|["'\s]+$/g, "").trim();
    if (!u) return "";
    var id;
    if ((id = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/.exec(u))) return "https://drive.google.com/thumbnail?id=" + id[1] + "&sz=w800";
    if ((id = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/.exec(u))) return "https://drive.google.com/thumbnail?id=" + id[1] + "&sz=w800";
    if ((id = /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/.exec(u))) return "https://drive.google.com/thumbnail?id=" + id[1] + "&sz=w800";
    return u;
}

/** Tek bir hizmet kartı: tam sayfa görsel, overlay, sağ üst ikon, altta başlık + hover’da açılan açıklama + Detaylar. Sheets: title, shortDesc, photoUrl. */
function createServiceCard(title, shortDesc, photoUrl, detailUrl) {
    detailUrl = detailUrl || SERVICES_PAGE_URL;
    const rawUrl = (photoUrl && String(photoUrl).trim()) ? photoUrl : "";
    const finalUrl = rawUrl ? toDirectImageUrl(rawUrl) : "";
    const imgSrc = finalUrl || DEFAULT_SERVICE_IMAGE;

    const card = document.createElement("a");
    card.href = detailUrl;
    card.className = "service-card service-card--home";
    card.setAttribute("aria-label", title + " – Detaylar");

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = title;
    img.loading = "lazy";
    img.className = "service-card-img";
    img.onerror = function () { this.onerror = null; this.src = DEFAULT_SERVICE_IMAGE; };
    card.appendChild(img);

    const overlay = document.createElement("div");
    overlay.className = "service-card-home-overlay";
    overlay.setAttribute("aria-hidden", "true");
    card.appendChild(overlay);

    const gradient = document.createElement("div");
    gradient.className = "service-card-home-gradient";
    gradient.setAttribute("aria-hidden", "true");
    card.appendChild(gradient);

    const iconWrap = document.createElement("div");
    iconWrap.className = "service-card-icon-wrap";
    iconWrap.setAttribute("aria-hidden", "true");
    iconWrap.innerHTML = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"/></svg>";
    card.appendChild(iconWrap);

    const content = document.createElement("div");
    content.className = "service-card-content";
    const titleEl = document.createElement("h4");
    titleEl.className = "service-card-title";
    titleEl.textContent = title;
    content.appendChild(titleEl);
    const underline = document.createElement("div");
    underline.className = "service-card-underline";
    underline.setAttribute("aria-hidden", "true");
    content.appendChild(underline);
    const cta = document.createElement("span");
    cta.className = "service-card-cta";
    cta.innerHTML = "Detayları incele <span aria-hidden=\"true\">→</span>";
    content.appendChild(cta);
    card.appendChild(content);

    return card;
}

/** Hizmetler sayfası için tek bir detay satırı: görsel + başlık + açıklama + CTA (satır satır ilerleyen detay sayfası). */
function createServiceDetailRow(title, shortDesc, photoUrl, index) {
    const rawUrl = (photoUrl && String(photoUrl).trim()) ? photoUrl : "";
    const finalUrl = rawUrl ? toDirectImageUrl(rawUrl) : "";
    const imgSrc = finalUrl || DEFAULT_SERVICE_IMAGE;

    const row = document.createElement("article");
    row.className = "service-detail-row";
    row.setAttribute("aria-labelledby", "service-detail-title-" + index);

    const inner = document.createElement("div");
    inner.className = "service-detail-row-inner" + (index % 2 === 1 ? " service-detail-row-inner--reverse" : "");

    const media = document.createElement("div");
    media.className = "service-detail-media";
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = title;
    img.loading = "lazy";
    img.onerror = function () { this.onerror = null; this.src = DEFAULT_SERVICE_IMAGE; };
    media.appendChild(img);
    inner.appendChild(media);

    const body = document.createElement("div");
    body.className = "service-detail-body";
    const titleEl = document.createElement("h2");
    titleEl.id = "service-detail-title-" + index;
    titleEl.className = "service-detail-title";
    titleEl.textContent = title;
    body.appendChild(titleEl);
    if (shortDesc && String(shortDesc).trim()) {
        const desc = document.createElement("p");
        desc.className = "service-detail-desc";
        desc.textContent = shortDesc.trim();
        body.appendChild(desc);
    }
    const ctaWrap = document.createElement("p");
    ctaWrap.className = "service-detail-cta-wrap";
    const cta = document.createElement("a");
    cta.href = "index.html#teklif-al";
    cta.className = "btn btn-primary";
    cta.textContent = "Teklif Al";
    ctaWrap.appendChild(cta);
    body.appendChild(ctaWrap);
    inner.appendChild(body);

    row.appendChild(inner);
    return row;
}

/**
 * Hizmetler listesini Google Sheets'ten doldurur.
 * Ana sayfada: grid kartlar. Hizmetler sayfasında: satır satır detay blokları.
 */
async function loadServices(url) {
    const container = document.getElementById("services-grid");
    if (!container) return;

    const data = await fetchCSV(url);
    container.innerHTML = "";

    if (data && data.length > 0) {
        console.log("Hizmetler CSV: " + data.length + " satır. Kolonlar:", Object.keys(data[0]).map(function (k) { return JSON.stringify(k); }).join(", "));
    } else {
        console.warn("Hizmetler CSV boş veya yüklenemedi.");
    }

    const titleKeys = ["hizmet_adi", "hizmet adi", "hizmet adı", "hizmetadi", "Hizmet_Adi", "name", "title", "baslik", "başlık", "hizmet", "servis", "service", "ad"];
    const descKeys = ["hizmet_aciklama", "hizmet aciklama", "hizmet açıklama", "hizmetaciklama", "Hizmet_Aciklama", "description", "aciklama", "açıklama", "desc", "detay", "content", "açıklama"];
    const photoKeys = ["photo_url", "photo url", "foto linki", "foto link", "fotograf linki", "gorsel linki", "görsel linki", "resim linki", "image url", "image_url", "photos", "Photos", "photo", "Photo", "foto", "Foto", "resim", "Resim", "gorsel", "görsel", "Görsel", "image", "Image", "img", "Img", "fotograf", "Fotograf", "fotoğraf", "resimler", "Resimler", "gorseller", "Görseller", "foto_url", "resim_url", "fotograflar"];

    const isDetailPage = container.closest && container.closest(".services-section--detail-page");
    let addedCount = 0;

    if (data && data.length > 0) {
        data.forEach((row, index) => {
            let title = getRowValue(row, titleKeys);
            let shortDesc = getRowValue(row, descKeys);
            if (!title) {
                const firstTwo = getFirstTwoColumns(row);
                title = firstTwo.title;
                if (shortDesc === "") shortDesc = firstTwo.desc;
            }
            if (!title || !String(title).trim()) {
                console.warn("Hizmet satırı atlandı (başlık yok):", index + 1);
                return;
            }
            let photoUrl = getRowValue(row, photoKeys);
            if (photoUrl) photoUrl = parseImageUrlFromCell(photoUrl) || photoUrl;
            if (!photoUrl) photoUrl = getFirstImageUrlFromRow(row);

            if (isDetailPage) {
                container.appendChild(createServiceDetailRow(title, shortDesc, photoUrl, addedCount));
            } else {
                container.appendChild(createServiceCard(title, shortDesc, photoUrl, SERVICES_PAGE_URL));
            }
            addedCount++;
        });
    }

    if (addedCount === 0) {
        console.warn("Hizmetler CSV yok veya geçerli satır yok; liste boş bırakıldı.");
    }
}

/**
 * FAQ'leri Google Sheets'teki "faq" sekmesinden yükler.
 * Beklenen kolonlar: ID, Soru (Question), Cevap (Answer), Kategori
 */
async function loadFAQsFromSheet(url) {
    const faqContainer = document.getElementById("faq-container");
    if (!faqContainer) return;

    const data = await fetchCSV(url);
    if (!data || data.length === 0) {
        return;
    }

    const questionKeys = ["soru (question)", "soru", "question"];
    const answerKeys = ["cevap (answer)", "cevap", "answer"];

    const faqs = [];
    data.forEach((row) => {
        const question = getRowValue(row, questionKeys);
        const answer = getRowValue(row, answerKeys);
        if (question && answer) {
            faqs.push({ question, answer });
        }
    });

    if (faqs.length === 0) {
        return;
    }

    faqContainer.innerHTML = "";

    faqs.forEach((faq) => {
        const faqItem = document.createElement("div");
        faqItem.className = "faq-item";
        faqItem.setAttribute("aria-expanded", "false");

        const questionBtn = document.createElement("button");
        questionBtn.type = "button";
        questionBtn.className = "faq-question";
        questionBtn.setAttribute("aria-expanded", "false");
        questionBtn.innerHTML =
            "<span>" + escapeHtml(faq.question) + "</span>" +
            '<span class="faq-icon" aria-hidden="true">▼</span>';

        const contentWrap = document.createElement("div");
        contentWrap.className = "faq-content";

        const answerDiv = document.createElement("div");
        answerDiv.className = "faq-answer";
        answerDiv.innerHTML = "<p>" + escapeHtml(faq.answer) + "</p>";

        contentWrap.appendChild(answerDiv);
        faqItem.appendChild(questionBtn);
        faqItem.appendChild(contentWrap);
        faqContainer.appendChild(faqItem);
    });

    initFAQ();
}

/**
 * FAQ'leri Google Sheets'ten yükler (Genel bilgi sayfasındaki Key/Value formatı).
 * Beklenen kolonlar: Key, Value (Key: "soru_1", "cevap_1" formatında)
 */
async function loadFAQs(url) {
    const faqContainer = document.getElementById("faq-container");
    if (!faqContainer) return;

    const data = await fetchCSV(url);
    if (!data) {
        return;
    }

    // FAQ'leri bul (soru ve cevap çiftleri)
    const faqs = [];
    const infoMap = {};
    
    data.forEach((row) => {
        const key = (row.Key || row.key || "").trim().toLowerCase();
        const value = (row.Value || row.value || "").trim();
        if (key) {
            infoMap[key] = value;
        }
    });

    // Soru ve cevap çiftlerini bul
    let index = 1;
    while (true) {
        const questionKey = `soru_${index}`;
        const answerKey = `cevap_${index}`;
        
        const question = infoMap[questionKey] || infoMap[`question_${index}`] || infoMap[`faq_soru_${index}`];
        const answer = infoMap[answerKey] || infoMap[`answer_${index}`] || infoMap[`faq_cevap_${index}`];

        if (question && answer) {
            faqs.push({ question, answer });
            index++;
        } else {
            break;
        }
    }

    // Eğer FAQ bulunduysa container'ı temizle ve ekle
    if (faqs.length > 0) {
        faqContainer.innerHTML = "";

        faqs.forEach((faq, idx) => {
            const faqItem = document.createElement("div");
            faqItem.className = "faq-item";
            faqItem.setAttribute("aria-expanded", "false");

            const questionBtn = document.createElement("button");
            questionBtn.className = "faq-question";
            questionBtn.setAttribute("aria-expanded", "false");
            questionBtn.innerHTML = `
                <span>${faq.question}</span>
                <span class="faq-icon">▼</span>
            `;

            const answerDiv = document.createElement("div");
            answerDiv.className = "faq-answer";
            answerDiv.innerHTML = `<p>${faq.answer}</p>`;

            faqItem.appendChild(questionBtn);
            faqItem.appendChild(answerDiv);
            faqContainer.appendChild(faqItem);
        });

        // FAQ event listener'larını yeniden başlat
        initFAQ();
    }
}

/**
 * Google yorumlarını Sheets'ten yükleyip #reviews-grid'e doldurur.
 * Kolonlar: isim (veya name), yorum (veya comment), tarih (veya date), yıldız (veya rating)
 */
async function loadTestimonials(url) {
    var grid = document.getElementById("reviews-grid");
    if (!grid) return;

    var data = await fetchCSV(url);
    grid.innerHTML = "";

    var nameKeys = ["isim", "name", "ad", "musteri", "yazar"];
    var commentKeys = ["yorum", "comment", "aciklama", "metin", "text"];
    var dateKeys = ["tarih", "date", "tarih_ekleme"];
    var ratingKeys = ["yildiz", "yıldız", "rating", "puan", "star"];

    function getReviewValue(row, keyLists) {
        for (var i = 0; i < keyLists.length; i++) {
            var v = getRowValue(row, keyLists[i]);
            if (v) return v;
        }
        return "";
    }

    var added = 0;
    if (data && data.length > 0) {
        data.forEach(function (row) {
            var name = getReviewValue(row, [nameKeys]);
            var comment = getReviewValue(row, [commentKeys]);
            if (!name && !comment) return;
            var date = getReviewValue(row, [dateKeys]);
            var ratingStr = getReviewValue(row, [ratingKeys]);
            var rating = parseInt(ratingStr, 10) || 5;
            if (rating < 1) rating = 1;
            if (rating > 5) rating = 5;
            var initial = (name || "?").charAt(0).toUpperCase();
            var card = document.createElement("div");
            card.className = "review-card";
            card.innerHTML =
                '<div class="review-header">' +
                '<div class="review-avatar">' + initial + '</div>' +
                '<div><h4 class="review-name">' + escapeHtml(name || "İsimsiz") + '</h4><span class="review-date">' + escapeHtml(date || "") + '</span></div>' +
                '<div class="review-google-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style="width:1.25rem;height:1.25rem;"></div>' +
                '</div>' +
                '<div class="review-stars">' + renderStars(rating) + '</div>' +
                '<div class="review-text-wrap"><p class="review-text">"' + escapeHtml(comment || "") + '"</p>' +
                '<button type="button" class="review-read-more" style="display:none;">Devamını oku</button></div>';
            grid.appendChild(card);
            added++;
        });
    }

    if (added === 0) {
        var placeholders = [
            { name: "Ahmet Y.", date: "2 hafta önce", comment: "Arıcımın çekiş problemi vardı, birçok yere gösterdim çözemediler. Atılım Dizel nokta atışı arıza tespiti ile sorunumu 1 günde çözdü. Teşekkürler.", rating: 5 },
            { name: "Mehmet D.", date: "1 ay önce", comment: "İşçilik çok temiz, fiyatlar makul. Enjektör revizyonu yaptırdım, yakıt tüketimim düştü. Güvenilir esnaf.", rating: 5 },
            { name: "Caner Ö.", date: "3 gün önce", comment: "Güler yüzlü karşılama ve profesyonel hizmet. Randevu saatine sadık kaldılar. Tavsiye ederim.", rating: 5 }
        ];
        placeholders.forEach(function (r) {
            var card = document.createElement("div");
            card.className = "review-card";
            card.innerHTML =
                '<div class="review-header">' +
                '<div class="review-avatar">' + (r.name.charAt(0)) + '</div>' +
                '<div><h4 class="review-name">' + escapeHtml(r.name) + '</h4><span class="review-date">' + r.date + '</span></div>' +
                '<div class="review-google-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style="width:1.25rem;height:1.25rem;"></div>' +
                '</div>' +
                '<div class="review-stars">' + renderStars(r.rating) + '</div>' +
                '<div class="review-text-wrap"><p class="review-text">"' + escapeHtml(r.comment) + '"</p>' +
                '<button type="button" class="review-read-more" style="display:none;">Devamını oku</button></div>';
            grid.appendChild(card);
        });
    }
    initReviewsCarousel();
}

function initReviewsCarousel() {
    var track = document.getElementById("reviews-track");
    var grid = document.getElementById("reviews-grid");
    var prevBtn = document.querySelector(".reviews-carousel-prev");
    var nextBtn = document.querySelector(".reviews-carousel-next");
    if (!track || !grid) return;

    prevBtn && prevBtn.addEventListener("click", function () {
        var cardWidth = 320;
        var card = grid.querySelector(".review-card");
        if (card) cardWidth = card.offsetWidth + 24;
        track.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });
    nextBtn && nextBtn.addEventListener("click", function () {
        var cardWidth = 320;
        var card = grid.querySelector(".review-card");
        if (card) cardWidth = card.offsetWidth + 24;
        track.scrollBy({ left: cardWidth, behavior: "smooth" });
    });

    grid.querySelectorAll(".review-card").forEach(function (card) {
        var textEl = card.querySelector(".review-text");
        var btn = card.querySelector(".review-read-more");
        if (!textEl || !btn) return;
        var len = (textEl.textContent || "").length;
        if (len > 100) btn.style.display = "block";
        btn.addEventListener("click", function () {
            var isExpanded = card.classList.toggle("review-card--expanded");
            btn.textContent = isExpanded ? "Daha az" : "Devamını oku";
        });
    });
}

function escapeHtml(text) {
    if (!text) return "";
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function renderStars(count) {
    var n = Math.min(5, Math.max(0, parseInt(count, 10) || 5));
    var html = "";
    for (var i = 0; i < 5; i++) {
        html += i < n
            ? '<span class="review-star review-star-filled" aria-hidden="true">★</span>'
            : '<span class="review-star" aria-hidden="true">★</span>';
    }
    return html;
}

/**
 * Hizmet adına göre tek renkli (monokrom) SVG ikon döndürür.
 */
function createServiceIconSvg(serviceName) {
    const name = (serviceName || "").toLowerCase();

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("service-icon-svg");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");

    let category = "default";
    if (name.includes("pompa")) category = "pump";
    else if (name.includes("enjektör") || name.includes("enjektor") || name.includes("injector")) category = "injector";
    else if (name.includes("denso") || name.includes("yetkili")) category = "denso";
    else if (name.includes("yedek") || name.includes("parça") || name.includes("parca") || name.includes("spare")) category = "spare";
    else if (name.includes("bakım") || name.includes("bakim") || name.includes("periyodik") || name.includes("maintenance")) category = "maintenance";
    else if (name.includes("test") || name.includes("kalibrasyon") || name.includes("ayar")) category = "calibration";
    else if (name.includes("tamir") || name.includes("onarım") || name.includes("onarim") || name.includes("repair")) category = "repair";
    else if (name.includes("servis") || name.includes("service")) category = "service";

    if (category === "pump") {
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0-3l.7 1.8 1.9.3-1.4 1.4.3 1.9-1.8-.7-1.8.7.3-1.9-1.4-1.4 1.9-.3L12 5.5z");
        svg.appendChild(path);
    } else if (category === "injector") {
        const path1 = document.createElementNS(svgNS, "path");
        path1.setAttribute("d", "M8 7l6 6 2-2-6-6-2 2zm6 6-2 2");
        svg.appendChild(path1);
        const path2 = document.createElementNS(svgNS, "path");
        path2.setAttribute("d", "M14 15.5c0 1.1-.9 2-2 2");
        svg.appendChild(path2);
    } else if (category === "denso") {
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M8.5 12.5 11 15l4.5-5.5");
        svg.appendChild(path);
    } else if (category === "spare") {
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", "8");
        rect.setAttribute("y", "8");
        rect.setAttribute("width", "8");
        rect.setAttribute("height", "6");
        rect.setAttribute("rx", "1.2");
        svg.appendChild(rect);
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", "8");
        line.setAttribute("y1", "10");
        line.setAttribute("x2", "16");
        line.setAttribute("y2", "10");
        svg.appendChild(line);
    } else if (category === "maintenance" || category === "repair") {
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M9 9.5a2.2 2.2 0 0 0 3.1 2.7l3.4 3.4-1.4 1.4-3.4-3.4A2.2 2.2 0 0 0 9 9.5z");
        svg.appendChild(path);
    } else if (category === "calibration") {
        const line1 = document.createElementNS(svgNS, "line");
        line1.setAttribute("x1", "8");
        line1.setAttribute("y1", "9");
        line1.setAttribute("x2", "16");
        line1.setAttribute("y2", "9");
        svg.appendChild(line1);
        const line2 = document.createElementNS(svgNS, "line");
        line2.setAttribute("x1", "9");
        line2.setAttribute("y1", "9");
        line2.setAttribute("x2", "9");
        line2.setAttribute("y2", "12");
        svg.appendChild(line2);
        const line3 = document.createElementNS(svgNS, "line");
        line3.setAttribute("x1", "11");
        line3.setAttribute("y1", "9");
        line3.setAttribute("x2", "11");
        line3.setAttribute("y2", "11");
        svg.appendChild(line3);
        const line4 = document.createElementNS(svgNS, "line");
        line4.setAttribute("x1", "13");
        line4.setAttribute("y1", "9");
        line4.setAttribute("x2", "13");
        line4.setAttribute("y2", "12");
        svg.appendChild(line4);
        const line5 = document.createElementNS(svgNS, "line");
        line5.setAttribute("x1", "15");
        line5.setAttribute("y1", "9");
        line5.setAttribute("x2", "15");
        line5.setAttribute("y2", "11");
        svg.appendChild(line5);
    } else if (category === "service") {
        const path1 = document.createElementNS(svgNS, "path");
        path1.setAttribute("d", "M7 13.5h10l-1-3.5H8l-1 3.5zm0 0v1.5m10-1.5v1.5");
        svg.appendChild(path1);
        const circle1 = document.createElementNS(svgNS, "circle");
        circle1.setAttribute("cx", "9.5");
        circle1.setAttribute("cy", "16.5");
        circle1.setAttribute("r", "1");
        svg.appendChild(circle1);
        const circle2 = document.createElementNS(svgNS, "circle");
        circle2.setAttribute("cx", "18.5");
        circle2.setAttribute("cy", "16.5");
        circle2.setAttribute("r", "1");
        svg.appendChild(circle2);
    } else {
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M10 8.5a2.2 2.2 0 0 0 3 2.6l1.9 1.9-1.4 1.4-1.9-1.9A2.2 2.2 0 0 0 10 8.5z");
        svg.appendChild(path);
    }

    return svg;
}

/**
 * Verilen key listesinde, infoMap içinde ilk bulunan değeri döner.
 */
function findFirstKey(infoMap, keys) {
    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(infoMap, key)) {
            return infoMap[key];
        }
    }
    return "";
}

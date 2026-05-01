/**
 * F4 — MT Datasheet PDF Generator v6.0
 * Multi-language: English / Arabic / Spanish
 * MT corporate identity (replicating MTFT_XXXX format)
 */
window.MT_Datasheet = (function(){
  
  // === MT CORPORATE COLORS (matching site CSS) ===
  // From assets/styles.css: --mt-blue: #2E78D2, --mt-blue-dark: #1F5AA8, etc.
  const MT_BLUE_DEEP = [15, 47, 92];      // #0F2F5C - hero navy, deep brand
  const MT_BLUE_DARK = [31, 90, 168];     // #1F5AA8 - topbar, section headers
  const MT_BLUE = [46, 120, 210];         // #2E78D2 - primary brand blue
  const MT_BLUE_LIGHT_TONE = [74, 149, 232]; // #4A95E8 - hover states
  const MT_BLUE_PALE = [232, 240, 251];   // #E8F0FB - tints
  const MT_INK = [20, 33, 61];            // #14213D - body text
  const MT_INK_SOFT = [74, 85, 104];      // #4A5568 - secondary text
  const MT_ACCENT = [217, 79, 46];        // #D94F2E - accent orange/red
  // Legacy aliases for existing references
  const MT_NAVY_DARK = MT_BLUE_DEEP;
  const MT_BLUE_FOOTER = MT_BLUE_DARK;
  const MT_BLUE_LIGHT = [180, 200, 230];
  const MT_RED_FLAG = [170, 21, 27];
  const MT_YELLOW_FLAG = [241, 191, 0];
  const MT_RED_ACCENT = MT_ACCENT;
  const SLATE_900 = [15, 23, 42];
  const SLATE_700 = [51, 65, 85];
  const SLATE_500 = [100, 116, 139];
  const SLATE_400 = [148, 163, 184];
  const SLATE_300 = [203, 213, 225];
  const SLATE_100 = [241, 245, 249];
  const SLATE_50 = [248, 250, 252];
  const WARN_YELLOW = [253, 224, 71];
  
  const W = 210;
  const H = 297;
  
  // ==========================================================
  // TRANSLATIONS
  // ==========================================================
  const T = {
    en: {
      productDatasheet: "PRODUCT DATASHEET",
      revisionUpdate: "REVISION:",
      page: "Page",
      of: "of",
      sku: "SKU",
      family: "Family",
      indicativePriceUAE: "INDICATIVE PRICE — UAE",
      exclVAT: "Excl. UAE VAT 5%",
      volumeDiscountsAvailable: "Volume discounts available",
      mtSeries: "MT SERIES",
      description: "DESCRIPTION",
      technicalDataSheet: "Technical data sheet",
      ceMarked: "CE",
      ceMarkedSub: "MARKED",
      antiCorrosion: "ANTI CORROSION",
      antiRust: "ANTI RUST",
      designedInSpain: "100% DESIGNED",
      inSpain: "IN SPAIN",
      pedDirective: "PED 2014/68/EU",
      pressureDirective: "Pressure Directive",
      iso9001: "ISO 9001",
      qualityManagement: "Quality Management",
      productImage: "Product image",
      visitWeb: "Visit web for full gallery",
      specifications: "Specifications",
      characteristic: "Feature",
      value: "Value",
      materials: "Materials",
      no: "No.",
      name: "Name",
      material: "Material",
      quality: "Quality",
      volumePricingUAE: "Volume Pricing UAE (B2B Discounts)",
      quantity: "Quantity",
      unitPriceAED: "Unit Price (AED)",
      discount: "Discount",
      base: "Base",
      contactUs: "Contact us",
      customQuote: "Custom Quote",
      tierNote: "Indicative tiered pricing for UAE. Final prices subject to project conditions and stock.",
      aboutMT: "About MT",
      aboutText: "Since 1994, MT designs, manufactures and markets valves and fittings for the hydrosanitary and industrial sector. 4,000+ references across 50+ countries.",
      reservationText: "MT Business Key, S.L. keeps the right to modify in part or totally the characteristics of its products without previous notice.",
      warningText1: "To avoid abnormal operation, accidents or serious injury,",
      warningText2: "DO NOT use this product outside of the specification range.",
      warningText3: "Local regulations may regulate the use of this product.",
      hqCompany: "MT Business Key, S.L.",
      hqAddress1: "Polígono Sector Camps d'en Ricard",
      hqAddress2: "C/ Comerç, 10, naves 4-9 · 08780 Pallejà – Barcelona – Spain",
      hqContact: "Tel. +34 936 804 980 / +34 936 804 981 · ventas@mtspain.net · mtspain.net",
      uaeCompany: "MT Middle East — UAE Branch",
      uaeAddress1: "BR Dynamic Solutions LLC",
      uaeAddress2: "Jumeirah Lakes Towers · Dubai · UAE",
      uaeContact: "Tel. +971 4 453 4693 · sales@mtmiddleeast.com",
      // Material translations
      brass: "Brass",
      stainlessSteel: "Stainless Steel",
      dzrBrass: "DZR Brass",
      ductileIron: "Ductile Cast Iron",
      // Family translations
      ballValves: "Ball Valves",
      butterflyValves: "Butterfly Valves",
      checkValves: "Check Valves",
      gateValves: "Gate Valves",
      angleValves: "Angle Valves",
      bibcocks: "Bibcocks",
      strainers: "Strainers",
      expansionJoints: "Expansion Joints",
      // Description templates
      ballValveDesc: (pn, mat) => `Ball valve ${pn} with ${mat.toLowerCase()} body`,
      butterflyValveDesc: (pn, mat) => `Butterfly valve ${pn} ${mat.toLowerCase()} body`,
      checkValveDesc: (pn, mat) => `Non-return valve ${pn} ${mat.toLowerCase()} body`,
      gateValveDesc: (pn, mat) => `Gate valve ${pn} ${mat.toLowerCase()} body`,
      angleValveDesc: (pn, mat) => `Angle valve ${pn} ${mat.toLowerCase()} body`,
      bibcockDesc: (pn) => `Garden bibcock ${pn}`,
      // Specs labels
      specSize: "Size",
      specPressure: "Pressure rating",
      specConnection: "Connection",
      specBodyMaterial: "Body material",
      specOrigin: "Origin",
      specFamily: "Family",
      madeInSpain: "Made in Spain",
      // Bullet points
      bulletBodyBrass: "High-strength brass body",
      bulletBodyDZR: "DZR brass body (dezincification resistant)",
      bulletBodySS: "Stainless steel AISI 316 body",
      bulletBodyDuctile: "Ductile cast iron body",
      bulletPTFE: "PTFE seats",
      bulletStem: "S.S. stem and FKM o-ring",
      bulletThreads: "Threads according to ISO 228/1 (DIN 259)",
      bulletTemp: "Working temperature: -20º/120ºC",
      bulletPressure: (p) => `Working pressure: ${p}`,
      bulletWater: "Guaranteed for Hot/Cold drinking water applications",
      // Material table rows for ball valves (brass)
      matBody: "Body",
      matSeat: "Seat",
      matBall: "Ball",
      matBonnet: "Bonnet",
      matStem: "Stem",
      matStemORing: "Stem o-ring",
      matSelflockingNut: "Selflocking nut",
      matHandle: "Handle",
      matPlasticCover: "Plastic cover",
      matDisc: "Disc",
      matSpring: "Spring",
      matBushings: "Bushings",
    },
    ar: {
      productDatasheet: "ورقة بيانات المنتج",
      revisionUpdate: "المراجعة:",
      page: "صفحة",
      of: "من",
      sku: "رقم المنتج",
      family: "العائلة",
      indicativePriceUAE: "السعر الإرشادي — الإمارات",
      exclVAT: "غير شامل ضريبة القيمة المضافة 5%",
      volumeDiscountsAvailable: "خصومات الكميات الكبيرة متوفرة",
      mtSeries: "سلسلة MT",
      description: "الوصف",
      technicalDataSheet: "ورقة البيانات الفنية",
      ceMarked: "CE",
      ceMarkedSub: "علامة",
      antiCorrosion: "مضاد للتآكل",
      antiRust: "مضاد للصدأ",
      designedInSpain: "مصمم 100%",
      inSpain: "في إسبانيا",
      pedDirective: "PED 2014/68/EU",
      pressureDirective: "توجيه الضغط",
      iso9001: "ISO 9001",
      qualityManagement: "إدارة الجودة",
      productImage: "صورة المنتج",
      visitWeb: "زر الموقع للمعرض الكامل",
      specifications: "المواصفات",
      characteristic: "الخاصية",
      value: "القيمة",
      materials: "المواد",
      no: "الرقم",
      name: "الاسم",
      material: "المادة",
      quality: "الجودة",
      volumePricingUAE: "أسعار الجملة الإمارات (خصومات B2B)",
      quantity: "الكمية",
      unitPriceAED: "سعر الوحدة (درهم)",
      discount: "الخصم",
      base: "أساسي",
      contactUs: "اتصل بنا",
      customQuote: "عرض مخصص",
      tierNote: "أسعار إرشادية مدرجة للإمارات. الأسعار النهائية تخضع لشروط المشروع والمخزون.",
      aboutMT: "حول MT",
      aboutText: "منذ عام 1994، تصمم MT وتصنع وتسوق الصمامات والتجهيزات للقطاعين الصحي والصناعي. أكثر من 4000 مرجع في أكثر من 50 دولة.",
      reservationText: "تحتفظ شركة MT Business Key, S.L. بحق تعديل خصائص منتجاتها كلياً أو جزئياً دون إشعار مسبق.",
      warningText1: "لتجنب التشغيل غير الطبيعي أو الحوادث أو الإصابات الخطيرة،",
      warningText2: "لا تستخدم هذا المنتج خارج نطاق المواصفات.",
      warningText3: "قد تنظم اللوائح المحلية استخدام هذا المنتج.",
      hqCompany: "MT Business Key, S.L.",
      hqAddress1: "Polígono Sector Camps d'en Ricard",
      hqAddress2: "C/ Comerç, 10, naves 4-9 · 08780 Pallejà – Barcelona – Spain",
      hqContact: "هاتف +34 936 804 980 · ventas@mtspain.net",
      uaeCompany: "MT الشرق الأوسط — فرع الإمارات",
      uaeAddress1: "BR Dynamic Solutions LLC",
      uaeAddress2: "أبراج بحيرات جميرا · دبي · الإمارات",
      uaeContact: "هاتف +971 4 453 4693 · sales@mtmiddleeast.com",
      brass: "نحاس أصفر",
      stainlessSteel: "فولاذ مقاوم للصدأ",
      dzrBrass: "نحاس أصفر DZR",
      ductileIron: "حديد دكتايل",
      ballValves: "صمامات كروية",
      butterflyValves: "صمامات فراشية",
      checkValves: "صمامات عدم الرجوع",
      gateValves: "صمامات بوابة",
      angleValves: "صمامات زاوية",
      bibcocks: "صنابير الحديقة",
      strainers: "مصافي Y",
      expansionJoints: "وصلات تمدد",
      ballValveDesc: (pn, mat) => `صمام كروي ${pn} مع جسم من ${mat}`,
      butterflyValveDesc: (pn, mat) => `صمام فراشي ${pn} جسم من ${mat}`,
      checkValveDesc: (pn, mat) => `صمام عدم رجوع ${pn} جسم من ${mat}`,
      gateValveDesc: (pn, mat) => `صمام بوابة ${pn} جسم من ${mat}`,
      angleValveDesc: (pn, mat) => `صمام زاوية ${pn} جسم من ${mat}`,
      bibcockDesc: (pn) => `صنبور حديقة ${pn}`,
      specSize: "الحجم",
      specPressure: "تصنيف الضغط",
      specConnection: "نوع التوصيل",
      specBodyMaterial: "مادة الجسم",
      specOrigin: "المنشأ",
      specFamily: "العائلة",
      madeInSpain: "صنع في إسبانيا",
      bulletBodyBrass: "جسم من النحاس الأصفر عالي المقاومة",
      bulletBodyDZR: "جسم من نحاس مقاوم لإزالة الزنك",
      bulletBodySS: "جسم من الفولاذ المقاوم للصدأ",
      bulletBodyDuctile: "جسم من الحديد الدكتايل",
      bulletPTFE: "مقاعد من البولي تترا فلوروإيثيلين",
      bulletStem: "محور من الفولاذ المقاوم للصدأ مع حلقة مرنة",
      bulletThreads: "أسنان وفقاً للمعايير الأوروبية",
      bulletTemp: "درجة حرارة التشغيل من 20 تحت الصفر إلى 120 درجة مئوية",
      bulletPressure: (p) => `ضغط التشغيل: ${p.replace("bar", "بار")}`,
      bulletWater: "مضمون للاستخدام مع مياه الشرب الباردة والساخنة",
      matBody: "الجسم",
      matSeat: "المقعد",
      matBall: "الكرة",
      matBonnet: "الغطاء",
      matStem: "المحور",
      matStemORing: "حلقة المحور",
      matSelflockingNut: "صامولة ذاتية القفل",
      matHandle: "المقبض",
      matPlasticCover: "غطاء بلاستيكي",
      matDisc: "القرص",
      matSpring: "النابض",
      matBushings: "البطانات",
    }
  };
  
  // ==========================================================
  // FONT REGISTRATION FOR ARABIC
  // ==========================================================
  function registerArabicFont(doc) {
    if (!window.MT_ArabicFont) {
      console.warn("Arabic font not loaded");
      return false;
    }
    try {
      doc.addFileToVFS("NotoSansArabic-Regular.ttf", window.MT_ArabicFont.regular);
      doc.addFont("NotoSansArabic-Regular.ttf", "NotoArabic", "normal");
      doc.addFileToVFS("NotoSansArabic-Bold.ttf", window.MT_ArabicFont.bold);
      doc.addFont("NotoSansArabic-Bold.ttf", "NotoArabic", "bold");
      return true;
    } catch (e) {
      console.error("Failed to register Arabic font:", e);
      return false;
    }
  }
  
  // Helper: set font based on language and style
  function setFont(doc, lang, style) {
    if (lang === "ar") {
      // NotoArabic only has normal and bold; map italic to normal
      const arStyle = (style === "italic") ? "normal" : (style || "normal");
      doc.setFont("NotoArabic", arStyle);
    } else {
      doc.setFont("helvetica", style || "normal");
    }
  }
  
  // ==========================================================
  // PAGE 1 HEADER (logo + decorative pattern)
  // ==========================================================
  function drawPage1Header(doc, lang, t) {
    const isRTL = lang === "ar";
    const today = new Date();
    const dateStr = today.getDate().toString().padStart(2,'0') + "/" + 
                    (today.getMonth()+1).toString().padStart(2,'0') + "/" + 
                    today.getFullYear();
    
    // === TOPBAR (gradient blue, like the website) ===
    // Mimicking the website's top contact bar
    doc.setFillColor(...MT_BLUE_DARK);
    doc.rect(0, 0, W, 7, "F");
    
    // Topbar contact info - white text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    if (isRTL) {
      // Contact info stays in Latin (it's the brand contact, internationally readable)
      // Place contact on the LEFT (since RTL pages have Arabic flow on right)
      doc.text("+971 4 453 4693 · sales@mtmiddleeast.com · Jumeirah Lakes Towers", W-8, 4.7, { align: "right" });
      // Page indicator with Arabic font on left
      doc.setFont("NotoArabic", "normal");
      doc.text(`${dateStr}  ·  1/2 ${t.page}`, 8, 4.7);
    } else {
      doc.text("+971 4 453 4693  ·  sales@mtmiddleeast.com  ·  Jumeirah Lakes Towers, Dubai", 8, 4.7);
      doc.text(`${t.page} 1/2  ·  ${dateStr}`, W-8, 4.7, { align: "right" });
    }
    
    // === MAIN HEADER WITH LOGO ===
    // White header area with MT logo on left
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 7, W, 22, "F");
    
    // MT Logo (real PNG, lazy-loaded)
    if (window.MT_LogoB64) {
      try {
        // Logo aspect ratio ~559:245 = 2.28:1
        // We want it about 32mm wide to match website nav scale
        doc.addImage(window.MT_LogoB64, 'PNG', 8, 10, 32, 14, undefined, 'FAST');
      } catch(e) {
        // Fallback to text MT
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(...MT_BLUE);
        doc.text("MT", 8, 22);
      }
    } else {
      // Fallback if logo not loaded
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(...MT_BLUE);
      doc.text("MT", 8, 22);
    }
    
    // VALVES AND FITTINGS subtitle (under the logo, like on the website)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MT_BLUE);
    if (isRTL) {
      // For AR pages, keep brand identifier in Latin (it's the trademark)
      doc.text("VALVES AND FITTINGS", 8, 27);
    } else {
      doc.text("VALVES AND FITTINGS", 8, 27);
    }
    
    // === RIGHT SIDE: PRODUCT DATASHEET LABEL ===
    // Like a section indicator on the website
    setFont(doc, lang, "bold");
    doc.setFontSize(13);
    doc.setTextColor(...MT_BLUE_DEEP);
    doc.text(t.productDatasheet, W-8, 19, { align: "right" });
    
    // Horizontal line separator (like a website border)
    doc.setDrawColor(...MT_BLUE);
    doc.setLineWidth(1.5);
    doc.line(0, 29, W, 29);
    
    // Thin secondary line
    doc.setDrawColor(...MT_BLUE_PALE);
    doc.setLineWidth(0.3);
    doc.line(0, 30.5, W, 30.5);
  }
  
  function drawPageHeader(doc, pageNum, totalPages, productCode, lang, t) {
    const isRTL = lang === "ar";
    
    // Topbar (same as page 1)
    doc.setFillColor(...MT_BLUE_DARK);
    doc.rect(0, 0, W, 7, "F");
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    if (isRTL) {
      doc.text("+971 4 453 4693 · sales@mtmiddleeast.com · Jumeirah Lakes Towers", W-8, 4.7, { align: "right" });
      doc.setFont("NotoArabic", "normal");
      doc.text(`${pageNum}/${totalPages} ${t.page}`, 8, 4.7);
    } else {
      doc.text("+971 4 453 4693  ·  sales@mtmiddleeast.com  ·  Jumeirah Lakes Towers, Dubai", 8, 4.7);
      doc.text(`${t.page} ${pageNum}/${totalPages}`, W-8, 4.7, { align: "right" });
    }
    
    // White header area
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 7, W, 18, "F");
    
    // Logo
    if (window.MT_LogoB64) {
      try { doc.addImage(window.MT_LogoB64, 'PNG', 8, 10, 24, 10.5, undefined, 'FAST'); }
      catch(e) {}
    }
    
    // Product code on the right (like a breadcrumb on the website)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(...MT_BLUE_DEEP);
    if (isRTL) {
      doc.text(productCode || "", 8, 19);
    } else {
      doc.text(productCode || "", W-8, 19, { align: "right" });
    }
    
    // Section line
    doc.setDrawColor(...MT_BLUE);
    doc.setLineWidth(1.5);
    doc.line(0, 25, W, 25);
    doc.setDrawColor(...MT_BLUE_PALE);
    doc.setLineWidth(0.3);
    doc.line(0, 26.5, W, 26.5);
  }
  
  // ==========================================================
  // PRODUCT IMAGE — embeds real image if available, else placeholder
  // ==========================================================
  function drawProductImage(doc, x, y, w, h, productData, t) {
    const sku = productData.sku;
    const imgB64 = window.MT_DatasheetImages && window.MT_DatasheetImages[sku];
    
    if (imgB64) {
      // Box with subtle border
      doc.setFillColor(...SLATE_50);
      doc.setDrawColor(...SLATE_300);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, y, w, h, 2, 2, "FD");
      
      try {
        // Embed image, centered with padding
        const padding = 4;
        doc.addImage(imgB64, 'JPEG', x+padding, y+padding, w-2*padding, h-2*padding, undefined, 'FAST');
      } catch (e) {
        console.error("Image embed failed:", e);
        doc.setFontSize(8);
        doc.setTextColor(...SLATE_400);
        doc.text(t.productImage, x + w/2, y + h/2, { align: "center" });
      }
    } else {
      // Placeholder
      doc.setFillColor(...SLATE_50);
      doc.setDrawColor(...SLATE_300);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, y, w, h, 2, 2, "FD");
      
      doc.setFontSize(8);
      doc.setTextColor(...SLATE_400);
      setFont(doc, "en", "italic");  // English font for placeholder
      doc.text(t.productImage, x + w/2, y + h/2 - 2, { align: "center" });
      doc.setFontSize(7);
      doc.text(t.visitWeb, x + w/2, y + h/2 + 2, { align: "center" });
    }
  }
  
  // ==========================================================
  // SERIES BAND
  // ==========================================================
  function drawSeriesBand(doc, y, pnRating, desc, lang, t) {
    doc.setFillColor(...MT_NAVY_DARK);
    doc.rect(0, y, W, 18, "F");
    
    // PN rating (Latin, always LTR)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(110, 130, 165);
    doc.text(pnRating || "PN-25", 14, y+11);
    
    doc.setFontSize(8);
    doc.setTextColor(180, 200, 230);
    setFont(doc, lang, "bold");
    doc.text(t.mtSeries, 14, y+15);
    
    doc.setDrawColor(180, 200, 230);
    doc.setLineWidth(0.3);
    doc.line(50, y+3, 50, y+15);
    
    // Description (in target language)
    setFont(doc, lang, "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    
    const fullDesc = `${t.description}: ${desc}`;
    if (lang === "ar") {
      doc.text(fullDesc, W-14, y+11, { align: "right" });
    } else {
      const lines = doc.splitTextToSize(fullDesc, W-66);
      doc.text(lines.slice(0,2), 54, y+9);
    }
  }
  
  // ==========================================================
  // SECTION TITLE BAR
  // ==========================================================
  function drawSectionTitle(doc, x, y, w, title, lang) {
    doc.setFillColor(...MT_BLUE);
    doc.rect(x, y, w, 7.5, "F");
    
    setFont(doc, lang, "bold");
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    
    if (lang === "ar") {
      doc.text(title, x+w-4, y+5.5, { align: "right" });
    } else {
      doc.text(title, x+4, y+5.3);
    }
  }
  
  // ==========================================================
  // BULLET LIST (single language)
  // ==========================================================
  function drawBullets(doc, x, y, w, items, lang) {
    let cy = y;
    setFont(doc, lang, "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...SLATE_900);
    
    items.forEach(text => {
      if (lang === "ar") {
        // Arabic: bullet on right, text following
        // We render "• " + text as a single string with align right
        const arText = "•  " + text;
        doc.text(arText, x+w, cy, { align: "right" });
        cy += 5;
      } else {
        // LTR: bullet first, with line wrapping
        const bulletText = `· ${text}`;
        const lines = doc.splitTextToSize(bulletText, w);
        doc.text(lines, x, cy);
        cy += lines.length * 4.5 + 1.5;
      }
    });
    return cy;
  }
  
  // ==========================================================
  // CERTIFICATION ICONS
  // ==========================================================
  function drawCertificationIcons(doc, x, y, hasACS, lang, t) {
    let cy = y;
    const iconW = 28;
    
    // CE
    doc.setFillColor(245, 247, 250);
    doc.setDrawColor(...SLATE_300);
    doc.setLineWidth(0.4);
    doc.roundedRect(x, cy, iconW, 14, 1, 1, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...MT_BLUE);
    doc.text(t.ceMarked, x+iconW/2, cy+6, { align: "center" });
    setFont(doc, lang, "bold");
    doc.setFontSize(7);
    doc.setTextColor(...SLATE_700);
    doc.text(t.ceMarkedSub, x+iconW/2, cy+11, { align: "center" });
    cy += 17;
    
    // ANTI CORROSION
    doc.setFillColor(...SLATE_50);
    doc.setDrawColor(...SLATE_400);
    doc.roundedRect(x, cy, iconW, 11, 1, 1, "FD");
    setFont(doc, lang, "bold");
    doc.setFontSize(7);
    doc.setTextColor(...MT_NAVY_DARK);
    doc.text(t.antiCorrosion, x+iconW/2, cy+5, { align: "center" });
    setFont(doc, lang, "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...SLATE_500);
    doc.text(t.antiRust, x+iconW/2, cy+9, { align: "center" });
    cy += 14;
    
    // 100% DESIGNED IN SPAIN (Spanish flag)
    doc.setFillColor(...MT_RED_FLAG);
    doc.rect(x, cy, iconW, 4, "F");
    doc.setFillColor(...MT_YELLOW_FLAG);
    doc.rect(x, cy+4, iconW, 6, "F");
    doc.setFillColor(...MT_RED_FLAG);
    doc.rect(x, cy+10, iconW, 4, "F");
    doc.setDrawColor(...SLATE_700);
    doc.setLineWidth(0.4);
    doc.rect(x, cy, iconW, 14, "S");
    setFont(doc, lang, "bold");
    doc.setFontSize(6);
    doc.setTextColor(...MT_RED_FLAG);
    doc.text(t.designedInSpain, x+iconW/2, cy+7.3, { align: "center" });
    doc.text(t.inSpain, x+iconW/2, cy+9.6, { align: "center" });
    cy += 17;
    
    // ACS (if applicable)
    if (hasACS) {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...MT_BLUE);
      doc.setLineWidth(0.6);
      doc.circle(x+iconW/2, cy+7, 6.5, "FD");
      doc.setFont("helvetica", "bold");  // ACS is a brand mark, keep Latin
      doc.setFontSize(7);
      doc.setTextColor(...MT_BLUE);
      doc.text("ACS", x+iconW/2, cy+8.5, { align: "center" });
      cy += 17;
    }
    
    // PED
    doc.setFillColor(245, 247, 250);
    doc.setDrawColor(...SLATE_300);
    doc.roundedRect(x, cy, iconW, 11, 1, 1, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...MT_NAVY_DARK);
    doc.text(t.pedDirective, x+iconW/2, cy+5, { align: "center" });
    setFont(doc, lang, "italic");
    doc.setFontSize(6.5);
    doc.setTextColor(...SLATE_500);
    doc.text(t.pressureDirective, x+iconW/2, cy+9, { align: "center" });
    cy += 14;
    
    // ISO 9001
    doc.setFillColor(245, 247, 250);
    doc.setDrawColor(...SLATE_300);
    doc.roundedRect(x, cy, iconW, 11, 1, 1, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...MT_NAVY_DARK);
    doc.text(t.iso9001, x+iconW/2, cy+5, { align: "center" });
    setFont(doc, lang, "italic");
    doc.setFontSize(6.5);
    doc.setTextColor(...SLATE_500);
    doc.text(t.qualityManagement, x+iconW/2, cy+9, { align: "center" });
    cy += 14;
    
    return cy;
  }
  
  // ==========================================================
  // FOOTER
  // ==========================================================
  function drawFooter(doc, lang, t) {
    // Reservation text
    doc.setFontSize(7);
    doc.setTextColor(...SLATE_500);
    setFont(doc, lang, "normal");
    if (lang === "ar") {
      // Render full Arabic text on a single line
      doc.text(t.reservationText, W/2, H-30, { align: "center" });
    } else {
      const reservLines = doc.splitTextToSize(t.reservationText, W-30);
      doc.text(reservLines.slice(0,1), W/2, H-30, { align: "center" });
    }
    
    // Yellow warning triangle
    doc.setFillColor(...WARN_YELLOW);
    doc.setDrawColor(...SLATE_900);
    doc.setLineWidth(0.5);
    doc.triangle(20, H-25, 14, H-15, 26, H-15, "FD");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...SLATE_900);
    doc.text("!", 20, H-17.5, { align: "center" });
    
    // Warning text
    doc.setFontSize(6.5);
    setFont(doc, lang, "normal");
    doc.setTextColor(...SLATE_700);
    if (lang === "ar") {
      doc.text(t.warningText1, W-30, H-23, { align: "right" });
      doc.text(t.warningText2, W-30, H-20.5, { align: "right" });
      doc.text(t.warningText3, W-30, H-18, { align: "right" });
    } else {
      doc.text(t.warningText1, 30, H-23);
      doc.text(t.warningText2, 30, H-20.5);
      doc.text(t.warningText3, 30, H-18);
    }
    
    // Blue footer band
    doc.setFillColor(...MT_BLUE_FOOTER);
    doc.rect(0, H-14, W, 14, "F");
    
    // LEFT: Spain HQ (or RIGHT for AR)
    setFont(doc, lang, "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    if (lang === "ar") {
      doc.text(t.hqCompany, W-14, H-9, { align: "right" });
    } else {
      doc.text(t.hqCompany, 14, H-9);
    }
    
    setFont(doc, lang, "normal");
    doc.setFontSize(7);
    doc.setTextColor(220, 235, 250);
    if (lang === "ar") {
      doc.text(t.hqAddress1, W-14, H-5.5, { align: "right" });
      doc.text(t.hqAddress2, W-14, H-2.5, { align: "right" });
      doc.setFontSize(6.5);
      doc.text(t.hqContact, W-14, H-0.2, { align: "right" });
    } else {
      doc.text(t.hqAddress1, 14, H-5.5);
      doc.text(t.hqAddress2, 14, H-2.5);
      doc.setFontSize(6.5);
      doc.text(t.hqContact, 14, H-0.2);
    }
    
    // RIGHT: UAE branch (or LEFT for AR)
    setFont(doc, lang, "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    if (lang === "ar") {
      doc.text(t.uaeCompany, 14, H-9);
    } else {
      doc.text(t.uaeCompany, W-14, H-9, { align: "right" });
    }
    
    setFont(doc, lang, "normal");
    doc.setFontSize(7);
    doc.setTextColor(220, 235, 250);
    if (lang === "ar") {
      doc.text(t.uaeAddress1, 14, H-5.5);
      doc.text(t.uaeAddress2, 14, H-2.5);
      doc.setFontSize(6.5);
      doc.text(t.uaeContact, 14, H-0.2);
    } else {
      doc.text(t.uaeAddress1, W-14, H-5.5, { align: "right" });
      doc.text(t.uaeAddress2, W-14, H-2.5, { align: "right" });
      doc.setFontSize(6.5);
      doc.text(t.uaeContact, W-14, H-0.2, { align: "right" });
    }
  }
  
  // ==========================================================
  // MAIN PDF GENERATOR
  // ==========================================================
  function generatePDF(productData, lang) {
    lang = lang || "en";
    const t = T[lang] || T.en;
    const isRTL = lang === "ar";
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    
    // Register Arabic font if needed
    if (lang === "ar") {
      const ok = registerArabicFont(doc);
      if (!ok) {
        alert("Arabic font failed to load. Please try again.");
        return;
      }
    }
    
    // ===========================================
    // PAGE 1
    // ===========================================
    drawPage1Header(doc, lang, t);
    
    // Product image - starts below the new header (line at y=30.5)
    drawProductImage(doc, 8, 36, 80, 70, productData, t);
    
    // Eyebrow label above SKU (category) — render FIRST so SKU draws on top if any overlap
    setFont(doc, lang, "bold");
    doc.setFontSize(8);
    doc.setTextColor(...MT_BLUE);
    const eyebrow = (productData.specs && productData.specs[lang] && productData.specs[lang][t.specFamily]) || "";
    if (isRTL) {
      // Arabic: eyebrow goes higher, with more margin
      doc.text(eyebrow, W-8, 113, { align: "right" });
    } else {
      doc.text(eyebrow.toUpperCase(), 8, 110);
    }
    
    // SKU label - large, like a hero title on the website
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...MT_BLUE_DEEP);
    if (isRTL) {
      // Arabic: SKU below the eyebrow with safe spacing
      doc.text(productData.sku || "MT-XXXX", W-8, 122, { align: "right" });
    } else {
      doc.text(productData.sku || "MT-XXXX", 8, 116);
    }
    
    // Title (subtitle below SKU)
    setFont(doc, lang === "ar" ? "en" : lang, "normal");
    doc.setFontSize(10);
    doc.setTextColor(...MT_INK_SOFT);
    const titleLines = doc.splitTextToSize(productData.title || "", 90);
    if (isRTL) {
      // Arabic: title further down to avoid overlap with new SKU position
      titleLines.slice(0,2).forEach((line, i) => {
        doc.text(line, W-8, 128+i*4.5, { align: "right" });
      });
    } else {
      doc.text(titleLines.slice(0,2), 8, 122);
    }
    
    // Series band - like a section divider on the website
    drawSeriesBand(doc, 137, productData.pnRating || "PN-25", 
                   productData.desc[lang] || productData.desc.en, lang, t);
    
    // Section title
    drawSectionTitle(doc, 8, 160, 116, t.technicalDataSheet, lang);
    
    // Bullets
    const bullets = productData.bullets[lang] || productData.bullets.en;
    drawBullets(doc, 8, 172, 116, bullets, lang);
    
    // Right column: certifications - moved slightly to align with new layout
    drawCertificationIcons(doc, 130, 36, productData.hasACS, lang, t);
    
    // Indicative price box
    if (productData.price && parseFloat(productData.price) > 0) {
      const pyTop = 167;
      doc.setFillColor(...SLATE_50);
      doc.setDrawColor(...MT_BLUE);
      doc.setLineWidth(0.5);
      doc.roundedRect(130, pyTop, 66, 36, 2, 2, "FD");
      
      doc.setFillColor(...MT_BLUE);
      doc.rect(130, pyTop, 66, 7, "F");
      setFont(doc, lang, "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(255, 255, 255);
      doc.text(t.indicativePriceUAE, 163, pyTop+5, { align: "center" });
      
      doc.setFont("helvetica", "normal");  // AED is Latin
      doc.setFontSize(11);
      doc.setTextColor(...SLATE_500);
      doc.text("AED", 163, pyTop+15, { align: "center" });
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...MT_BLUE);
      doc.text(productData.price || "—", 163, pyTop+25, { align: "center" });
      
      setFont(doc, lang, "italic");
      doc.setFontSize(7);
      doc.setTextColor(...SLATE_500);
      doc.text(t.exclVAT, 163, pyTop+30, { align: "center" });
      doc.text(t.volumeDiscountsAvailable, 163, pyTop+33, { align: "center" });
    }
    
    drawFooter(doc, lang, t);
    
    // ===========================================
    // PAGE 2
    // ===========================================
    doc.addPage();
    drawPageHeader(doc, 2, 2, productData.sku || "", lang, t);
    
    let y = 28;
    
    // Specifications
    drawSectionTitle(doc, 14, y, W-28, t.specifications, lang);
    y += 10;
    
    const specs = productData.specs[lang] || productData.specs.en;
    const specRows = Object.entries(specs).map(([k, v]) => [k, String(v)]);
    
    doc.autoTable({
      startY: y,
      head: [[t.characteristic, t.value]],
      body: specRows,
      theme: 'grid',
      margin: { left: 14, right: 14 },
      styles: { font: lang === "ar" ? "NotoArabic" : "helvetica", halign: isRTL ? "right" : "left" },
      headStyles: {
        fillColor: MT_BLUE,
        textColor: [255,255,255],
        fontSize: 9,
        fontStyle: 'bold',
        cellPadding: 2.5,
        halign: isRTL ? "right" : "left",
      },
      bodyStyles: {
        fontSize: 9,
        textColor: SLATE_900,
        cellPadding: 2.5,
        lineColor: SLATE_300,
        lineWidth: 0.2,
        halign: isRTL ? "right" : "left",
      },
      alternateRowStyles: { fillColor: SLATE_50 },
      columnStyles: {
        0: { cellWidth: 70, fontStyle: 'bold', textColor: SLATE_700 },
        1: { cellWidth: 'auto' },
      },
    });
    
    y = doc.lastAutoTable.finalY + 8;
    
    // Materials
    if (/ball valve|gate valve|check valve|butterfly|angle|bibcock/i.test(productData.title || "")) {
      drawSectionTitle(doc, 14, y, W-28, t.materials, lang);
      y += 10;
      
      const title = productData.title || "";
      const isStainless = /stainless steel|s\.s\.|\bss\b|inox/i.test(title);
      const isButterfly = /butterfly/i.test(title);
      const isCheck = /check|non-return/i.test(title);
      
      const matMain = isStainless ? t.stainlessSteel : t.brass;
      const matCode = isStainless ? "AISI 316" : "CW602N";
      const matSecondary = isStainless ? t.stainlessSteel : t.brass;
      const matSecondaryCode = isStainless ? "AISI 316" : "CW614N";
      
      let materials;
      if (isButterfly) {
        materials = [
          ["1", t.matBody, t.ductileIron, "GG-25 / GGG-40"],
          ["2", t.matDisc, isStainless ? t.stainlessSteel : "Aluminium bronze", isStainless ? "AISI 316" : "CuAl"],
          ["3", t.matSeat, "EPDM", "Shore 65"],
          ["4", t.matStem, t.stainlessSteel, "AISI 420"],
          ["5", t.matBushings, "PTFE + bronze", "-"],
          ["6", t.matStemORing, "EPDM / NBR", "Shore 70"],
        ];
      } else if (isCheck) {
        materials = [
          ["1", t.matBody, matMain, matCode],
          ["2", t.matDisc, matSecondary, matSecondaryCode],
          ["3", t.matSeat, "PTFE", "PTFE"],
          ["4", t.matSpring, t.stainlessSteel, "AISI 302"],
          ["5", t.matStemORing, "FKM", "Shore 70"],
        ];
      } else {
        // Ball valve (brass or SS)
        materials = [
          ["1", t.matBody, matMain, matCode],
          ["2", t.matSeat, "PTFE", "PTFE"],
          ["3", t.matBall, matSecondary, matSecondaryCode],
          ["4", t.matBonnet, matMain, matCode],
          ["5", t.matStem, t.stainlessSteel, "AISI 304"],
          ["6", t.matStemORing, "FKM", "Shore 70"],
          ["7", t.matSelflockingNut, t.stainlessSteel, "AISI 304"],
          ["8", t.matHandle, t.stainlessSteel, "AISI 304"],
        ];
      }
      
      doc.autoTable({
        startY: y,
        head: [[t.no, t.name, t.material, t.quality]],
        body: materials,
        theme: 'grid',
        margin: { left: 14, right: 14 },
        styles: { font: lang === "ar" ? "NotoArabic" : "helvetica", halign: isRTL ? "right" : "left" },
        headStyles: {
          fillColor: MT_BLUE,
          textColor: [255,255,255],
          fontSize: 8.5,
          fontStyle: 'bold',
          cellPadding: 2,
          halign: isRTL ? "right" : "left",
        },
        bodyStyles: {
          fontSize: 8.5,
          textColor: SLATE_900,
          cellPadding: 2,
          lineColor: SLATE_300,
          lineWidth: 0.15,
          halign: isRTL ? "right" : "left",
        },
        alternateRowStyles: { fillColor: SLATE_50 },
        columnStyles: {
          0: { cellWidth: 12, halign: 'center', fontStyle: 'bold' },
          1: { cellWidth: 60 },
          2: { cellWidth: 70 },
          3: { cellWidth: 'auto', textColor: MT_RED_ACCENT, fontStyle: 'bold', halign: 'center' },
        },
      });
      
      y = doc.lastAutoTable.finalY + 8;
    }
    
    // Volume Pricing
    const basePriceNum = parseFloat((productData.price || "0").replace(/,/g, ''));
    if (basePriceNum > 0) {
      drawSectionTitle(doc, 14, y, W-28, t.volumePricingUAE, lang);
      y += 10;
      
      const fmt = (n) => n >= 1000 ? n.toLocaleString('en-US', {maximumFractionDigits:0}) : 
                        n >= 100 ? Math.round(n).toString() : 
                        n.toFixed(2);
      
      doc.autoTable({
        startY: y,
        head: [[t.quantity, t.unitPriceAED, t.discount]],
        body: [
          ["1 - 9",       fmt(basePriceNum),         t.base],
          ["10 - 49",     fmt(basePriceNum * 0.95),  "-5%"],
          ["50 - 99",     fmt(basePriceNum * 0.90),  "-10%"],
          ["100 - 499",   fmt(basePriceNum * 0.85),  "-15%"],
          ["500+",        t.customQuote,             t.contactUs],
        ],
        theme: 'grid',
        margin: { left: 14, right: 14 },
        styles: { font: lang === "ar" ? "NotoArabic" : "helvetica" },
        headStyles: {
          fillColor: MT_BLUE,
          textColor: [255,255,255],
          fontSize: 8.5,
          fontStyle: 'bold',
          cellPadding: 2.5,
          halign: isRTL ? "right" : "left",
        },
        bodyStyles: {
          fontSize: 9,
          textColor: SLATE_900,
          cellPadding: 2.5,
          lineColor: SLATE_300,
          lineWidth: 0.15,
        },
        alternateRowStyles: { fillColor: SLATE_50 },
        columnStyles: {
          0: { cellWidth: 50, halign: 'center', fontStyle: 'bold' },
          1: { halign: 'right', fontStyle: 'bold', textColor: MT_BLUE },
          2: { halign: 'center', textColor: MT_RED_ACCENT, fontStyle: 'bold' },
        },
      });
      
      y = doc.lastAutoTable.finalY + 4;
      
      if (y < H - 38) {
        doc.setFontSize(7);
        setFont(doc, lang, "italic");
        doc.setTextColor(...SLATE_500);
        if (isRTL) {
          doc.text(t.tierNote, W-14, y+2, { align: "right" });
        } else {
          doc.text(t.tierNote, 14, y+2);
        }
        y += 6;
      }
    }
    
    // About MT
    if (y < H - 50) {
      drawSectionTitle(doc, 14, y, W-28, t.aboutMT, lang);
      y += 10;
      
      doc.setFontSize(8);
      setFont(doc, lang, "normal");
      doc.setTextColor(...SLATE_700);
      if (isRTL) {
        // Render Arabic text in 1-2 lines, manually broken
        doc.text(t.aboutText, W-14, y, { align: "right" });
      } else {
        const aboutLines = doc.splitTextToSize(t.aboutText, W-28);
        doc.text(aboutLines.slice(0, 3), 14, y);
      }
    }
    
    drawFooter(doc, lang, t);
    
    // Save
    const filename = `MT-Datasheet-${productData.sku || 'product'}-${lang.toUpperCase()}.pdf`;
    doc.save(filename);
  }
  
  // ==========================================================
  // EXTRACT PRODUCT DATA (multi-lang)
  // ==========================================================
  function collectFromPage() {
    const sku = document.title.match(/REF\.\s*(\d+)/)?.[1] ||
                document.querySelector('[id*="copy"]')?.parentElement?.textContent?.match(/MT-(\d+)/)?.[1] || "";
    const title = document.querySelector('h1')?.textContent?.trim() || "";
    const priceText = document.querySelector('.fergo-price-main')?.textContent?.replace(/[^0-9.]/g,"").trim() || "0";
    const currentSize = document.querySelector('.mt-size-selector-current, .size-current')?.textContent?.trim() || "";
    
    const pmatch = title.match(/PN[-\s]?(\d+)/i);
    const pnRating = pmatch ? "PN-" + pmatch[1] : "PN-25";
    const workingPressure = pmatch ? pmatch[1] + " bar" : "25 bar";
    
    let connection_en = "Threaded";
    let connection_es = "Roscado";
    let connection_ar = "ملولب";
    if (/F-F/i.test(title)) {
      connection_en = "F-F (Female-Female)";
      connection_es = "H-H (Hembra-Hembra)";
      connection_ar = "أنثى-أنثى F-F";
    } else if (/M-F/i.test(title)) {
      connection_en = "M-F (Male-Female)";
      connection_es = "M-H (Macho-Hembra)";
      connection_ar = "ذكر-أنثى M-F";
    } else if (/flanged/i.test(title)) {
      connection_en = "Flanged";
      connection_es = "Bridada";
      connection_ar = "بشفة";
    } else if (/wafer/i.test(title)) {
      connection_en = "Wafer";
      connection_es = "Wafer";
      connection_ar = "ويفر";
    }
    
    // Material detection
    let materialKey = "brass";
    if (/stainless steel|s\.s\.|\bss\b|inox/i.test(title)) materialKey = "stainlessSteel";
    else if (/dzr/i.test(title)) materialKey = "dzrBrass";
    else if (/ductile|cast iron/i.test(title)) materialKey = "ductileIron";
    
    let familyKey = "ballValves";
    if (/butterfly/i.test(title)) familyKey = "butterflyValves";
    else if (/non-return|check valve/i.test(title)) familyKey = "checkValves";
    else if (/gate valve/i.test(title)) familyKey = "gateValves";
    else if (/expansion joint/i.test(title)) familyKey = "expansionJoints";
    else if (/strainer/i.test(title)) familyKey = "strainers";
    else if (/bibcock/i.test(title)) familyKey = "bibcocks";
    else if (/angle/i.test(title)) familyKey = "angleValves";
    
    const hasACS = /ergonomic.*stainless steel handle/i.test(title);
    
    // Build description per language
    const desc = {};
    const specs = {};
    const bullets = {};
    
    ["en", "ar"].forEach(lang => {
      const t = T[lang];
      const matName = t[materialKey];
      
      // Description
      let d = title;
      const descKey = familyKey === "ballValves" ? "ballValveDesc" :
                      familyKey === "butterflyValves" ? "butterflyValveDesc" :
                      familyKey === "checkValves" ? "checkValveDesc" :
                      familyKey === "gateValves" ? "gateValveDesc" :
                      familyKey === "angleValves" ? "angleValveDesc" :
                      familyKey === "bibcocks" ? "bibcockDesc" : null;
      if (descKey && t[descKey]) {
        d = familyKey === "bibcocks" ? t[descKey](pnRating) : t[descKey](pnRating, matName);
      }
      desc[lang] = d;
      
      // Specs
      const connection = lang === "en" ? connection_en : lang === "es" ? connection_es : connection_ar;
      const ll = {};
      if (currentSize) ll[t.specSize] = currentSize;
      ll[t.specPressure] = pnRating;
      ll[t.specConnection] = connection;
      ll[t.specBodyMaterial] = matName;
      ll[t.specOrigin] = t.madeInSpain;
      ll[t.specFamily] = t[familyKey];
      specs[lang] = ll;
      
      // Bullets
      const bodyBulletKey = materialKey === "stainlessSteel" ? "bulletBodySS" :
                            materialKey === "dzrBrass" ? "bulletBodyDZR" :
                            materialKey === "ductileIron" ? "bulletBodyDuctile" : "bulletBodyBrass";
      bullets[lang] = [
        t[bodyBulletKey],
        t.bulletPTFE,
        t.bulletStem,
        t.bulletThreads,
        t.bulletTemp,
        t.bulletPressure(workingPressure),
        t.bulletWater,
      ];
    });
    
    return {
      sku, title,
      price: priceText,
      pnRating,
      desc, specs, bullets,
      hasACS,
    };
  }
  
  // ==========================================================
  // LAZY LOAD ASSETS + UI HOOK
  // ==========================================================
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (document.querySelector(`script[src="${src}"]`)) {
        return resolve();
      }
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  
  async function ensureAssetsLoaded(lang) {
    // Determine path prefix based on current page location
    const pathParts = window.location.pathname.split('/');
    const isInIndustrial = pathParts.includes('industrial');
    const prefix = isInIndustrial ? '../../assets/' : '../assets/';
    
    const promises = [];
    
    // Always load images bundle
    if (!window.MT_DatasheetImages) {
      promises.push(loadScript(prefix + 'datasheet-images.js'));
    }
    
    // Always load logo (small, ~21KB)
    if (!window.MT_LogoB64) {
      promises.push(loadScript(prefix + 'datasheet-mt-logo.js'));
    }
    
    // Load Arabic font if needed
    if (lang === "ar" && !window.MT_ArabicFont) {
      promises.push(loadScript(prefix + 'datasheet-arabic-font.js'));
    }
    
    if (promises.length > 0) {
      await Promise.all(promises);
    }
  }
  
  async function handleClickWithLang(lang) {
    const btn = document.querySelector('[onclick*="MT_Datasheet"]');
    let originalText = '';
    if (btn) {
      originalText = btn.innerHTML;
      btn.innerHTML = '⏳ Generating...';
      btn.disabled = true;
    }
    
    try {
      await ensureAssetsLoaded(lang);
      const data = collectFromPage();
      generatePDF(data, lang);
    } catch (e) {
      alert("Error generating datasheet: " + e.message);
      console.error(e);
    } finally {
      // Restore button
      if (btn) {
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 1500);
      }
    }
  }
  
  // Show language picker dropdown
  function handleClick(event) {
    if (event) event.preventDefault();
    
    // Find the datasheet button to position the menu
    const btn = event ? event.currentTarget : document.querySelector('[onclick*="MT_Datasheet"]');
    
    // Remove existing menu if any
    const existing = document.getElementById('mt-ds-lang-menu');
    if (existing) {
      existing.remove();
      return;
    }
    
    // Build menu
    const menu = document.createElement('div');
    menu.id = 'mt-ds-lang-menu';
    menu.style.cssText = `
      position: absolute;
      background: white;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(15,47,92,0.15);
      padding: 6px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 160px;
      font-family: inherit;
    `;
    
    const langs = [
      { code: 'en', label: '🇬🇧 English', dir: 'ltr' },
      { code: 'ar', label: '🇦🇪 العربية', dir: 'rtl' },
    ];
    
    langs.forEach(l => {
      const item = document.createElement('button');
      item.textContent = l.label;
      item.style.cssText = `
        padding: 8px 12px;
        background: white;
        border: none;
        border-radius: 4px;
        font-size: 13px;
        text-align: ${l.dir === 'rtl' ? 'right' : 'left'};
        cursor: pointer;
        font-family: inherit;
        color: #0F2F5C;
        font-weight: 600;
      `;
      item.onmouseenter = () => item.style.background = '#F1F5F9';
      item.onmouseleave = () => item.style.background = 'white';
      item.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        menu.remove();
        handleClickWithLang(l.code);
      };
      menu.appendChild(item);
    });
    
    // Position menu near the button
    if (btn) {
      const rect = btn.getBoundingClientRect();
      menu.style.top = (window.scrollY + rect.bottom + 4) + 'px';
      menu.style.left = (window.scrollX + rect.left) + 'px';
    } else {
      menu.style.top = '50%';
      menu.style.left = '50%';
      menu.style.transform = 'translate(-50%, -50%)';
    }
    
    document.body.appendChild(menu);
    
    // Close on outside click
    setTimeout(() => {
      const closeHandler = (e) => {
        if (!menu.contains(e.target)) {
          menu.remove();
          document.removeEventListener('click', closeHandler);
        }
      };
      document.addEventListener('click', closeHandler);
    }, 100);
  }
  
  return { generatePDF, collectFromPage, handleClick, handleClickWithLang };
})();

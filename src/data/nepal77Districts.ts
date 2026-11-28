import {
  DistrictEntry,
  LanguageEntry,
  PartnerListingRecord,
  ProvinceEntry,
  ServiceCategory,
  UserRoleCode,
} from '../types/pheriNepal';

export const OFFICIAL_LANGUAGES: LanguageEntry[] = [
  { code: 'L01', isoCode: 'en', nameEn: 'English', nativeName: 'English', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
  { code: 'L02', isoCode: 'ne', nameEn: 'Nepali', nativeName: 'नेपाली', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
  { code: 'L03', isoCode: 'hi', nameEn: 'Hindi', nativeName: 'हिन्दी', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
  { code: 'L04', isoCode: 'zh', nameEn: 'Chinese (Simplified)', nativeName: '简体中文', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
  { code: 'L05', isoCode: 'es', nameEn: 'Spanish', nativeName: 'Español', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
  { code: 'L06', isoCode: 'fr', nameEn: 'French', nativeName: 'Français', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
  { code: 'L07', isoCode: 'de', nameEn: 'German', nativeName: 'Deutsch', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
  { code: 'L08', isoCode: 'ja', nameEn: 'Japanese', nativeName: '日本語', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
  { code: 'L09', isoCode: 'ko', nameEn: 'Korean', nativeName: '한국어', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
  { code: 'L10', isoCode: 'ar', nameEn: 'Arabic', nativeName: 'العربية', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
  { code: 'L11', isoCode: 'ru', nameEn: 'Russian', nativeName: 'Русский', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
  { code: 'L12', isoCode: 'pt', nameEn: 'Portuguese', nativeName: 'Português', phase: 'Phase 1 (Production Active)', isActiveInUi: true },
];

export const ROLE_DEFINITIONS: Record<
  UserRoleCode,
  { code: UserRoleCode; labelEn: string; labelNe: string; descriptionEn: string }
> = {
  U01: {
    code: 'U01',
    labelEn: 'Guest / Visitor',
    labelNe: 'अतिथि / आगन्तुक',
    descriptionEn: 'Browse all 7 provinces & 77 districts, permits, safety corridors, and verified listings.',
  },
  U02: {
    code: 'U02',
    labelEn: 'Registered Traveler',
    labelNe: 'दर्ता भएको यात्रु',
    descriptionEn: 'Submit booking inquiries with VCV codes, build AI itineraries, download offline survival packs, and post verified reviews.',
  },
  U03: {
    code: 'U03',
    labelEn: 'Partner / Service Provider',
    labelNe: 'साझेदार / सेवा प्रदायक',
    descriptionEn: 'Manage hotels, homestays, guides, agencies, submit KYC evidence, and respond to traveler booking inquiries.',
  },
  U04: {
    code: 'U04',
    labelEn: 'Partner Staff Member',
    labelNe: 'साझेदार कर्मचारी',
    descriptionEn: 'Assist partner operations with inquiry responses and schedule coordination.',
  },
  U05: {
    code: 'U05',
    labelEn: 'Verification Officer',
    labelNe: 'प्रमाणीकरण अधिकृत',
    descriptionEn: 'Inspect DOT/NTB/TAAN/NMA/PAN KYC evidence and issue independent verification decisions (<= 48h SLA).',
  },
  U06: {
    code: 'U06',
    labelEn: 'Content / Quality Moderator',
    labelNe: 'सामग्री तथा गुणस्तर मोडरेटर',
    descriptionEn: 'Audit listing quality, bilingual descriptions, and traveler review authenticity.',
  },
  U07: {
    code: 'U07',
    labelEn: 'Finance / Commission Officer',
    labelNe: 'वित्त तथा कमिसन अधिकृत',
    descriptionEn: 'Reconcile R01-R14 revenue streams, VCV check-in vouchers, 13% VAT, and TDS ledgers.',
  },
  U08: {
    code: 'U08',
    labelEn: 'Support / Emergency Officer',
    labelNe: 'सहायता तथा आपतकालीन अधिकृत',
    descriptionEn: 'Handle stale 48h inquiries, high-altitude weather alerts, and Tourist Police / SAR routing.',
  },
  U09: {
    code: 'U09',
    labelEn: 'Super Admin / Platform Governance',
    labelNe: 'सुपर एडमिन / प्लेटफर्म गभर्नेन्स',
    descriptionEn: 'Full ecosystem governance across M01-M18 modules, RBAC assignments, KYC audit logs, and revenue policies.',
  },
};

export const REVENUE_STREAM_BY_CATEGORY: Record<
  ServiceCategory,
  { code: 'R01' | 'R02' | 'R03' | 'R04' | 'R05' | 'R06'; ratePercent: number; labelEn: string }
> = {
  Hotel: { code: 'R01', ratePercent: 10, labelEn: 'R01 Hotel Booking Commission (10%)' },
  Resort: { code: 'R01', ratePercent: 12, labelEn: 'R01 Resort Booking Commission (12%)' },
  Homestay: { code: 'R02', ratePercent: 8, labelEn: 'R02 Community Homestay Commission (8%)' },
  TourPackage: { code: 'R03', ratePercent: 12, labelEn: 'R03 Tour & Trekking Package Commission (12%)' },
  TrekkingAgency: { code: 'R03', ratePercent: 12, labelEn: 'R03 Trekking Expedition Commission (12%)' },
  Guide: { code: 'R04', ratePercent: 10, labelEn: 'R04 Licensed Guide / Porter Commission (10%)' },
  Transport: { code: 'R05', ratePercent: 8, labelEn: 'R05 Tourist Transport Commission (8%)' },
  AdventureActivity: { code: 'R06', ratePercent: 12, labelEn: 'R06 Adventure Activity Commission (12%)' },
};

export const NEPAL_PROVINCES: ProvinceEntry[] = [
  {
    id: 'PR-01',
    number: 1,
    nameEn: 'Koshi Province',
    nameNe: 'कोशी प्रदेश',
    capitalEn: 'Biratnagar',
    capitalNe: 'विराटनगर',
    districtCount: 14,
    signatureCorridorEn: 'Everest (Khumbu), Kanchenjunga, Makalu Barun & Ilam Tea Hills',
    signatureCorridorNe: 'सगरमाथा (खुम्बु), कञ्चनजङ्घा, मकालु बरुण र इलाम चिया बगान',
    highestPeakEn: 'Mt. Everest (Sagarmatha)',
    highestPeakMeters: 8848.86,
    heroImageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    svgPath: 'M 710 185 L 845 195 L 860 325 L 725 335 L 690 255 Z',
    labelX: 778,
    labelY: 268,
  },
  {
    id: 'PR-02',
    number: 2,
    nameEn: 'Madhesh Province',
    nameNe: 'मधेश प्रदेश',
    capitalEn: 'Janakpurdham',
    capitalNe: 'जनकपुरधाम',
    districtCount: 8,
    signatureCorridorEn: 'Janaki Mandir Heritage Circuit, Mithila Art & Koshi Tappu Gateway',
    signatureCorridorNe: 'जानकी मन्दिर सम्पदा सर्किट, मिथिला कला र कोशी टप्पु प्रवेशद्वार',
    highestPeakEn: 'Churia Foothills',
    highestPeakMeters: 610,
    heroImageUrl: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=1200&q=80',
    svgPath: 'M 540 315 L 725 335 L 718 375 L 525 360 Z',
    labelX: 625,
    labelY: 348,
  },
  {
    id: 'PR-03',
    number: 3,
    nameEn: 'Bagmati Province',
    nameNe: 'बागमती प्रदेश',
    capitalEn: 'Hetauda (Kathmandu Valley Hub)',
    capitalNe: 'हेटौंडा (काठमाडौं उपत्यका)',
    districtCount: 13,
    signatureCorridorEn: 'Kathmandu UNESCO World Heritage, Langtang Valley & Chitwan National Park',
    signatureCorridorNe: 'काठमाडौं विश्व सम्पदा, लाङटाङ उपत्यका र चितवन राष्ट्रिय निकुञ्ज',
    highestPeakEn: 'Langtang Lirung',
    highestPeakMeters: 7227,
    heroImageUrl: 'https://images.unsplash.com/photo-1558799401-1dcba79834c2?auto=format&fit=crop&w=1200&q=80',
    svgPath: 'M 515 170 L 710 185 L 690 255 L 725 335 L 540 315 L 495 275 Z',
    labelX: 605,
    labelY: 248,
  },
  {
    id: 'PR-04',
    number: 4,
    nameEn: 'Gandaki Province',
    nameNe: 'गण्डकी प्रदेश',
    capitalEn: 'Pokhara',
    capitalNe: 'पोखरा',
    districtCount: 11,
    signatureCorridorEn: 'Pokhara Lakes, Annapurna Sanctuary, Upper Mustang & Manaslu Circuit',
    signatureCorridorNe: 'पोखरा फेवाताल, अन्नपूर्ण पदमार्ग, माथिल्लो मुस्ताङ र मनास्लु सर्किट',
    highestPeakEn: 'Dhaulagiri I / Manaslu / Annapurna I',
    highestPeakMeters: 8167,
    heroImageUrl: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=80',
    svgPath: 'M 375 135 L 515 170 L 495 275 L 365 255 Z',
    labelX: 442,
    labelY: 205,
  },
  {
    id: 'PR-05',
    number: 5,
    nameEn: 'Lumbini Province',
    nameNe: 'लुम्बिनी प्रदेश',
    capitalEn: 'Deukhuri (Lumbini Sacred Garden)',
    capitalNe: 'देउखुरी (लुम्बिनी पवित्र उद्यान)',
    districtCount: 12,
    signatureCorridorEn: 'Lumbini Birthplace of Lord Buddha, Bardiya Tiger Reserve & Palpa Heritage',
    signatureCorridorNe: 'भगवान बुद्धको जन्मस्थल लुम्बिनी, बर्दिया राष्ट्रिय निकुञ्ज र पाल्पा तानसेन',
    highestPeakEn: 'Putha Hiunchuli (Dhorpatan)',
    highestPeakMeters: 7246,
    heroImageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80',
    svgPath: 'M 225 225 L 365 255 L 495 275 L 540 315 L 525 360 L 210 310 Z',
    labelX: 365,
    labelY: 298,
  },
  {
    id: 'PR-06',
    number: 6,
    nameEn: 'Karnali Province',
    nameNe: 'कर्णाली प्रदेश',
    capitalEn: 'Birendranagar (Surkhet)',
    capitalNe: 'वीरेन्द्रनगर (सुर्खेत)',
    districtCount: 10,
    signatureCorridorEn: 'Rara Lake, Shey Phoksundo (Upper Dolpa) & Sinja Valley Civilization',
    signatureCorridorNe: 'रारा ताल, शे-फोक्सुण्डो (माथिल्लो डोल्पा) र सिंजा उपत्यका सभ्यता',
    highestPeakEn: 'Kanjiroba Himal',
    highestPeakMeters: 6883,
    heroImageUrl: 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1200&q=80',
    svgPath: 'M 185 75 L 375 135 L 365 255 L 225 225 Z',
    labelX: 282,
    labelY: 168,
  },
  {
    id: 'PR-07',
    number: 7,
    nameEn: 'Sudurpashchim Province',
    nameNe: 'सुदूरपश्चिम प्रदेश',
    capitalEn: 'Godawari (Dhangadhi Hub)',
    capitalNe: 'गोदावरी (धनगढी)',
    districtCount: 9,
    signatureCorridorEn: 'Khaptad Spiritual Plateau, Api Nampa Conservation & Shuklaphanta Wildlife',
    signatureCorridorNe: 'खप्तड आध्यात्मिक पठार, अपि नाम्पा संरक्षण क्षेत्र र शुक्लाफाँटा निकुञ्ज',
    highestPeakEn: 'Mt. Api',
    highestPeakMeters: 7132,
    heroImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    svgPath: 'M 65 95 L 185 75 L 225 225 L 210 310 L 55 245 Z',
    labelX: 142,
    labelY: 185,
  },
];

// Complete 77 Districts of Nepal organized across the 7 Provinces (Document 01 Section 29.1)
const RAW_DISTRICTS: Array<{
  nameEn: string;
  nameNe: string;
  provinceId: 'PR-01' | 'PR-02' | 'PR-03' | 'PR-04' | 'PR-05' | 'PR-06' | 'PR-07';
  hqEn: string;
  hqNe: string;
  tier: 'Tier A' | 'Tier B' | 'Tier C';
  maxAlt: number;
  permits: string[];
  highlightsEn: string[];
  highlightsNe: string[];
}> = [
  // PR-01: Koshi Province (14 Districts)
  { nameEn: 'Solukhumbu', nameNe: 'सोलुखुम्बु', provinceId: 'PR-01', hqEn: 'Salleri', hqNe: 'सल्लेरी', tier: 'Tier A', maxAlt: 8849, permits: ['Sagarmatha National Park Permit', 'Khumbu Pasang Lhamu Rural Municipality Permit'], highlightsEn: ['Everest Base Camp (5,364m)', 'Namche Bazaar', 'Gokyo Lakes', 'Tengboche Monastery'], highlightsNe: ['सगरमाथा आधार शिविर', 'नाम्चे बजार', 'गोक्यो ताल', 'त्याङबोचे गुम्बा'] },
  { nameEn: 'Taplejung', nameNe: 'ताप्लेजुङ', provinceId: 'PR-01', hqEn: 'Fungling', hqNe: 'फुङलिङ', tier: 'Tier B', maxAlt: 8586, permits: ['Kanchenjunga Conservation Area Permit (KCAP)', 'Restricted Area Permit (RAP) + Licensed Guide'], highlightsEn: ['Kanchenjunga Base Camp', 'Pathibhara Devi Temple', 'Olangchung Gola'], highlightsNe: ['कञ्चनजङ्घा आधार शिविर', 'पाथीभरा देवी मन्दिर', 'ओलाङचुङ गोला'] },
  { nameEn: 'Sankhuwasabha', nameNe: 'संखुवासभा', provinceId: 'PR-01', hqEn: 'Khandbari', hqNe: 'खाँदबारी', tier: 'Tier B', maxAlt: 8485, permits: ['Makalu Barun National Park Permit', 'Kimathanka RAP'], highlightsEn: ['Makalu Base Camp', 'Arun Valley', 'Barun River Gorge'], highlightsNe: ['मकालु आधार शिविर', 'अरुण उपत्यका', 'बरुण नदी खोंच'] },
  { nameEn: 'Ilam', nameNe: 'इलाम', provinceId: 'PR-01', hqEn: 'Ilam Bazaar', hqNe: 'इलाम बजार', tier: 'Tier A', maxAlt: 3636, permits: ['Standard Entry (Sandakpur Border ID Check)'], highlightsEn: ['Kanyam Tea Gardens', 'Sandakpur Sunrise Viewpoint', 'Shree Antu Danda', 'Mai Pokhari'], highlightsNe: ['कन्याम चिया बगान', 'सन्दकपुर सूर्योदय', 'श्रीअन्तु डाँडा', 'माईपोखरी'] },
  { nameEn: 'Sunsari', nameNe: 'सुनसरी', provinceId: 'PR-01', hqEn: 'Inaruwa', hqNe: 'इनरुवा', tier: 'Tier B', maxAlt: 1400, permits: ['Koshi Tappu Wildlife Reserve Ticket'], highlightsEn: ['Koshi Tappu Bird Sanctuary', 'Bhedetar Hill Station', 'Barahakshetra & Budhasubba'], highlightsNe: ['कोशी टप्पु वन्यजन्तु आरक्ष', 'भेडेतर हिल स्टेशन', 'बराहक्षेत्र र बुढासुब्बा'] },
  { nameEn: 'Morang', nameNe: 'मोरङ', provinceId: 'PR-01', hqEn: 'Biratnagar', hqNe: 'विराटनगर', tier: 'Tier B', maxAlt: 2400, permits: ['None'], highlightsEn: ['Biratnagar Industrial & Cultural Hub', 'Jefale Danda Homestay', 'Betana Wetland'], highlightsNe: ['विराटनगर सांस्कृतिक केन्द्र', 'जेफाले डाँडा होमस्टे', 'बेताना सिमसार'] },
  { nameEn: 'Jhapa', nameNe: 'झापा', provinceId: 'PR-01', hqEn: 'Bhadrapur', hqNe: 'भद्रपुर', tier: 'Tier B', maxAlt: 500, permits: ['None'], highlightsEn: ['Kakarbhitta Eastern Gateway', 'Jamunkhadi Wetland', 'Arjundhara Dham', 'Kechana Kawal (Lowest Point 58m)'], highlightsNe: ['काँकडभिट्टा पूर्वी प्रवेशद्वार', 'जामुनखाडी सिमसार', 'अर्जुनधारा धाम', 'केचना कवल (५८ मि.)'] },
  { nameEn: 'Dhankuta', nameNe: 'धनकुटा', provinceId: 'PR-01', hqEn: 'Dhankuta', hqNe: 'धनकुटा', tier: 'Tier B', maxAlt: 2700, permits: ['None'], highlightsEn: ['Hile Bazaar', 'Namje Spirit Mountain Homestay', 'Raja Rani Lake'], highlightsNe: ['हिले बजार', 'नाम्जे थुम्की होमस्टे', 'राजारानी ताल'] },
  { nameEn: 'Panchthar', nameNe: 'पाँचथर', provinceId: 'PR-01', hqEn: 'Phidim', hqNe: 'फिदिम', tier: 'Tier C', maxAlt: 3675, permits: ['TIMS for Timbung Pokhari Trek'], highlightsEn: ['Timbung Pokhari', 'Silauti & Labrekuti Kirat Heritage'], highlightsNe: ['तिम्बुङ पोखरी', 'सिलौटी र लब्रेकुटी किराँत सम्पदा'] },
  { nameEn: 'Tehrathum', nameNe: 'तेह्रथुम', provinceId: 'PR-01', hqEn: 'Myanglung', hqNe: 'म्याङलुङ', tier: 'Tier C', maxAlt: 3050, permits: ['TMJ Rhododendron Corridor Registration'], highlightsEn: ['Tinjure Milke Jaljale (28 Rhododendron Species)', 'Hyatung Waterfall (365m)'], highlightsNe: ['तिनजुरे मिल्के जलजले गुराँस राजधानी', 'ह्यात्रुङ झरना (३६५ मि.)'] },
  { nameEn: 'Bhojpur', nameNe: 'भोजपुर', provinceId: 'PR-01', hqEn: 'Bhojpur', hqNe: 'भोजपुर', tier: 'Tier C', maxAlt: 4153, permits: ['Mundum Trail Local Registration'], highlightsEn: ['Mundum Trekking Trail', 'Silichung Peak', 'Traditional Khukuri Craft Heritage'], highlightsNe: ['मुन्दुम पदमार्ग', 'सिलिचुङ चुचुरो', 'भोजपुरे खुकुरी कला'] },
  { nameEn: 'Khotang', nameNe: 'खोटाङ', provinceId: 'PR-01', hqEn: 'Diktel', hqNe: 'दिक्तेल', tier: 'Tier B', maxAlt: 3620, permits: ['None'], highlightsEn: ['Halesi Mahadev Cave Temple (Hindu, Buddhist & Kirat Sacred Site)', 'Mundum Ridge'], highlightsNe: ['हलेसी महादेव गुफा मन्दिर', 'मुन्दुम डाँडा'] },
  { nameEn: 'Okhaldhunga', nameNe: 'ओखलढुङ्गा', provinceId: 'PR-01', hqEn: 'Siddhicharan', hqNe: 'सिद्धिचरण', tier: 'Tier C', maxAlt: 4065, permits: ['TIMS for Pike Peak'], highlightsEn: ['Pikey Peak Sunrise Viewpoint', 'Pokali Waterfall', 'Siddhicharan Literary Heritage'], highlightsNe: ['पिके पिक सूर्योदय', 'पोकली झरना', 'सिद्धिचरण साहित्यिक सम्पदा'] },
  { nameEn: 'Udayapur', nameNe: 'उदयपुर', provinceId: 'PR-01', hqEn: 'Gaighat', hqNe: 'गाईघाट', tier: 'Tier C', maxAlt: 2310, permits: ['None'], highlightsEn: ['Rauta Pokhari', 'Udayapurgadhi Historic Fort', 'Koshi River Rafting Finish'], highlightsNe: ['रौता पोखरी', 'उदयपुरगढी ऐतिहासिक किल्ला', 'कोशी र्‍याफ्टिङ'] },

  // PR-02: Madhesh Province (8 Districts)
  { nameEn: 'Dhanusha', nameNe: 'धनुषा', provinceId: 'PR-02', hqEn: 'Janakpurdham', hqNe: 'जनकपुरधाम', tier: 'Tier A', maxAlt: 610, permits: ['None'], highlightsEn: ['Janaki Mandir', 'Vivah Mandap', 'Ganga Sagar Aarti', 'Mithila Painting Centers'], highlightsNe: ['जानकी मन्दिर', 'विवाह मण्डप', 'गंगासागर आरती', 'मिथिला चित्रकला केन्द्र'] },
  { nameEn: 'Parsa', nameNe: 'पर्सा', provinceId: 'PR-02', hqEn: 'Birgunj', hqNe: 'वीरगञ्ज', tier: 'Tier B', maxAlt: 750, permits: ['Parsa National Park Entry Permit'], highlightsEn: ['Parsa National Park Wild Elephants', 'Ghadiarwa Pokhari', 'Shankaracharya Gate'], highlightsNe: ['पर्सा राष्ट्रिय निकुञ्ज', 'घडिअर्वा पोखरी', 'शंकराचार्य गेट'] },
  { nameEn: 'Bara', nameNe: 'बारा', provinceId: 'PR-02', hqEn: 'Kalaiya', hqNe: 'कलैया', tier: 'Tier B', maxAlt: 700, permits: ['None'], highlightsEn: ['Gadhimai Temple', 'Simraungadh Ancient Kingdom Ruins', 'Halkhoriya Lake'], highlightsNe: ['गढीमाई मन्दिर', 'सिम्रौनगढ प्राचीन राज्य भग्नावशेष', 'हल्खोरिया दह'] },
  { nameEn: 'Saptari', nameNe: 'सप्तरी', provinceId: 'PR-02', hqEn: 'Rajbiraj', hqNe: 'राजविराज', tier: 'Tier B', maxAlt: 450, permits: ['Koshi Tappu Western Buffer Ticket'], highlightsEn: ['Chhinnamasta Bhagawati Shaktipeeth', 'Kankalini Temple', 'Koshi Barrage'], highlightsNe: ['छिन्नमस्ता भगवती शक्तिपीठ', 'कंकालिनी मन्दिर', 'कोशी ब्यारेज'] },
  { nameEn: 'Siraha', nameNe: 'सिराहा', provinceId: 'PR-02', hqEn: 'Siraha', hqNe: 'सिराहा', tier: 'Tier C', maxAlt: 520, permits: ['None'], highlightsEn: ['Salhesh Phulbari New Year Orchid Grove', 'Baba Tal', 'Kamala River Cultural Ghat'], highlightsNe: ['सलहेश फूलबारी', 'बाबा ताल', 'कमला नदी सांस्कृतिक घाट'] },
  { nameEn: 'Mahottari', nameNe: 'महोत्तरी', provinceId: 'PR-02', hqEn: 'Jaleshwar', hqNe: 'जलेश्वर', tier: 'Tier C', maxAlt: 600, permits: ['None'], highlightsEn: ['Jaleshwarnath Mahadev Temple', 'Matihani Sanskrit Heritage', 'Tuteshwarnath'], highlightsNe: ['जलेश्वरनाथ महादेव मन्दिर', 'मटिहानी संस्कृत सम्पदा', 'टुटेश्वरनाथ'] },
  { nameEn: 'Sarlahi', nameNe: 'सर्लाही', provinceId: 'PR-02', hqEn: 'Malangwa', hqNe: 'मलंगवा', tier: 'Tier C', maxAlt: 650, permits: ['None'], highlightsEn: ['Bharat Tal Lake', 'Nunthar Bagmati Gorge Picnic & Boating', 'Murtiya Shrine'], highlightsNe: ['भरत ताल', 'नुनथर बागमती खोंच', 'मुर्तिया मन्दिर'] },
  { nameEn: 'Rautahat', nameNe: 'रौतहट', provinceId: 'PR-02', hqEn: 'Gaur', hqNe: 'गौर', tier: 'Tier C', maxAlt: 580, permits: ['None'], highlightsEn: ['Shiva Nagar Mahadev Temple', 'Nunthar Corridor', 'Chandranigahapur Forest Park'], highlightsNe: ['शिवनगर महादेव मन्दिर', 'चन्द्रनिगाहपुर वन उद्यान'] },

  // PR-03: Bagmati Province (13 Districts)
  { nameEn: 'Kathmandu', nameNe: 'काठमाडौं', provinceId: 'PR-03', hqEn: 'Kathmandu', hqNe: 'काठमाडौं', tier: 'Tier A', maxAlt: 2732, permits: ['UNESCO Monument Heritage Entry Tickets', 'Shivapuri Nagarjun National Park Ticket'], highlightsEn: ['Pashupatinath Temple', 'Boudhanath Stupa', 'Swayambhunath', 'Kathmandu Durbar Square'], highlightsNe: ['पशुपतिनाथ मन्दिर', 'बौद्धनाथ स्तूप', 'स्वयम्भूनाथ', 'काठमाडौं दरबार स्क्वायर'] },
  { nameEn: 'Lalitpur', nameNe: 'ललितपुर', provinceId: 'PR-03', hqEn: 'Patan', hqNe: 'पाटन', tier: 'Tier A', maxAlt: 2762, permits: ['Patan Durbar Square Museum Pass'], highlightsEn: ['Patan Durbar Square & Krishna Mandir', 'Godawari Botanical Garden', 'Khokana & Bungamati Newa Villages'], highlightsNe: ['पाटन दरबार स्क्वायर र कृष्ण मन्दिर', 'गोदावरी वनस्पति उद्यान', 'खोकना र बुङमती नेवाः बस्ती'] },
  { nameEn: 'Bhaktapur', nameNe: 'भक्तपुर', provinceId: 'PR-03', hqEn: 'Bhaktapur', hqNe: 'भक्तपुर', tier: 'Tier A', maxAlt: 2175, permits: ['Bhaktapur Heritage Municipality Entry Pass'], highlightsEn: ['Bhaktapur Durbar Square & Nyatapola', 'Nagarkot Himalayan Panorama', 'Changu Narayan Temple'], highlightsNe: ['भक्तपुर दरबार स्क्वायर र न्यातपोल', 'नगरकोट हिमालय दृश्य', 'चाँगुनारायण मन्दिर'] },
  { nameEn: 'Chitwan', nameNe: 'चितवन', provinceId: 'PR-03', hqEn: 'Bharatpur', hqNe: 'भरतपुर', tier: 'Tier A', maxAlt: 1947, permits: ['Chitwan National Park Entry Permit + Licensed Nature Guide'], highlightsEn: ['Chitwan National Park One-Horned Rhino & Bengal Tiger Safari', 'Sauraha Tharu Culture', 'Devghat Dham'], highlightsNe: ['चितवन राष्ट्रिय निकुञ्ज एकसिंगे गैंडा सफारी', 'सौराहा थारु संस्कृति', 'देवघाट धाम'] },
  { nameEn: 'Rasuwa', nameNe: 'रसुवा', provinceId: 'PR-03', hqEn: 'Dhunche', hqNe: 'धुन्चे', tier: 'Tier A', maxAlt: 7227, permits: ['Langtang National Park Permit', 'TIMS Card + Licensed Guide'], highlightsEn: ['Langtang Valley & Kyanjin Gompa (3,870m)', 'Gosaikunda Sacred Alpine Lakes (4,380m)', 'Tamang Heritage Trail'], highlightsNe: ['लाङटाङ उपत्यका र क्यान्जिन गुम्बा', 'गोसाइँकुण्ड पवित्र ताल', 'तामाङ सम्पदा पदमार्ग'] },
  { nameEn: 'Sindhupalchok', nameNe: 'सिन्धुपाल्चोक', provinceId: 'PR-03', hqEn: 'Chautara', hqNe: 'चौतारा', tier: 'Tier B', maxAlt: 6080, permits: ['Langtang/Gaurishankar Conservation Permit', 'TIMS Card'], highlightsEn: ['Helambu Circuit Trek', 'Bhote Koshi Bungee & White-Water Rafting', 'Panch Pokhari (4,100m)'], highlightsNe: ['हेलम्बु पदमार्ग', 'भोटेकोशी बन्जी र र्‍याफ्टिङ', 'पाँचपोखरी (४,१०० मि.)'] },
  { nameEn: 'Dolakha', nameNe: 'दोलखा', provinceId: 'PR-03', hqEn: 'Charikot', hqNe: 'चरिकोट', tier: 'Tier B', maxAlt: 7181, permits: ['Gaurishankar Conservation Area Permit (GCAP)', 'Tsho Rolpa / Rolwaling TIMS'], highlightsEn: ['Kalinchowk Bhagawati (3,842m)', 'Tsho Rolpa Glacial Lake (4,580m)', 'Jiri Classic Everest Trailhead', 'Dolakha Bhimeshwar'], highlightsNe: ['कालिञ्चोक भगवती', 'छो रोल्पा हिमताल', 'जिरी सगरमाथा प्रवेशद्वार', 'दोलखा भीमेश्वर'] },
  { nameEn: 'Kavrepalanchok', nameNe: 'काभ्रेपलाञ्चोक', provinceId: 'PR-03', hqEn: 'Dhulikhel', hqNe: 'धुलिखेल', tier: 'Tier B', maxAlt: 3018, permits: ['None'], highlightsEn: ['Dhulikhel Sunrise Ridge', 'NamobuddhaThrangu Tashi Yangtse Monastery', 'Panauti Historic Confluence', 'Bethanchowk Narayanthan'], highlightsNe: ['धुलिखेल सूर्योदय', 'नमोबुद्ध गुम्बा', 'पनौती ऐतिहासिक संगम', 'बेथानचोक नारायणथान'] },
  { nameEn: 'Nuwakot', nameNe: 'नुवाकोट', provinceId: 'PR-03', hqEn: 'Bidur', hqNe: 'विदुर', tier: 'Tier B', maxAlt: 4800, permits: ['None'], highlightsEn: ['Nuwakot Saat Tale Durbar (7-Storey Palace)', 'Kakani Trout & Strawberry Hills', 'Dupcheswar Mahadev'], highlightsNe: ['नुवाकोट साततले दरबार', 'ककनी ट्राउट र स्ट्रबेरी डाँडा', 'दुप्चेश्वर महादेव'] },
  { nameEn: 'Makwanpur', nameNe: 'मकवानपुर', provinceId: 'PR-03', hqEn: 'Hetauda', hqNe: 'हेटौंडा', tier: 'Tier B', maxAlt: 2584, permits: ['None'], highlightsEn: ['Chitlang Ancient Newa & Goat Cheese Village', 'Indrasarowar Kulekhani Lake', 'Daman Simbhanjyang Viewpoint'], highlightsNe: ['चित्लाङ ऐतिहासिक गाउँ', 'इन्द्रसरोवर कुलेखानी ताल', 'दमन सिमभञ्ज्याङ'] },
  { nameEn: 'Dhading', nameNe: 'धादिङ', provinceId: 'PR-03', hqEn: 'Dhading Besi', hqNe: 'धादिङ बेसी', tier: 'Tier B', maxAlt: 7110, permits: ['TIMS for Ruby Valley Trek'], highlightsEn: ['Ruby Valley & Ganesh Himal Trek', 'Trishuli River White-Water Rafting', 'Ganga Jamuna Waterfall'], highlightsNe: ['रुबी भ्याली र गणेश हिमाल पदमार्ग', 'त्रिशूली नदी र्‍याफ्टिङ', 'गंगा जमुना झरना'] },
  { nameEn: 'Ramechhap', nameNe: 'रामेछाप', provinceId: 'PR-03', hqEn: 'Manthali', hqNe: 'मन्थली', tier: 'Tier C', maxAlt: 6959, permits: ['GCAP for Numbur Cheese Circuit'], highlightsEn: ['Manthali Lukla Flight Hub', 'Sailung 100 Hills Meadow (3,146m)', 'Numbur Cheese Circuit'], highlightsNe: ['मन्थली लुक्ला उडान केन्द्र', 'शैलुङ १०० थुम्का (३,१४६ मि.)', 'नुम्बुर चिज सर्किट'] },
  { nameEn: 'Sindhuli', nameNe: 'सिन्धुली', provinceId: 'PR-03', hqEn: 'Sindhulimadhi', hqNe: 'सिन्धुलीमाढी', tier: 'Tier C', maxAlt: 2797, permits: ['None'], highlightsEn: ['Sindhuligadhi Historic Battle Fort (1767 AD)', 'BP Highway Scenic Junar Orchards'], highlightsNe: ['सिन्धुलीगढी ऐतिहासिक किल्ला', 'बीपी राजमार्ग जुनार बगैंचा'] },

  // PR-04: Gandaki Province (11 Districts)
  { nameEn: 'Kaski', nameNe: 'कास्की', provinceId: 'PR-04', hqEn: 'Pokhara', hqNe: 'पोखरा', tier: 'Tier A', maxAlt: 8091, permits: ['Annapurna Conservation Area Permit (ACAP)', 'TIMS Card + Licensed Guide'], highlightsEn: ['Pokhara Phewa & Begnas Lakes', 'Annapurna Base Camp (4,130m)', 'Sarangkot Paragliding', 'Mardi Himal & Ghandruk Gurung Village'], highlightsNe: ['पोखरा फेवा र बेगनास ताल', 'अन्नपूर्ण आधार शिविर', 'सराङकोट प्याराग्लाइडिङ', 'मर्दी हिमाल र घान्द्रुक गुरुङ गाउँ'] },
  { nameEn: 'Mustang', nameNe: 'मुस्ताङ', provinceId: 'PR-04', hqEn: 'Jomsom', hqNe: 'जोमसोम', tier: 'Tier A', maxAlt: 6781, permits: ['ACAP Permit', 'Upper Mustang Restricted Area Permit (USD 500 / 10 Days) + Guide'], highlightsEn: ['Muktinath Temple (3,800m)', 'Lo Manthang Walled Kingdom of Upper Mustang', 'Marpha Apple Orchards', 'Dhumba Lake'], highlightsNe: ['मुक्तिनाथ मन्दिर (३,८०० मि.)', 'लोमान्थाङ माथिल्लो मुस्ताङ', 'मार्फा स्याउ बगैंचा', 'ढुम्बा ताल'] },
  { nameEn: 'Manang', nameNe: 'मनाङ', provinceId: 'PR-04', hqEn: 'Chame', hqNe: 'चामे', tier: 'Tier A', maxAlt: 7937, permits: ['ACAP Permit', 'TIMS Card', 'Nar Phu Valley RAP (if entering Nar-Phu)'], highlightsEn: ['Tilicho Lake (4,919m)', 'Thorong La Pass (5,416m)', 'Ice Lake & Gangapurna', 'Nar Phu Hidden Valleys'], highlightsNe: ['तिलिचो ताल (४,९१९ मि.)', 'थोरोङ ला भञ्ज्याङ (५,४१६ मि.)', 'गंगापूर्ण ताल', 'नार फु उपत्यका'] },
  { nameEn: 'Gorkha', nameNe: 'गोरखा', provinceId: 'PR-04', hqEn: 'Gorkha Bazaar', hqNe: 'गोरखा बजार', tier: 'Tier A', maxAlt: 8163, permits: ['Manaslu Conservation Area Permit (MCAP)', 'Manaslu & Tsum Valley RAP + Licensed Guide'], highlightsEn: ['Manaslu Circuit & Larkya La Pass (5,106m)', 'Tsum Sacred Hidden Valley', 'Gorkha Durbar & Manakamana Temple'], highlightsNe: ['मनास्लु सर्किट र लार्क्या ला भञ्ज्याङ', 'चुम पवित्र उपत्यका', 'गोरखा दरबार र मनकामना मन्दिर'] },
  { nameEn: 'Lamjung', nameNe: 'लमजुङ', provinceId: 'PR-04', hqEn: 'Besisahar', hqNe: 'बेसीशहर', tier: 'Tier B', maxAlt: 7937, permits: ['ACAP Permit for Annapurna Circuit Trailhead'], highlightsEn: ['Ghalegaun & Bhujung Model Gurung Homestays', 'Besisahar Annapurna Circuit Gateway'], highlightsNe: ['घलेगाउँ र भुजुङ नमुना गुरुङ होमस्टे', 'बेसीशहर अन्नपूर्ण सर्किट प्रवेशद्वार'] },
  { nameEn: 'Myagdi', nameNe: 'म्याग्दी', provinceId: 'PR-04', hqEn: 'Beni', hqNe: 'बेनी', tier: 'Tier B', maxAlt: 8167, permits: ['ACAP Permit / Dhaulagiri Circuit TIMS'], highlightsEn: ['Poon Hill (3,210m) & Ghorepani', 'Dhaulagiri Base Camp', 'Tatopani Natural Hot Springs'], highlightsNe: ['पुनहिल (३,२१० मि.) र घोरेपानी', 'धौलागिरी आधार शिविर', 'तातोपानी प्राकृतिक कुण्ड'] },
  { nameEn: 'Tanahun', nameNe: 'तनहुँ', provinceId: 'PR-04', hqEn: 'Damauli', hqNe: 'दमौली', tier: 'Tier B', maxAlt: 2134, permits: ['None'], highlightsEn: ['Bandipur Living Newa Hilltop Town', 'Siddha Gufa Cave', 'Vyas Gufa & Madi Seti Confluence'], highlightsNe: ['बन्दीपुर ऐतिहासिक पहाडी शहर', 'सिद्ध गुफा', 'व्यास गुफा र सेती-मादी संगम'] },
  { nameEn: 'Nawalpur', nameNe: 'नवलपुर', provinceId: 'PR-04', hqEn: 'Kawasoti', hqNe: 'कावासोती', tier: 'Tier B', maxAlt: 1936, permits: ['Chitwan Buffer Zone Permit'], highlightsEn: ['Amaltari Tharu Community Homestay & River Safari', 'Maulakalika Hill Temple', 'Shashwat Dham'], highlightsNe: ['अमलटारी थारु सामुदायिक होमस्टे', 'मौलाकालिका मन्दिर', 'शाश्वत धाम'] },
  { nameEn: 'Baglung', nameNe: 'बागलुङ', provinceId: 'PR-04', hqEn: 'Baglung', hqNe: 'बागलुङ', tier: 'Tier B', maxAlt: 4690, permits: ['Dhorpatan Hunting Reserve Entry Permit'], highlightsEn: ['Dhorpatan Alpine Valley', 'Baglung Kalika Bhagawati', 'Panchkot & Gandaki Golden Suspension Bridge'], highlightsNe: ['ढोरपाटन उपत्यका', 'बागलुङ कालिका भगवती', 'पञ्चकोट र लामो झोलुङ्गे पुल'] },
  { nameEn: 'Parbat', nameNe: 'पर्वत', provinceId: 'PR-04', hqEn: 'Kusma', hqNe: 'कुश्मा', tier: 'Tier C', maxAlt: 3309, permits: ['None'], highlightsEn: ['Kusma Kali Gandaki Gorge Second-Highest Bungee & Swing', 'Gupteshwar & Modibeni'], highlightsNe: ['कुश्मा कालीगण्डकी बन्जी र स्विङ', 'गुप्तेश्वर र मोदीबेनी'] },
  { nameEn: 'Syangja', nameNe: 'स्याङ्जा', provinceId: 'PR-04', hqEn: 'Putalibazar', hqNe: 'पुतलीबजार', tier: 'Tier C', maxAlt: 2512, permits: ['None'], highlightsEn: ['Sirubari First Village Tourism Homestay of Nepal', 'Sworek Mahatgaun Paragliding', 'Andhikhola'], highlightsNe: ['सिरुबारी नेपालको पहिलो ग्रामीण पर्यटन होमस्टे', 'स्वरेक प्याराग्लाइडिङ'] },

  // PR-05: Lumbini Province (12 Districts)
  { nameEn: 'Rupandehi', nameNe: 'रुपन्देही', provinceId: 'PR-05', hqEn: 'Siddharthanagar (Bhairahawa)', hqNe: 'सिद्धार्थनगर (भैरहवा)', tier: 'Tier A', maxAlt: 1229, permits: ['Lumbini Sacred Garden Conservation Ticket'], highlightsEn: ['Lumbini Maya Devi Temple & Ashoka Pillar (UNESCO)', 'World Peace Pagoda & Monastic Zone', 'Gautam Buddha International Airport Gateway'], highlightsNe: ['लुम्बिनी मायादेवी मन्दिर र अशोक स्तम्भ', 'विश्व शान्ति स्तूप र गुम्बा क्षेत्र', 'गौतम बुद्ध अन्तर्राष्ट्रिय विमानस्थल'] },
  { nameEn: 'Bardiya', nameNe: 'बर्दिया', provinceId: 'PR-05', hqEn: 'Gulariya', hqNe: 'गुलरिया', tier: 'Tier A', maxAlt: 1441, permits: ['Bardiya National Park Entry Permit + Licensed Jungle Guide'], highlightsEn: ['Bardiya National Park Royal Bengal Tiger & Wild Elephant Tracking', 'Karnali River Gangetic Dolphin Safari', 'Dallagaun Tharu Homestay'], highlightsNe: ['बर्दिया राष्ट्रिय निकुञ्ज बाघ र हात्ती सफारी', 'कर्णाली नदी डल्फिन सफारी', 'डल्लागाउँ थारु होमस्टे'] },
  { nameEn: 'Palpa', nameNe: 'पाल्पा', provinceId: 'PR-05', hqEn: 'Tansen', hqNe: 'तानसेन', tier: 'Tier B', maxAlt: 1936, permits: ['None'], highlightsEn: ['Rani Mahal (Taj Mahal of Nepal on Kali Gandaki)', 'Tansen Shreenagar Hill & Dhaka Weaving Heritage', 'Bhairavsthan'], highlightsNe: ['रानीमहल (कालीगण्डकी किनार)', 'तानसेन श्रीनगर र पाल्पाली ढाका र करुवा कला', 'भैरवस्थान'] },
  { nameEn: 'Banke', nameNe: 'बाँके', provinceId: 'PR-05', hqEn: 'Nepalgunj', hqNe: 'नेपालगञ्ज', tier: 'Tier B', maxAlt: 1236, permits: ['Banke National Park Permit'], highlightsEn: ['Bageshwari Shaktipeeth Temple', 'Banke National Park Four-Horned Antelope Habitat', 'Western Himalayas Flight Hub (Simikot/Dolpa/Rara)'], highlightsNe: ['बागेश्वरी शक्तिपीठ मन्दिर', 'बाँके राष्ट्रिय निकुञ्ज', 'कर्णाली हिमाली उडान केन्द्र'] },
  { nameEn: 'Kapilvastu', nameNe: 'कपिलवस्तु', provinceId: 'PR-05', hqEn: 'Taulihawa', hqNe: 'तौलिहवा', tier: 'Tier B', maxAlt: 1491, permits: ['Tilaurakot Archaeological Heritage Ticket'], highlightsEn: ['Tilaurakot Ancient Shakya Palace of Prince Siddhartha', 'Jagadishpur Bird Sanctuary Wetland', 'Gotihawa & Niglihawa Ashoka Pillars'], highlightsNe: ['तिलौराकोट प्राचीन शाक्य दरबार', 'जगदीशपुर चरा आरक्ष सिमसार', 'गोटीहवा र निग्लिहवा अशोक स्तम्भ'] },
  { nameEn: 'Dang', nameNe: 'दाङ', provinceId: 'PR-05', hqEn: 'Ghorahi', hqNe: 'घोराही', tier: 'Tier B', maxAlt: 2058, permits: ['None'], highlightsEn: ['Dharapani World Tallest Trishul Temple', 'Ambikeshwari Temple', 'Deukhuri & Dang Inner Terai Valleys'], highlightsNe: ['धारापानी विशाल त्रिशूल मन्दिर', 'अम्बिकेश्वरी मन्दिर', 'दाङ र देउखुरी उपत्यका'] },
  { nameEn: 'Gulmi', nameNe: 'गुल्मी', provinceId: 'PR-05', hqEn: 'Tamghas', hqNe: 'तम्घास', tier: 'Tier C', maxAlt: 2690, permits: ['None'], highlightsEn: ['Resunga Spiritual Forest & Viewtower', 'Ruru Kshetra (Ridi) Sacred Confluence', 'Organic Gulmi Coffee Estates'], highlightsNe: ['रेसुङ्गा तपोभूमि र भ्युटावर', 'रुरु क्षेत्र (रिडी) पवित्र संगम', 'अर्गानिक गुल्मी कफी बगान'] },
  { nameEn: 'Arghakhanchi', nameNe: 'अर्घाखाँची', provinceId: 'PR-05', hqEn: 'Sandhikharka', hqNe: 'सन्धिखर्क', tier: 'Tier C', maxAlt: 2515, permits: ['None'], highlightsEn: ['Supa Deurali Cliffside Temple', 'Panini Tapobhumi (Birthplace of Sanskrit Grammar)'], highlightsNe: ['सुपा देउराली मन्दिर', 'पाणिनि तपोभूमि'] },
  { nameEn: 'Pyuthan', nameNe: 'प्युठान', provinceId: 'PR-05', hqEn: 'Khalanga', hqNe: 'खलंगा', tier: 'Tier B', maxAlt: 3659, permits: ['None'], highlightsEn: ['Swargadwari Sacred Vedic Pilgrimage Ridge (2,121m)', 'Jhimruk Valley'], highlightsNe: ['स्वर्गद्वारी पवित्र तीर्थस्थल (२,१२१ मि.)', 'झिमरुक उपत्यका'] },
  { nameEn: 'Rolpa', nameNe: 'रोल्पा', provinceId: 'PR-05', hqEn: 'Liwang', hqNe: 'लिवाङ', tier: 'Tier C', maxAlt: 3639, permits: ['Guerilla Trek / Jaljala Registration'], highlightsEn: ['Jaljala Sacred Alpine Meadow', 'Thabang Kham Magar Cultural Village'], highlightsNe: ['जलजला पाटन', 'थबाङ खाम मगर सांस्कृतिक गाउँ'] },
  { nameEn: 'Rukum East', nameNe: 'पूर्वी रुकुम', provinceId: 'PR-05', hqEn: 'Rukumkot', hqNe: 'रुकुमकोट', tier: 'Tier C', maxAlt: 7246, permits: ['Dhorpatan Hunting Reserve Permit'], highlightsEn: ['Rukumkot Town of 52 Pokharis & 53 Dandas', 'Kamal Daha Lotus Lake', 'Dhorpatan Western Trail'], highlightsNe: ['५२ पोखरी ५३ टाकुरीको शहर रुकुमकोट', 'कमल दह', 'ढोरपाटन पश्चिमी पदमार्ग'] },
  { nameEn: 'Parasi', nameNe: 'परासी (नवलपरासी पश्चिम)', provinceId: 'PR-05', hqEn: 'Ramgram', hqNe: 'रामग्राम', tier: 'Tier B', maxAlt: 800, permits: ['Ramgram Heritage Ticket'], highlightsEn: ['Ramgram Stupa (Only Unopened Original Relic Stupa of Lord Buddha)', 'Triveni Dham'], highlightsNe: ['रामग्राम स्तूप (भगवान बुद्धको अस्तुधातु रहेको एकमात्र अक्षत स्तूप)', 'त्रिवेणी धाम'] },

  // PR-06: Karnali Province (10 Districts)
  { nameEn: 'Mugu', nameNe: 'मुगु', provinceId: 'PR-06', hqEn: 'Gamgadhi', hqNe: 'गमगढी', tier: 'Tier A', maxAlt: 6638, permits: ['Rara National Park Entry Permit', 'Upper Mugu RAP (if trekking to border)'], highlightsEn: ['Rara Lake (2,990m — Queen of Lakes)', 'Murma Top Panorama (3,630m)', 'Chhayanath Dham'], highlightsNe: ['रारा ताल (२,९९० मि. — नेपालको सबैभन्दा ठूलो ताल)', 'मुर्मा टप हिमाली दृश्य', 'छायाँनाथ धाम'] },
  { nameEn: 'Dolpa', nameNe: 'डोल्पा', provinceId: 'PR-06', hqEn: 'Dunai', hqNe: 'दुने', tier: 'Tier A', maxAlt: 6883, permits: ['Shey Phoksundo National Park Permit', 'Upper Dolpa / Lower Dolpa RAP + Licensed Guide'], highlightsEn: ['Shey Phoksundo Turquoise Alpine Lake (3,611m)', 'Shey Gompa & Crystal Mountain', 'Dho Tarap Bon Heritage Village'], highlightsNe: ['शे-फोक्सुण्डो ताल (३,६११ मि.)', 'शे गुम्बा र क्रिस्टल माउन्टेन', 'धो तराप बोन सांस्कृतिक बस्ती'] },
  { nameEn: 'Humla', nameNe: 'हुम्ला', provinceId: 'PR-06', hqEn: 'Simikot', hqNe: 'सिमकोट', tier: 'Tier B', maxAlt: 7031, permits: ['Humla Restricted Area Permit (RAP) + Licensed Guide'], highlightsEn: ['Limi Valley Ancient Tibetan-Culture Villages', 'Simikot-Hilsa Kailash Mansarovar Overland Corridor', 'Nyingba Valley'], highlightsNe: ['लिमी उपत्यका प्राचीन बस्ती', 'सिमकोट-हिल्सा कैलाश मानसरोवर मार्ग'] },
  { nameEn: 'Jumla', nameNe: 'जुम्ला', provinceId: 'PR-06', hqEn: 'Chandannath (Khalanga)', hqNe: 'चन्दननाथ (खलंगा)', tier: 'Tier B', maxAlt: 6424, permits: ['Rara Trek TIMS'], highlightsEn: ['Sinja Valley (Origin of Nepali Language & Khas Empire)', 'Chandannath Bhairavnath Temple', 'Highest Altitude Marshi Rice Fields'], highlightsNe: ['सिंजा उपत्यका (नेपाली भाषाको उद्गमस्थल)', 'चन्दननाथ भैरवनाथ मन्दिर', 'जुम्ली मार्सी धान फाँट'] },
  { nameEn: 'Surkhet', nameNe: 'सुर्खेत', provinceId: 'PR-06', hqEn: 'Birendranagar', hqNe: 'वीरेन्द्रनगर', tier: 'Tier B', maxAlt: 2367, permits: ['None'], highlightsEn: ['Kakrebihar 12th-Century Stone Temple', 'Bulbule Tal Park', 'Deuti Bajai Temple'], highlightsNe: ['काँक्रेविहार १२औं शताब्दीको शिखर शैली मन्दिर', 'बुलबुले ताल', 'देउती बज्यै मन्दिर'] },
  { nameEn: 'Dailekh', nameNe: 'दैलेख', provinceId: 'PR-06', hqEn: 'Narayan', hqNe: 'नारायण', tier: 'Tier C', maxAlt: 4168, permits: ['None'], highlightsEn: ['Panchakoshi Eternal Flame Shrines (Shirsthan & Nabhisthan)', 'Dullu Ancient Stone Pillar Inscriptions', 'Kotgadhi Fort'], highlightsNe: ['पञ्चकोशी ज्वाला क्षेत्र (शिरस्थान र नाभिस्थान)', 'दुल्लु प्राचीन कीर्तिखम्ब अभिलेख', 'कोटगढी'] },
  { nameEn: 'Kalikot', nameNe: 'कालिकोट', provinceId: 'PR-06', hqEn: 'Manma', hqNe: 'मान्म', tier: 'Tier C', maxAlt: 4790, permits: ['None'], highlightsEn: ['Pachal Jharana (381m — Highest Waterfall of Nepal)', 'Badimalika Eastern Ridge Trail', 'Karnali Highway Canyon'], highlightsNe: ['पचाल झरना (३८१ मि. — नेपालको सबैभन्दा अग्लो झरना)', 'बडीमालिका पूर्वी पदमार्ग'] },
  { nameEn: 'Jajarkot', nameNe: 'जाजरकोट', provinceId: 'PR-06', hqEn: 'Khalanga', hqNe: 'खलंगा', tier: 'Tier C', maxAlt: 5440, permits: ['None'], highlightsEn: ['Jajarkot Historic Durbar', 'Chakhure Alpine Ridge & Bheri River Rafting'], highlightsNe: ['जाजरकोट ऐतिहासिक दरबार', 'भेरी नदी र्‍याफ्टिङ'] },
  { nameEn: 'Salyan', nameNe: 'सल्यान', provinceId: 'PR-06', hqEn: 'Sharada', hqNe: 'शारदा', tier: 'Tier C', maxAlt: 2823, permits: ['None'], highlightsEn: ['Kupinde Daha Turquoise Crater Lake', 'Chhayachhetra Mahadev Temple', 'Khairabang Bhagawati'], highlightsNe: ['कुपिण्डे दह', 'छायाँक्षेत्र महादेव मन्दिर', 'खैराबाङ भगवती'] },
  { nameEn: 'Rukum West', nameNe: 'पश्चिम रुकुम', provinceId: 'PR-06', hqEn: 'Musikot', hqNe: 'मुसिकोट', tier: 'Tier C', maxAlt: 4000, permits: ['None'], highlightsEn: ['Syarpu Tal Lake & Boating', 'Digre Shashee Temple', 'Sanibheri River Corridor'], highlightsNe: ['स्यार्पु ताल', 'डिग्रे शाईकुमारी मन्दिर', 'सानीभेरी नदी'] },

  // PR-07: Sudurpashchim Province (9 Districts)
  { nameEn: 'Kailali', nameNe: 'कैलाली', provinceId: 'PR-07', hqEn: 'Dhangadhi', hqNe: 'धनगढी', tier: 'Tier B', maxAlt: 1950, permits: ['Ghodaghodi Ramsar Wetland Entry'], highlightsEn: ['Ghodaghodi Tal Ramsar Wetland', 'Tikapur Royal Botanical Park', 'Karnali Chisapani Cable-Stayed Bridge & Dolphin Point'], highlightsNe: ['घोडाघोडी ताल रामसार सिमसार', 'टिकापुर पार्क', 'कर्णाली चिसापानी पुल र डल्फिन क्षेत्र'] },
  { nameEn: 'Kanchanpur', nameNe: 'कञ्चनपुर', provinceId: 'PR-07', hqEn: 'Bhimdatta (Mahendranagar)', hqNe: 'भीमदत्त (महेन्द्रनगर)', tier: 'Tier A', maxAlt: 1528, permits: ['Shuklaphanta National Park Entry Permit + Safari Guide'], highlightsEn: ['Shuklaphanta National Park (2,000+ Swamp Deer Herd & Tiger Reserve)', 'Dodhara Chandani 1.45km Multi-Span Suspension Bridge', 'Jhilmila Lake'], highlightsNe: ['शुक्लाफाँटा राष्ट्रिय निकुञ्ज (बाह्रसिंगाको विशाल बथान)', 'दोधारा चाँदनी झोलुङ्गे पुल', 'झिलमिला ताल'] },
  { nameEn: 'Doti', nameNe: 'डोटी', provinceId: 'PR-07', hqEn: 'Dipayal Silgadhi', hqNe: 'दिपायल सिलगढी', tier: 'Tier B', maxAlt: 3300, permits: ['Khaptad National Park Entry Permit'], highlightsEn: ['Khaptad National Park & Khaptad Baba Ashram (3,050m)', 'Shaileshwari Shaktipeeth', 'Seti River Rafting'], highlightsNe: ['खप्तड राष्ट्रिय निकुञ्ज र खप्तड बाबा आश्रम', 'शैलेश्वरी शक्तिपीठ', 'सेती नदी र्‍याफ्टिङ'] },
  { nameEn: 'Achham', nameNe: 'अछाम', provinceId: 'PR-07', hqEn: 'Mangalsen', hqNe: 'मंगलसेन', tier: 'Tier C', maxAlt: 3820, permits: ['Khaptad/Ramaroshan Local Entry'], highlightsEn: ['Ramaroshan 12 Lakes & 18 Alpine Meadows (Ramaroshan Corridor)', 'Baidyanath Dham'], highlightsNe: ['रामारोशन १२ बण्ड १८ खण्ड', 'वैद्यनाथ धाम'] },
  { nameEn: 'Bajura', nameNe: 'बाजुरा', provinceId: 'PR-07', hqEn: 'Martadi', hqNe: 'मार्तडी', tier: 'Tier B', maxAlt: 7036, permits: ['Khaptad / Badimalika Trek Registration'], highlightsEn: ['Badimalika Sacred High-Altitude Pilgrimage Ridge (4,214m)', 'Tribeni Patan Meadows', 'Budhinanda Lake'], highlightsNe: ['बडीमालिका पवित्र तीर्थस्थल र त्रिवेणी पाटन (४,२१४ मि.)', 'बुढीनन्दा ताल'] },
  { nameEn: 'Bajhang', nameNe: 'बझाङ', provinceId: 'PR-07', hqEn: 'Chainpur', hqNe: 'चैनपुर', tier: 'Tier C', maxAlt: 7031, permits: ['Saipal Base Camp Trek TIMS'], highlightsEn: ['Mt. Saipal Base Camp (7,031m)', 'Surma Sarowar Sacred Alpine Lake', 'Khaptad North Gateway'], highlightsNe: ['साइपाल हिमाल आधार शिविर (७,०३१ मि.)', 'सुर्मा सरोवर पवित्र हिमताल'] },
  { nameEn: 'Darchula', nameNe: 'दार्चुला', provinceId: 'PR-07', hqEn: 'Khalanga', hqNe: 'खलंगा', tier: 'Tier B', maxAlt: 7132, permits: ['Api Nampa Conservation Area Permit', 'Byas RAP (if entering upper border zone)'], highlightsEn: ['Kalapani – Limpiyadhura – Lipulekh Constitutional Border Corridor', 'Api Nampa Conservation Area & Api Base Camp (7,132m)', 'Malikarjun Dham'], highlightsNe: ['कालापानी – लिम्पियाधुरा – लिपुलेक आधिकारिक सीमा क्षेत्र', 'अपि नाम्पा संरक्षण क्षेत्र र अपि हिमाल आधार शिविर (७,१३२ मि.)', 'मालिकार्जुन धाम'] },
  { nameEn: 'Baitadi', nameNe: 'बैतडी', provinceId: 'PR-07', hqEn: 'Dasharathchand', hqNe: 'दशरथचन्द', tier: 'Tier C', maxAlt: 2950, permits: ['None'], highlightsEn: ['Tripurasundari & Ninglashaini Bhagawati Temples', 'Patal Bhuvaneshwar Limestone Cave'], highlightsNe: ['त्रिपुरासुन्दरी र निङ्लाशैनी भगवती मन्दिर', 'पाताल भुवनेश्वर गुफा'] },
  { nameEn: 'Dadeldhura', nameNe: 'डडेल्धुरा', provinceId: 'PR-07', hqEn: 'Amargadhi', hqNe: 'अमरगढी', tier: 'Tier B', maxAlt: 2639, permits: ['None'], highlightsEn: ['Amargadhi Historic Stone Fort (1847 BS)', 'Ugratara Bhagawati Temple', 'Ali Tal Lake'], highlightsNe: ['अमरगढी ऐतिहासिक किल्ला', 'उग्रतारा भगवती मन्दिर', 'आलिताल'] },
];

export const NEPAL_77_DISTRICTS: DistrictEntry[] = RAW_DISTRICTS.map((d, idx) => ({
  id: `DIST-${String(idx + 1).padStart(2, '0')}`,
  nameEn: d.nameEn,
  nameNe: d.nameNe,
  provinceId: d.provinceId,
  headquartersEn: d.hqEn,
  headquartersNe: d.hqNe,
  tier: d.tier,
  elevationRangeMeters: d.maxAlt > 5000 ? `600m – ${d.maxAlt}m` : `90m – ${d.maxAlt}m`,
  maxAltitudeMeters: d.maxAlt,
  permitsRequired: d.permits,
  keyHighlightsEn: d.highlightsEn,
  keyHighlightsNe: d.highlightsNe,
  highwaySpeedKmh: d.maxAlt > 4000 ? 22 : d.maxAlt > 2000 ? 28 : 35,
  emergencyHubEn:
    d.maxAlt > 4500
      ? 'Tourist Police 1144 • Himalayan Rescue Association (HRA) • Helicopter Medevac Coordinates Active'
      : 'Tourist Police 1144 • Nepal Police 100 • District Emergency Control Room',
  bestSeasons:
    d.maxAlt > 4000
      ? ['Autumn (Sep–Nov)', 'Spring (Mar–May)']
      : ['Autumn (Sep–Nov)', 'Winter (Dec–Feb)', 'Spring (Mar–May)'],
}));

export const INITIAL_VERIFIED_LISTINGS: PartnerListingRecord[] = [];

export const EMERGENCY_DIRECTORY = [
  {
    code: 'EMG-01',
    authorityEn: 'Nepal Tourist Police (24/7 Helpline & Bhrikutimandap HQ)',
    authorityNe: 'नेपाल पर्यटक प्रहरी (२४ सै घण्टा हेल्पलाइन)',
    hotline: '1144 / +977-1-4247041',
    coverageEn: 'All 7 Provinces — Immediate tourist dispute, lost passport, and safety assistance',
  },
  {
    code: 'EMG-02',
    authorityEn: 'Nepal Police National Emergency Control',
    authorityNe: 'नेपाल प्रहरी राष्ट्रिय आपतकालीन कन्ट्रोल',
    hotline: '100',
    coverageEn: 'All 77 Districts — Immediate law enforcement & highway rescue coordination',
  },
  {
    code: 'EMG-03',
    authorityEn: 'Himalayan Rescue Association (HRA — Manang, Pheriche & Gosaikunda Aid Posts)',
    authorityNe: 'हिमालयन उद्धार संघ (मनाङ, फेरिचे र गोसाइँकुण्ड स्वास्थ्य चौकी)',
    hotline: '+977-1-4440292 / +977-1-4440293',
    coverageEn: 'High-Altitude Acute Mountain Sickness (AMS), HAPE/HACE medical triage & evacuation advice',
  },
  {
    code: 'EMG-04',
    authorityEn: 'Nepal Tourism Board (NTB Crisis Cell)',
    authorityNe: 'नेपाल पर्यटन बोर्ड (संकट व्यवस्थापन कक्ष)',
    hotline: '+977-1-4256909',
    coverageEn: 'Weather disruption advisories, TIMS trail alerts, and embassy coordination',
  },
];

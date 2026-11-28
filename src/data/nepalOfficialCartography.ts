import { NEPAL_77_DISTRICTS, NEPAL_PROVINCES } from './nepal77Districts';
import {
  OFFICIAL_COUNTRY_SVG_PATH,
  OFFICIAL_DISTRICT_GEO_PATHS,
  OFFICIAL_PROVINCE_SVG_PATHS,
} from './nepalOfficialGeoPaths';
import { DistrictEntry, ProvinceId } from '../types/pheriNepal';

export interface LatLon {
  lat: number;
  lon: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export type DestinationPinCategory =
  | 'Peak8000m'
  | 'HeritageUNESCO'
  | 'Pilgrimage'
  | 'NationalPark'
  | 'LakeWetland'
  | 'TrekkingPass'
  | 'CulturalHillHub'
  | 'ConstitutionalLandmark';

export interface TouristDestinationPin {
  id: string;
  districtId: string;
  districtNameEn: string;
  districtNameNe: string;
  provinceId: ProvinceId;
  titleEn: string;
  titleNe: string;
  category: DestinationPinCategory;
  elevationMeters?: number;
  lat: number;
  lon: number;
  x: number;
  y: number;
  isSignatureLandmark: boolean;
}

export interface NationalCorridorRoute {
  id: string;
  shortLabelEn: string;
  shortLabelNe: string;
  fullRouteTitleEn: string;
  fullRouteTitleNe: string;
  elevationLabel: string;
  durationLabelEn: string;
  durationLabelNe: string;
  districtNameEn: string;
  provinceId: ProvinceId;
  lat: number;
  lon: number;
  x: number;
  y: number;
  calloutBoxOffset?: { dx: number; dy: number };
  showDefaultCallout?: boolean;
  defaultCalloutText?: string;
}

export interface ComputedDistrictCartography {
  district: DistrictEntry;
  lat: number;
  lon: number;
  cx: number;
  cy: number;
  cellSvgPath: string;
  destinations: TouristDestinationPin[];
}

export interface ComputedProvinceCartography {
  provinceId: ProvinceId;
  number: number;
  nameEn: string;
  nameNe: string;
  shortNe: string;
  shortEn: string;
  districtCount: number;
  capitalEn: string;
  capitalNe: string;
  capitalLat: number;
  capitalLon: number;
  capitalX: number;
  capitalY: number;
  labelX: number;
  labelY: number;
  svgPath: string;
  fillColor: string;
  dotColor: string;
  strokeColor: string;
}

export const MAP_CANVAS_WIDTH = 960;
export const MAP_CANVAS_HEIGHT = 540;

const LON_MIN = 79.95;
const LON_MAX = 88.28;
const LAT_MIN = 26.25;
const LAT_MAX = 30.52;

export function projectLatLon(lat: number, lon: number): Point2D {
  const padX = 38;
  const padY = 34;
  const usableW = MAP_CANVAS_WIDTH - padX * 2;
  const usableH = MAP_CANVAS_HEIGHT - padY * 2;

  const x = padX + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * usableW;
  const y = padY + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * usableH;

  return {
    x: Number(x.toFixed(2)),
    y: Number(y.toFixed(2)),
  };
}

// 7-Province Styling & Metadata matching the exact jewel palette in the reference screenshot:
// PR-07 Teal, PR-06 Amber-Orange, PR-05 Purple, PR-04 Royal Blue, PR-03 Emerald Green, PR-02 Golden Ochre, PR-01 Crimson Rose
export const PROVINCE_STYLE_META: Record<
  ProvinceId,
  {
    shortNe: string;
    shortEn: string;
    capitalLat: number;
    capitalLon: number;
    labelLat: number;
    labelLon: number;
    fillColor: string;
    dotColor: string;
    strokeColor: string;
  }
> = {
  'PR-07': {
    shortNe: 'सुदूरपश्चिम',
    shortEn: 'Sudurpashchim',
    capitalLat: 28.71,
    capitalLon: 80.58,
    labelLat: 29.32,
    labelLon: 80.78,
    fillColor: '#138A7E',
    dotColor: '#14B8A6',
    strokeColor: '#E2E8F0',
  },
  'PR-06': {
    shortNe: 'कर्णाली',
    shortEn: 'Karnali',
    capitalLat: 28.60,
    capitalLon: 81.63,
    labelLat: 29.35,
    labelLon: 82.22,
    fillColor: '#B4690E',
    dotColor: '#F59E0B',
    strokeColor: '#E2E8F0',
  },
  'PR-05': {
    shortNe: 'लुम्बिनी',
    shortEn: 'Lumbini',
    capitalLat: 27.82,
    capitalLon: 82.65,
    labelLat: 27.95,
    labelLon: 82.75,
    fillColor: '#6D28D9',
    dotColor: '#8B5CF6',
    strokeColor: '#E2E8F0',
  },
  'PR-04': {
    shortNe: 'गण्डकी',
    shortEn: 'Gandaki',
    capitalLat: 28.21,
    capitalLon: 83.99,
    labelLat: 28.45,
    labelLon: 84.05,
    fillColor: '#1E56C8',
    dotColor: '#3B82F6',
    strokeColor: '#E2E8F0',
  },
  'PR-03': {
    shortNe: 'बागमती',
    shortEn: 'Bagmati',
    capitalLat: 27.43,
    capitalLon: 85.03,
    labelLat: 27.82,
    labelLon: 85.45,
    fillColor: '#178244',
    dotColor: '#22C55E',
    strokeColor: '#E2E8F0',
  },
  'PR-02': {
    shortNe: 'मधेश',
    shortEn: 'Madhesh',
    capitalLat: 26.73,
    capitalLon: 85.93,
    labelLat: 26.88,
    labelLon: 85.65,
    fillColor: '#A87412',
    dotColor: '#EAB308',
    strokeColor: '#E2E8F0',
  },
  'PR-01': {
    shortNe: 'कोशी',
    shortEn: 'Koshi',
    capitalLat: 26.46,
    capitalLon: 87.27,
    labelLat: 27.28,
    labelLon: 87.35,
    fillColor: '#BE1E46',
    dotColor: '#F43F5E',
    strokeColor: '#E2E8F0',
  },
};

export const SCREENSHOT_PROVINCE_ORDER: ProvinceId[] = [
  'PR-07',
  'PR-06',
  'PR-05',
  'PR-04',
  'PR-03',
  'PR-02',
  'PR-01',
];

// All 16 Official National Tourism Corridors
const RAW_16_NATIONAL_CORRIDORS: Array<{
  id: string;
  shortLabelEn: string;
  shortLabelNe: string;
  fullRouteTitleEn: string;
  fullRouteTitleNe: string;
  elevationLabel: string;
  durationLabelEn: string;
  durationLabelNe: string;
  districtNameEn: string;
  provinceId: ProvinceId;
  calloutBoxOffset?: { dx: number; dy: number };
  showDefaultCallout?: boolean;
  defaultCalloutText?: string;
}> = [
  {
    id: 'COR-01',
    shortLabelEn: 'Everest Base Camp (5,545m)',
    shortLabelNe: 'सगरमाथा आधार शिविर (५,५४५ मि.)',
    fullRouteTitleEn: 'Everest Base Camp, Kala Patthar & Gokyo Lakes Khumbu Trek',
    fullRouteTitleNe: 'सगरमाथा आधार शिविर, कालापत्थर र गोक्यो ताल खुम्बु पदमार्ग',
    elevationLabel: '5,545m',
    durationLabelEn: '12 Days',
    durationLabelNe: '१२ दिन',
    districtNameEn: 'Solukhumbu',
    provinceId: 'PR-01',
    showDefaultCallout: true,
    defaultCalloutText: 'Everest (EBC) · 5,545m',
    calloutBoxOffset: { dx: 24, dy: -66 },
  },
  {
    id: 'COR-02',
    shortLabelEn: 'Annapurna Circuit (5,416m)',
    shortLabelNe: 'अन्नपूर्ण सर्किट (५,४१६ मि.)',
    fullRouteTitleEn: 'Annapurna Circuit, Thorong La Pass & Tilicho Alpine Sanctuary',
    fullRouteTitleNe: 'अन्नपूर्ण सर्किट, थोरोङ ला भञ्ज्याङ र तिलिचो ताल पदमार्ग',
    elevationLabel: '5,416m',
    durationLabelEn: '10 Days',
    durationLabelNe: '१० दिन',
    districtNameEn: 'Manang',
    provinceId: 'PR-04',
    showDefaultCallout: true,
    defaultCalloutText: 'Annapurna · 5,416m',
    calloutBoxOffset: { dx: -8, dy: -64 },
  },
  {
    id: 'COR-03',
    shortLabelEn: 'Langtang & Gosaikunda (4,984m)',
    shortLabelNe: 'लाङटाङ र गोसाइँकुण्ड (४,९८४ मि.)',
    fullRouteTitleEn: 'Langtang Valley, Kyanjin Ri & Gosaikunda Sacred Lakes',
    fullRouteTitleNe: 'लाङटाङ उपत्यका, क्यान्जिन री र गोसाइँकुण्ड पवित्र हिमताल',
    elevationLabel: '4,984m',
    durationLabelEn: '7 Days',
    durationLabelNe: '७ दिन',
    districtNameEn: 'Rasuwa',
    provinceId: 'PR-03',
    showDefaultCallout: true,
    defaultCalloutText: 'Langtang · 4,984m',
    calloutBoxOffset: { dx: 18, dy: -62 },
  },
  {
    id: 'COR-04',
    shortLabelEn: 'Kathmandu Valley UNESCO (1,400m)',
    shortLabelNe: 'काठमाडौं उपत्यका सम्पदा (१,४०० मि.)',
    fullRouteTitleEn: 'Kathmandu, Patan & Bhaktapur 7 UNESCO World Heritage Monuments',
    fullRouteTitleNe: 'काठमाडौं, पाटन र भक्तपुर ७ विश्व सम्पदा क्षेत्र परिक्रमा',
    elevationLabel: '1,400m',
    durationLabelEn: '4 Days',
    durationLabelNe: '४ दिन',
    districtNameEn: 'Kathmandu',
    provinceId: 'PR-03',
    showDefaultCallout: true,
    defaultCalloutText: 'Kathmandu · 1,400m',
    calloutBoxOffset: { dx: 26, dy: 52 },
  },
  {
    id: 'COR-05',
    shortLabelEn: 'Chitwan Wildlife Safari (150m)',
    shortLabelNe: 'चितवन वन्यजन्तु सफारी (१५० मि.)',
    fullRouteTitleEn: 'Chitwan National Park One-Horned Rhino & Royal Bengal Tiger Safari',
    fullRouteTitleNe: 'चितवन राष्ट्रिय निकुञ्ज एकसिंगे गैंडा र पाटे बाघ जंगल सफारी',
    elevationLabel: '150m',
    durationLabelEn: '3 Days',
    durationLabelNe: '३ दिन',
    districtNameEn: 'Chitwan',
    provinceId: 'PR-03',
    showDefaultCallout: true,
    defaultCalloutText: 'Chitwan · 150m',
    calloutBoxOffset: { dx: 0, dy: 64 },
  },
  {
    id: 'COR-06',
    shortLabelEn: 'Lumbini Sacred Garden (150m)',
    shortLabelNe: 'लुम्बिनी बुद्ध जन्मस्थल (१५० मि.)',
    fullRouteTitleEn: 'Lumbini Maya Devi Temple, Ashoka Pillar & Kapilvastu Buddhist Circuit',
    fullRouteTitleNe: 'लुम्बिनी मायादेवी मन्दिर, अशोक स्तम्भ र कपिलवस्तु बौद्ध सर्किट',
    elevationLabel: '150m',
    durationLabelEn: '3 Days',
    durationLabelNe: '३ दिन',
    districtNameEn: 'Rupandehi',
    provinceId: 'PR-05',
    showDefaultCallout: true,
    defaultCalloutText: 'Lumbini · 150m',
    calloutBoxOffset: { dx: -24, dy: 56 },
  },
  {
    id: 'COR-07',
    shortLabelEn: 'Rara Lake & Sinja Valley (4,039m)',
    shortLabelNe: 'रारा ताल र सिंजा उपत्यका (४,०३९ मि.)',
    fullRouteTitleEn: 'Rara Lake & Sinja Valley Karnali Wilderness',
    fullRouteTitleNe: 'रारा ताल र सिंजा उपत्यका कर्णाली पदमार्ग',
    elevationLabel: '4,039m',
    durationLabelEn: '7 Days',
    durationLabelNe: '७ दिन',
    districtNameEn: 'Mugu',
    provinceId: 'PR-06',
  },
  {
    id: 'COR-08',
    shortLabelEn: 'Pokhara & Annapurna Sanctuary (4,130m)',
    shortLabelNe: 'पोखरा फेवाताल र अन्नपूर्ण (४,१३० मि.)',
    fullRouteTitleEn: 'Pokhara Phewa Lakeside, Sarangkot & Annapurna Base Camp Sanctuary',
    fullRouteTitleNe: 'पोखरा फेवाताल, सराङकोट र अन्नपूर्ण आधार शिविर पदमार्ग',
    elevationLabel: '4,130m',
    durationLabelEn: '7 Days',
    durationLabelNe: '७ दिन',
    districtNameEn: 'Kaski',
    provinceId: 'PR-04',
  },
  {
    id: 'COR-09',
    shortLabelEn: 'Upper Mustang & Muktinath (3,840m)',
    shortLabelNe: 'माथिल्लो मुस्ताङ र मुक्तिनाथ (३,८४० मि.)',
    fullRouteTitleEn: 'Lo Manthang Walled Kingdom of Upper Mustang & Sacred Muktinath',
    fullRouteTitleNe: 'लोमान्थाङ माथिल्लो मुस्ताङ र पवित्र मुक्तिनाथ धाम यात्रा',
    elevationLabel: '3,840m',
    durationLabelEn: '8 Days',
    durationLabelNe: '८ दिन',
    districtNameEn: 'Mustang',
    provinceId: 'PR-04',
  },
  {
    id: 'COR-10',
    shortLabelEn: 'Manaslu & Tsum Valley (5,106m)',
    shortLabelNe: 'मनास्लु र चुम उपत्यका (५,१०६ मि.)',
    fullRouteTitleEn: 'Manaslu Circuit, Larkya La Pass & Sacred Hidden Tsum Valley',
    fullRouteTitleNe: 'मनास्लु सर्किट, लार्क्या ला भञ्ज्याङ र चुम उपत्यका पदमार्ग',
    elevationLabel: '5,106m',
    durationLabelEn: '12 Days',
    durationLabelNe: '१२ दिन',
    districtNameEn: 'Gorkha',
    provinceId: 'PR-04',
  },
  {
    id: 'COR-11',
    shortLabelEn: 'Shey Phoksundo & Upper Dolpa (5,350m)',
    shortLabelNe: 'शे-फोक्सुण्डो र डोल्पा (५,३५० मि.)',
    fullRouteTitleEn: 'Shey Phoksundo Turquoise Alpine Lake & Upper Dolpa Bon Heritage',
    fullRouteTitleNe: 'शे-फोक्सुण्डो ताल र माथिल्लो डोल्पा बोन सांस्कृतिक पदमार्ग',
    elevationLabel: '5,350m',
    durationLabelEn: '11 Days',
    durationLabelNe: '११ दिन',
    districtNameEn: 'Dolpa',
    provinceId: 'PR-06',
  },
  {
    id: 'COR-12',
    shortLabelEn: 'Kanchenjunga & Pathibhara (5,143m)',
    shortLabelNe: 'कञ्चनजङ्घा र पाथीभरा (५,१४३ मि.)',
    fullRouteTitleEn: 'Kanchenjunga Base Camp & Sacred Pathibhara Devi Himalayan Ridge',
    fullRouteTitleNe: 'कञ्चनजङ्घा आधार शिविर र पाथीभरा देवी दर्शन पदमार्ग',
    elevationLabel: '5,143m',
    durationLabelEn: '14 Days',
    durationLabelNe: '१४ दिन',
    districtNameEn: 'Taplejung',
    provinceId: 'PR-01',
  },
  {
    id: 'COR-13',
    shortLabelEn: 'Makalu Barun & Arun Valley (4,870m)',
    shortLabelNe: 'मकालु बरुण र अरुण उपत्यका (४,८७० मि.)',
    fullRouteTitleEn: 'Makalu Base Camp, Barun Glacial Gorge & Mundum Ridge',
    fullRouteTitleNe: 'मकालु आधार शिविर, बरुण नदी खोंच र मुन्दुम पदमार्ग',
    elevationLabel: '4,870m',
    durationLabelEn: '12 Days',
    durationLabelNe: '१२ दिन',
    districtNameEn: 'Sankhuwasabha',
    provinceId: 'PR-01',
  },
  {
    id: 'COR-14',
    shortLabelEn: 'Ilam Tea Hills & Sandakpur (3,636m)',
    shortLabelNe: 'इलाम चिया बगान र सन्दकपुर (३,६३६ मि.)',
    fullRouteTitleEn: 'Kanyam Tea Estates, Shree Antu & Sandakpur 4-of-5 8,000m Panorama',
    fullRouteTitleNe: 'कन्याम चिया बगान, श्रीअन्तु र सन्दकपुर हिमालय सूर्योदय सर्किट',
    elevationLabel: '3,636m',
    durationLabelEn: '5 Days',
    durationLabelNe: '५ दिन',
    districtNameEn: 'Ilam',
    provinceId: 'PR-01',
  },
  {
    id: 'COR-15',
    shortLabelEn: 'Janakpurdham Mithila Heritage (100m)',
    shortLabelNe: 'जनकपुरधाम मिथिला सम्पदा (१०० मि.)',
    fullRouteTitleEn: 'Janaki Mandir, Vivah Mandap, Ganga Sagar Aarti & Mithila Art Trail',
    fullRouteTitleNe: 'जानकी मन्दिर, विवाह मण्डप, गंगासागर आरती र मिथिला कला यात्रा',
    elevationLabel: '100m',
    durationLabelEn: '3 Days',
    durationLabelNe: '३ दिन',
    districtNameEn: 'Dhanusha',
    provinceId: 'PR-02',
  },
  {
    id: 'COR-16',
    shortLabelEn: 'Api Nampa, Kalapani & Khaptad (4,200m)',
    shortLabelNe: 'अपि नाम्पा, कालापानी-लिम्पियाधुरा र खप्तड (४,२०० मि.)',
    fullRouteTitleEn: 'Kalapani-Limpiyadhura-Lipulekh Border, Api Base Camp & Khaptad Plateau',
    fullRouteTitleNe: 'कालापानी-लिम्पियाधुरा-लिपुलेक सीमा, अपि हिमाल र खप्तड राष्ट्रिय निकुञ्ज',
    elevationLabel: '4,200m',
    durationLabelEn: '9 Days',
    durationLabelNe: '९ दिन',
    districtNameEn: 'Darchula',
    provinceId: 'PR-07',
  },
];

function classifyHighlightCategory(titleEn: string, maxAlt: number): DestinationPinCategory {
  const lower = titleEn.toLowerCase();
  if (
    lower.includes('kalapani') ||
    lower.includes('limpiyadhura') ||
    lower.includes('lipulekh')
  ) {
    return 'ConstitutionalLandmark';
  }
  if (
    lower.includes('everest') ||
    lower.includes('kanchenjunga') ||
    lower.includes('makalu') ||
    lower.includes('annapurna base') ||
    lower.includes('dhaulagiri') ||
    lower.includes('manaslu') ||
    lower.includes('saipal') ||
    lower.includes('api ')
  ) {
    return 'Peak8000m';
  }
  if (
    lower.includes('unesco') ||
    lower.includes('durbar square') ||
    lower.includes('pashupatinath') ||
    lower.includes('boudhanath') ||
    lower.includes('swayambhunath') ||
    lower.includes('changu narayan') ||
    lower.includes('maya devi') ||
    lower.includes('tilaurakot') ||
    lower.includes('ramgram') ||
    lower.includes('lo manthang') ||
    lower.includes('sinja')
  ) {
    return 'HeritageUNESCO';
  }
  if (
    lower.includes('national park') ||
    lower.includes('wildlife') ||
    lower.includes('bird sanctuary') ||
    lower.includes('conservation') ||
    lower.includes('safari') ||
    lower.includes('dhorpatan')
  ) {
    return 'NationalPark';
  }
  if (
    lower.includes('lake') ||
    lower.includes('tal') ||
    lower.includes('pokhari') ||
    lower.includes('daha') ||
    lower.includes('phoksundo') ||
    lower.includes('rara') ||
    lower.includes('gosaikunda') ||
    lower.includes('tilicho') ||
    lower.includes('wetland')
  ) {
    return 'LakeWetland';
  }
  if (
    lower.includes('temple') ||
    lower.includes('mandir') ||
    lower.includes('dham') ||
    lower.includes('mahadev') ||
    lower.includes('bhagawati') ||
    lower.includes('muktinath') ||
    lower.includes('pathibhara') ||
    lower.includes('swargadwari') ||
    lower.includes('badimalika') ||
    lower.includes('halesi') ||
    lower.includes('kalinchowk') ||
    lower.includes('shaktipeeth') ||
    lower.includes('monastery') ||
    lower.includes('gompa')
  ) {
    return 'Pilgrimage';
  }
  if (
    lower.includes('trek') ||
    lower.includes('pass') ||
    lower.includes('circuit') ||
    lower.includes('peak') ||
    lower.includes('trail') ||
    maxAlt >= 5500
  ) {
    return 'TrekkingPass';
  }
  return 'CulturalHillHub';
}

let cachedCartography: {
  provinces: ComputedProvinceCartography[];
  districts: ComputedDistrictCartography[];
  allDestinations: TouristDestinationPin[];
  nationalCorridors: NationalCorridorRoute[];
  internationalBorderSvgPath: string;
} | null = null;

export function getOfficialNepalCartography() {
  if (cachedCartography) return cachedCartography;

  const provinces: ComputedProvinceCartography[] = SCREENSHOT_PROVINCE_ORDER.map(
    (provId) => {
      const prov = NEPAL_PROVINCES.find((p) => p.id === provId)!;
      const style = PROVINCE_STYLE_META[prov.id];
      const capPt = projectLatLon(style.capitalLat, style.capitalLon);
      const lblPt = projectLatLon(style.labelLat, style.labelLon);

      return {
        provinceId: prov.id,
        number: prov.number,
        nameEn: prov.nameEn,
        nameNe: prov.nameNe,
        shortNe: style.shortNe,
        shortEn: style.shortEn,
        districtCount: prov.districtCount,
        capitalEn: prov.capitalEn,
        capitalNe: prov.capitalNe,
        capitalLat: style.capitalLat,
        capitalLon: style.capitalLon,
        capitalX: capPt.x,
        capitalY: capPt.y,
        labelX: lblPt.x,
        labelY: lblPt.y,
        svgPath: OFFICIAL_PROVINCE_SVG_PATHS[prov.id] || '',
        fillColor: style.fillColor,
        dotColor: style.dotColor,
        strokeColor: style.strokeColor,
      };
    }
  );

  const allDestinations: TouristDestinationPin[] = [];

  const districts: ComputedDistrictCartography[] = NEPAL_77_DISTRICTS.map((dist) => {
    const geoEntry = OFFICIAL_DISTRICT_GEO_PATHS[dist.nameEn];
    const lat = geoEntry ? geoEntry.lat : 28.0;
    const lon = geoEntry ? geoEntry.lon : 84.0;
    const cx = geoEntry ? geoEntry.cx : 480;
    const cy = geoEntry ? geoEntry.cy : 270;
    const cellSvgPath = geoEntry ? geoEntry.svgPath : '';

    const distDestinations: TouristDestinationPin[] = dist.keyHighlightsEn.map(
      (highlightEn, hIdx) => {
        const highlightNe = dist.keyHighlightsNe[hIdx] || highlightEn;
        const angleRad =
          (hIdx * 2 * Math.PI) / Math.max(dist.keyHighlightsEn.length, 1) -
          Math.PI / 4;
        const radiusPx = hIdx === 0 ? 0 : 7.5;
        const pinX = Number((cx + Math.cos(angleRad) * radiusPx).toFixed(1));
        const pinY = Number((cy + Math.sin(angleRad) * radiusPx).toFixed(1));
        const category = classifyHighlightCategory(
          highlightEn,
          dist.maxAltitudeMeters
        );

        const pin: TouristDestinationPin = {
          id: `${dist.id}-DEST-${hIdx + 1}`,
          districtId: dist.id,
          districtNameEn: dist.nameEn,
          districtNameNe: dist.nameNe,
          provinceId: dist.provinceId,
          titleEn: highlightEn,
          titleNe: highlightNe,
          category,
          elevationMeters: hIdx === 0 ? dist.maxAltitudeMeters : undefined,
          lat,
          lon,
          x: pinX,
          y: pinY,
          isSignatureLandmark: hIdx === 0,
        };
        allDestinations.push(pin);
        return pin;
      }
    );

    return {
      district: dist,
      lat,
      lon,
      cx,
      cy,
      cellSvgPath,
      destinations: distDestinations,
    };
  });

  const nationalCorridors: NationalCorridorRoute[] =
    RAW_16_NATIONAL_CORRIDORS.map((c) => {
      const geoEntry = OFFICIAL_DISTRICT_GEO_PATHS[c.districtNameEn];
      return {
        ...c,
        lat: geoEntry ? geoEntry.lat : 28.0,
        lon: geoEntry ? geoEntry.lon : 84.0,
        x: geoEntry ? geoEntry.cx : 480,
        y: geoEntry ? geoEntry.cy : 270,
      };
    });

  cachedCartography = {
    provinces,
    districts,
    allDestinations,
    nationalCorridors,
    internationalBorderSvgPath: OFFICIAL_COUNTRY_SVG_PATH,
  };

  return cachedCartography;
}

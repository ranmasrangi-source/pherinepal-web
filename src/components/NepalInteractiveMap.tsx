import React, { useMemo, useState } from 'react';
import {
  Compass,
  Eye,
  Layers,
  MapPin,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  ComputedDistrictCartography,
  getOfficialNepalCartography,
  MAP_CANVAS_HEIGHT,
  MAP_CANVAS_WIDTH,
  NationalCorridorRoute,
  projectLatLon,
  TouristDestinationPin,
} from '../data/nepalOfficialCartography';
import { LanguageCode, ProvinceId } from '../types/pheriNepal';

interface NepalInteractiveMapProps {
  selectedProvinceId: ProvinceId | 'ALL';
  onSelectProvince: (provinceId: ProvinceId | 'ALL') => void;
  language: LanguageCode;
  listingCountsByProvince: Record<string, number>;
  selectedDistrictName?: string;
  onSelectDistrict?: (districtNameEn: string) => void;
  onOpenDistrictGuide?: (districtNameEn: string) => void;
  onPlanAiTrip?: (provinceId: ProvinceId, districtNameEn: string) => void;
}

export const NepalInteractiveMap: React.FC<NepalInteractiveMapProps> = ({
  selectedProvinceId,
  onSelectProvince,
  language,
  selectedDistrictName,
  onSelectDistrict,
  onOpenDistrictGuide,
  onPlanAiTrip,
}) => {
  const isNe = language === 'L02';
  const cartography = useMemo(() => getOfficialNepalCartography(), []);

  const [activeDistrictName, setActiveDistrictName] = useState<string>(
    selectedDistrictName && selectedDistrictName !== 'ALL'
      ? selectedDistrictName
      : 'Solukhumbu'
  );
  const [selectedCorridorId, setSelectedCorridorId] =
    useState<string>('COR-07'); // Default route displayed in footer like screenshot
  const [hoveredDistrictName, setHoveredDistrictName] = useState<string | null>(
    null
  );
  const [showAllDistrictNames, setShowAllDistrictNames] =
    useState<boolean>(false);
  const [showAllTouristPins, setShowAllTouristPins] = useState<boolean>(false);
  const [hoveredPin, setHoveredPin] = useState<TouristDestinationPin | null>(
    null
  );
  const [mapSearchQuery, setMapSearchQuery] = useState<string>('');

  // Currently active district cartography object
  const activeDistrictCarto: ComputedDistrictCartography = useMemo(() => {
    const target =
      hoveredDistrictName ||
      (selectedDistrictName && selectedDistrictName !== 'ALL'
        ? selectedDistrictName
        : activeDistrictName);
    return (
      cartography.districts.find(
        (d) => d.district.nameEn.toLowerCase() === target.toLowerCase()
      ) ||
      cartography.districts.find((d) => d.district.nameEn === 'Solukhumbu') ||
      cartography.districts[0]
    );
  }, [
    cartography.districts,
    hoveredDistrictName,
    selectedDistrictName,
    activeDistrictName,
  ]);

  const activeProvinceCarto = useMemo(() => {
    return (
      cartography.provinces.find(
        (p) => p.provinceId === activeDistrictCarto.district.provinceId
      ) || cartography.provinces[0]
    );
  }, [cartography.provinces, activeDistrictCarto]);

  const activeCorridor: NationalCorridorRoute = useMemo(() => {
    return (
      cartography.nationalCorridors.find((c) => c.id === selectedCorridorId) ||
      cartography.nationalCorridors[0]
    );
  }, [cartography.nationalCorridors, selectedCorridorId]);

  // Quick search matches across 77 districts and 230+ tourist destinations
  const searchMatches = useMemo(() => {
    const q = mapSearchQuery.trim().toLowerCase();
    if (!q) return [];
    const out: Array<{
      districtNameEn: string;
      provinceId: ProvinceId;
      title: string;
      subtitle: string;
    }> = [];

    for (const d of cartography.districts) {
      if (
        d.district.nameEn.toLowerCase().includes(q) ||
        d.district.nameNe.includes(q) ||
        d.district.headquartersEn.toLowerCase().includes(q)
      ) {
        out.push({
          districtNameEn: d.district.nameEn,
          provinceId: d.district.provinceId,
          title: `${d.district.nameNe} (${d.district.nameEn})`,
          subtitle: `District HQ: ${d.district.headquartersEn} • ${d.district.provinceId}`,
        });
      }
      for (const pin of d.destinations) {
        if (pin.titleEn.toLowerCase().includes(q) || pin.titleNe.includes(q)) {
          out.push({
            districtNameEn: d.district.nameEn,
            provinceId: d.district.provinceId,
            title: isNe ? pin.titleNe : pin.titleEn,
            subtitle: `${d.district.nameNe} (${d.district.nameEn}) • ${d.district.provinceId}`,
          });
        }
      }
    }
    return out.slice(0, 8);
  }, [mapSearchQuery, cartography.districts, isNe]);

  // Limpiyadhura constitutional tip point for top-left green callout badge
  const limpiyadhuraTip = projectLatLon(30.4714, 80.6066);

  // Default 6 iconic callouts visible on the map (matching the exact boxes in the user's screenshot)
  const defaultCalloutCorridors = useMemo(() => {
    return cartography.nationalCorridors.filter((c) => c.showDefaultCallout);
  }, [cartography.nationalCorridors]);

  const handleSelectDistrict = (distCarto: ComputedDistrictCartography) => {
    setActiveDistrictName(distCarto.district.nameEn);
    const matchingCorridor = cartography.nationalCorridors.find(
      (c) =>
        c.districtNameEn.toLowerCase() ===
        distCarto.district.nameEn.toLowerCase()
    );
    if (matchingCorridor) {
      setSelectedCorridorId(matchingCorridor.id);
    }
    if (onSelectDistrict) {
      onSelectDistrict(distCarto.district.nameEn);
    }
  };

  const handleSelectCorridor = (corridor: NationalCorridorRoute) => {
    setSelectedCorridorId(corridor.id);
    setActiveDistrictName(corridor.districtNameEn);
    if (onSelectDistrict) {
      onSelectDistrict(corridor.districtNameEn);
    }
  };

  return (
    <div className="bg-[#0B1420] text-slate-100 border border-[#1E2F45] rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
      {/* =====================================================================
          1. HEADER BLOCK (Exact layout from User Screenshot)
      ===================================================================== */}
      <div className="space-y-3 border-b border-slate-800/90 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-[#EF4444] shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                नेपालको आधिकारिक नक्सा (Official Map of Nepal · 7 Provinces &amp; 77 Districts)
              </h3>
              <div className="inline-flex items-center px-3 py-1 rounded-md bg-[#062E22] border border-[#10B981]/40 text-[#34D399] font-mono-code text-xs font-semibold">
                Includes Limpiyadhura · Lipulekh · Kalapani
              </div>
            </div>
          </div>

          {/* Search input inside dark map header */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={mapSearchQuery}
              onChange={(e) => setMapSearchQuery(e.target.value)}
              placeholder={
                isNe
                  ? '७७ जिल्ला वा गन्तव्य खोज्नुहोस्...'
                  : 'Search 77 districts or destinations...'
              }
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#142030] border border-slate-700 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#34D399]"
            />
            {searchMatches.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-[#111C2B] border border-slate-700 rounded-xl shadow-2xl z-30 max-h-56 overflow-y-auto divide-y divide-slate-800">
                {searchMatches.map((m, i) => (
                  <button
                    key={`${m.districtNameEn}-${i}`}
                    type="button"
                    onClick={() => {
                      setActiveDistrictName(m.districtNameEn);
                      if (onSelectDistrict) onSelectDistrict(m.districtNameEn);
                      setMapSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#1A293D] transition flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">
                        {m.title}
                      </div>
                      <div className="text-[10px] font-mono-code text-slate-400">
                        {m.subtitle}
                      </div>
                    </div>
                    <MapPin className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Toggle Buttons Row: Show All 77 District Names + Show All 230+ Tourist Destination Pins */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowAllDistrictNames((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
              showAllDistrictNames
                ? 'bg-[#1E3A5F] text-white border-sky-400/60'
                : 'bg-[#152030] text-slate-200 border-slate-600/80 hover:border-slate-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-slate-300" />
            <span>
              {showAllDistrictNames
                ? 'Hide 77 District Names (७७ जिल्ला)'
                : 'Show All 77 District Names (७७ जिल्ला)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowAllTouristPins((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
              showAllTouristPins
                ? 'bg-[#062E22] text-[#34D399] border-[#10B981]/50'
                : 'bg-[#152030] text-slate-300 border-slate-600/80 hover:border-slate-400'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {showAllTouristPins
                ? `Showing All ${cartography.allDestinations.length} Tourist Destinations`
                : `Show All ${cartography.allDestinations.length} Tourist Destinations`}
            </span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          2. PROVINCES (७ प्रदेश) FILTER PILLS (Exact 7 Jewel Colors & Counts)
      ===================================================================== */}
      <div className="flex flex-wrap items-center gap-2 pb-1">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 mr-1">
          <Layers className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Provinces (७ प्रदेश):</span>
        </span>

        <button
          type="button"
          onClick={() => onSelectProvince('ALL')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            selectedProvinceId === 'ALL'
              ? 'bg-white text-[#0B1420] shadow-sm'
              : 'bg-[#142030] text-slate-200 border border-slate-700 hover:border-slate-500'
          }`}
        >
          All 7 Provinces (77 Districts)
        </button>

        {cartography.provinces.map((prov) => {
          const isSelected = selectedProvinceId === prov.provinceId;
          return (
            <button
              key={prov.provinceId}
              type="button"
              onClick={() =>
                onSelectProvince(isSelected ? 'ALL' : prov.provinceId)
              }
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                isSelected
                  ? 'bg-white text-[#0B1420] border-white font-bold shadow-sm'
                  : 'bg-[#131F2E] text-slate-200 border-slate-700/90 hover:border-slate-500'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: prov.dotColor }}
              />
              <span>
                {prov.shortNe} ({prov.shortEn})
              </span>
              <span
                className={`font-mono-code text-[11px] ${
                  isSelected ? 'text-slate-700 font-bold' : 'text-slate-400'
                }`}
              >
                {prov.districtCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* =====================================================================
          3. HIGH-PRECISION SVG MAP OF NEPAL (Dark Slate Canvas #070E17)
      ===================================================================== */}
      <div className="relative w-full overflow-x-auto bg-[#070E17] rounded-xl border border-slate-800/90 p-2 sm:p-4">
        <svg
          viewBox={`0 0 ${MAP_CANVAS_WIDTH} ${MAP_CANVAS_HEIGHT}`}
          className="w-full h-auto min-w-[660px] select-none block"
          role="img"
          aria-label="Official Map of Nepal with 7 Provinces, 77 Districts, Limpiyadhura-Lipulekh-Kalapani, and Tourist Destinations"
        >
          <defs>
            {/* Province ClipPaths so every District's organic Voronoi polygon clips cleanly to its parent Province boundary */}
            {cartography.provinces.map((prov) => (
              <clipPath
                key={`clip-${prov.provinceId}`}
                id={`nepal-prov-clip-${prov.provinceId}`}
              >
                <path d={prov.svgPath} />
              </clipPath>
            ))}

            <filter
              id="nepalDarkMapGlow"
              x="-5%"
              y="-5%"
              width="110%"
              height="110%"
            >
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="4"
                floodColor="#000000"
                floodOpacity="0.55"
              />
            </filter>
          </defs>

          {/* Outer International Silhouette Shadow */}
          <path
            d={cartography.internationalBorderSvgPath}
            fill="#0B1420"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2.5"
            filter="url(#nepalDarkMapGlow)"
          />

          {/* =================================================================
              LAYER 1: 7 PROVINCES & 77 ORGANIC DISTRICT BOUNDARY POLYGONS
          ================================================================= */}
          {cartography.provinces.map((prov) => {
            const isProvVisible =
              selectedProvinceId === 'ALL' ||
              selectedProvinceId === prov.provinceId;
            const provDistricts = cartography.districts.filter(
              (d) => d.district.provinceId === prov.provinceId
            );

            return (
              <g
                key={prov.provinceId}
                opacity={isProvVisible ? 1 : 0.22}
                className="transition-opacity duration-200"
              >
                {/* Base Province Fill */}
                <path d={prov.svgPath} fill={prov.fillColor} />

                {/* Clipped 77 District Organic Cells */}
                <g clipPath={`url(#nepal-prov-clip-${prov.provinceId})`}>
                  {provDistricts.map((distCarto) => {
                    const isDistActive =
                      activeDistrictCarto.district.id === distCarto.district.id;
                    const isDistHovered =
                      hoveredDistrictName === distCarto.district.nameEn;

                    return (
                      <path
                        key={distCarto.district.id}
                        d={distCarto.cellSvgPath}
                        fill={
                          isDistActive
                            ? '#F43F5E'
                            : isDistHovered
                            ? '#FB7185'
                            : prov.fillColor
                        }
                        fillOpacity={
                          isDistActive ? 1 : isDistHovered ? 0.92 : 0.96
                        }
                        stroke={
                          isDistActive
                            ? '#FFFFFF'
                            : 'rgba(255, 255, 255, 0.58)'
                        }
                        strokeWidth={isDistActive ? 2.1 : 0.95}
                        strokeLinejoin="round"
                        onMouseEnter={() =>
                          setHoveredDistrictName(distCarto.district.nameEn)
                        }
                        onMouseLeave={() => setHoveredDistrictName(null)}
                        onClick={() => handleSelectDistrict(distCarto)}
                        className="cursor-pointer transition-colors duration-150"
                      />
                    );
                  })}
                </g>

                {/* Crisp Inter-Provincial Boundary Line */}
                <path
                  d={prov.svgPath}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.82)"
                  strokeWidth="1.55"
                  strokeLinejoin="round"
                  pointerEvents="none"
                />
              </g>
            );
          })}

          {/* Crisp Outer International Constitutional Border of Nepal */}
          <path
            d={cartography.internationalBorderSvgPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.88)"
            strokeWidth="1.75"
            strokeLinejoin="round"
            pointerEvents="none"
          />

          {/* =================================================================
              LAYER 2: ALL 230+ TOURIST DESTINATION PINS ACROSS 77 DISTRICTS
          ================================================================= */}
          {showAllTouristPins &&
            cartography.allDestinations.map((pin) => {
              const isProvVisible =
                selectedProvinceId === 'ALL' ||
                selectedProvinceId === pin.provinceId;
              if (!isProvVisible) return null;

              const isHovered = hoveredPin?.id === pin.id;
              const isInActiveDistrict =
                activeDistrictCarto.district.id === pin.districtId;

              return (
                <g
                  key={pin.id}
                  onMouseEnter={() => setHoveredPin(pin)}
                  onMouseLeave={() => setHoveredPin(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDistrictName(pin.districtNameEn);
                    if (onSelectDistrict) {
                      onSelectDistrict(pin.districtNameEn);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={
                      isHovered
                        ? 4.2
                        : isInActiveDistrict
                        ? 3.0
                        : pin.isSignatureLandmark
                        ? 2.3
                        : 1.6
                    }
                    fill={
                      isHovered || isInActiveDistrict
                        ? '#FBBF24'
                        : 'rgba(255, 255, 255, 0.85)'
                    }
                    stroke="#0B1420"
                    strokeWidth="0.8"
                  />
                </g>
              );
            })}

          {/* =================================================================
              LAYER 3: 77 DISTRICT LABELS (Active District Always Shown + Toggle All 77)
          ================================================================= */}
          {cartography.districts.map((distCarto) => {
            const isProvVisible =
              selectedProvinceId === 'ALL' ||
              selectedProvinceId === distCarto.district.provinceId;
            if (!isProvVisible) return null;

            const isDistActive =
              activeDistrictCarto.district.id === distCarto.district.id;

            if (!showAllDistrictNames && !isDistActive) return null;

            return (
              <g
                key={`dist-lbl-${distCarto.district.id}`}
                onClick={() => handleSelectDistrict(distCarto)}
                className="cursor-pointer"
              >
                {isDistActive && (
                  <circle
                    cx={distCarto.cx}
                    cy={distCarto.cy}
                    r="3.2"
                    fill="#F43F5E"
                    stroke="#FFFFFF"
                    strokeWidth="1.4"
                  />
                )}
                <text
                  x={distCarto.cx}
                  y={distCarto.cy - (isDistActive ? 5 : 2)}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  stroke="#0B1420"
                  strokeWidth={isDistActive ? '3' : '2.2'}
                  paintOrder="stroke"
                  fontSize={isDistActive ? '10.5' : '7.2'}
                  fontWeight="800"
                >
                  {isNe && showAllDistrictNames
                    ? distCarto.district.nameNe
                    : distCarto.district.nameEn}
                </text>
              </g>
            );
          })}

          {/* =================================================================
              LAYER 4: TOP-LEFT LIMPIYADHURA · KALAPANI · LIPULEKH CALLOUT PILL
              (Exact Green Pill Badge from User Screenshot)
          ================================================================= */}
          <g
            onClick={() => {
              const darchula = cartography.districts.find(
                (d) => d.district.nameEn === 'Darchula'
              );
              if (darchula) handleSelectDistrict(darchula);
            }}
            className="cursor-pointer"
          >
            <circle
              cx={limpiyadhuraTip.x}
              cy={limpiyadhuraTip.y}
              r="2.8"
              fill="#34D399"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
            <rect
              x={limpiyadhuraTip.x + 10}
              y={limpiyadhuraTip.y - 16}
              width="210"
              height="20"
              rx="10"
              fill="#062E22"
              fillOpacity="0.95"
              stroke="#10B981"
              strokeWidth="1.1"
            />
            <text
              x={limpiyadhuraTip.x + 115}
              y={limpiyadhuraTip.y - 3}
              textAnchor="middle"
              fill="#6EE7B7"
              fontSize="8.8"
              fontWeight="700"
            >
              लिम्पियाधुरा · कालापानी · लिपुलेक (Darchula)
            </text>
          </g>

          {/* =================================================================
              LAYER 5: FLOATING DARK CALLOUT BOXES WITH LEADER LINES
              (Annapurna · 5,416m, Langtang · 4,984m, Everest (EBC) · 5,545m,
               Lumbini · 150m, Chitwan · 150m, Kathmandu · 1,400m)
          ================================================================= */}
          {defaultCalloutCorridors.map((cor) => {
            const dx = cor.calloutBoxOffset?.dx ?? 0;
            const dy = cor.calloutBoxOffset?.dy ?? -55;
            const boxW = 136;
            const boxH = 25;
            const boxX = cor.x + dx - boxW / 2;
            const boxY = cor.y + dy - boxH / 2;
            const lineEndY = dy < 0 ? boxY + boxH : boxY;
            const isSelected = activeCorridor.id === cor.id;

            return (
              <g
                key={`callout-${cor.id}`}
                onClick={() => handleSelectCorridor(cor)}
                className="cursor-pointer"
              >
                {/* Leader Line from Destination Dot to Floating Box */}
                <line
                  x1={cor.x}
                  y1={cor.y}
                  x2={cor.x + dx}
                  y2={lineEndY}
                  stroke={
                    isSelected ? '#34D399' : 'rgba(255, 255, 255, 0.78)'
                  }
                  strokeWidth={isSelected ? '1.6' : '1.15'}
                />
                {/* Destination Target Dot */}
                <circle
                  cx={cor.x}
                  cy={cor.y}
                  r="3.2"
                  fill="#0B1420"
                  stroke="#FFFFFF"
                  strokeWidth="1.4"
                />
                {/* Floating Dark Callout Pill Box */}
                <rect
                  x={boxX}
                  y={boxY}
                  width={boxW}
                  height={boxH}
                  rx="6"
                  fill="#0B1420"
                  fillOpacity="0.92"
                  stroke={
                    isSelected ? '#34D399' : 'rgba(148, 163, 184, 0.65)'
                  }
                  strokeWidth={isSelected ? '1.5' : '1.1'}
                />
                <text
                  x={boxX + boxW / 2}
                  y={boxY + 16}
                  textAnchor="middle"
                  fill="#F8FAFC"
                  fontSize="9.2"
                  fontWeight="700"
                  className="font-mono-code"
                >
                  {cor.defaultCalloutText}
                </text>
              </g>
            );
          })}

          {/* Hover Tooltip for any of the 230+ Tourist Destination Pins */}
          {hoveredPin && (
            <g pointerEvents="none">
              <rect
                x={Math.min(Math.max(hoveredPin.x - 125, 10), MAP_CANVAS_WIDTH - 260)}
                y={Math.max(hoveredPin.y - 38, 8)}
                width="250"
                height="28"
                rx="6"
                fill="#062E22"
                stroke="#34D399"
                strokeWidth="1.2"
              />
              <text
                x={Math.min(Math.max(hoveredPin.x - 125, 10), MAP_CANVAS_WIDTH - 260) + 125}
                y={Math.max(hoveredPin.y - 38, 8) + 18}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9.2"
                fontWeight="700"
              >
                {(isNe ? hoveredPin.titleNe : hoveredPin.titleEn).slice(0, 34)} ({hoveredPin.districtNameEn})
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* =====================================================================
          4. ALL 16 NATIONAL CORRIDORS BAR (Exact Horizontal Strip from Screenshot)
      ===================================================================== */}
      <div className="pt-1 border-t border-slate-800/90">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#10B981] shrink-0">
            ALL 16 NATIONAL CORRIDORS:
          </span>
          <div className="flex items-center gap-2">
            {cartography.nationalCorridors.map((cor) => {
              const active = activeCorridor.id === cor.id;
              return (
                <button
                  key={cor.id}
                  type="button"
                  onClick={() => handleSelectCorridor(cor)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition cursor-pointer ${
                    active
                      ? 'bg-[#1E2F45] text-white border-[#34D399] shadow-xs'
                      : 'bg-[#121D2B] text-slate-200 border-slate-700/90 hover:border-slate-500'
                  }`}
                >
                  {isNe ? cor.shortLabelNe : cor.shortLabelEn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          5. BOTTOM TELEMETRY & TOURIST DESTINATIONS ACTION BAR
             (Matches "● District: Solukhumbu | Province: कोशी (Koshi)"
              + "Selected Route: Rara Lake & Sinja Valley Karnali Wilderness (4,039m · 7 Days)")
      ===================================================================== */}
      <div className="bg-[#0F1A29] border border-slate-800 rounded-xl p-3.5 sm:p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1.5">
            {/* Row 1: District & Province Indicator */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span
                className="w-3 h-3 rounded-full shrink-0 border border-white/60"
                style={{ backgroundColor: activeProvinceCarto.dotColor }}
              />
              <span className="text-slate-300">
                District:{' '}
                <strong className="text-white font-bold">
                  {activeDistrictCarto.district.nameEn} ({activeDistrictCarto.district.nameNe})
                </strong>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">
                Province:{' '}
                <strong className="text-[#34D399] font-bold">
                  {activeProvinceCarto.shortNe} ({activeProvinceCarto.shortEn})
                </strong>
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-xs font-mono-code text-slate-400">
                HQ: {activeDistrictCarto.district.headquartersEn} • Max Alt:{' '}
                {activeDistrictCarto.district.maxAltitudeMeters}m
              </span>
            </div>

            {/* Row 2: Selected Route Telemetry */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono-code">
              <Compass className="w-4 h-4 text-[#10B981] shrink-0" />
              <span className="text-slate-300">Selected Route:</span>
              <strong className="text-white font-bold">
                {isNe
                  ? activeCorridor.fullRouteTitleNe
                  : activeCorridor.fullRouteTitleEn}
              </strong>
              <span className="text-[#34D399] font-semibold">
                ({activeCorridor.elevationLabel} ·{' '}
                {isNe
                  ? activeCorridor.durationLabelNe
                  : activeCorridor.durationLabelEn}
                )
              </span>
            </div>
          </div>

          {/* 1-Click Action Buttons for the Active District */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenDistrictGuide && (
              <button
                type="button"
                onClick={() =>
                  onOpenDistrictGuide(activeDistrictCarto.district.nameEn)
                }
                className="px-3.5 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-[#062E22] font-bold text-xs transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>
                  {isNe
                    ? 'गन्तव्य र पर्मिट गाइड खोल्नुहोस्'
                    : 'Explore Destinations & Permits'}
                </span>
              </button>
            )}

            {onPlanAiTrip && (
              <button
                type="button"
                onClick={() =>
                  onPlanAiTrip(
                    activeDistrictCarto.district.provinceId,
                    activeDistrictCarto.district.nameEn
                  )
                }
                className="px-3.5 py-2 rounded-lg bg-[#C85A28] hover:bg-[#B24B1E] text-white font-bold text-xs transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isNe ? 'एआई यात्रा योजना' : 'Plan AI Trip Here'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* All Tourist Destinations in the Active District + Mandatory Permits */}
        <div className="pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono-code uppercase text-[#34D399] font-semibold mr-1">
              {isNe
                ? `${activeDistrictCarto.district.nameNe} का पर्यटकीय गन्तव्यहरू:`
                : `Tourist Destinations in ${activeDistrictCarto.district.nameEn}:`}
            </span>
            {activeDistrictCarto.destinations.map((dest) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => {
                  if (onOpenDistrictGuide) {
                    onOpenDistrictGuide(activeDistrictCarto.district.nameEn);
                  }
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#162436] hover:bg-[#1E324A] text-slate-100 border border-slate-700 text-[11px] font-medium transition cursor-pointer"
              >
                <MapPin className="w-3 h-3 text-[#F43F5E] shrink-0" />
                <span>{isNe ? dest.titleNe : dest.titleEn}</span>
              </button>
            ))}
          </div>

          <div className="text-[11px] font-mono-code text-amber-300/90">
            Permits: {activeDistrictCarto.district.permitsRequired.join(' · ')}
          </div>
        </div>
      </div>
    </div>
  );
};

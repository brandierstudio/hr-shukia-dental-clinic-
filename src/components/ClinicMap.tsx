import React, { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

function ClinicMarkerWithInfo() {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={CLINIC_INFO.coordinates}
        onClick={() => setInfoOpen((prev) => !prev)}
        title="HR Sukhia Dental Clinic — 101 Abdullah Haroon Road, Saddar, Karachi"
      >
        <Pin
          background="#16324F"
          borderColor="#167D83"
          glyphColor="#FFFFFF"
          scale={1.25}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={290}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-[#172B3A]">
            <p className="font-semibold text-sm text-[#16324F]">
              {CLINIC_INFO.name}
            </p>
            <p className="text-xs text-[#667582] mt-0.5">
              {CLINIC_INFO.signageName}
            </p>
            <p className="text-xs text-[#172B3A] mt-1.5 leading-relaxed">
              {CLINIC_INFO.address.fullFormatted}
            </p>
            <div className="mt-2 pt-2 border-t border-[#E4EAF0] flex items-center justify-between gap-2 text-xs">
              <span className="font-mono-tabular font-medium text-[#16324F] inline-flex items-center gap-1">
                <span>4.8 / 5.0</span>
                <span>({CLINIC_INFO.googleRating.count} reviews)</span>
              </span>
              <a
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#167D83] hover:underline inline-flex items-center gap-1"
              >
                Directions
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export const ClinicMap: React.FC<{ heightClass?: string }> = ({
  heightClass = 'h-[420px]',
}) => {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div
        className={`w-full ${heightClass} rounded-xl border border-[#E4EAF0] bg-[#EAF5F4]/60 p-8 flex flex-col justify-between`}
      >
        <div>
          <p className="text-xs font-medium text-[#167D83]">
            Verified Geographic Coordinates · 24.858541° N, 67.0267195° E
          </p>
          <h3 className="text-xl font-bold text-[#16324F] mt-2">
            {CLINIC_INFO.name}
          </h3>
          <p className="text-sm text-[#667582] mt-1">
            {CLINIC_INFO.address.fullFormatted}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E4EAF0]">
          <a
            href={CLINIC_INFO.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors whitespace-nowrap shrink-0"
          >
            <Navigation className="w-4 h-4" />
            Get Directions on Google Maps
          </a>
          <a
            href={CLINIC_INFO.phoneTelHref}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#16324F]/20 bg-white text-[#16324F] text-xs font-semibold hover:border-[#16324F] transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4" />
            Call {CLINIC_INFO.phoneNational}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-[#E4EAF0] bg-white shadow-xs">
      <div className={`w-full ${heightClass} relative`} data-testid="clinic-google-map">
        <APIProvider
          apiKey={GOOGLE_MAPS_API_KEY}
          libraries={['marker']}
          language="en"
          region="PK"
        >
          <Map
            mapId="DEMO_MAP_ID"
            defaultCenter={CLINIC_INFO.coordinates}
            defaultZoom={16}
            gestureHandling="cooperative"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
          >
            <ClinicMarkerWithInfo />
          </Map>
        </APIProvider>
      </div>
      <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#E4EAF0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#667582]">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#167D83] shrink-0" />
          <span>
            <strong className="text-[#172B3A]">1st Floor, 101 Abdullah Haroon Road</strong> (Near Gulzar Building), Saddar, Karachi
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={CLINIC_INFO.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#167D83] hover:text-[#16324F] inline-flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            Open Turn-by-Turn Directions
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={CLINIC_INFO.cidUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#667582] hover:text-[#16324F] inline-flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            View Google Business Profile
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

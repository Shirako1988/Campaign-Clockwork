
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI, Type } from "@google/genai";

// --- From components/Icons.tsx ---

const SunIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const MoonIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

const ResetIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l3.181-3.183a8.25 8.25 0 00-11.664 0l3.181 3.183" />
  </svg>
);

const CloudIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.5 4.5 0 002.25 15z" />
  </svg>
);

const RainIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15h5.25a3.75 3.75 0 003.52-4.01A4.5 4.5 0 0018 6.75a4.5 4.5 0 00-7.5 0zm0 0V6m0 6v3m0 3v3m3-9v3m-6 0v3" />
    </svg>
);

const SnowIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l-3-3m0 0l3-3m-3 3h12M5.25 3.75l3 3m0 0l3-3m-3 3v12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 21l-3-3m0 0l3-3m-3 3h-1.5m-1.5 0h-3m-1.5 0h-1.5m3 0V3.75M15 3.75l3 3m0 0l-3 3m3-3h1.5M15 3.75h-3m1.5 0h-1.5m-1.5 0h-3" />
    </svg>
);

const ThermometerIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.375v11.25m-3.375-3.375h6.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 01-8.25-8.25c0-4.015 2.91-7.29 6.75-8.036A8.25 8.25 0 0112 3c4.556 0 8.25 3.694 8.25 8.25 0 4.556-3.694 8.25-8.25 8.25z" />
    </svg>
);

const CalendarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
  </svg>
);

const WarningIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const SaveIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const EditIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

const CopyIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H9.375" />
    </svg>
);

const TrashIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.077-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const ExportIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 13.5v2.25A2.25 2.25 0 005.25 18h13.5A2.25 2.25 0 0021 15.75V13.5" />
  </svg>
);

const ImportIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 13.5v2.25A2.25 2.25 0 005.25 18h13.5A2.25 2.25 0 0021 15.75V13.5m-3-9.375L15.75 3m0 0L13.5 5.25m2.25-2.25V12" />
  </svg>
);

const SunriseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M5.25 6.75h13.5m-13.5 9H12M5.25 6.75A2.25 2.25 0 017.5 4.5h9a2.25 2.25 0 012.25 2.25v.75" />
  </svg>
);

const SunsetIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M5.25 6.75h13.5m-13.5 9H12m-6.75-9a2.25 2.25 0 002.25-2.25h9a2.25 2.25 0 002.25 2.25v.75" />
  </svg>
);


// --- From constants.ts ---

const FANTASY_MONTHS = [
  "Frostmond", "Sturmmond", "Saatmond", "Ostermond", 
  "Wonnemond", "Brachmond", "Heumond", "Erntemond", 
  "Scheiding", "Weinmond", "Nebelmond", "Julmond"
];

const WEATHER_EFFECTS = {
  HEAVILY_OBSCURED: {
    name: "Starke Sichtbehinderung",
    description: "Ein Bereich mit starker Sichtbehinderung – wie Dunkelheit, dichter Nebel oder dichtes Laubwerk – blockiert die Sicht vollständig. Kreaturen in diesem Bereich leiden praktisch unter dem Zustand 'geblendet'."
  },
  LIGHTLY_OBSCURED: {
    name: "Leichte Sichtbehinderung",
    description: "Ein Bereich mit leichter Sichtbehinderung – wie dämmriges Licht, lückenhafter Nebel oder mäßiges Laubwerk – erschwert die Wahrnehmung. Kreaturen haben bei Weisheits- (Wahrnehmungs-) Würfen, die auf Sicht basieren, einen Nachteil."
  },
  STRONG_WIND: {
    name: "Starker Wind",
    description: "Starker Wind erschwert Fernkampfangriffe mit Waffen und verursacht bei Weisheits- (Wahrnehmungs-) Würfen, die auf Gehör basieren, einen Nachteil. Er löscht offene, ungeschützte Flammen wie Fackeln. Fliegende Kreaturen müssen am Ende jedes Zuges einen Stärke-Rettungswurf (SG 10) ablegen oder werden 1d6 x 3 Meter in Windrichtung gestoßen."
  },
  HEAVY_PRECIPITATION: {
    name: "Starker Niederschlag",
    description: "Starker Niederschlag führt zu leichter Sichtbehinderung. Er löscht außerdem offene, ungeschützte Flammen."
  },
  EXTREME_COLD: {
    name: "Extreme Kälte",
    description: "Bei Temperaturen von -18°C oder darunter müssen Kreaturen ohne Kälteschutz am Ende jeder Stunde einen Konstitutions-Rettungswurf (SG 10) ablegen. Bei einem Misserfolg erleidet die Kreatur eine Stufe Erschöpfung."
  },
  EXTREME_HEAT: {
    name: "Extreme Hitze",
    description: "Bei Temperaturen von 38°C oder darüber müssen Kreaturen ohne Hitzeschutz am Ende jeder Stunde einen Konstitutions-Rettungswurf ablegen. Der SG ist 5 für die erste Stunde und erhöht sich für jede weitere Stunde um 1. Bei einem Misserfolg erleidet die Kreatur eine Stufe Erschöpfung."
  }
};

const WT_SUNNY = { type: 'sunny', description: 'Sonnig und klar', icon: SunIcon, weight: 0, tempModifier: 3 };
const WT_CLOUDY = { type: 'cloudy', description: 'Leicht bewölkt', icon: CloudIcon, weight: 0, tempModifier: 0 };
const WT_RAIN = { type: 'rain', description: 'Leichter Regen', icon: RainIcon, weight: 0, tempModifier: -2, minTemp: 1 };
const WT_STORM = { type: 'storm', description: 'Gewittrig', icon: RainIcon, weight: 0, tempModifier: -4, minTemp: 5, effects: [WEATHER_EFFECTS.HEAVY_PRECIPITATION, WEATHER_EFFECTS.LIGHTLY_OBSCURED] };
const WT_SNOW = { type: 'snow', description: 'Leichter Schneefall', icon: SnowIcon, weight: 0, tempModifier: -2, maxTemp: 2 };
const WT_SLEET = { type: 'sleet', description: 'Eisregen', icon: RainIcon, weight: 0, tempModifier: -3, maxTemp: 1, effects: [WEATHER_EFFECTS.LIGHTLY_OBSCURED] };
const WT_FOG = { type: 'fog', description: 'Dichter Nebel', icon: CloudIcon, weight: 0, tempModifier: -1, effects: [WEATHER_EFFECTS.HEAVILY_OBSCURED] };
const WT_SCORCHING = { type: 'scorching', description: 'Sengende Hitze', icon: SunIcon, weight: 0, tempModifier: 5, minTemp: 35 };
const WT_BLIZZARD = { type: 'blizzard', description: 'Schneesturm', icon: SnowIcon, weight: 0, tempModifier: -8, maxTemp: 0, effects: [WEATHER_EFFECTS.HEAVY_PRECIPITATION, WEATHER_EFFECTS.STRONG_WIND, WEATHER_EFFECTS.LIGHTLY_OBSCURED] };
const WT_HUMID = { type: 'humid', description: 'Schwül und drückend', icon: CloudIcon, weight: 0, tempModifier: 0 };
const WT_DOWNPOUR = { type: 'downpour', description: 'Tropischer Regenguss', icon: RainIcon, weight: 0, tempModifier: -3, minTemp: 15, effects: [WEATHER_EFFECTS.HEAVY_PRECIPITATION, WEATHER_EFFECTS.LIGHTLY_OBSCURED] };
const WT_WINDY = { type: 'windy', description: 'Starke Windböen', icon: CloudIcon, weight: 0, tempModifier: -3, effects: [WEATHER_EFFECTS.STRONG_WIND] };
const WT_SANDSTORM = { type: 'sandstorm', description: 'Sandsturm', icon: CloudIcon, weight: 0, tempModifier: -2, effects: [WEATHER_EFFECTS.STRONG_WIND, WEATHER_EFFECTS.LIGHTLY_OBSCURED]};

const CLIMATE_ZONES = [
  {
    id: 'temperate',
    name: 'Gemäßigt',
    sunlight: { solstice: { short: 9.5, long: 14.5 } },
    seasonalData: [
      { tempRange: [-5, 5], weatherTypes: [{...WT_CLOUDY, weight: 45}, {...WT_SNOW, weight: 30}, {...WT_SUNNY, description: 'Klare, kalte Sonne', weight: 15}, {...WT_SLEET, weight: 10}] }, // Jan
      { tempRange: [-4, 6], weatherTypes: [{...WT_CLOUDY, weight: 40}, {...WT_SNOW, weight: 30}, {...WT_RAIN, weight: 15}, {...WT_SUNNY, description: 'Klare, kalte Sonne', weight: 15}] }, // Feb
      { tempRange: [-2, 10], weatherTypes: [{...WT_CLOUDY, weight: 40}, {...WT_RAIN, weight: 40}, {...WT_SUNNY, weight: 15}, {...WT_SNOW, weight: 5}] }, // Mar
      { tempRange: [2, 15], weatherTypes: [{...WT_RAIN, weight: 45}, {...WT_CLOUDY, weight: 35}, {...WT_SUNNY, weight: 20}] }, // Apr
      { tempRange: [6, 18], weatherTypes: [{...WT_SUNNY, weight: 40}, {...WT_RAIN, weight: 30}, {...WT_CLOUDY, weight: 20}, {...WT_STORM, weight: 10}] }, // May
      { tempRange: [12, 24], weatherTypes: [{...WT_SUNNY, weight: 50}, {...WT_CLOUDY, weight: 30}, {...WT_RAIN, weight: 15}, {...WT_STORM, weight: 5}] }, // Jun
      { tempRange: [15, 28], weatherTypes: [{...WT_SUNNY, weight: 60}, {...WT_CLOUDY, weight: 20}, {...WT_STORM, weight: 15}, {...WT_RAIN, weight: 5}] }, // Jul
      { tempRange: [14, 27], weatherTypes: [{...WT_SUNNY, weight: 65}, {...WT_STORM, weight: 20}, {...WT_CLOUDY, weight: 15}] }, // Aug
      { tempRange: [10, 21], weatherTypes: [{...WT_SUNNY, weight: 50}, {...WT_CLOUDY, weight: 30}, {...WT_RAIN, weight: 20}] }, // Sep
      { tempRange: [5, 16], weatherTypes: [{...WT_CLOUDY, weight: 40}, {...WT_RAIN, weight: 35}, {...WT_SUNNY, weight: 20}, {...WT_FOG, weight: 5}] }, // Oct
      { tempRange: [0, 10], weatherTypes: [{...WT_RAIN, weight: 45}, {...WT_CLOUDY, weight: 40}, {...WT_FOG, weight: 15}] }, // Nov
      { tempRange: [-3, 7], weatherTypes: [{...WT_CLOUDY, weight: 50}, {...WT_RAIN, weight: 25}, {...WT_SNOW, weight: 15}, {...WT_FOG, weight: 10}] }, // Dec
    ]
  },
  {
    id: 'arctic',
    name: 'Arktis',
    sunlight: { solstice: { short: 4, long: 20 } },
    seasonalData: [
      { tempRange: [-25, -15], weatherTypes: [{...WT_SNOW, weight: 50}, {...WT_BLIZZARD, weight: 30}, {...WT_CLOUDY, description: "Polarnacht", weight: 20}] },
      { tempRange: [-22, -12], weatherTypes: [{...WT_SNOW, weight: 55}, {...WT_BLIZZARD, weight: 25}, {...WT_CLOUDY, description: "Polarnacht", weight: 20}] },
      { tempRange: [-18, -8], weatherTypes: [{...WT_SNOW, weight: 60}, {...WT_CLOUDY, weight: 30}, {...WT_SUNNY, description: "Kalte Dämmerung", weight: 10}] },
      { tempRange: [-15, -10], weatherTypes: [{...WT_SNOW, weight: 40}, {...WT_CLOUDY, weight: 30}, {...WT_SUNNY, description: "Helle, kalte Sonne", weight: 30}] },
      { tempRange: [-12, -8], weatherTypes: [{...WT_SUNNY, description: "Mitternachtssonne", weight: 60}, {...WT_CLOUDY, weight: 30}, {...WT_SNOW, weight: 10}] },
      { tempRange: [-10, -5], weatherTypes: [{...WT_SUNNY, description: "Mitternachtssonne", weight: 70}, {...WT_CLOUDY, weight: 25}, {...WT_RAIN, description: "Eisiger Niesel", weight: 5, maxTemp: 0}] },
      { tempRange: [-10, -5], weatherTypes: [{...WT_SUNNY, description: "Mitternachtssonne", weight: 60}, {...WT_CLOUDY, weight: 30}, {...WT_RAIN, description: "Kalter Regen", weight: 10, maxTemp: 0}] },
      { tempRange: [-12, -7], weatherTypes: [{...WT_CLOUDY, weight: 50}, {...WT_SNOW, weight: 30}, {...WT_SUNNY, description: "Tiefe Sonne", weight: 20}] },
      { tempRange: [-15, -10], weatherTypes: [{...WT_SNOW, weight: 60}, {...WT_CLOUDY, weight: 30}, {...WT_BLIZZARD, weight: 10}] },
      { tempRange: [-20, -12], weatherTypes: [{...WT_SNOW, weight: 70}, {...WT_CLOUDY, weight: 20}, {...WT_BLIZZARD, weight: 10}] },
      { tempRange: [-22, -14], weatherTypes: [{...WT_SNOW, weight: 60}, {...WT_BLIZZARD, weight: 20}, {...WT_CLOUDY, description: "Polarnacht", weight: 20}] },
      { tempRange: [-25, -15], weatherTypes: [{...WT_SNOW, weight: 60}, {...WT_BLIZZARD, weight: 30}, {...WT_CLOUDY, description: "Polarnacht", weight: 10}] },
    ]
  },
   {
    id: 'desert',
    name: 'Wüste',
    sunlight: { solstice: { short: 10.5, long: 13.5 } },
    seasonalData: [
      { tempRange: [5, 20], weatherTypes: [{...WT_SUNNY, description: "Klare, milde Sonne", weight: 80}, {...WT_WINDY, weight: 20}] },
      { tempRange: [8, 24], weatherTypes: [{...WT_SUNNY, description: "Klare, warme Sonne", weight: 70}, {...WT_SANDSTORM, weight: 30}] },
      { tempRange: [15, 32], weatherTypes: [{...WT_SUNNY, weight: 70}, {...WT_SANDSTORM, weight: 25}, {...WT_STORM, description: "Seltenes Wüstengewitter", weight: 5}] },
      { tempRange: [20, 38], weatherTypes: [{...WT_SCORCHING, weight: 60}, {...WT_SUNNY, weight: 30}, {...WT_SANDSTORM, weight: 10}] },
      { tempRange: [25, 45], weatherTypes: [{...WT_SCORCHING, weight: 80}, {...WT_SANDSTORM, description: 'Heißer Wind', weight: 20}] },
      { tempRange: [28, 50], weatherTypes: [{...WT_SCORCHING, weight: 90}, {...WT_SANDSTORM, description: 'Heißer Wind', weight: 10}] },
      { tempRange: [26, 48], weatherTypes: [{...WT_SCORCHING, weight: 85}, {...WT_SANDSTORM, description: 'Heißer Wind', weight: 15}] },
      { tempRange: [24, 42], weatherTypes: [{...WT_SCORCHING, weight: 75}, {...WT_SUNNY, weight: 15}, {...WT_SANDSTORM, weight: 10}] },
      { tempRange: [20, 38], weatherTypes: [{...WT_SCORCHING, weight: 65}, {...WT_SUNNY, weight: 25}, {...WT_WINDY, weight: 10}] },
      { tempRange: [15, 32], weatherTypes: [{...WT_SUNNY, weight: 70}, {...WT_WINDY, weight: 25}, {...WT_CLOUDY, weight: 5}] },
      { tempRange: [10, 26], weatherTypes: [{...WT_SUNNY, weight: 80}, {...WT_WINDY, weight: 20}] },
      { tempRange: [6, 22], weatherTypes: [{...WT_SUNNY, weight: 85}, {...WT_WINDY, weight: 15}] },
    ]
  },
  {
    id: 'tropical',
    name: 'Tropen',
    sunlight: { solstice: { short: 11.5, long: 12.5 } },
    seasonalData: [
      { tempRange: [24, 33], weatherTypes: [{...WT_SUNNY, weight: 70}, {...WT_HUMID, weight: 25}, {...WT_RAIN, weight: 5}] },
      { tempRange: [25, 34], weatherTypes: [{...WT_SUNNY, weight: 80}, {...WT_HUMID, weight: 20}] },
      { tempRange: [26, 35], weatherTypes: [{...WT_SUNNY, weight: 75}, {...WT_HUMID, weight: 20}, {...WT_RAIN, weight: 5}] },
      { tempRange: [26, 34], weatherTypes: [{...WT_SUNNY, weight: 50}, {...WT_HUMID, weight: 30}, {...WT_DOWNPOUR, weight: 20}] },
      { tempRange: [25, 32], weatherTypes: [{...WT_DOWNPOUR, weight: 50}, {...WT_HUMID, weight: 30}, {...WT_STORM, weight: 15}, {...WT_SUNNY, weight: 5}] },
      { tempRange: [24, 31], weatherTypes: [{...WT_DOWNPOUR, weight: 60}, {...WT_STORM, weight: 20}, {...WT_HUMID, weight: 20}] },
      { tempRange: [24, 31], weatherTypes: [{...WT_DOWNPOUR, weight: 60}, {...WT_STORM, weight: 25}, {...WT_HUMID, weight: 15}] },
      { tempRange: [25, 32], weatherTypes: [{...WT_DOWNPOUR, weight: 55}, {...WT_HUMID, weight: 25}, {...WT_STORM, weight: 20}] },
      { tempRange: [26, 33], weatherTypes: [{...WT_HUMID, weight: 40}, {...WT_DOWNPOUR, weight: 30}, {...WT_SUNNY, weight: 30}] },
      { tempRange: [25, 34], weatherTypes: [{...WT_SUNNY, weight: 60}, {...WT_HUMID, weight: 30}, {...WT_RAIN, weight: 10}] },
      { tempRange: [24, 33], weatherTypes: [{...WT_SUNNY, weight: 70}, {...WT_HUMID, weight: 25}, {...WT_RAIN, weight: 5}] },
      { tempRange: [24, 32], weatherTypes: [{...WT_SUNNY, weight: 80}, {...WT_HUMID, weight: 20}] },
    ]
  },
  {
    id: 'alpine',
    name: 'Gebirge',
    sunlight: { solstice: { short: 9, long: 15 } },
    seasonalData: [
      { tempRange: [-15, -2], weatherTypes: [{...WT_SNOW, weight: 50}, {...WT_BLIZZARD, weight: 30}, {...WT_CLOUDY, weight: 20}] },
      { tempRange: [-12, 0], weatherTypes: [{...WT_SNOW, weight: 60}, {...WT_WINDY, weight: 25}, {...WT_SUNNY, description: 'Scharfe, kalte Sonne', weight: 15}] },
      { tempRange: [-8, 5], weatherTypes: [{...WT_SNOW, weight: 40}, {...WT_WINDY, weight: 30}, {...WT_SLEET, weight: 20}, {...WT_SUNNY, weight: 10}] },
      { tempRange: [-4, 10], weatherTypes: [{...WT_WINDY, weight: 40}, {...WT_RAIN, weight: 30}, {...WT_SUNNY, weight: 20}, {...WT_SNOW, weight: 10}] },
      { tempRange: [0, 15], weatherTypes: [{...WT_SUNNY, weight: 40}, {...WT_RAIN, weight: 30}, {...WT_STORM, weight: 20}, {...WT_WINDY, weight: 10}] },
      { tempRange: [5, 18], weatherTypes: [{...WT_SUNNY, weight: 50}, {...WT_STORM, weight: 25}, {...WT_RAIN, weight: 25}] },
      { tempRange: [8, 20], weatherTypes: [{...WT_SUNNY, weight: 60}, {...WT_STORM, weight: 30}, {...WT_RAIN, weight: 10}] },
      { tempRange: [6, 19], weatherTypes: [{...WT_SUNNY, weight: 50}, {...WT_STORM, weight: 25}, {...WT_RAIN, weight: 15}, {...WT_WINDY, weight: 10}] },
      { tempRange: [2, 14], weatherTypes: [{...WT_WINDY, weight: 35}, {...WT_RAIN, weight: 30}, {...WT_SUNNY, weight: 25}, {...WT_SNOW, weight: 10}] },
      { tempRange: [-2, 10], weatherTypes: [{...WT_WINDY, weight: 40}, {...WT_RAIN, weight: 30}, {...WT_CLOUDY, weight: 20}, {...WT_SNOW, weight: 10}] },
      { tempRange: [-8, 4], weatherTypes: [{...WT_SNOW, weight: 50}, {...WT_WINDY, weight: 30}, {...WT_CLOUDY, weight: 20}] },
      { tempRange: [-12, 0], weatherTypes: [{...WT_BLIZZARD, weight: 40}, {...WT_SNOW, weight: 40}, {...WT_WINDY, weight: 20}] },
    ]
  },
  {
    id: 'coastal',
    name: 'Küste',
    sunlight: { solstice: { short: 9.5, long: 14.5 } },
    seasonalData: [
      { tempRange: [2, 10], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_STORM, weight: 30}, {...WT_FOG, weight: 20}, {...WT_CLOUDY, weight: 10}] },
      { tempRange: [3, 11], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_CLOUDY, weight: 30}, {...WT_FOG, weight: 20}, {...WT_STORM, weight: 10}] },
      { tempRange: [5, 14], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_SUNNY, weight: 30}, {...WT_FOG, weight: 20}, {...WT_CLOUDY, weight: 10}] },
      { tempRange: [8, 16], weatherTypes: [{...WT_SUNNY, weight: 40}, {...WT_RAIN, weight: 30}, {...WT_FOG, weight: 15}, {...WT_CLOUDY, weight: 15}] },
      { tempRange: [11, 19], weatherTypes: [{...WT_SUNNY, weight: 50}, {...WT_RAIN, weight: 20}, {...WT_CLOUDY, weight: 20}, {...WT_FOG, weight: 10}] },
      { tempRange: [15, 25], weatherTypes: [{...WT_SUNNY, weight: 60}, {...WT_CLOUDY, weight: 20}, {...WT_RAIN, weight: 15}, {...WT_FOG, weight: 5}] },
      { tempRange: [17, 27], weatherTypes: [{...WT_SUNNY, weight: 70}, {...WT_STORM, weight: 15}, {...WT_RAIN, weight: 10}, {...WT_CLOUDY, weight: 5}] },
      { tempRange: [16, 26], weatherTypes: [{...WT_SUNNY, weight: 60}, {...WT_STORM, weight: 20}, {...WT_RAIN, weight: 20}] },
      { tempRange: [13, 22], weatherTypes: [{...WT_SUNNY, weight: 40}, {...WT_RAIN, weight: 30}, {...WT_CLOUDY, weight: 30}] },
      { tempRange: [10, 18], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_CLOUDY, weight: 30}, {...WT_STORM, weight: 20}, {...WT_FOG, weight: 10}] },
      { tempRange: [6, 14], weatherTypes: [{...WT_RAIN, weight: 50}, {...WT_STORM, weight: 25}, {...WT_FOG, weight: 25}] },
      { tempRange: [3, 11], weatherTypes: [{...WT_STORM, weight: 40}, {...WT_RAIN, weight: 40}, {...WT_FOG, weight: 20}] },
    ]
  },
    {
    id: 'swamp',
    name: 'Sumpfland',
    sunlight: { solstice: { short: 11, long: 13 } },
    seasonalData: [
      { tempRange: [2, 12], weatherTypes: [{...WT_FOG, weight: 40}, {...WT_RAIN, description: "Kalter Nieselregen", weight: 30}, {...WT_CLOUDY, weight: 30}] },
      { tempRange: [3, 13], weatherTypes: [{...WT_FOG, weight: 35}, {...WT_RAIN, weight: 35}, {...WT_CLOUDY, weight: 30}] },
      { tempRange: [8, 18], weatherTypes: [{...WT_RAIN, weight: 50}, {...WT_HUMID, weight: 30}, {...WT_CLOUDY, weight: 20}] },
      { tempRange: [12, 22], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_HUMID, weight: 40}, {...WT_STORM, weight: 20}] },
      { tempRange: [16, 26], weatherTypes: [{...WT_HUMID, weight: 50}, {...WT_STORM, weight: 30}, {...WT_RAIN, weight: 20}] },
      { tempRange: [22, 35], weatherTypes: [{...WT_HUMID, weight: 40}, {...WT_STORM, weight: 40}, {...WT_DOWNPOUR, weight: 20}] },
      { tempRange: [24, 36], weatherTypes: [{...WT_STORM, weight: 50}, {...WT_HUMID, weight: 30}, {...WT_DOWNPOUR, weight: 20}] },
      { tempRange: [23, 34], weatherTypes: [{...WT_HUMID, weight: 40}, {...WT_STORM, weight: 40}, {...WT_RAIN, weight: 20}] },
      { tempRange: [18, 28], weatherTypes: [{...WT_HUMID, weight: 40}, {...WT_RAIN, weight: 40}, {...WT_FOG, weight: 20}] },
      { tempRange: [12, 22], weatherTypes: [{...WT_RAIN, weight: 45}, {...WT_FOG, weight: 30}, {...WT_HUMID, weight: 25}] },
      { tempRange: [6, 16], weatherTypes: [{...WT_FOG, weight: 50}, {...WT_RAIN, weight: 40}, {...WT_CLOUDY, weight: 10}] },
      { tempRange: [3, 13], weatherTypes: [{...WT_FOG, weight: 45}, {...WT_RAIN, description: "Kalter Nieselregen", weight: 35}, {...WT_CLOUDY, weight: 20}] },
    ]
  },
  {
    id: 'scorching_wastes',
    name: 'Sengende Ödnis',
    sunlight: { solstice: { short: 10.5, long: 13.5 } },
    seasonalData: [
      { tempRange: [30, 45], weatherTypes: [{...WT_SCORCHING, weight: 70}, {...WT_SANDSTORM, description: 'Heißer Sandsturm', weight: 30}] },
      { tempRange: [32, 48], weatherTypes: [{...WT_SCORCHING, weight: 70}, {...WT_SANDSTORM, description: 'Heißer Sandsturm', weight: 30}] },
      { tempRange: [35, 52], weatherTypes: [{...WT_SCORCHING, weight: 80}, {...WT_SANDSTORM, description: 'Feuersturm', weight: 20}] },
      { tempRange: [38, 55], weatherTypes: [{...WT_SCORCHING, weight: 85}, {...WT_WINDY, description: 'Feuersturm', weight: 15}] },
      { tempRange: [40, 60], weatherTypes: [{...WT_SCORCHING, weight: 90}, {...WT_WINDY, description: 'Feuersturm', weight: 10}] },
      { tempRange: [42, 62], weatherTypes: [{...WT_SCORCHING, weight: 95}, {...WT_WINDY, description: 'Feuersturm', weight: 5}] },
      { tempRange: [41, 61], weatherTypes: [{...WT_SCORCHING, weight: 90}, {...WT_WINDY, description: 'Feuersturm', weight: 10}] },
      { tempRange: [39, 58], weatherTypes: [{...WT_SCORCHING, weight: 85}, {...WT_SANDSTORM, description: 'Feuersturm', weight: 15}] },
      { tempRange: [36, 54], weatherTypes: [{...WT_SCORCHING, weight: 80}, {...WT_SANDSTORM, description: 'Heißer Sandsturm', weight: 20}] },
      { tempRange: [34, 50], weatherTypes: [{...WT_SCORCHING, weight: 75}, {...WT_SANDSTORM, description: 'Heißer Sandsturm', weight: 25}] },
      { tempRange: [32, 48], weatherTypes: [{...WT_SCORCHING, weight: 70}, {...WT_SANDSTORM, description: 'Heißer Sandsturm', weight: 30}] },
      { tempRange: [30, 46], weatherTypes: [{...WT_SCORCHING, weight: 70}, {...WT_SANDSTORM, description: 'Heißer Sandsturm', weight: 30}] },
    ]
  },
  {
    id: 'frozen_wastes',
    name: 'Eiswüste',
    sunlight: { solstice: { short: 0, long: 24 } },
    seasonalData: [
      { tempRange: [-60, -50], weatherTypes: [{...WT_BLIZZARD, weight: 70}, {...WT_SNOW, weight: 20}, {...WT_FOG, description: 'Gefrierender Nebel', weight: 10}] },
      { tempRange: [-58, -48], weatherTypes: [{...WT_BLIZZARD, weight: 60}, {...WT_SNOW, weight: 30}, {...WT_FOG, description: 'Gefrierender Nebel', weight: 10}] },
      { tempRange: [-55, -45], weatherTypes: [{...WT_BLIZZARD, weight: 40}, {...WT_SNOW, weight: 50}, {...WT_SUNNY, description: 'Blasse, kalte Sonne', weight: 10}] },
      { tempRange: [-50, -40], weatherTypes: [{...WT_SNOW, weight: 60}, {...WT_BLIZZARD, weight: 20}, {...WT_SUNNY, description: 'Trügerische, kalte Sonne', weight: 20}] },
      { tempRange: [-45, -38], weatherTypes: [{...WT_SNOW, weight: 60}, {...WT_BLIZZARD, weight: 20}, {...WT_SUNNY, description: 'Trügerische, kalte Sonne', weight: 20}] },
      { tempRange: [-42, -35], weatherTypes: [{...WT_SNOW, weight: 50}, {...WT_SUNNY, description: 'Helle Mitternachtssonne', weight: 40}, {...WT_BLIZZARD, weight: 10}] },
      { tempRange: [-42, -35], weatherTypes: [{...WT_SNOW, weight: 60}, {...WT_SUNNY, description: 'Helle Mitternachtssonne', weight: 30}, {...WT_BLIZZARD, weight: 10}] },
      { tempRange: [-45, -38], weatherTypes: [{...WT_SNOW, weight: 60}, {...WT_BLIZZARD, weight: 30}, {...WT_SUNNY, description: 'Trügerische, kalte Sonne', weight: 10}] },
      { tempRange: [-50, -40], weatherTypes: [{...WT_BLIZZARD, weight: 50}, {...WT_SNOW, weight: 40}, {...WT_FOG, description: 'Gefrierender Nebel', weight: 10}] },
      { tempRange: [-55, -45], weatherTypes: [{...WT_BLIZZARD, weight: 60}, {...WT_SNOW, weight: 30}, {...WT_FOG, description: 'Gefrierender Nebel', weight: 10}] },
      { tempRange: [-58, -48], weatherTypes: [{...WT_BLIZZARD, weight: 70}, {...WT_SNOW, weight: 20}, {...WT_FOG, description: 'Gefrierender Nebel', weight: 10}] },
      { tempRange: [-60, -50], weatherTypes: [{...WT_BLIZZARD, weight: 80}, {...WT_SNOW, weight: 20}] },
    ]
  },
];


// --- From hooks/useTime.ts ---

const useTime = (initialDate) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const advanceTime = useCallback((minutes) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate.getTime());
      newDate.setMinutes(newDate.getMinutes() + minutes);
      return newDate;
    });
  }, []);

  const getDayWithOrdinal = (day) => {
    return `${day}.`;
  };

  const formatDateString = useCallback((date) => {
    const day = getDayWithOrdinal(date.getDate());
    const monthName = FANTASY_MONTHS[date.getMonth()];
    const monthNumber = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day} ${monthName} (${monthNumber}), ${year} DR`;
  }, []);

  const formatTimeString = useCallback((date) => {
    if (!date || isNaN(date.getTime())) {
        return '00:00';
    }
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }, []);

  return {
    currentDate,
    setCurrentDate,
    advanceTime,
    formatDateString,
    formatTimeString,
  };
};


// --- From services/geminiService.ts ---

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function getSmartTimeSuggestion(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Du bist ein Assistent für einen Dungeons & Dragons Spielleiter. Deine Aufgabe ist es, die benötigte Zeit für eine Aktion der Heldengruppe zu schätzen und einen passenden, kurzen Log-Eintrag zu erstellen. Basierend auf der folgenden Nutzereingabe, erstelle ein JSON-Objekt mit 'duration_minutes' (eine Ganzzahl für die Gesamtzeit in Minuten) und 'log_entry' (eine beschreibende Zeichenkette für die Zeitleiste). Nutzereingabe: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            duration_minutes: {
              type: Type.INTEGER,
              description: "Die geschätzte Zeit in Minuten für die Aktion."
            },
            log_entry: {
              type: Type.STRING,
              description: "Eine kurze Beschreibung des Ereignisses für die Zeitleiste."
            }
          },
          required: ["duration_minutes", "log_entry"]
        }
      }
    });

    const text = response.text.trim();
    if (text) {
      return JSON.parse(text);
    }
    return null;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get suggestion from Gemini API.");
  }
}


// --- From components/DailyTimelineVisualizer.tsx ---

const DailyTimelineVisualizer = ({ events, currentTime, sunlightData }) => {
    const totalMinutesInDay = 24 * 60;
    
    const nowInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const nowPositionPercent = (nowInMinutes / totalMinutesInDay) * 100;

    const sortedEvents = [...events].reverse();

    const getMinutesFromDate = (date) => date.getHours() * 60 + date.getMinutes();
    
    const dawnStartPercent = (getMinutesFromDate(sunlightData.dawn) / totalMinutesInDay) * 100;
    const sunrisePercent = (getMinutesFromDate(sunlightData.sunrise) / totalMinutesInDay) * 100;
    const sunsetPercent = (getMinutesFromDate(sunlightData.sunset) / totalMinutesInDay) * 100;
    const duskEndPercent = (getMinutesFromDate(sunlightData.dusk) / totalMinutesInDay) * 100;

    return (
        <div className="my-6 p-4 bg-stone-900/50 rounded-lg">
            <div className="relative h-8 bg-stone-700 rounded w-full overflow-hidden border border-stone-600">
                {/* Background Phases */}
                <div className="absolute top-0 bottom-0 left-0 h-full bg-blue-900/40" style={{width: `${dawnStartPercent}%`}} title="Nacht"></div>
                <div className="absolute top-0 bottom-0 h-full bg-orange-400/30" style={{left: `${dawnStartPercent}%`, width: `${sunrisePercent - dawnStartPercent}%`}} title="Morgendämmerung"></div>
                <div className="absolute top-0 bottom-0 h-full bg-amber-200/20" style={{left: `${sunrisePercent}%`, width: `${sunsetPercent - sunrisePercent}%`}} title="Tageslicht"></div>
                <div className="absolute top-0 bottom-0 h-full bg-orange-400/30" style={{left: `${sunsetPercent}%`, width: `${duskEndPercent - sunsetPercent}%`}} title="Abenddämmerung"></div>
                <div className="absolute top-0 bottom-0 h-full bg-blue-900/40" style={{left: `${duskEndPercent}%`, right: '0'}} title="Nacht"></div>

                {sortedEvents.map(event => {
                    const startDate = new Date(event.id);
                    
                    const displayDay = new Date(currentTime);
                    displayDay.setHours(0, 0, 0, 0);
                    const displayDayStartMs = displayDay.getTime();
                    displayDay.setHours(24, 0, 0, 0);
                    const displayDayEndMs = displayDay.getTime();

                    const eventStartMs = startDate.getTime();
                    const eventEndMs = eventStartMs + event.duration * 60 * 1000;

                    if (eventEndMs <= displayDayStartMs || eventStartMs >= displayDayEndMs) {
                        return null;
                    }

                    const visibleStartMs = Math.max(eventStartMs, displayDayStartMs);
                    const visibleEndMs = Math.min(eventEndMs, displayDayEndMs);

                    const visibleStartMinutes = (visibleStartMs - displayDayStartMs) / 60000;
                    const visibleDurationMinutes = (visibleEndMs - visibleStartMs) / 60000;

                    const leftPercent = (visibleStartMinutes / totalMinutesInDay) * 100;
                    const widthPercent = (visibleDurationMinutes / totalMinutesInDay) * 100;

                    if (widthPercent <= 0) {
                        return null;
                    }
                    
                    const isContinuation = eventStartMs < displayDayStartMs;
                    const originalDescription = event.description.split('\n')[0];
                    const title = isContinuation
                        ? `(Fortsetzung vom Vortag) ${originalDescription} | Gesamt: ${event.time} - ${event.endTime} (${event.duration} min)`
                        : `${event.time} - ${event.endTime}: ${originalDescription} (${event.duration} min)`;


                    return (
                        <div
                            key={event.id}
                            className="absolute h-full bg-amber-500/60 rounded border border-amber-400/80 hover:bg-amber-400/80 transition-all duration-200 ease-in-out hover:scale-y-110 origin-bottom"
                            style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                            title={title}
                        ></div>
                    );
                })}

                {/* "Now" Indicator */}
                <div 
                    className="absolute top-[-4px] bottom-[-4px] w-0.5 bg-red-500 shadow-[0_0_8px_theme(colors.red.500)] z-10"
                    style={{ left: `${nowPositionPercent}%` }}
                    title={`Aktuelle Zeit: ${currentTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`}
                >
                  <div className="absolute -top-1.5 -ml-1.5 w-3 h-3 bg-red-500 rounded-full ring-2 ring-stone-800"></div>
                </div>
            </div>
            
            {/* Hour Markers */}
            <div className="relative h-4 mt-2 text-xs text-stone-400">
                {['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'].map((time, index) => {
                    const hour = index * 3;
                    const leftPercent = (hour / 24) * 100;
                    
                    const transform = hour === 0 ? 'none' : 'translateX(-50%)';

                    return (
                        <span
                            key={time}
                            className="absolute"
                            style={{ left: `${leftPercent}%`, transform }}
                        >
                            {time}
                        </span>
                    );
                })}
                <span className="absolute right-0">24:00</span>
            </div>
        </div>
    );
};


// --- From components/DeleteSaveModal.tsx ---

const DeleteSaveModal = ({ isOpen, onClose, onConfirm, saveName }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div 
        className="bg-stone-800 rounded-lg shadow-xl p-6 border-2 border-red-700 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
            <WarningIcon className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="font-medieval text-2xl text-amber-300 mb-4">Spielstand löschen?</h2>
            <p className="text-amber-200 mb-6">
              Möchten Sie den Spielstand <strong className="text-amber-100">{saveName}</strong> wirklich unwiderruflich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={onClose} 
            className="bg-stone-600 text-amber-200 font-bold px-6 py-2 rounded-md hover:bg-stone-500 transition-colors"
          >
            Abbrechen
          </button>
          <button 
            onClick={onConfirm}
            className="bg-red-700 text-white font-bold px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Ja, löschen
          </button>
        </div>
      </div>
    </div>
  );
};


// --- From components/DowntimeModal.tsx ---

const DowntimeModal = ({ isOpen, onClose, onConfirm }) => {
  const [days, setDays] = useState(1);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(days);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div 
        className="bg-stone-800 rounded-lg shadow-xl p-6 border-2 border-amber-700 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-medieval text-2xl text-amber-300 mb-4">Auszeit festlegen</h2>
        <p className="text-amber-200 mb-4">
          Wie viele Tage sollen übersprungen werden? Die Zeit wird bis 08:00 Uhr morgens am Zieldatum vorgespult.
        </p>
        
        <div className="mb-6">
          <label htmlFor="downtime-days" className="block text-amber-300 mb-2">Anzahl der Tage</label>
          <input
            id="downtime-days"
            type="number"
            value={days}
            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            className="w-full bg-stone-700 text-amber-50 placeholder-stone-400 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button 
            onClick={onClose} 
            className="bg-stone-600 text-amber-200 font-bold px-4 py-2 rounded-md hover:bg-stone-500 transition-colors"
          >
            Abbrechen
          </button>
          <button 
            onClick={handleConfirm}
            className="bg-amber-600 text-stone-900 font-bold px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
          >
            Bestätigen
          </button>
        </div>
      </div>
    </div>
  );
};

// --- New SunlightTracker component ---
const SunlightTracker = ({ sunlightData, currentTime, formatTimeString }) => {
    if (!sunlightData) return null;

    const { dawn, sunrise, sunset, dusk, state } = sunlightData;

    const currentTimeDecimal = currentTime.getHours() + currentTime.getMinutes() / 60;
    const sunriseDecimal = sunrise.getHours() + sunrise.getMinutes() / 60;
    const sunsetDecimal = sunset.getHours() + sunset.getMinutes() / 60;

    let sunPositionPercent = 0;
    if (currentTimeDecimal > sunriseDecimal && currentTimeDecimal < sunsetDecimal) {
        sunPositionPercent = ((currentTimeDecimal - sunriseDecimal) / (sunsetDecimal - sunriseDecimal)) * 100;
    } else if (currentTimeDecimal >= sunsetDecimal) {
        sunPositionPercent = 100;
    }

    const stateText = {
        DAWN: 'Morgendämmerung',
        DAYLIGHT: 'Tageslicht',
        DUSK: 'Abenddämmerung',
        NIGHT_AM: 'Nacht',
        NIGHT_PM: 'Nacht'
    }[state];
    
    const tooltipText = `
        ${stateText}
        Dämmerung: ${formatTimeString(dawn)}
        Sonnenaufgang: ${formatTimeString(sunrise)}
        Sonnenuntergang: ${formatTimeString(sunset)}
    `;

    // Precise trigonometric calculation for icon position
    const angleRad = (Math.PI * sunPositionPercent) / 100; // Angle from 0 to PI
    // We want to go from PI to 2*PI for the top semi-circle
    const theta = Math.PI + angleRad;
    
    const svgCenterX = 50;
    const svgCenterY = 50;
    const svgRadius = 45;

    // Calculate position in SVG coordinate system
    const svgX = svgCenterX + svgRadius * Math.cos(theta);
    const svgY = svgCenterY + svgRadius * Math.sin(theta);
    
    // Convert SVG coordinates to percentage for absolute positioning
    const leftPercent = (svgX / 100) * 100;
    const topPercent = (svgY / 50) * 100;

    return (
        <div className="relative w-24 h-12" title={tooltipText}>
            <svg viewBox="0 0 100 50" className="w-full h-full absolute">
                <path d="M 5 50 A 45 45 0 0 1 95 50" stroke="rgba(252, 211, 77, 0.4)" strokeWidth="2" fill="none" />
            </svg>
            <div 
              className="absolute w-6 h-6 text-amber-300 transition-all duration-500 ease-in-out"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {state.startsWith('NIGHT') ? <MoonIcon className="w-full h-full opacity-80" /> : <SunIcon className="w-full h-full" />}
            </div>
             <div className="absolute -bottom-1 left-0 text-stone-400" title={`Sonnenaufgang: ${formatTimeString(sunrise)}`}><SunriseIcon className="w-4 h-4"/></div>
             <div className="absolute -bottom-1 right-0 text-stone-400" title={`Sonnenuntergang: ${formatTimeString(sunset)}`}><SunsetIcon className="w-4 h-4"/></div>
        </div>
    );
};


// --- From components/Header.tsx ---

const Header = ({ 
  dateString, 
  timeString, 
  onReset, 
  weather, 
  climateZone, 
  onClimateZoneChange, 
  onOpenSetDateModal,
  activeSaveName,
  onOpenSaveManager,
  sunlightData,
  currentDate,
  formatTimeString
}) => {
  const WeatherIcon = weather.icon || SunIcon;

  return (
    <header className="bg-stone-900 bg-opacity-50 border-b-2 border-amber-800 shadow-lg p-4 sticky top-0 z-20 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3">
            <h1 className="font-medieval text-2xl md:text-4xl text-amber-300 tracking-wider">
            Kampagnen-Zeitmesser
            </h1>
            {activeSaveName && <span className="hidden md:inline-block mt-2 text-amber-400 font-bold bg-stone-800/50 px-3 py-1 rounded-md text-sm">{activeSaveName}</span>}
        </div>


        <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 text-amber-200" title={weather.description}>
                <WeatherIcon className="w-8 h-8"/>
                <div className="flex items-center">
                    <ThermometerIcon className="w-6 h-6 mr-1"/>
                    <span className="font-bold text-xl">{weather.temperature}°C</span>
                </div>
            </div>
             <SunlightTracker sunlightData={sunlightData} currentTime={currentDate} formatTimeString={formatTimeString} />
            <div className="text-right">
              <button
                onClick={onOpenSetDateModal}
                className="block text-left w-full rounded-md transition-colors hover:bg-stone-700/40 p-2"
                title="Datum und Uhrzeit festlegen"
              >
                <p className="font-bold text-base md:text-xl text-amber-100">{dateString}</p>
                <p className="text-sm md:text-lg text-amber-300">{timeString} Uhr</p>
              </button>
            </div>
        </div>
        
        <div className="flex items-center gap-4">
             <div className="relative">
                <select 
                    value={climateZone}
                    onChange={(e) => onClimateZoneChange(e.target.value)}
                    className="bg-stone-800 border border-amber-700 text-amber-200 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 appearance-none"
                    title="Klimazone auswählen"
                >
                    {CLIMATE_ZONES.map(zone => (
                        <option key={zone.id} value={zone.id}>{zone.name}</option>
                    ))}
                </select>
             </div>
            <button onClick={onOpenSaveManager} title="Spielstände verwalten" className="p-2 text-amber-400 hover:text-amber-200 transition-colors duration-300">
              <SaveIcon className="w-6 h-6"/>
            </button>
            <button onClick={onReset} title="Kampagne zurücksetzen" className="p-2 text-amber-400 hover:text-red-500 transition-colors duration-300">
              <ResetIcon className="w-6 h-6"/>
            </button>
        </div>
      </div>
    </header>
  );
};


// --- From components/ResetModal.tsx ---

const ResetModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div 
        className="bg-stone-800 rounded-lg shadow-xl p-6 border-2 border-red-700 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
            <WarningIcon className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="font-medieval text-2xl text-amber-300 mb-4">Kampagne zurücksetzen?</h2>
            <p className="text-amber-200 mb-6">
              Sind Sie absolut sicher? Alle Ereignisse, archivierten Tage und der aktuelle Zeitstempel werden unwiderruflich gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={onClose} 
            className="bg-stone-600 text-amber-200 font-bold px-6 py-2 rounded-md hover:bg-stone-500 transition-colors"
          >
            Abbrechen
          </button>
          <button 
            onClick={onConfirm}
            className="bg-red-700 text-white font-bold px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Ja, zurücksetzen
          </button>
        </div>
      </div>
    </div>
  );
};


// --- From components/SaveManagerModal.tsx ---

// FIX: Add ...rest to props to satisfy TypeScript's check for extra properties like 'key'.
const SaveSlotItem = ({ slot, isActive, onLoad, onRename, onDuplicate, onDelete, onExport, ...rest }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(slot.name);

    const handleRename = () => {
        if (name.trim() && name !== slot.name) {
            onRename(slot.id, name.trim());
        }
        setIsEditing(false);
    };

    return (
        <div className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isActive ? 'bg-amber-900/50' : 'bg-stone-700/50 hover:bg-stone-600/50'}`}>
            <div className="flex-grow">
                {isEditing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                        className="bg-stone-900 text-amber-50 border border-amber-600 rounded-md p-1 w-full"
                        autoFocus
                    />
                ) : (
                    <button onClick={() => onLoad(slot.id)} className="text-left w-full">
                        <p className={`font-bold text-lg ${isActive ? 'text-amber-200' : 'text-amber-300'}`}>{slot.name}</p>
                        <p className="text-sm text-stone-400">
                            Zuletzt geändert: {new Date(slot.lastModified).toLocaleString('de-DE')}
                        </p>
                    </button>
                )}
            </div>
            <div className="flex items-center gap-2 pl-4">
                <button onClick={() => setIsEditing(true)} title="Umbenennen" className="p-2 text-stone-400 hover:text-amber-300 transition-colors"><EditIcon className="w-5 h-5"/></button>
                <button onClick={() => onDuplicate(slot.id)} title="Duplizieren" className="p-2 text-stone-400 hover:text-amber-300 transition-colors"><CopyIcon className="w-5 h-5"/></button>
                <button onClick={() => onExport(slot.id)} title="Exportieren" className="p-2 text-stone-400 hover:text-amber-300 transition-colors"><ExportIcon className="w-5 h-5"/></button>
                <button onClick={() => onDelete(slot)} title="Löschen" className="p-2 text-stone-400 hover:text-red-500 transition-colors" disabled={isActive}><TrashIcon className="w-5 h-5"/></button>
            </div>
        </div>
    );
};

const SaveManagerModal = ({ isOpen, onClose, ...props }) => {
    const fileInputRef = useRef(null);

    if (!isOpen) {
        return null;
    }

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            props.onImport(file);
        }
    };
    
    const sortedSlots = [...props.saveSlots].sort((a, b) => b.lastModified - a.lastModified);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={onClose}
        >
            <div 
                className="bg-stone-800 rounded-lg shadow-xl p-6 border-2 border-amber-700 w-full max-w-2xl mx-4 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="font-medieval text-2xl text-amber-300 mb-4">Spielstände verwalten</h2>
                
                <div className="space-y-3 mb-4 flex-grow max-h-[60vh] overflow-y-auto pr-2">
                    {sortedSlots.map(slot => (
                        <SaveSlotItem
                            key={slot.id}
                            slot={slot}
                            isActive={slot.id === props.activeSaveId}
                            onLoad={props.onLoad}
                            onRename={props.onRename}
                            onDuplicate={props.onDuplicate}
                            onDelete={props.onDelete}
                            onExport={props.onExport}
                        />
                    ))}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-amber-900/50">
                    <div className="flex gap-2">
                        <button 
                            onClick={props.onNew}
                            className="bg-amber-600 text-stone-900 font-bold px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
                        >
                            Neuer Spielstand
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".json"
                        />
                        <button 
                            onClick={handleImportClick}
                            className="bg-stone-600 text-amber-200 font-bold px-4 py-2 rounded-md hover:bg-stone-500 transition-colors flex items-center gap-2"
                        >
                           <ImportIcon className="w-5 h-5" /> Importieren
                        </button>
                    </div>
                   
                    <button 
                        onClick={onClose} 
                        className="bg-stone-600 text-amber-200 font-bold px-4 py-2 rounded-md hover:bg-stone-500 transition-colors"
                    >
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- From components/SetDateModal.tsx ---

const SetDateModal = ({ isOpen, onClose, onConfirm, currentDate }) => {
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [day, setDay] = useState(currentDate.getDate());
  const [hour, setHour] = useState(currentDate.getHours());
  const [minute, setMinute] = useState(currentDate.getMinutes());

  useEffect(() => {
    if (isOpen) {
      setYear(currentDate.getFullYear());
      setMonth(currentDate.getMonth());
      setDay(currentDate.getDate());
      setHour(currentDate.getHours());
      setMinute(currentDate.getMinutes());
    }
  }, [isOpen, currentDate]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(year, month, day, hour, minute);
  };
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div 
        className="bg-stone-800 rounded-lg shadow-xl p-6 border-2 border-amber-700 w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-medieval text-2xl text-amber-300 mb-4">Datum und Uhrzeit festlegen</h2>
        <p className="text-amber-200 mb-6">
          Setze die Kampagnenzeit auf einen bestimmten Zeitpunkt. Die aktuelle Zeitleiste wird geleert.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="set-date-year" className="block text-amber-300 mb-1 text-sm">Jahr</label>
            <input
              id="set-date-year"
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value) || 0)}
              className="w-full bg-stone-700 text-amber-50 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="set-date-month" className="block text-amber-300 mb-1 text-sm">Monat</label>
            <select
              id="set-date-month"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="w-full bg-stone-700 text-amber-50 border border-stone-600 rounded-md p-2 focus:ring-2 focus:ring-amber-500"
            >
              {FANTASY_MONTHS.map((monthName, index) => (
                <option key={index} value={index}>{`${monthName} (${index + 1})`}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="set-date-day" className="block text-amber-300 mb-1 text-sm">Tag</label>
            <input
              id="set-date-day"
              type="number"
              value={day}
              onChange={(e) => setDay(Math.max(1, Math.min(daysInMonth, parseInt(e.target.value) || 1)))}
              min="1"
              max={daysInMonth}
              className="w-full bg-stone-700 text-amber-50 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label htmlFor="set-date-hour" className="block text-amber-300 mb-1 text-sm">Stunde</label>
            <input
              id="set-date-hour"
              type="number"
              value={hour}
              onChange={(e) => setHour(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
              min="0"
              max="23"
              className="w-full bg-stone-700 text-amber-50 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500"
            />
          </div>
           <div>
            <label htmlFor="set-date-minute" className="block text-amber-300 mb-1 text-sm">Minute</label>
            <input
              id="set-date-minute"
              type="number"
              value={minute}
              onChange={(e) => setMinute(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              min="0"
              max="59"
              className="w-full bg-stone-700 text-amber-50 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button 
            onClick={onClose} 
            className="bg-stone-600 text-amber-200 font-bold px-4 py-2 rounded-md hover:bg-stone-500 transition-colors"
          >
            Abbrechen
          </button>
          <button 
            onClick={handleConfirm}
            className="bg-amber-600 text-stone-900 font-bold px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
          >
            Datum festlegen
          </button>
        </div>
      </div>
    </div>
  );
};


// --- From components/StatusIndicator.tsx ---

const StatusIndicator = ({ label, isActive, color = 'amber' }) => {
  const colorClasses = {
    amber: 'bg-amber-400 shadow-[0_0_8px_theme(colors.amber.400)]',
    red: 'bg-red-500 shadow-[0_0_8px_theme(colors.red.500)]',
    blue: 'bg-blue-400 shadow-[0_0_8px_theme(colors.blue.400)]',
  };

  const activeLightClass = colorClasses[color];
  const inactiveLightClass = 'bg-stone-600';

  const activeTextClass = 'text-amber-200';
  const inactiveTextClass = 'text-stone-500';

  return (
    <div className="flex items-center gap-2" title={label}>
      <span className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? activeLightClass : inactiveLightClass}`}></span>
      <span className={`text-sm font-semibold transition-colors duration-300 truncate ${isActive ? activeTextClass : inactiveTextClass}`}>{label}</span>
    </div>
  );
};


// --- From components/TimeControls.tsx ---

const TimeControls = ({ onAddEvent, onOpenDowntimeModal }) => {
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const totalMinutes = (parseInt(hours || '0') * 60) + parseInt(minutes || '0');
    if (description && totalMinutes > 0) {
      onAddEvent(description, totalMinutes);
      setDescription('');
      setHours('');
      setMinutes('');
    }
  };
  
  const quickAdd = (desc, mins) => {
    onAddEvent(desc, mins);
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 z-10 bg-stone-900 bg-opacity-80 backdrop-blur-lg border-t-2 border-amber-800 p-4 shadow-[0_-4px_15px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto space-y-4">
        
        {/* Manual Add */}
        <form onSubmit={handleManualSubmit} className="space-y-2">
           <label htmlFor="description" className="font-bold text-amber-300">Manueller Eintrag</label>
           <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ereignisbeschreibung"
                className="flex-grow bg-stone-700 text-amber-50 placeholder-stone-400 border border-stone-600 rounded-md p-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="Std"
                  min="0"
                  className="w-16 bg-stone-700 text-amber-50 placeholder-stone-400 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  placeholder="Min"
                  min="0"
                  max="59"
                  className="w-16 bg-stone-700 text-amber-50 placeholder-stone-400 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
              <button type="submit" className="bg-stone-600 text-amber-200 font-bold px-4 py-2 rounded-md hover:bg-stone-500 transition-colors">
                Hinzufügen
              </button>
           </div>
        </form>
        
        {/* Quick Add Buttons */}
        <div className="flex flex-wrap gap-2 justify-center items-center pt-2">
            <button onClick={() => quickAdd('Kurze Rast', 60)} className="bg-stone-700 hover:bg-stone-600 text-amber-300 text-sm px-3 py-1 rounded-full transition-colors">Kurze Rast (1 Std)</button>
            <button onClick={() => quickAdd('Lange Rast', 480)} className="bg-stone-700 hover:bg-stone-600 text-amber-300 text-sm px-3 py-1 rounded-full transition-colors">Lange Rast (8 Std)</button>
            <button onClick={onOpenDowntimeModal} className="bg-amber-800 hover:bg-amber-700 text-amber-100 text-sm px-3 py-1 rounded-full transition-colors flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              Auszeit
            </button>
            <button onClick={() => quickAdd('Kurzes Gespräch', 5)} className="bg-stone-700 hover:bg-stone-600 text-amber-300 text-sm px-3 py-1 rounded-full transition-colors">Gespräch (5 Min)</button>
            <button onClick={() => quickAdd('Raum durchsuchen', 10)} className="bg-stone-700 hover:bg-stone-600 text-amber-300 text-sm px-3 py-1 rounded-full transition-colors">Suchen (10 Min)</button>
        </div>
      </div>
    </div>
  );
};


// --- From components/Timeline.tsx ---

// FIX: Add ...rest to props to satisfy TypeScript's check for extra properties like 'key'.
const TimelineItem = ({ event, isFirst = false, ...rest }) => {
    return (
      <div className="relative pl-8 sm:pl-12 py-4 group">
        <div className={`absolute left-0 h-full w-0.5 ${isFirst ? 'bg-amber-400' : 'bg-amber-700'} group-hover:bg-amber-300 transition-colors duration-300`}></div>
        <div className={`absolute left-[-9px] top-[22px] w-5 h-5 rounded-full ${isFirst ? 'bg-amber-300 ring-4 ring-amber-400' : 'bg-amber-600'} group-hover:bg-amber-300 transition-colors duration-300`}></div>
        <p className={`font-bold text-lg ${isFirst ? 'text-amber-200' : 'text-amber-400'}`}>
          {event.time} - {event.endTime} Uhr
          <span className="text-sm font-normal text-amber-500 ml-2">({event.duration} min)</span>
        </p>
        <p className="text-amber-100 whitespace-pre-wrap">{event.description}</p>
      </div>
    );
};

const Timeline = ({ events, archivedDays, currentDate, sunlightData }) => {
  if (events.length === 0 && archivedDays.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-stone-800 bg-opacity-70 rounded-lg p-8">
        <div className="text-center">
            <p className="font-medieval text-3xl text-amber-300">Die Geschichte beginnt...</p>
            <p className="text-amber-200 mt-2">Füge das erste Ereignis hinzu, um die Zeitleiste zu starten.</p>
        </div>
      </div>
    );
  }

  const groupArchivedDays = () => {
    const grouped = {};

    archivedDays.forEach(day => {
      const parts = day.dateString.split(', ');
      if (parts.length < 2) return;

      const year = parts[1]; // "1489 DR"
      const monthPart = parts[0].split(' ').slice(1).join(' '); // "Frostmond (1)"
      
      if (!grouped[year]) {
        grouped[year] = {};
      }
      if (!grouped[year][monthPart]) {
        grouped[year][monthPart] = [];
      }
      grouped[year][monthPart].push(day);
    });

    return grouped;
  };

  const groupedArchive = groupArchivedDays();

  return (
    <div className="bg-stone-800 bg-opacity-70 rounded-lg p-4 sm:p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
      <h2 className="font-medieval text-2xl text-amber-300 mb-2 sticky top-0 bg-stone-800/95 py-2 z-10 border-b border-amber-900">
        Aktueller Tag
      </h2>
      
      <DailyTimelineVisualizer events={events} currentTime={currentDate} sunlightData={sunlightData} />

      {events.length > 0 ? (
        events.map((event, index) => (
          <TimelineItem key={event.id} event={event} isFirst={index === 0} />
        ))
      ) : (
         <p className="text-amber-400 italic py-4 pl-8">Noch keine Ereignisse für heute. Die Zeit für neue Abenteuer!</p>
      )}

      {archivedDays.length > 0 && (
        <>
          <h2 className="font-medieval text-2xl text-amber-300 mt-8 mb-4 pt-4 border-t border-amber-900">Archiv</h2>
          {Object.entries(groupedArchive).map(([year, months]) => (
            <details key={year} className="mb-4 bg-stone-900/70 rounded-lg">
              <summary className="font-bold text-xl text-amber-200 cursor-pointer hover:text-amber-100 list-none flex items-center gap-2 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transition-transform details-open:rotate-90">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                {year}
              </summary>
              <div className="mt-2 px-3 pb-3">
                {Object.entries(months).map(([month, days]) => (
                  <details key={month} className="mb-2 bg-stone-900/50 rounded-lg">
                    <summary className="font-bold text-lg text-amber-300 cursor-pointer hover:text-amber-200 list-none flex items-center gap-2 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transition-transform details-open:rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                      {month}
                    </summary>
                    <div className="mt-2 p-2 border-t border-stone-700">
                      {days.sort((a,b) => parseInt(a.dateString) - parseInt(b.dateString)).map(day => (
                        <details key={day.dateString} className="mb-2 bg-stone-900/30 rounded-lg">
                            <summary className="font-semibold text-md text-amber-400 cursor-pointer hover:text-amber-300 list-none flex items-center gap-2 p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transition-transform details-open:rotate-90">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                                {day.dateString}
                            </summary>
                            <div className="border-l-2 border-stone-600 ml-3 pl-2 pt-2">
                                {day.events.length > 0 ? (
                                day.events.map(event => <TimelineItem key={event.id} event={event} />)
                                ) : (
                                <p className="text-amber-500 italic py-2 pl-8 sm:pl-12">Keine besonderen Ereignisse an diesem Tag.</p>
                                )}
                            </div>
                        </details>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </details>
          ))}
        </>
      )}
      <style>{`
        details > summary { list-style: none; }
        details[open] > summary svg { transform: rotate(90deg); }
      `}</style>
    </div>
  );
};


// --- From components/WeatherLegend.tsx ---

const WeatherLegend = ({ currentWeather }) => {
  const effects = Object.values(WEATHER_EFFECTS);
  
  const activeEffects = currentWeather.effects?.map(e => e.name) || [];

  const isHeavilyObscured = activeEffects.includes(WEATHER_EFFECTS.HEAVILY_OBSCURED.name);
  const isLightlyObscured = activeEffects.includes(WEATHER_EFFECTS.LIGHTLY_OBSCURED.name);
  const isStrongWind = activeEffects.includes(WEATHER_EFFECTS.STRONG_WIND.name);
  const isExtremeCold = currentWeather.temperature <= -18;
  const isExtremeHeat = currentWeather.temperature >= 38;

  return (
    <div className="bg-stone-800 bg-opacity-70 rounded-lg p-4 sm:p-6 max-h-[calc(100vh-250px)] overflow-y-auto hidden lg:block">
      <h2 className="font-medieval text-2xl text-amber-300 mb-4 sticky top-0 bg-stone-800/95 py-2 z-10 border-b border-amber-900">
        Wetter-Status
      </h2>
      
      <div className="mb-6">
        <h3 className="font-bold text-amber-200 mb-3">Aktive Konditionen</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          <StatusIndicator label="Leichte Sichtbeh." isActive={isLightlyObscured} />
          <StatusIndicator label="Starke Sichtbeh." isActive={isHeavilyObscured} />
          <StatusIndicator label="Starker Wind" isActive={isStrongWind} />
          <StatusIndicator label="Extreme Kälte" isActive={isExtremeCold} color="blue" />
          <StatusIndicator label="Extreme Hitze" isActive={isExtremeHeat} color="red" />
        </div>
      </div>
      
      <div className="pt-4 border-t border-amber-900">
        <h3 className="font-bold text-amber-200 mb-3">Regel-Referenz</h3>
        <div className="space-y-4">
          {effects.map(effect => (
            <div key={effect.name}>
              <h4 className="font-semibold text-amber-200">{effect.name}</h4>
              <p className="text-amber-300 text-sm leading-relaxed">{effect.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const calculateSunlight = (date, climateZoneId) => {
    const zone = CLIMATE_ZONES.find(z => z.id === climateZoneId) || CLIMATE_ZONES[0];
    const { short: shortDay, long: longDay } = zone.sunlight.solstice;

    const getDayOfYear = (d) => {
        const start = new Date(d.getFullYear(), 0, 0);
        const diff = d.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };

    const dayOfYear = getDayOfYear(date);
    const daylightRange = longDay - shortDay;
    const averageDaylight = (longDay + shortDay) / 2;
    
    // Corrected cosine wave for seasonal change, peaking at summer solstice (day 172)
    // and at a low at winter solstice (day 355)
    const daylightHours = averageDaylight + (daylightRange / 2) * Math.cos(((dayOfYear - 172) / 365.25) * 2 * Math.PI);

    const sunriseDecimal = 12 - (daylightHours / 2);
    const sunsetDecimal = 12 + (daylightHours / 2);

    const decimalToDate = (decimal) => {
        const d = new Date(date);
        const hours = Math.floor(decimal);
        const minutes = Math.round((decimal - hours) * 60);
        d.setHours(hours, minutes, 0, 0);
        return d;
    };

    const sunrise = decimalToDate(sunriseDecimal);
    const sunset = decimalToDate(sunsetDecimal);
    
    // Define dawn and dusk as 30 mins before/after sunrise/sunset
    const dawn = new Date(sunrise.getTime() - 30 * 60000);
    const dusk = new Date(sunset.getTime() + 30 * 60000);

    const now = date.getTime();
    let state = 'NIGHT_AM';
    if (now >= dawn.getTime() && now < sunrise.getTime()) state = 'DAWN';
    else if (now >= sunrise.getTime() && now < sunset.getTime()) state = 'DAYLIGHT';
    else if (now >= sunset.getTime() && now < dusk.getTime()) state = 'DUSK';
    else if (now >= dusk.getTime()) state = 'NIGHT_PM';
    
    return { dawn, sunrise, sunset, dusk, state };
};


// --- From App.tsx ---

const App = () => {
  const {
    currentDate,
    setCurrentDate,
    formatDateString,
    formatTimeString,
  } = useTime(new Date('1489-01-01T08:00:00'));

  const [isDowntimeModalOpen, setIsDowntimeModalOpen] = useState(false);
  const [isSetDateModalOpen, setIsSetDateModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSaveManagerOpen, setIsSaveManagerOpen] = useState(false);
  const [isDeleteSaveModalOpen, setIsDeleteSaveModalOpen] = useState(false);
  const [saveToDelete, setSaveToDelete] = useState(null);

  const [events, setEvents] = useState([]);
  const [archivedDays, setArchivedDays] = useState([]);
  const [climateZone, setClimateZone] = useState('temperate');
  const [currentWeather, setCurrentWeather] = useState(null);

  const [saveSlots, setSaveSlots] = useState([]);
  const [activeSaveId, setActiveSaveId] = useState(null);

  const isInitialLoad = useRef(true);
  
  const sunlightData = useMemo(() => calculateSunlight(currentDate, climateZone), [currentDate, climateZone]);

  // Helper function to calculate temperature based on a base temp and the hour.
  const updateTemperatureForHour = useCallback((weather, hour, zoneId, date) => {
    if (typeof weather.baseTemp === 'undefined') {
      return weather;
    }
    
    const zone = CLIMATE_ZONES.find(z => z.id === zoneId) || CLIMATE_ZONES[0];
    const monthIndex = date.getMonth();
    const monthlyData = zone.seasonalData[monthIndex];

    let tempModifier = 0;
    const foundType = monthlyData.weatherTypes.find(wt => wt.description === weather.description);
    if (foundType) {
      tempModifier = foundType.tempModifier;
    }
  
    const tempFluctuation = 5;
    const tempOffset = tempFluctuation * Math.sin((hour - 8) * (Math.PI / 12));
    
    const finalTemp = Math.round(weather.baseTemp + tempOffset + tempModifier);
  
    return { ...weather, temperature: finalTemp };
  }, []);

  // Helper function to generate a completely new weather state based on season.
  const generateNewWeather = useCallback((zoneId, date, previousDayFinalWeather) => {
    const zone = CLIMATE_ZONES.find(z => z.id === zoneId) || CLIMATE_ZONES[0];
    const monthIndex = date.getMonth();
    const monthlyData = zone.seasonalData[monthIndex];

    let baseTemp;
    const [minTempRange, maxTempRange] = monthlyData.tempRange;

    if (previousDayFinalWeather) {
        const endOfDayTemp = previousDayFinalWeather.temperature;
        const tempFluctuation = 5;
        
        const zone = CLIMATE_ZONES.find(z => z.id === zoneId) || CLIMATE_ZONES[0];
        const oldWeatherType = zone.seasonalData[previousDayFinalWeather.date.getMonth()]?.weatherTypes.find(wt => wt.description === previousDayFinalWeather.description);
        const oldTempModifier = oldWeatherType?.tempModifier || 0;
        
        const tempOffsetAtMidnight = tempFluctuation * Math.sin((0 - 8) * (Math.PI / 12));

        const calculatedBaseTemp = endOfDayTemp - tempOffsetAtMidnight - oldTempModifier;
        const drift = (Math.random() * 4) - 2;
        const driftedBaseTemp = calculatedBaseTemp + drift;
        baseTemp = Math.max(minTempRange, Math.min(maxTempRange, driftedBaseTemp));
    } else {
        baseTemp = Math.random() * (maxTempRange - minTempRange) + minTempRange;
    }

    const tempFluctuation = 5;
    const tempOffset = tempFluctuation * Math.sin((date.getHours() - 8) * (Math.PI / 12));
    
    const possibleWeatherTypes = monthlyData.weatherTypes.filter(type => {
        const potentialFinalTemp = Math.round(baseTemp + tempOffset + type.tempModifier);
        // Fix: Cast `type` to `any` to allow accessing optional properties `minTemp` and `maxTemp`.
        const { minTemp, maxTemp } = type as any;
        if (minTemp !== undefined && potentialFinalTemp < minTemp) return false;
        if (maxTemp !== undefined && potentialFinalTemp > maxTemp) return false;
        return true;
    });
    
    const listToUse = possibleWeatherTypes.length > 0 ? possibleWeatherTypes : monthlyData.weatherTypes;
    
    const totalWeight = listToUse.reduce((sum, type) => sum + type.weight, 0);
    let random = Math.random() * totalWeight;
    const selectedWeatherType = listToUse.find(type => {
      random -= type.weight;
      return random < 0;
    }) || listToUse[0];

    const initialWeather = {
        type: selectedWeatherType.type,
        description: selectedWeatherType.description,
        icon: selectedWeatherType.icon,
        baseTemp: baseTemp,
        date: date,
        // Fix: Cast `selectedWeatherType` to `any` to allow accessing optional property `effects`.
        effects: (selectedWeatherType as any).effects,
    };

    return updateTemperatureForHour(initialWeather, date.getHours(), zoneId, date);
  }, [updateTemperatureForHour]);

  const loadStateFromSave = (saveSlot) => {
    if (!saveSlot) return;
    const state = saveSlot.state;
    setCurrentDate(new Date(state.currentDate));
    setEvents(state.events);
    setArchivedDays(state.archivedDays);
    setClimateZone(state.climateZone);
    // Ensure weather.date is a Date object
    if (state.currentWeather) {
      const weatherWithDate = {
        ...state.currentWeather,
        date: new Date(state.currentWeather.date),
      };
      setCurrentWeather(weatherWithDate);
    } else {
       setCurrentWeather(generateNewWeather(state.climateZone, new Date(state.currentDate)));
    }
  };

  // Initial load from localStorage
  useEffect(() => {
    try {
      const savedSlotsRaw = localStorage.getItem('dnd_campaign_saves');
      const savedActiveId = localStorage.getItem('dnd_campaign_active_save_id');
      
      let allSlots = [];
      if (savedSlotsRaw) {
        allSlots = JSON.parse(savedSlotsRaw);
      }

      if (allSlots.length === 0) {
        // First time load: create a default save
        const initialDate = new Date('1489-01-01T08:00:00');
        const initialClimate = 'temperate';
        const initialWeather = generateNewWeather(initialClimate, initialDate);
        const newSave = {
          id: Date.now().toString(),
          name: "Meine erste Kampagne",
          lastModified: Date.now(),
          state: {
            currentDate: initialDate.toISOString(),
            events: [],
            archivedDays: [],
            climateZone: initialClimate,
            currentWeather: initialWeather
          }
        };
        allSlots = [newSave];
        setActiveSaveId(newSave.id);
        loadStateFromSave(newSave);
      } else {
        const activeId = savedActiveId ? JSON.parse(savedActiveId) : allSlots[0].id;
        setActiveSaveId(activeId);
        const activeSave = allSlots.find(s => s.id === activeId) || allSlots[0];
        loadStateFromSave(activeSave);
      }
      
      setSaveSlots(allSlots);
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, [generateNewWeather, setCurrentDate]);

  // Autosave to localStorage whenever state changes
  useEffect(() => {
    if (isInitialLoad.current) {
        isInitialLoad.current = false;
        return;
    }
      
    if (!activeSaveId || !currentWeather) {
        return;
    }

    const currentState = {
      currentDate: currentDate.toISOString(),
      events,
      archivedDays,
      climateZone,
      currentWeather
    };
    
    const updatedSlots = saveSlots.map(slot => 
      slot.id === activeSaveId 
        ? { ...slot, state: currentState, lastModified: Date.now() } 
        : slot
    );

    try {
      localStorage.setItem('dnd_campaign_saves', JSON.stringify(updatedSlots));
      localStorage.setItem('dnd_campaign_active_save_id', JSON.stringify(activeSaveId));
      // No need to setSaveSlots here, it would cause a loop. 
      // State is updated via handler functions.
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [currentDate, events, archivedDays, climateZone, currentWeather, activeSaveId]);


  const handleLoadSave = (saveId) => {
    const saveToLoad = saveSlots.find(s => s.id === saveId);
    if (saveToLoad) {
      setActiveSaveId(saveId);
      loadStateFromSave(saveToLoad);
      setIsSaveManagerOpen(false);
    }
  };
  
  const handleNewSave = () => {
    if (!currentWeather) return;
    const newSave = {
      id: Date.now().toString(),
      name: `Neuer Spielstand ${new Date().toLocaleDateString('de-DE')}`,
      lastModified: Date.now(),
      state: {
        currentDate: currentDate.toISOString(),
        events,
        archivedDays,
        climateZone,
        currentWeather,
      },
    };
    const newSlots = [...saveSlots, newSave];
    setSaveSlots(newSlots);
    setActiveSaveId(newSave.id); // Automatically load the new save
    localStorage.setItem('dnd_campaign_saves', JSON.stringify(newSlots));
  };
  
  const handleRenameSave = (saveId, newName) => {
    const newSlots = saveSlots.map(s => s.id === saveId ? { ...s, name: newName, lastModified: Date.now() } : s);
    setSaveSlots(newSlots);
    localStorage.setItem('dnd_campaign_saves', JSON.stringify(newSlots));
  };
  
  const handleDuplicateSave = (saveId) => {
    const saveToDuplicate = saveSlots.find(s => s.id === saveId);
    if (saveToDuplicate) {
      const newSave = {
        ...saveToDuplicate,
        id: Date.now().toString(),
        name: `${saveToDuplicate.name} (Kopie)`,
        lastModified: Date.now(),
      };
      const newSlots = [...saveSlots, newSave];
      setSaveSlots(newSlots);
      localStorage.setItem('dnd_campaign_saves', JSON.stringify(newSlots));
    }
  };
  
  const openDeleteModal = (saveSlot) => {
    setSaveToDelete(saveSlot);
    setIsDeleteSaveModalOpen(true);
  };
  
  const handleConfirmDeleteSave = () => {
    if (!saveToDelete) return;
    let newSlots = saveSlots.filter(s => s.id !== saveToDelete.id);
    
    if (newSlots.length === 0) {
      // If last save is deleted, create a new default one
      const initialDate = new Date('1489-01-01T08:00:00');
      const newDefaultSave = {
        id: Date.now().toString(),
        name: "Meine erste Kampagne",
        lastModified: Date.now(),
        state: {
          currentDate: initialDate.toISOString(),
          events: [],
          archivedDays: [],
          climateZone: 'temperate',
          currentWeather: generateNewWeather('temperate', initialDate)
        }
      };
      newSlots = [newDefaultSave];
      setActiveSaveId(newDefaultSave.id);
      loadStateFromSave(newDefaultSave);
    } else if (activeSaveId === saveToDelete.id) {
      // If active save is deleted, load the first one in the list
      const newActiveSave = newSlots[0];
      setActiveSaveId(newActiveSave.id);
      loadStateFromSave(newActiveSave);
    }
    
    setSaveSlots(newSlots);
    localStorage.setItem('dnd_campaign_saves', JSON.stringify(newSlots));
    setIsDeleteSaveModalOpen(false);
    setSaveToDelete(null);
  };

  const handleExportSave = (saveId) => {
    const saveToExport = saveSlots.find(s => s.id === saveId);
    if (saveToExport) {
        const dataStr = JSON.stringify(saveToExport, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `${saveToExport.name.replace(/ /g, '_')}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
  };

  const handleImportSave = (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
          try {
              // FIX: Add a type guard to ensure reader.result is a string before parsing.
              if (typeof event.target?.result === 'string') {
                  const importedSave = JSON.parse(event.target.result);
                  // Basic validation
                  if (importedSave.id && importedSave.name && importedSave.state) {
                      // Ensure imported save doesn't clash with existing ID
                      const idExists = saveSlots.some(s => s.id === importedSave.id);
                      if (idExists) {
                          importedSave.id = Date.now().toString();
                          importedSave.name = `${importedSave.name} (Importiert)`;
                      }
                      importedSave.lastModified = Date.now();

                      const newSlots = [...saveSlots, importedSave];
                      setSaveSlots(newSlots);
                      localStorage.setItem('dnd_campaign_saves', JSON.stringify(newSlots));
                  } else {
                      alert("Fehler: Die importierte Datei scheint kein gültiger Spielstand zu sein.");
                  }
              }
          } catch (e) {
              console.error("Error parsing imported file", e);
              alert("Fehler beim Lesen der Datei. Ist es eine gültige JSON-Datei?");
          }
      };
      reader.readAsText(file);
  };

  const handleClimateZoneChange = (zoneId) => {
    setClimateZone(zoneId);
    const newWeather = generateNewWeather(zoneId, currentDate);
    setCurrentWeather(newWeather);
  };

  const formatEffects = (effects) => {
    return '';
  };

  const handleAddEvent = useCallback((description, minutes) => {
    if (!currentWeather) return;

    const oldDate = new Date(currentDate.getTime());
    const newDate = new Date(oldDate.getTime() + minutes * 60 * 1000);

    let weatherStateForEvent = { ...currentWeather };
    const weatherDescriptions = [];
    let timeIterator = new Date(oldDate.getTime());
    let dayHasPassed = false;

    const activeTempEffects = new Set();
    const initialTemp = updateTemperatureForHour(weatherStateForEvent, oldDate.getHours(), climateZone, oldDate).temperature;
    if (initialTemp <= -18) activeTempEffects.add('cold');
    if (initialTemp >= 38) activeTempEffects.add('heat');

    while (timeIterator < newDate) {
      const endOfCurrentDay = new Date(timeIterator);
      endOfCurrentDay.setHours(23, 59, 59, 999);

      const endOfThisChunk = newDate < endOfCurrentDay ? newDate : endOfCurrentDay;

      let weatherTime = new Date(timeIterator.getTime());
      while (weatherTime < endOfThisChunk) {
        const weatherCheckThreshold = 4;
        const nextBoundary = new Date(weatherTime.getTime());
        const hoursUntilNextBoundary = weatherCheckThreshold - (nextBoundary.getHours() % weatherCheckThreshold);
        nextBoundary.setHours(nextBoundary.getHours() + hoursUntilNextBoundary, 0, 0, 0);

        const effectiveEndDate = nextBoundary > endOfThisChunk ? endOfThisChunk : nextBoundary;

        if (effectiveEndDate.getTime() === nextBoundary.getTime() && weatherTime.getHours() !== nextBoundary.getHours()) {
            const tempStateAtBoundaryOldWeather = updateTemperatureForHour(weatherStateForEvent, nextBoundary.getHours(), climateZone, nextBoundary);
            const tempAtBoundary = tempStateAtBoundaryOldWeather.temperature;

            const zone = CLIMATE_ZONES.find(z => z.id === climateZone) || CLIMATE_ZONES[0];
            const monthIndex = nextBoundary.getMonth();
            const monthlyData = zone.seasonalData[monthIndex];

            const possibleWeatherTypes = monthlyData.weatherTypes.filter(type => {
                if (type.description === weatherStateForEvent.description) return false;
                // Fix: Cast `type` to `any` to allow accessing optional properties `minTemp` and `maxTemp`.
                const { minTemp, maxTemp } = type as any;
                if (minTemp !== undefined && tempAtBoundary < minTemp) return false;
                if (maxTemp !== undefined && tempAtBoundary > maxTemp) return false;
                return true;
            });

            if (possibleWeatherTypes.length > 0) {
                const totalWeight = possibleWeatherTypes.reduce((sum, type) => sum + type.weight, 0);
                let random = Math.random() * totalWeight;
                const selectedWeatherType = possibleWeatherTypes.find(type => {
                    random -= type.weight;
                    return random < 0;
                }) || possibleWeatherTypes[0];

                if (selectedWeatherType) {
                    const tempFluctuation = 5;
                    const newTempModifier = selectedWeatherType.tempModifier;
                    const tempOffsetAtBoundary = tempFluctuation * Math.sin((nextBoundary.getHours() - 8) * (Math.PI / 12));
                    const newBaseTemp = tempAtBoundary - tempOffsetAtBoundary - newTempModifier;

                    const newWeatherState = {
                        type: selectedWeatherType.type,
                        description: selectedWeatherType.description,
                        icon: selectedWeatherType.icon,
                        baseTemp: newBaseTemp,
                        temperature: tempAtBoundary,
                        date: nextBoundary,
                        // Fix: Cast `selectedWeatherType` to `any` to allow accessing optional property `effects`.
                        effects: (selectedWeatherType as any).effects,
                    };
                    const effectText = formatEffects(newWeatherState.effects);
                    weatherDescriptions.push(`Das Wetter schlägt um: ${newWeatherState.description} bei ${newWeatherState.temperature}°C.${effectText}`);
                    weatherStateForEvent = newWeatherState;
                }
            }
        }

        const tempAtEndOfChunk = updateTemperatureForHour(weatherStateForEvent, effectiveEndDate.getHours(), climateZone, effectiveEndDate).temperature;
        
        if (tempAtEndOfChunk <= -18 && !activeTempEffects.has('cold')) {
            activeTempEffects.add('cold');
            const effectText = formatEffects([WEATHER_EFFECTS.EXTREME_COLD]);
            weatherDescriptions.push(`Die Temperatur fällt auf extreme Kälte (${tempAtEndOfChunk}°C).${effectText}`);
        } else if (tempAtEndOfChunk > -18 && activeTempEffects.has('cold')) {
            activeTempEffects.delete('cold');
            weatherDescriptions.push(`Die extreme Kälte lässt nach (${tempAtEndOfChunk}°C).`);
        }
        
        if (tempAtEndOfChunk >= 38 && !activeTempEffects.has('heat')) {
            activeTempEffects.add('heat');
            const effectText = formatEffects([WEATHER_EFFECTS.EXTREME_HEAT]);
            weatherDescriptions.push(`Die Temperatur steigt auf extreme Hitze (${tempAtEndOfChunk}°C).${effectText}`);
        } else if (tempAtEndOfChunk < 38 && activeTempEffects.has('heat')) {
            activeTempEffects.delete('heat');
            weatherDescriptions.push(`Die extreme Hitze lässt nach (${tempAtEndOfChunk}°C).`);
        }
        
        weatherTime = effectiveEndDate;
      }
      
      timeIterator = endOfThisChunk;

      if (timeIterator.getTime() === endOfCurrentDay.getTime() && timeIterator < newDate) {
        const dayToArchive = {
          dateString: formatDateString(endOfCurrentDay),
          // FIX: Explicitly cast event IDs to numbers before sorting to prevent type errors.
          events: !dayHasPassed ? [...events].sort((a, b) => Number(b.id) - Number(a.id)) : []
        };
        setArchivedDays(prev => [dayToArchive, ...prev]);
        
        if (!dayHasPassed) {
          setEvents([]);
        }

        const endOfDayWeather = updateTemperatureForHour(weatherStateForEvent, 23, climateZone, endOfCurrentDay);
        const midnight = new Date(timeIterator);
        midnight.setHours(24, 0, 0, 0);
        
        weatherStateForEvent = generateNewWeather(climateZone, midnight, endOfDayWeather);
        weatherDescriptions.push(`Ein neuer Tag bricht an. Das Wetter: ${weatherStateForEvent.description} bei ${weatherStateForEvent.temperature}°C.`);
        
        dayHasPassed = true;
        timeIterator = midnight;
      }
    }
    
    const finalWeatherState = updateTemperatureForHour(weatherStateForEvent, newDate.getHours(), climateZone, newDate);
    setCurrentWeather(finalWeatherState);
    
    const finalDescription = [description, ...weatherDescriptions].join('\n\n').trim();

    const newUserEvent = {
      id: oldDate.getTime(),
      time: formatTimeString(oldDate),
      endTime: formatTimeString(newDate),
      description: finalDescription,
      duration: minutes,
    };

    if (dayHasPassed) {
        setEvents([newUserEvent]);
    } else {
        setEvents(prevEvents => [newUserEvent, ...prevEvents]);
    }

    setCurrentDate(newDate);
  }, [currentDate, events, climateZone, currentWeather, formatTimeString, formatDateString, setCurrentDate, generateNewWeather, updateTemperatureForHour]);
  
  const handleConfirmReset = () => {
    localStorage.removeItem('dnd_campaign_saves');
    localStorage.removeItem('dnd_campaign_active_save_id');
    window.location.reload();
  }

  const handleDowntime = (days) => {
    if (days <= 0) return;

    const startDate = new Date(currentDate.getTime());
    const targetDate = new Date(startDate.getTime());

    targetDate.setDate(targetDate.getDate() + days);
    targetDate.setHours(8, 0, 0, 0);

    const diffMs = targetDate.getTime() - startDate.getTime();
    const diffMinutes = Math.round(diffMs / 60000);

    handleAddEvent(`${days} Tag(e) Auszeit`, diffMinutes);
    setIsDowntimeModalOpen(false);
  };

  const handleSetDate = (year, month, day, hour, minute) => {
    const newDate = new Date(year, month, day, hour, minute, 0, 0);
    
    if (isNaN(newDate.getTime())) {
        console.error("Invalid date created from inputs");
        return;
    }
    
    setCurrentDate(newDate);
    setEvents([]);
    
    const newWeather = generateNewWeather(climateZone, newDate);
    setCurrentWeather(newWeather);
    
    setIsSetDateModalOpen(false);
  };

  if (!currentWeather) {
    return <div className="bg-stone-900 min-h-screen flex items-center justify-center text-amber-200 font-medieval text-2xl">Lade Kampagne...</div>;
  }
  
  const activeSave = saveSlots.find(s => s.id === activeSaveId);

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed text-amber-50" style={{ backgroundImage: "url('https://picsum.photos/seed/dndbg/1920/1080')" }}>
      <div className="min-h-screen bg-black bg-opacity-60 backdrop-blur-sm flex flex-col">
        <Header 
          dateString={formatDateString(currentDate)} 
          timeString={formatTimeString(currentDate)}
          onReset={() => setIsResetModalOpen(true)}
          weather={currentWeather}
          climateZone={climateZone}
          onClimateZoneChange={handleClimateZoneChange}
          onOpenSetDateModal={() => setIsSetDateModalOpen(true)}
          activeSaveName={activeSave?.name || null}
          onOpenSaveManager={() => setIsSaveManagerOpen(true)}
          sunlightData={sunlightData}
          currentDate={currentDate}
          formatTimeString={formatTimeString}
        />
        <main className="flex-grow container mx-auto p-4 flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 xl:w-3/4">
            <Timeline events={events} archivedDays={archivedDays} currentDate={currentDate} sunlightData={sunlightData} />
          </div>
          <div className="lg:w-1/3 xl:w-1/4">
            <WeatherLegend currentWeather={currentWeather} />
          </div>
        </main>
        <TimeControls onAddEvent={handleAddEvent} onOpenDowntimeModal={() => setIsDowntimeModalOpen(true)} />
        <DowntimeModal 
          isOpen={isDowntimeModalOpen}
          onClose={() => setIsDowntimeModalOpen(false)}
          onConfirm={handleDowntime}
        />
        <SetDateModal
          isOpen={isSetDateModalOpen}
          onClose={() => setIsSetDateModalOpen(false)}
          onConfirm={handleSetDate}
          currentDate={currentDate}
        />
        <ResetModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          onConfirm={handleConfirmReset}
        />
        <SaveManagerModal
          isOpen={isSaveManagerOpen}
          onClose={() => setIsSaveManagerOpen(false)}
          saveSlots={saveSlots}
          activeSaveId={activeSaveId}
          onLoad={handleLoadSave}
          onNew={handleNewSave}
          onRename={handleRenameSave}
          onDuplicate={handleDuplicateSave}
          onDelete={openDeleteModal}
          onExport={handleExportSave}
          onImport={handleImportSave}
        />
        <DeleteSaveModal
            isOpen={isDeleteSaveModalOpen}
            onClose={() => setIsDeleteSaveModalOpen(false)}
            onConfirm={handleConfirmDeleteSave}
            saveName={saveToDelete?.name || ''}
        />
      </div>
    </div>
  );
};


// --- From index.tsx (original) ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
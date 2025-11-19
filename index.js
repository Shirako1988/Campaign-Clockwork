
import React, { useState, useEffect, useCallback, useRef, useMemo, useContext } from 'react';
import ReactDOM from 'react-dom/client';

/* --- ICONS --- */

const SunIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" })
);

const MoonIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" })
);

const ResetIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l3.181-3.183a8.25 8.25 0 00-11.664 0l3.181 3.183" })
);

const CloudIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.5 4.5 0 002.25 15z" })
);

const RainIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.5 6a7.5 7.5 0 100 15h5.25a3.75 3.75 0 003.52-4.01A4.5 4.5 0 0018 6.75a4.5 4.5 0 00-7.5 0zm0 0V6m0 6v3m0 3v3m3-9v3m-6 0v3" })
);

const SnowIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.5 21l-3-3m0 0l3-3m-3 3h12M5.25 3.75l3 3m0 0l3-3m-3 3v12" }),
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M18.75 21l-3-3m0 0l3-3m-3 3h-1.5m-1.5 0h-3m-1.5 0h-1.5m3 0V3.75M15 3.75l3 3m0 0l-3 3m3-3h1.5M15 3.75h-3m1.5 0h-1.5m-1.5 0h-3" })
);

const ThermometerIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6.375v11.25m-3.375-3.375h6.75" }),
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21a8.25 8.25 0 01-8.25-8.25c0-4.015 2.91-7.29 6.75-8.036A8.25 8.25 0 0112 3c4.556 0 8.25 3.694 8.25 8.25 0 4.556-3.694 8.25-8.25 8.25z" })
);

const CalendarIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" })
);

const WarningIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" })
);

const SaveIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" })
);

const EditIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" })
);

const CopyIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H9.375" })
);

const TrashIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.077-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" })
);

const ExportIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 13.5v2.25A2.25 2.25 0 005.25 18h13.5A2.25 2.25 0 0021 15.75V13.5" })
);

const ImportIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 13.5v2.25A2.25 2.25 0 005.25 18h13.5A2.25 2.25 0 0021 15.75V13.5m-3-9.375L15.75 3m0 0L13.5 5.25m2.25-2.25V12" })
);

const SunriseIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 12h16.5m-16.5 3.75h16.5M5.25 6.75h13.5m-13.5 9H12M5.25 6.75A2.25 2.25 0 017.5 4.5h9a2.25 2.25 0 012.25 2.25v.75" })
);

const SunsetIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 12h16.5m-16.5 3.75h16.5M5.25 6.75h13.5m-13.5 9H12m-6.75-9a2.25 2.25 0 002.25-2.25h9a2.25 2.25 0 002.25 2.25v.75" })
);

const CheckCircleIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })
);

const ExclamationCircleIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" })
);

const CheckIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 12.75l6 6 9-13.5" })
);

const XMarkIcon = (props) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
  React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
);

/* --- CONSTANTS --- */

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

// Tiers (Severity): 0=Clear, 1=Cloudy, 2=Precipitation, 3=Storm
const WT_SUNNY = { type: 'sunny', description: 'Sonnig und klar', icon: SunIcon, weight: 0, tempModifier: 3, severity: 0, isCloudy: false };
const WT_CLOUDY = { type: 'cloudy', description: 'Leicht bewölkt', icon: CloudIcon, weight: 0, tempModifier: 0, severity: 1, isCloudy: true };
const WT_HUMID = { type: 'humid', description: 'Schwül und drückend', icon: CloudIcon, weight: 0, tempModifier: 1, severity: 1, isCloudy: true };
const WT_FOG = { type: 'fog', description: 'Dichter Nebel', icon: CloudIcon, weight: 0, tempModifier: -1, severity: 1, isCloudy: true, effects: [WEATHER_EFFECTS.HEAVILY_OBSCURED] };
const WT_MIST = { type: 'mist', description: 'Leichter Nebel', icon: CloudIcon, weight: 0, tempModifier: -1, severity: 1, isCloudy: true, effects: [WEATHER_EFFECTS.LIGHTLY_OBSCURED] };

const WT_RAIN = { type: 'rain', description: 'Leichter Regen', icon: RainIcon, weight: 0, tempModifier: -2, minTemp: 1, severity: 2, isCloudy: true };
const WT_SNOW = { type: 'snow', description: 'Leichter Schneefall', icon: SnowIcon, weight: 0, tempModifier: -2, maxTemp: 2, severity: 2, isCloudy: true };
const WT_SLEET = { type: 'sleet', description: 'Eisregen', icon: RainIcon, weight: 0, tempModifier: -3, maxTemp: 1, severity: 2, isCloudy: true, effects: [WEATHER_EFFECTS.LIGHTLY_OBSCURED] };
const WT_WINDY = { type: 'windy', description: 'Starke Windböen', icon: CloudIcon, weight: 0, tempModifier: -3, severity: 2, isCloudy: false, effects: [WEATHER_EFFECTS.STRONG_WIND] };

const WT_STORM = { type: 'storm', description: 'Gewittrig', icon: RainIcon, weight: 0, tempModifier: -4, minTemp: 5, severity: 3, isCloudy: true, effects: [WEATHER_EFFECTS.HEAVY_PRECIPITATION, WEATHER_EFFECTS.LIGHTLY_OBSCURED] };
const WT_SCORCHING = { type: 'scorching', description: 'Sengende Hitze', icon: SunIcon, weight: 0, tempModifier: 5, minTemp: 35, severity: 0, isCloudy: false };
const WT_BLIZZARD = { type: 'blizzard', description: 'Schneesturm', icon: SnowIcon, weight: 0, tempModifier: -8, maxTemp: 0, severity: 3, isCloudy: true, effects: [WEATHER_EFFECTS.HEAVY_PRECIPITATION, WEATHER_EFFECTS.STRONG_WIND, WEATHER_EFFECTS.LIGHTLY_OBSCURED] };
const WT_DOWNPOUR = { type: 'downpour', description: 'Tropischer Regenguss', icon: RainIcon, weight: 0, tempModifier: -3, minTemp: 15, severity: 3, isCloudy: true, effects: [WEATHER_EFFECTS.HEAVY_PRECIPITATION, WEATHER_EFFECTS.LIGHTLY_OBSCURED] };
const WT_SANDSTORM = { type: 'sandstorm', description: 'Sandsturm', icon: CloudIcon, weight: 0, tempModifier: -2, severity: 3, isCloudy: true, effects: [WEATHER_EFFECTS.STRONG_WIND, WEATHER_EFFECTS.LIGHTLY_OBSCURED]};

// Volatility: 1.0 = Normal. >1.0 = More frequent changes. <1.0 = More stable/longer duration.
// DailyFluctuation: Amplitude of Day/Night cycle in degrees.
const CLIMATE_ZONES = [
  {
    id: 'temperate',
    name: 'Gemäßigt',
    volatility: 1.0,
    dailyFluctuation: 10,
    sunlight: { solstice: { short: 9.5, long: 14.5 } },
    seasonalData: [
      { tempRange: [-5, 5], weatherTypes: [{...WT_CLOUDY, weight: 45}, {...WT_SNOW, weight: 30}, {...WT_SUNNY, description: 'Klare, kalte Sonne', weight: 15}, {...WT_SLEET, weight: 10}] }, // Jan
      { tempRange: [-4, 6], weatherTypes: [{...WT_CLOUDY, weight: 40}, {...WT_SNOW, weight: 30}, {...WT_RAIN, weight: 15}, {...WT_SUNNY, description: 'Klare, kalte Sonne', weight: 15}] }, // Feb
      { tempRange: [-2, 10], weatherTypes: [{...WT_CLOUDY, weight: 40}, {...WT_RAIN, weight: 35}, {...WT_SUNNY, weight: 15}, {...WT_MIST, weight: 5}, {...WT_SNOW, weight: 5}] }, // Mar
      { tempRange: [2, 15], weatherTypes: [{...WT_RAIN, weight: 45}, {...WT_CLOUDY, weight: 35}, {...WT_SUNNY, weight: 20}] }, // Apr
      { tempRange: [6, 18], weatherTypes: [{...WT_SUNNY, weight: 40}, {...WT_RAIN, weight: 30}, {...WT_CLOUDY, weight: 20}, {...WT_STORM, weight: 10}] }, // May
      { tempRange: [12, 24], weatherTypes: [{...WT_SUNNY, weight: 50}, {...WT_CLOUDY, weight: 30}, {...WT_RAIN, weight: 15}, {...WT_STORM, weight: 5}] }, // Jun
      { tempRange: [15, 28], weatherTypes: [{...WT_SUNNY, weight: 60}, {...WT_CLOUDY, weight: 20}, {...WT_STORM, weight: 15}, {...WT_RAIN, weight: 5}] }, // Jul
      { tempRange: [14, 27], weatherTypes: [{...WT_SUNNY, weight: 65}, {...WT_STORM, weight: 20}, {...WT_CLOUDY, weight: 15}] }, // Aug
      { tempRange: [10, 21], weatherTypes: [{...WT_SUNNY, weight: 45}, {...WT_CLOUDY, weight: 30}, {...WT_RAIN, weight: 15}, {...WT_MIST, weight: 10}] }, // Sep
      { tempRange: [5, 16], weatherTypes: [{...WT_CLOUDY, weight: 35}, {...WT_RAIN, weight: 30}, {...WT_SUNNY, weight: 20}, {...WT_MIST, weight: 10}, {...WT_FOG, weight: 5}] }, // Oct
      { tempRange: [0, 10], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_CLOUDY, weight: 35}, {...WT_MIST, weight: 15}, {...WT_FOG, weight: 10}] }, // Nov
      { tempRange: [-3, 7], weatherTypes: [{...WT_CLOUDY, weight: 45}, {...WT_RAIN, weight: 25}, {...WT_SNOW, weight: 15}, {...WT_MIST, weight: 5}, {...WT_FOG, weight: 10}] }, // Dec
    ]
  },
  {
    id: 'arctic',
    name: 'Arktis',
    volatility: 0.8, // Weather stays for longer
    dailyFluctuation: 5, // Low energy
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
    volatility: 0.5, // Very stable weather (mostly sunny)
    dailyFluctuation: 20, // Huge temp swing between day and night
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
    volatility: 1.5, // Frequent quick rains
    dailyFluctuation: 8,
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
    volatility: 2.0, // Very chaotic
    dailyFluctuation: 12,
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
      { tempRange: [2, 14], weatherTypes: [{...WT_WINDY, weight: 35}, {...WT_RAIN, weight: 30}, {...WT_SUNNY, weight: 25}, {...WT_SNOW, weight: 10}, {...WT_MIST, weight: 5}] },
      { tempRange: [-2, 10], weatherTypes: [{...WT_WINDY, weight: 40}, {...WT_RAIN, weight: 30}, {...WT_CLOUDY, weight: 20}, {...WT_SNOW, weight: 5}, {...WT_MIST, weight: 5}] },
      { tempRange: [-8, 4], weatherTypes: [{...WT_SNOW, weight: 50}, {...WT_WINDY, weight: 30}, {...WT_CLOUDY, weight: 20}] },
      { tempRange: [-12, 0], weatherTypes: [{...WT_BLIZZARD, weight: 40}, {...WT_SNOW, weight: 40}, {...WT_WINDY, weight: 20}] },
    ]
  },
  {
    id: 'coastal',
    name: 'Küste',
    volatility: 1.0,
    dailyFluctuation: 5, // Water stabilizes temp
    sunlight: { solstice: { short: 9.5, long: 14.5 } },
    seasonalData: [
      { tempRange: [2, 10], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_STORM, weight: 30}, {...WT_FOG, weight: 15}, {...WT_MIST, weight: 10}, {...WT_CLOUDY, weight: 5}] },
      { tempRange: [3, 11], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_CLOUDY, weight: 30}, {...WT_FOG, weight: 15}, {...WT_MIST, weight: 10}, {...WT_STORM, weight: 5}] },
      { tempRange: [5, 14], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_SUNNY, weight: 30}, {...WT_FOG, weight: 10}, {...WT_MIST, weight: 10}, {...WT_CLOUDY, weight: 10}] },
      { tempRange: [8, 16], weatherTypes: [{...WT_SUNNY, weight: 40}, {...WT_RAIN, weight: 30}, {...WT_MIST, weight: 10}, {...WT_FOG, weight: 10}, {...WT_CLOUDY, weight: 10}] },
      { tempRange: [11, 19], weatherTypes: [{...WT_SUNNY, weight: 50}, {...WT_RAIN, weight: 20}, {...WT_CLOUDY, weight: 20}, {...WT_MIST, weight: 10}] },
      { tempRange: [15, 25], weatherTypes: [{...WT_SUNNY, weight: 60}, {...WT_CLOUDY, weight: 20}, {...WT_RAIN, weight: 15}, {...WT_MIST, weight: 5}] },
      { tempRange: [17, 27], weatherTypes: [{...WT_SUNNY, weight: 70}, {...WT_STORM, weight: 15}, {...WT_RAIN, weight: 10}, {...WT_MIST, weight: 5}] },
      { tempRange: [16, 26], weatherTypes: [{...WT_SUNNY, weight: 60}, {...WT_STORM, weight: 20}, {...WT_RAIN, weight: 15}, {...WT_MIST, weight: 5}] },
      { tempRange: [13, 22], weatherTypes: [{...WT_SUNNY, weight: 40}, {...WT_RAIN, weight: 30}, {...WT_CLOUDY, weight: 20}, {...WT_MIST, weight: 10}] },
      { tempRange: [10, 18], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_CLOUDY, weight: 30}, {...WT_STORM, weight: 20}, {...WT_MIST, weight: 10}] },
      { tempRange: [6, 14], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_STORM, weight: 25}, {...WT_FOG, weight: 20}, {...WT_MIST, weight: 15}] },
      { tempRange: [3, 11], weatherTypes: [{...WT_STORM, weight: 40}, {...WT_RAIN, weight: 30}, {...WT_FOG, weight: 20}, {...WT_MIST, weight: 10}] },
    ]
  },
    {
    id: 'swamp',
    name: 'Sumpfland',
    volatility: 0.8, // Stagnant air
    dailyFluctuation: 6,
    sunlight: { solstice: { short: 11, long: 13 } },
    seasonalData: [
      { tempRange: [2, 12], weatherTypes: [{...WT_FOG, weight: 30}, {...WT_MIST, weight: 20}, {...WT_RAIN, description: "Kalter Nieselregen", weight: 30}, {...WT_CLOUDY, weight: 20}] },
      { tempRange: [3, 13], weatherTypes: [{...WT_FOG, weight: 25}, {...WT_MIST, weight: 20}, {...WT_RAIN, weight: 35}, {...WT_CLOUDY, weight: 20}] },
      { tempRange: [8, 18], weatherTypes: [{...WT_RAIN, weight: 50}, {...WT_HUMID, weight: 25}, {...WT_MIST, weight: 15}, {...WT_CLOUDY, weight: 10}] },
      { tempRange: [12, 22], weatherTypes: [{...WT_RAIN, weight: 40}, {...WT_HUMID, weight: 40}, {...WT_MIST, weight: 10}, {...WT_STORM, weight: 10}] },
      { tempRange: [16, 26], weatherTypes: [{...WT_HUMID, weight: 50}, {...WT_STORM, weight: 30}, {...WT_RAIN, weight: 10}, {...WT_MIST, weight: 10}] },
      { tempRange: [22, 35], weatherTypes: [{...WT_HUMID, weight: 40}, {...WT_STORM, weight: 40}, {...WT_DOWNPOUR, weight: 20}] },
      { tempRange: [24, 36], weatherTypes: [{...WT_STORM, weight: 50}, {...WT_HUMID, weight: 30}, {...WT_DOWNPOUR, weight: 20}] },
      { tempRange: [23, 34], weatherTypes: [{...WT_HUMID, weight: 40}, {...WT_STORM, weight: 40}, {...WT_RAIN, weight: 20}] },
      { tempRange: [18, 28], weatherTypes: [{...WT_HUMID, weight: 40}, {...WT_RAIN, weight: 40}, {...WT_FOG, weight: 10}, {...WT_MIST, weight: 10}] },
      { tempRange: [12, 22], weatherTypes: [{...WT_RAIN, weight: 45}, {...WT_FOG, weight: 20}, {...WT_MIST, weight: 15}, {...WT_HUMID, weight: 20}] },
      { tempRange: [6, 16], weatherTypes: [{...WT_FOG, weight: 35}, {...WT_MIST, weight: 25}, {...WT_RAIN, weight: 30}, {...WT_CLOUDY, weight: 10}] },
      { tempRange: [3, 13], weatherTypes: [{...WT_FOG, weight: 35}, {...WT_MIST, weight: 25}, {...WT_RAIN, description: "Kalter Nieselregen", weight: 30}, {...WT_CLOUDY, weight: 10}] },
    ]
  },
  {
    id: 'scorching_wastes',
    name: 'Sengende Ödnis',
    volatility: 0.5,
    dailyFluctuation: 25,
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
    volatility: 0.8,
    dailyFluctuation: 15,
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

/* --- UTILS --- */

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

const updateTemperatureForHour = (weather, hour, zoneId, date) => {
  if (typeof weather.baseTemp === 'undefined') {
    return weather;
  }
  
  const zone = CLIMATE_ZONES.find(z => z.id === zoneId) || CLIMATE_ZONES[0];
  const baseFluctuation = zone.dailyFluctuation || 10;

  // --- CLOUD PHYSICS & INSULATION ---
  // Clouds dampen the temperature swing (cooler days, warmer nights).
  // Instead of adding a flat value, we scale the amplitude.
  const isCloudy = ['cloudy', 'rain', 'storm', 'snow', 'fog', 'mist', 'blizzard', 'downpour', 'sleet', 'sandstorm'].includes(weather.type);
  const isSevere = ['storm', 'blizzard', 'downpour', 'sandstorm'].includes(weather.type);
  
  let damping = 1.0;
  if (isSevere) damping = 0.25;      // Storms have very little diurnal variation
  else if (isCloudy) damping = 0.5;  // Clouds reduce variation by half
  
  const effectiveAmplitude = baseFluctuation * damping;

  // --- SMOOTH DIURNAL CURVE ---
  const sunlight = calculateSunlight(date, zoneId);
  const sunriseHour = sunlight.sunrise.getHours() + sunlight.sunrise.getMinutes()/60;
  const sunsetHour = sunlight.sunset.getHours() + sunlight.sunset.getMinutes()/60;
  const currentDecimalHour = hour + (date.getMinutes() / 60);
  
  let diurnalOffset = 0;
  
  // We define a continuous curve f(t) for the day:
  // t=Sunrise: -1.0 (Minimum)
  // t=Peak:    +1.0 (Maximum)
  // t=Sunset:   0.0 (Neutral)
  // t=Sunrise: -1.0 (Back to Minimum)
  
  if (currentDecimalHour >= sunriseHour && currentDecimalHour < sunsetHour) {
      // DAYTIME
      const dayLength = sunsetHour - sunriseHour;
      const timeSinceSunrise = currentDecimalHour - sunriseHour;
      const progress = timeSinceSunrise / dayLength; // 0.0 -> 1.0
      
      // Peak happens at 70% of the day (afternoon)
      const peakPoint = 0.7;
      
      if (progress < peakPoint) {
          // Phase 1: Rise from -1 to +1
          // Map progress (0..0.7) to angle (0..PI)
          // -cos(angle) goes -1 -> 1
          const segmentProgress = progress / peakPoint;
          diurnalOffset = -Math.cos(segmentProgress * Math.PI);
      } else {
          // Phase 2: Fall from +1 to 0
          // Map progress (0.7..1.0) to angle (0..PI/2)
          // cos(angle) goes 1 -> 0
          const segmentProgress = (progress - peakPoint) / (1 - peakPoint);
          diurnalOffset = Math.cos(segmentProgress * (Math.PI / 2));
      }
  } else {
      // NIGHTTIME
      // Decay from 0 to -1
      let timeSinceSunset;
      if (currentDecimalHour >= sunsetHour) {
          timeSinceSunset = currentDecimalHour - sunsetHour;
      } else {
          timeSinceSunset = (currentDecimalHour + 24) - sunsetHour;
      }
      
      const nightLength = 24 - (sunsetHour - sunriseHour);
      const progress = timeSinceSunset / nightLength; // 0.0 -> 1.0
      
      // Map progress (0..1) to angle (0..PI/2)
      // -sin(angle) goes 0 -> -1
      diurnalOffset = -Math.sin(progress * (Math.PI / 2));
  }
  
  // Apply amplitude
  const tempChange = effectiveAmplitude * diurnalOffset;

  // Fixed modifier from weather type (e.g. Rain is generally colder than Sun)
  const weatherTypeFixedMod = (() => {
      const m = zone.seasonalData[date.getMonth()].weatherTypes.find(t => t.description === weather.description);
      return m ? m.tempModifier : 0;
  })();

  const trendMod = weather.trendTemp || 0;

  // The 'baseTemp' represents the daily average (roughly at sunset).
  // The diurnal curve swings around this based on the amplitude.
  const finalTemp = Math.round(weather.baseTemp + tempChange + weatherTypeFixedMod + trendMod);

  return { ...weather, temperature: finalTemp };
};

const generateNewWeather = (zoneId, date, previousDayFinalWeather, startHour = 0) => {
  const zone = CLIMATE_ZONES.find(z => z.id === zoneId) || CLIMATE_ZONES[0];
  const monthIndex = date.getMonth();
  const monthlyData = zone.seasonalData[monthIndex];
  const [minTempRange, maxTempRange] = monthlyData.tempRange;
  
  // Volatility controls how long weather lasts
  const volatility = zone.volatility || 1.0;

  let selectedWeatherType;
  let baseTemp;
  let trendTemp = 0;
  let trendDuration = 0;

  if (previousDayFinalWeather) {
      // --- TREND SYSTEM (Weather Fronts) ---
      // Carry over existing trend
      if (previousDayFinalWeather.trendDuration > 0) {
          trendTemp = previousDayFinalWeather.trendTemp;
          trendDuration = previousDayFinalWeather.trendDuration;
      } else {
          // Chance to start a new front (Heatwave or Cold Snap)
          // 10% chance per generation cycle
          if (Math.random() < 0.10) {
              const isHeatwave = Math.random() > 0.5;
              const magnitude = Math.floor(Math.random() * 6) + 4; // 4 to 9 degrees
              trendTemp = isHeatwave ? magnitude : -magnitude;
              trendDuration = Math.floor(Math.random() * 72) + 24; // 1-3 days
          }
      }

      // --- CONTINUITY & TRANSITION SYSTEM (Markov Chain) ---
      const prevBase = previousDayFinalWeather.baseTemp;
      const prevSeverity = previousDayFinalWeather.severity ?? 0; // Default to 0 if not present

      // 1. Find logical neighbors based on Severity Tier
      // You can only move +/- 1 Tier, or stay same.
      // Tier 0: Clear, 1: Cloudy, 2: Rain/Wind, 3: Storm
      
      const validWeatherTypes = monthlyData.weatherTypes.filter(type => {
          const typeSeverity = type.severity ?? 0;
          
          // High volatility zones (mountains) can jump 2 tiers
          const maxJump = volatility > 1.5 ? 2 : 1;
          
          if (Math.abs(typeSeverity - prevSeverity) > maxJump) {
              return false; 
          }

          // Also ensure temp plausibility (prevent loops)
          const prevTypeMod = monthlyData.weatherTypes.find(t => t.description === previousDayFinalWeather.description)?.tempModifier || 0;
          const predictedBase = prevBase + prevTypeMod - type.tempModifier;
          return predictedBase >= (minTempRange - 10) && predictedBase <= (maxTempRange + 10);
      });

      const listToUse = validWeatherTypes.length > 0 ? validWeatherTypes : monthlyData.weatherTypes;
      
      // Weighted Selection
      const totalWeight = listToUse.reduce((sum, type) => sum + type.weight, 0);
      let random = Math.random() * totalWeight;
      selectedWeatherType = listToUse.find(type => {
        random -= type.weight;
        return random < 0;
      }) || listToUse[0];

      // 2. Calculate New Base Temp
      // Standard continuity equation
      let prevModifier = monthlyData.weatherTypes.find(t => t.description === previousDayFinalWeather.description)?.tempModifier || 0;
      let rawNewBase = prevBase + prevModifier - selectedWeatherType.tempModifier;
      
      // 3. Drift Correction
      const seasonalMean = (minTempRange + maxTempRange) / 2;
      const driftCorrection = (seasonalMean - rawNewBase) * 0.1; 
      
      baseTemp = rawNewBase + driftCorrection;

  } else {
      // INITIAL GENERATION
      baseTemp = Math.random() * (maxTempRange - minTempRange) + minTempRange;
      
      // Initial selection purely weighted
      const totalWeight = monthlyData.weatherTypes.reduce((sum, type) => sum + type.weight, 0);
      let random = Math.random() * totalWeight;
      selectedWeatherType = monthlyData.weatherTypes.find(type => {
        random -= type.weight;
        return random < 0;
      }) || monthlyData.weatherTypes[0];
  }

  // Duration modified by volatility
  // Base 2-6 hours. 
  // High volatility (2.0) -> 1-3 hours. 
  // Low volatility (0.5) -> 4-12 hours.
  const baseDuration = Math.floor(Math.random() * 5) + 2;
  const adjustedDuration = Math.max(1, Math.round(baseDuration / volatility));

  const initialWeather = {
      type: selectedWeatherType.type,
      description: selectedWeatherType.description,
      icon: selectedWeatherType.icon,
      baseTemp: baseTemp,
      date: date,
      effects: selectedWeatherType.effects,
      severity: selectedWeatherType.severity ?? 0, // Store severity for next cycle
      trendTemp: trendTemp, // Store trend
      trendDuration: trendDuration, // Store trend remaining time
      nextChangeHour: startHour + adjustedDuration 
  };

  return updateTemperatureForHour(initialWeather, date.getHours(), zoneId, date);
};

/* --- TOAST SYSTEM --- */

const ToastContext = React.createContext();

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
      setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return React.createElement(ToastContext.Provider, { value: { addToast } },
    children,
    React.createElement("div", { className: "fixed top-24 right-4 z-[100] flex flex-col gap-2 pointer-events-none" },
      toasts.map(toast => 
        React.createElement("div", { 
            key: toast.id, 
            className: `
                pointer-events-auto
                transform transition-all duration-500 ease-in-out 
                ${toast.type === 'error' ? 'bg-red-900/90 border-red-500' : 'bg-stone-800/90 border-amber-500'} 
                border text-amber-50 px-4 py-3 rounded shadow-lg flex items-center gap-3 min-w-[300px] animate-slideIn
            `,
            onClick: () => removeToast(toast.id)
        },
          toast.type === 'error' 
            ? React.createElement(ExclamationCircleIcon, { className: "w-6 h-6 text-red-400" })
            : React.createElement(CheckCircleIcon, { className: "w-6 h-6 text-green-400" }),
          React.createElement("div", null,
            React.createElement("p", { className: "font-bold text-sm" }, toast.type === 'error' ? 'Fehler' : 'Erfolg'),
            React.createElement("p", { className: "text-sm" }, toast.message)
          )
        )
      )
    )
  );
};

const useToast = () => useContext(ToastContext);

/* --- HOOKS --- */

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

const usePersistence = (currentDate, events, archivedDays, climateZone, currentWeather, loadStateFromSaveCallback) => {
    const [saveSlots, setSaveSlots] = useState([]);
    const [activeSaveId, setActiveSaveId] = useState(null);
    const isInitialLoad = useRef(true);
    const { addToast } = useToast();

    // Load initial data
    useEffect(() => {
        try {
          const savedSlotsRaw = localStorage.getItem('dnd_campaign_saves');
          const savedActiveId = localStorage.getItem('dnd_campaign_active_save_id');
          
          let allSlots = [];
          if (savedSlotsRaw) {
            allSlots = JSON.parse(savedSlotsRaw);
          }
    
          if (allSlots.length === 0) {
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
            loadStateFromSaveCallback(newSave);
          } else {
            const activeId = savedActiveId ? JSON.parse(savedActiveId) : allSlots[0].id;
            setActiveSaveId(activeId);
            const activeSave = allSlots.find(s => s.id === activeId) || allSlots[0];
            loadStateFromSaveCallback(activeSave);
          }
          
          setSaveSlots(allSlots);
        } catch (error) {
          console.error("Failed to load state from localStorage", error);
          addToast("Fehler beim Laden der Spielstände", "error");
        }
    }, []); // Empty dependency array to run only on mount

    // Auto-save effect
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
          setSaveSlots(updatedSlots); // Ensure state is in sync
        } catch (error) {
          console.error("Failed to save state to localStorage", error);
          addToast("Fehler beim automatischen Speichern", "error");
        }
    }, [currentDate, events, archivedDays, climateZone, currentWeather, activeSaveId]); // Ensure all dependencies are present

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
        setActiveSaveId(newSave.id);
        localStorage.setItem('dnd_campaign_saves', JSON.stringify(newSlots));
        addToast("Neuer Spielstand erstellt");
    };

    const handleRenameSave = (saveId, newName) => {
        const newSlots = saveSlots.map(s => s.id === saveId ? { ...s, name: newName, lastModified: Date.now() } : s);
        setSaveSlots(newSlots);
        localStorage.setItem('dnd_campaign_saves', JSON.stringify(newSlots));
        addToast("Spielstand umbenannt");
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
          addToast("Spielstand dupliziert");
        }
    };

    const handleDeleteSave = (saveId) => {
        let newSlots = saveSlots.filter(s => s.id !== saveId);
        
        if (newSlots.length === 0) {
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
          loadStateFromSaveCallback(newDefaultSave);
        } else if (activeSaveId === saveId) {
          const newActiveSave = newSlots[0];
          setActiveSaveId(newActiveSave.id);
          loadStateFromSaveCallback(newActiveSave);
        }
        
        setSaveSlots(newSlots);
        localStorage.setItem('dnd_campaign_saves', JSON.stringify(newSlots));
        addToast("Spielstand gelöscht");
    };

    return {
        saveSlots,
        activeSaveId,
        setActiveSaveId,
        handleNewSave,
        handleRenameSave,
        handleDuplicateSave,
        handleDeleteSave,
        setSaveSlots // Exposed for import functionality
    };
};

/* --- COMPONENTS --- */

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

    return React.createElement("div", { className: "my-6 p-4 bg-stone-900/50 rounded-lg" },
        React.createElement("div", { className: "relative h-8 bg-stone-700 rounded w-full overflow-hidden border border-stone-600" },
            React.createElement("div", { className: "absolute top-0 bottom-0 left-0 h-full bg-blue-900/40", style: { width: `${dawnStartPercent}%` }, title: "Nacht" }),
            React.createElement("div", { className: "absolute top-0 bottom-0 h-full bg-orange-400/30", style: { left: `${dawnStartPercent}%`, width: `${sunrisePercent - dawnStartPercent}%` }, title: "Morgendämmerung" }),
            React.createElement("div", { className: "absolute top-0 bottom-0 h-full bg-amber-200/20", style: { left: `${sunrisePercent}%`, width: `${sunsetPercent - sunrisePercent}%` }, title: "Tageslicht" }),
            React.createElement("div", { className: "absolute top-0 bottom-0 h-full bg-orange-400/30", style: { left: `${sunsetPercent}%`, width: `${duskEndPercent - sunsetPercent}%` }, title: "Abenddämmerung" }),
            React.createElement("div", { className: "absolute top-0 bottom-0 h-full bg-blue-900/40", style: { left: `${duskEndPercent}%`, right: '0' }, title: "Nacht" }),

            sortedEvents.map(event => {
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

                return React.createElement("div", {
                    key: event.id,
                    className: "absolute h-full bg-amber-500/60 rounded border border-amber-400/80 hover:bg-amber-400/80 transition-all duration-200 ease-in-out hover:scale-y-110 origin-bottom",
                    style: { left: `${leftPercent}%`, width: `${widthPercent}%` },
                    title: title
                });
            }),

            React.createElement("div", {
                className: "absolute top-[-4px] bottom-[-4px] w-0.5 bg-red-500 shadow-[0_0_8px_theme(colors.red.500)] z-10",
                style: { left: `${nowPositionPercent}%` },
                title: `Aktuelle Zeit: ${currentTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`
            },
              React.createElement("div", { className: "absolute -top-1.5 -ml-1.5 w-3 h-3 bg-red-500 rounded-full ring-2 ring-stone-800" })
            )
        ),
        
        React.createElement("div", { className: "relative h-4 mt-2 text-xs text-stone-400" },
            ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'].map((time, index) => {
                const hour = index * 3;
                const leftPercent = (hour / 24) * 100;
                const transform = hour === 0 ? 'none' : 'translateX(-50%)';
                return React.createElement("span", {
                    key: time,
                    className: "absolute",
                    style: { left: `${leftPercent}%`, transform }
                }, time);
            }),
            React.createElement("span", { className: "absolute right-0" }, "24:00")
        )
    );
};

const DeleteSaveModal = ({ isOpen, onClose, onConfirm, saveName }) => {
  if (!isOpen) {
    return null;
  }

  return React.createElement("div", {
      className: "fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-75",
      onClick: onClose
    },
    React.createElement("div", {
        className: "bg-stone-800 rounded-lg shadow-xl p-6 border-2 border-red-700 w-full max-w-md mx-4",
        onClick: (e) => e.stopPropagation()
      },
      React.createElement("div", { className: "flex flex-col items-center text-center" },
        React.createElement(WarningIcon, { className: "w-16 h-16 text-red-500 mb-4" }),
        React.createElement("h2", { className: "font-medieval text-2xl text-amber-300 mb-4" }, "Spielstand löschen?"),
        React.createElement("p", { className: "text-amber-200 mb-6" },
          "Möchten Sie den Spielstand ", React.createElement("strong", { className: "text-amber-100" }, saveName), " wirklich unwiderruflich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
        )
      ),
      React.createElement("div", { className: "flex justify-center gap-4" },
        React.createElement("button", {
            onClick: onClose,
            className: "bg-stone-600 text-amber-200 font-bold px-6 py-2 rounded-md hover:bg-stone-500 transition-colors"
          }, "Abbrechen"),
        React.createElement("button", {
            onClick: onConfirm,
            className: "bg-red-700 text-white font-bold px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
          }, "Ja, löschen")
      )
    )
  );
};

const DowntimeModal = ({ isOpen, onClose, onConfirm }) => {
  const [days, setDays] = useState(1);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(days);
  };

  return React.createElement("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75",
      onClick: onClose
    },
    React.createElement("div", {
        className: "bg-stone-800 rounded-lg shadow-xl p-6 border-2 border-amber-700 w-full max-w-md mx-4",
        onClick: (e) => e.stopPropagation()
      },
      React.createElement("h2", { className: "font-medieval text-2xl text-amber-300 mb-4" }, "Auszeit festlegen"),
      React.createElement("p", { className: "text-amber-200 mb-4" }, "Wie viele Tage sollen übersprungen werden? Die Zeit wird bis 08:00 Uhr morgens am Zieldatum vorgespult."),
      React.createElement("div", { className: "mb-6" },
        React.createElement("label", { htmlFor: "downtime-days", className: "block text-amber-300 mb-2" }, "Anzahl der Tage"),
        React.createElement("input", {
          id: "downtime-days",
          type: "number",
          value: days,
          onChange: (e) => setDays(Math.max(1, parseInt(e.target.value) || 1)),
          min: "1",
          className: "w-full bg-stone-700 text-amber-50 placeholder-stone-400 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
        })
      ),
      React.createElement("div", { className: "flex justify-end gap-4" },
        React.createElement("button", {
            onClick: onClose,
            className: "bg-stone-600 text-amber-200 font-bold px-4 py-2 rounded-md hover:bg-stone-500 transition-colors"
          }, "Abbrechen"),
        React.createElement("button", {
            onClick: handleConfirm,
            className: "bg-amber-600 text-stone-900 font-bold px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
          }, "Bestätigen")
      )
    )
  );
};

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

    const angleRad = (Math.PI * sunPositionPercent) / 100;
    const theta = Math.PI + angleRad;
    const svgCenterX = 50;
    const svgCenterY = 50;
    const svgRadius = 45;
    const svgX = svgCenterX + svgRadius * Math.cos(theta);
    const svgY = svgCenterY + svgRadius * Math.sin(theta);
    const leftPercent = (svgX / 100) * 100;
    const topPercent = (svgY / 50) * 100;

    return React.createElement("div", { className: "relative w-24 h-12", title: tooltipText },
        React.createElement("svg", { viewBox: "0 0 100 50", className: "w-full h-full absolute" },
            React.createElement("path", { d: "M 5 50 A 45 45 0 0 1 95 50", stroke: "rgba(252, 211, 77, 0.4)", strokeWidth: "2", fill: "none" })
        ),
        React.createElement("div", {
              className: "absolute w-6 h-6 text-amber-300 transition-all duration-500 ease-in-out",
              style: {
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: 'translate(-50%, -50%)'
              }
            },
            state.startsWith('NIGHT') ? React.createElement(MoonIcon, { className: "w-full h-full opacity-80" }) : React.createElement(SunIcon, { className: "w-full h-full" })
        ),
        React.createElement("div", { className: "absolute -bottom-1 left-0 text-stone-400", title: `Sonnenaufgang: ${formatTimeString(sunrise)}` }, React.createElement(SunriseIcon, { className: "w-4 h-4" })),
        React.createElement("div", { className: "absolute -bottom-1 right-0 text-stone-400", title: `Sonnenuntergang: ${formatTimeString(sunset)}` }, React.createElement(SunsetIcon, { className: "w-4 h-4" }))
    );
};

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

  return React.createElement("header", { className: "bg-stone-900 bg-opacity-50 border-b-2 border-amber-800 shadow-lg p-4 sticky top-0 z-20 backdrop-blur-md" },
    React.createElement("div", { className: "container mx-auto flex justify-between items-center gap-4 flex-wrap" },
      React.createElement("div", { className: "flex items-center gap-3" },
        React.createElement("h1", { className: "font-medieval text-2xl md:text-4xl text-amber-300 tracking-wider" }, "Kampagnen-Zeitmesser"),
        activeSaveName && React.createElement("span", { className: "hidden md:inline-block mt-2 text-amber-400 font-bold bg-stone-800/50 px-3 py-1 rounded-md text-sm" }, activeSaveName)
      ),
      React.createElement("div", { className: "flex items-center gap-4 md:gap-6" },
        React.createElement("div", { className: "flex items-center gap-3 text-amber-200", title: weather.description },
          React.createElement(WeatherIcon, { className: "w-8 h-8" }),
          React.createElement("div", { className: "flex items-center" },
            React.createElement(ThermometerIcon, { className: "w-6 h-6 mr-1" }),
            React.createElement("span", { className: "font-bold text-xl" }, `${weather.temperature}°C`)
          )
        ),
        React.createElement(SunlightTracker, { sunlightData: sunlightData, currentTime: currentDate, formatTimeString: formatTimeString }),
        React.createElement("div", { className: "text-right" },
          React.createElement("button", {
              onClick: onOpenSetDateModal,
              className: "block text-left w-full rounded-md transition-colors hover:bg-stone-700/40 p-2",
              title: "Datum und Uhrzeit festlegen"
            },
            React.createElement("p", { className: "font-bold text-base md:text-xl text-amber-100" }, dateString),
            React.createElement("p", { className: "text-sm md:text-lg text-amber-300" }, timeString, " Uhr")
          )
        )
      ),
      React.createElement("div", { className: "flex items-center gap-4" },
        React.createElement("div", { className: "relative" },
          React.createElement("select", {
              value: climateZone,
              onChange: (e) => onClimateZoneChange(e.target.value),
              className: "bg-stone-800 border border-amber-700 text-amber-200 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 appearance-none",
              title: "Klimazone auswählen"
            },
            CLIMATE_ZONES.map(zone => React.createElement("option", { key: zone.id, value: zone.id }, zone.name))
          )
        ),
        React.createElement("button", { onClick: onOpenSaveManager, title: "Spielstände verwalten", className: "p-2 text-amber-400 hover:text-amber-200 transition-colors duration-300" },
          React.createElement(SaveIcon, { className: "w-6 h-6" })
        ),
        React.createElement("button", { onClick: onReset, title: "Kampagne zurücksetzen", className: "p-2 text-amber-400 hover:text-red-500 transition-colors duration-300" },
          React.createElement(ResetIcon, { className: "w-6 h-6" })
        )
      )
    )
  );
};

const ResetModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return React.createElement("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75",
      onClick: onClose
    },
    React.createElement("div", {
        className: "bg-stone-800 rounded-lg shadow-xl p-6 border-2 border-red-700 w-full max-w-md mx-4",
        onClick: (e) => e.stopPropagation()
      },
      React.createElement("div", { className: "flex flex-col items-center text-center" },
        React.createElement(WarningIcon, { className: "w-16 h-16 text-red-500 mb-4" }),
        React.createElement("h2", { className: "font-medieval text-2xl text-amber-300 mb-4" }, "Kampagne zurücksetzen?"),
        React.createElement("p", { className: "text-amber-200 mb-6" }, "Sind Sie absolut sicher? Alle Ereignisse, archivierten Tage und der aktuelle Zeitstempel werden unwiderruflich gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.")
      ),
      React.createElement("div", { className: "flex justify-center gap-4" },
        React.createElement("button", {
            onClick: onClose,
            className: "bg-stone-600 text-amber-200 font-bold px-6 py-2 rounded-md hover:bg-stone-500 transition-colors"
          }, "Abbrechen"),
        React.createElement("button", {
            onClick: onConfirm,
            className: "bg-red-700 text-white font-bold px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
          }, "Ja, zurücksetzen")
      )
    )
  );
};

const SaveSlotItem = ({ slot, isActive, onLoad, onRename, onDuplicate, onDelete, onExport }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(slot.name);

    const handleRename = () => {
        if (name.trim() && name !== slot.name) {
            onRename(slot.id, name.trim());
        }
        setIsEditing(false);
    };

    return React.createElement("div", { className: `flex items-center justify-between p-3 rounded-lg transition-colors ${isActive ? 'bg-amber-900/50' : 'bg-stone-700/50 hover:bg-stone-600/50'}` },
        React.createElement("div", { className: "flex-grow" },
            isEditing ?
                React.createElement("input", {
                    type: "text",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    onBlur: handleRename,
                    onKeyDown: (e) => e.key === 'Enter' && handleRename(),
                    className: "bg-stone-900 text-amber-50 border border-amber-600 rounded-md p-1 w-full",
                    autoFocus: true
                }) :
                React.createElement("button", { onClick: () => onLoad(slot.id), className: "text-left w-full" },
                    React.createElement("p", { className: `font-bold text-lg ${isActive ? 'text-amber-200' : 'text-amber-300'}` }, slot.name),
                    React.createElement("p", { className: "text-sm text-stone-400" }, `Zuletzt geändert: ${new Date(slot.lastModified).toLocaleString('de-DE')}`)
                )
        ),
        React.createElement("div", { className: "flex items-center gap-2 pl-4" },
            React.createElement("button", { onClick: () => setIsEditing(true), title: "Umbenennen", className: "p-2 text-stone-400 hover:text-amber-300 transition-colors" }, React.createElement(EditIcon, { className: "w-5 h-5" })),
            React.createElement("button", { onClick: () => onDuplicate(slot.id), title: "Duplizieren", className: "p-2 text-stone-400 hover:text-amber-300 transition-colors" }, React.createElement(CopyIcon, { className: "w-5 h-5" })),
            React.createElement("button", { onClick: () => onExport(slot.id), title: "Exportieren", className: "p-2 text-stone-400 hover:text-amber-300 transition-colors" }, React.createElement(ExportIcon, { className: "w-5 h-5" })),
            React.createElement("button", { onClick: () => onDelete(slot.id), title: "Löschen", className: "p-2 text-stone-400 hover:text-red-500 transition-colors", disabled: isActive }, React.createElement(TrashIcon, { className: "w-5 h-5" }))
        )
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

    return React.createElement("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75",
            onClick: onClose
        },
        React.createElement("div", {
                className: "bg-stone-800 rounded-lg shadow-xl p-6 border-2 border-amber-700 w-full max-w-2xl mx-4 flex flex-col",
                onClick: (e) => e.stopPropagation()
            },
            React.createElement("h2", { className: "font-medieval text-2xl text-amber-300 mb-4" }, "Spielstände verwalten"),
            React.createElement("div", { className: "space-y-3 mb-4 flex-grow max-h-[60vh] overflow-y-auto pr-2" },
                sortedSlots.map(slot => React.createElement(SaveSlotItem, {
                    key: slot.id,
                    slot: slot,
                    isActive: slot.id === props.activeSaveId,
                    onLoad: props.onLoad,
                    onRename: props.onRename,
                    onDuplicate: props.onDuplicate,
                    onDelete: props.onDelete,
                    onExport: props.onExport
                }))
            ),
            React.createElement("div", { className: "flex justify-between items-center mt-4 pt-4 border-t border-amber-900/50" },
                React.createElement("div", { className: "flex gap-2" },
                    React.createElement("button", {
                        onClick: props.onNew,
                        className: "bg-amber-600 text-stone-900 font-bold px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
                    }, "Neuer Spielstand"),
                    React.createElement("input", {
                        type: "file",
                        ref: fileInputRef,
                        onChange: handleFileChange,
                        className: "hidden",
                        accept: ".json"
                    }),
                    React.createElement("button", {
                        onClick: handleImportClick,
                        className: "bg-stone-600 text-amber-200 font-bold px-4 py-2 rounded-md hover:bg-stone-500 transition-colors flex items-center gap-2"
                    },
                       React.createElement(ImportIcon, { className: "w-5 h-5" }), " Importieren"
                    )
                ),
                React.createElement("button", {
                    onClick: onClose,
                    className: "bg-stone-600 text-amber-200 font-bold px-4 py-2 rounded-md hover:bg-stone-500 transition-colors"
                }, "Schließen")
            )
        )
    );
};

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

  return React.createElement("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75",
      onClick: onClose
    },
    React.createElement("div", {
        className: "bg-stone-800 rounded-lg shadow-xl p-6 border-2 border-amber-700 w-full max-w-lg mx-4",
        onClick: (e) => e.stopPropagation()
      },
      React.createElement("h2", { className: "font-medieval text-2xl text-amber-300 mb-4" }, "Datum und Uhrzeit festlegen"),
      React.createElement("p", { className: "text-amber-200 mb-6" }, "Setze die Kampagnenzeit auf einen bestimmten Zeitpunkt. Die aktuelle Zeitleiste wird geleert."),
      React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6" },
        React.createElement("div", null,
          React.createElement("label", { htmlFor: "set-date-year", className: "block text-amber-300 mb-1 text-sm" }, "Jahr"),
          React.createElement("input", {
            id: "set-date-year",
            type: "number",
            value: year,
            onChange: (e) => setYear(parseInt(e.target.value) || 0),
            className: "w-full bg-stone-700 text-amber-50 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500"
          })
        ),
        React.createElement("div", { className: "sm:col-span-2" },
          React.createElement("label", { htmlFor: "set-date-month", className: "block text-amber-300 mb-1 text-sm" }, "Monat"),
          React.createElement("select", {
              id: "set-date-month",
              value: month,
              onChange: (e) => setMonth(parseInt(e.target.value)),
              className: "w-full bg-stone-700 text-amber-50 border border-stone-600 rounded-md p-2 focus:ring-2 focus:ring-amber-500"
            },
            FANTASY_MONTHS.map((monthName, index) => React.createElement("option", { key: index, value: index }, `${monthName} (${index + 1})`))
          )
        ),
        React.createElement("div", null,
          React.createElement("label", { htmlFor: "set-date-day", className: "block text-amber-300 mb-1 text-sm" }, "Tag"),
          React.createElement("input", {
            id: "set-date-day",
            type: "number",
            value: day,
            onChange: (e) => setDay(Math.max(1, Math.min(daysInMonth, parseInt(e.target.value) || 1))),
            min: "1",
            max: daysInMonth,
            className: "w-full bg-stone-700 text-amber-50 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500"
          })
        ),
        React.createElement("div", null,
          React.createElement("label", { htmlFor: "set-date-hour", className: "block text-amber-300 mb-1 text-sm" }, "Stunde"),
          React.createElement("input", {
            id: "set-date-hour",
            type: "number",
            value: hour,
            onChange: (e) => setHour(Math.max(0, Math.min(23, parseInt(e.target.value) || 0))),
            min: "0",
            max: "23",
            className: "w-full bg-stone-700 text-amber-50 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500"
          })
        ),
        React.createElement("div", null,
          React.createElement("label", { htmlFor: "set-date-minute", className: "block text-amber-300 mb-1 text-sm" }, "Minute"),
          React.createElement("input", {
            id: "set-date-minute",
            type: "number",
            value: minute,
            onChange: (e) => setMinute(Math.max(0, Math.min(59, parseInt(e.target.value) || 0))),
            min: "0",
            max: "59",
            className: "w-full bg-stone-700 text-amber-50 border border-stone-600 rounded-md p-2 text-center focus:ring-2 focus:ring-amber-500"
          })
        )
      ),
      React.createElement("div", { className: "flex justify-end gap-4" },
        React.createElement("button", {
            onClick: onClose,
            className: "bg-stone-600 text-amber-200 font-bold px-4 py-2 rounded-md hover:bg-stone-500 transition-colors"
          }, "Abbrechen"),
        React.createElement("button", {
            onClick: handleConfirm,
            className: "bg-amber-600 text-stone-900 font-bold px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
          }, "Datum festlegen")
      )
    )
  );
};

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

  return React.createElement("div", { className: "flex items-center gap-2", title: label },
      React.createElement("span", { className: `w-3 h-3 rounded-full transition-all duration-300 ${isActive ? activeLightClass : inactiveLightClass}` }),
      React.createElement("span", { className: `text-sm font-semibold transition-colors duration-300 truncate ${isActive ? activeTextClass : inactiveTextClass}` }, label)
  );
};

const TimeControls = ({ onAddEvent, onOpenDowntimeModal }) => {
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value);
    setSliderValue(val);
    setHours(Math.floor(val / 60).toString());
    setMinutes((val % 60).toString());
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const totalMinutes = (parseInt(hours || '0') * 60) + parseInt(minutes || '0');
    if (description && totalMinutes > 0) {
      onAddEvent(description, totalMinutes);
      setDescription('');
      setHours('0');
      setMinutes('0');
      setSliderValue(0);
    }
  };
  
  const quickAdd = (desc, mins) => {
    onAddEvent(desc, mins);
  }

  // Update slider when inputs change manually
  useEffect(() => {
    const total = (parseInt(hours || '0') * 60) + parseInt(minutes || '0');
    if (total <= 480) {
        setSliderValue(total);
    }
  }, [hours, minutes]);

  return React.createElement("div", { className: "sticky bottom-0 left-0 right-0 z-10 bg-stone-900 bg-opacity-80 backdrop-blur-lg border-t-2 border-amber-800 p-4 shadow-[0_-4px_15px_rgba(0,0,0,0.5)]" },
    React.createElement("div", { className: "container mx-auto space-y-4" },
      React.createElement("form", { onSubmit: handleManualSubmit, className: "space-y-3" },
        React.createElement("div", { className: "flex flex-col sm:flex-row gap-3 items-stretch sm:items-end" },
            React.createElement("input", {
                id: "description",
                type: "text",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                placeholder: "Ereignisbeschreibung",
                className: "flex-grow w-full bg-stone-700 text-amber-50 placeholder-stone-400 border border-stone-600 rounded-md p-2 h-10 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            }),
            React.createElement("div", { className: "flex gap-2 items-end" },
                React.createElement("div", { className: "flex flex-col items-center" },
                    React.createElement("label", { className: "text-[10px] text-stone-400 uppercase" }, "Std"),
                    React.createElement("input", {
                        type: "number",
                        value: hours,
                        onChange: (e) => setHours(e.target.value),
                        min: "0",
                        className: "w-14 bg-stone-700 text-amber-50 placeholder-stone-400 border border-stone-600 rounded-md p-2 h-10 text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    }),
                ),
                React.createElement("div", { className: "flex flex-col items-center" },
                    React.createElement("label", { className: "text-[10px] text-stone-400 uppercase" }, "Min"),
                    React.createElement("input", {
                        type: "number",
                        value: minutes,
                        onChange: (e) => setMinutes(e.target.value),
                        min: "0",
                        max: "59",
                        className: "w-14 bg-stone-700 text-amber-50 placeholder-stone-400 border border-stone-600 rounded-md p-2 h-10 text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    }),
                ),
                React.createElement("button", { type: "submit", className: "h-10 mt-auto bg-stone-600 text-amber-200 font-bold px-4 rounded-md hover:bg-stone-500 transition-colors" }, "Hinzufügen")
            )
        ),
        React.createElement("div", { className: "flex items-center gap-4 px-1" },
            React.createElement("span", { className: "text-xs text-stone-400 font-mono w-8" }, "5m"),
            React.createElement("input", { 
                type: "range", 
                min: "0", 
                max: "480", 
                step: "5", 
                value: sliderValue, 
                onChange: handleSliderChange,
                className: "w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            }),
            React.createElement("span", { className: "text-xs text-stone-400 font-mono w-8" }, "8h")
        )
      ),
      React.createElement("div", { className: "flex flex-wrap gap-2 justify-center items-center pt-2" },
        React.createElement("button", { onClick: () => quickAdd('Kurze Rast', 60), className: "bg-stone-700 hover:bg-stone-600 text-amber-300 text-sm px-3 py-1 rounded-full transition-colors" }, "Kurze Rast (1 Std)"),
        React.createElement("button", { onClick: () => quickAdd('Lange Rast', 480), className: "bg-stone-700 hover:bg-stone-600 text-amber-300 text-sm px-3 py-1 rounded-full transition-colors" }, "Lange Rast (8 Std)"),
        React.createElement("button", { onClick: onOpenDowntimeModal, className: "bg-amber-800 hover:bg-amber-700 text-amber-100 text-sm px-3 py-1 rounded-full transition-colors flex items-center gap-1" },
          React.createElement(CalendarIcon, { className: "w-4 h-4" }),
          "Auszeit"
        ),
        React.createElement("button", { onClick: () => quickAdd('Kurzes Gespräch', 5), className: "bg-stone-700 hover:bg-stone-600 text-amber-300 text-sm px-3 py-1 rounded-full transition-colors" }, "Gespräch (5 Min)"),
        React.createElement("button", { onClick: () => quickAdd('Raum durchsuchen', 10), className: "bg-stone-700 hover:bg-stone-600 text-amber-300 text-sm px-3 py-1 rounded-full transition-colors" }, "Suchen (10 Min)")
      )
    )
  );
};

const TimelineItem = ({ event, isFirst = false, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(event.description);

    const handleSave = () => {
        onEdit(event.id, editedText);
        setIsEditing(false);
    };

    return React.createElement("div", { className: "relative pl-8 sm:pl-12 py-4 group" },
        React.createElement("div", { className: `absolute left-0 h-full w-0.5 ${isFirst ? 'bg-amber-400' : 'bg-amber-700'} group-hover:bg-amber-300 transition-colors duration-300` }),
        React.createElement("div", { className: `absolute left-[-9px] top-[22px] w-5 h-5 rounded-full ${isFirst ? 'bg-amber-300 ring-4 ring-amber-400' : 'bg-amber-600'} group-hover:bg-amber-300 transition-colors duration-300` }),
        
        React.createElement("div", { className: "flex justify-between items-start group-hover:translate-x-1 transition-transform duration-200" },
             React.createElement("p", { className: `font-bold text-lg ${isFirst ? 'text-amber-200' : 'text-amber-400'}` },
                `${event.time} - ${event.endTime} Uhr`,
                React.createElement("span", { className: "text-sm font-normal text-amber-500 ml-2" }, `(${event.duration} min)`)
            ),
            React.createElement("div", { className: "flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" },
                !isEditing && React.createElement("button", { onClick: () => setIsEditing(true), className: "text-stone-400 hover:text-amber-300 p-1" }, React.createElement(EditIcon, { className: "w-4 h-4" })),
                React.createElement("button", { onClick: () => onDelete(event.id), className: "text-stone-400 hover:text-red-400 p-1" }, React.createElement(TrashIcon, { className: "w-4 h-4" }))
            )
        ),
        
        isEditing ? 
            React.createElement("div", { className: "mt-2" },
                React.createElement("textarea", {
                    value: editedText,
                    onChange: (e) => setEditedText(e.target.value),
                    className: "w-full bg-stone-900 text-amber-100 border border-amber-700 rounded p-2 min-h-[100px] focus:ring-2 focus:ring-amber-500 outline-none"
                }),
                React.createElement("div", { className: "flex gap-2 mt-2 justify-end" },
                     React.createElement("button", { onClick: () => setIsEditing(false), className: "text-sm text-stone-400 hover:text-amber-200" }, "Abbrechen"),
                     React.createElement("button", { onClick: handleSave, className: "text-sm bg-amber-700 hover:bg-amber-600 text-amber-100 px-3 py-1 rounded flex items-center gap-1" }, 
                        React.createElement(CheckIcon, { className: "w-3 h-3" }), "Speichern"
                     )
                )
            )
        :
            React.createElement("p", { className: "text-amber-100 whitespace-pre-wrap" }, event.description)
    );
};

const Timeline = ({ events, archivedDays, currentDate, sunlightData, onEditEvent, onDeleteEvent }) => {
  if (events.length === 0 && archivedDays.length === 0) {
    return React.createElement("div", { className: "h-full flex items-center justify-center bg-stone-800 bg-opacity-70 rounded-lg p-8" },
      React.createElement("div", { className: "text-center" },
        React.createElement("p", { className: "font-medieval text-3xl text-amber-300" }, "Die Geschichte beginnt..."),
        React.createElement("p", { className: "text-amber-200 mt-2" }, "Füge das erste Ereignis hinzu, um die Zeitleiste zu starten.")
      )
    );
  }

  const groupArchivedDays = () => {
    const grouped = {};
    archivedDays.forEach(day => {
      const parts = day.dateString.split(', ');
      if (parts.length < 2) return;
      const year = parts[1];
      const monthPart = parts[0].split(' ').slice(1).join(' ');
      if (!grouped[year]) grouped[year] = {};
      if (!grouped[year][monthPart]) grouped[year][monthPart] = [];
      grouped[year][monthPart].push(day);
    });
    return grouped;
  };

  const groupedArchive = groupArchivedDays();
  
  const icon = (className) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 4.5l7.5 7.5-7.5 7.5" })
  );

  return React.createElement("div", { className: "bg-stone-800 bg-opacity-70 rounded-lg p-4 sm:p-6 max-h-[calc(100vh-250px)] overflow-y-auto" },
    React.createElement("h2", { className: "font-medieval text-2xl text-amber-300 mb-2 sticky top-0 bg-stone-800/95 py-2 z-10 border-b border-amber-900" }, "Aktueller Tag"),
    React.createElement(DailyTimelineVisualizer, { events: events, currentTime: currentDate, sunlightData: sunlightData }),
    events.length > 0 ?
      events.map((event, index) => React.createElement(TimelineItem, { 
          key: event.id, 
          event: event, 
          isFirst: index === 0,
          onEdit: onEditEvent,
          onDelete: onDeleteEvent
      }))
      :
      React.createElement("p", { className: "text-amber-400 italic py-4 pl-8" }, "Noch keine Ereignisse für heute. Die Zeit für neue Abenteuer!"),
    archivedDays.length > 0 &&
      React.createElement(React.Fragment, null,
        React.createElement("h2", { className: "font-medieval text-2xl text-amber-300 mt-8 mb-4 pt-4 border-t border-amber-900" }, "Archiv"),
        Object.entries(groupedArchive).map(([year, months]) =>
          React.createElement("details", { key: year, className: "mb-4 bg-stone-900/70 rounded-lg" },
            React.createElement("summary", { className: "font-bold text-xl text-amber-200 cursor-pointer hover:text-amber-100 list-none flex items-center gap-2 p-3" },
                icon("w-5 h-5 transition-transform details-open:rotate-90"),
                year
            ),
            React.createElement("div", { className: "mt-2 px-3 pb-3" },
              Object.entries(months).map(([month, days]) =>
                React.createElement("details", { key: month, className: "mb-2 bg-stone-900/50 rounded-lg" },
                  React.createElement("summary", { className: "font-bold text-lg text-amber-300 cursor-pointer hover:text-amber-200 list-none flex items-center gap-2 p-2" },
                    icon("w-5 h-5 transition-transform details-open:rotate-90"),
                    month
                  ),
                  React.createElement("div", { className: "mt-2 p-2 border-t border-stone-700" },
                    days.sort((a,b) => parseInt(a.dateString) - parseInt(b.dateString)).map(day =>
                      React.createElement("details", { key: day.dateString, className: "mb-2 bg-stone-900/30 rounded-lg" },
                        React.createElement("summary", { className: "font-semibold text-md text-amber-400 cursor-pointer hover:text-amber-300 list-none flex items-center gap-2 p-2" },
                          icon("w-4 h-4 transition-transform details-open:rotate-90"),
                          day.dateString
                        ),
                        React.createElement("div", { className: "border-l-2 border-stone-600 ml-3 pl-2 pt-2" },
                          day.events.length > 0 ?
                            day.events.map(event => React.createElement(TimelineItem, { 
                                key: event.id, 
                                event: event,
                                // Archivierte Events sind momentan schreibgeschützt um Logik-Fehler zu vermeiden
                                onEdit: () => {}, 
                                onDelete: () => {}
                            }))
                            :
                            React.createElement("p", { className: "text-amber-500 italic py-2 pl-8 sm:pl-12" }, "Keine besonderen Ereignisse an diesem Tag.")
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      ),
      React.createElement("style", null, `details > summary { list-style: none; } details[open] > summary svg { transform: rotate(90deg); }`)
  );
};

const WeatherLegend = ({ currentWeather }) => {
  const effects = Object.values(WEATHER_EFFECTS);
  
  const activeEffects = currentWeather.effects?.map(e => e.name) || [];

  const isHeavilyObscured = activeEffects.includes(WEATHER_EFFECTS.HEAVILY_OBSCURED.name);
  const isLightlyObscured = activeEffects.includes(WEATHER_EFFECTS.LIGHTLY_OBSCURED.name);
  const isStrongWind = activeEffects.includes(WEATHER_EFFECTS.STRONG_WIND.name);
  const isExtremeCold = currentWeather.temperature <= -18;
  const isExtremeHeat = currentWeather.temperature >= 38;

  return React.createElement("div", { className: "bg-stone-800 bg-opacity-70 rounded-lg p-4 sm:p-6 max-h-[calc(100vh-250px)] overflow-y-auto hidden lg:block" },
    React.createElement("h2", { className: "font-medieval text-2xl text-amber-300 mb-4 sticky top-0 bg-stone-800/95 py-2 z-10 border-b border-amber-900" }, "Wetter-Status"),
    React.createElement("div", { className: "mb-6" },
      React.createElement("h3", { className: "font-bold text-amber-200 mb-3" }, "Aktive Konditionen"),
      React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2" },
        React.createElement(StatusIndicator, { label: "Leichte Sichtbeh.", isActive: isLightlyObscured }),
        React.createElement(StatusIndicator, { label: "Starke Sichtbeh.", isActive: isHeavilyObscured }),
        React.createElement(StatusIndicator, { label: "Starker Wind", isActive: isStrongWind }),
        React.createElement(StatusIndicator, { label: "Extreme Kälte", isActive: isExtremeCold, color: "blue" }),
        React.createElement(StatusIndicator, { label: "Extreme Hitze", isActive: isExtremeHeat, color: "red" })
      )
    ),
    React.createElement("div", { className: "pt-4 border-t border-amber-900" },
      React.createElement("h3", { className: "font-bold text-amber-200 mb-3" }, "Regel-Referenz"),
      React.createElement("div", { className: "space-y-4" },
        effects.map(effect =>
          React.createElement("div", { key: effect.name },
            React.createElement("h4", { className: "font-semibold text-amber-200" }, effect.name),
            React.createElement("p", { className: "text-amber-300 text-sm leading-relaxed" }, effect.description)
          )
        )
      )
    )
  );
};

const AppContent = () => {
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

  const { addToast } = useToast();

  // Callback for loading state, passed to usePersistence
  const loadStateFromSave = useCallback((saveSlot) => {
    if (!saveSlot) return;
    const state = saveSlot.state;
    setCurrentDate(new Date(state.currentDate));
    setEvents(state.events);
    setArchivedDays(state.archivedDays);
    setClimateZone(state.climateZone);
    if (state.currentWeather) {
      const weatherWithDate = {
        ...state.currentWeather,
        date: new Date(state.currentWeather.date),
      };
      setCurrentWeather(weatherWithDate);
    } else {
       setCurrentWeather(generateNewWeather(state.climateZone, new Date(state.currentDate)));
    }
    addToast("Spielstand geladen");
  }, [setCurrentDate, addToast]);

  const {
    saveSlots,
    activeSaveId,
    setActiveSaveId,
    handleNewSave,
    handleRenameSave,
    handleDuplicateSave,
    handleDeleteSave,
    setSaveSlots
  } = usePersistence(currentDate, events, archivedDays, climateZone, currentWeather, loadStateFromSave);
  
  const sunlightData = useMemo(() => calculateSunlight(currentDate, climateZone), [currentDate, climateZone]);

  const handleLoadSave = (saveId) => {
    const saveToLoad = saveSlots.find(s => s.id === saveId);
    if (saveToLoad) {
      setActiveSaveId(saveId);
      loadStateFromSave(saveToLoad);
      setIsSaveManagerOpen(false);
    }
  };
  
  const openDeleteModal = (saveSlot) => {
    setSaveToDelete(saveSlot);
    setIsDeleteSaveModalOpen(true);
  };
  
  const handleConfirmDeleteSave = () => {
    if (saveToDelete) {
        handleDeleteSave(saveToDelete.id);
    }
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
        addToast("Spielstand exportiert");
    }
  };

  const handleImportSave = (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
          try {
              if (typeof event.target?.result === 'string') {
                  const importedSave = JSON.parse(event.target.result);
                  if (importedSave.id && importedSave.name && importedSave.state) {
                      const idExists = saveSlots.some(s => s.id === importedSave.id);
                      if (idExists) {
                          importedSave.id = Date.now().toString();
                          importedSave.name = `${importedSave.name} (Importiert)`;
                      }
                      importedSave.lastModified = Date.now();
                      const newSlots = [...saveSlots, importedSave];
                      setSaveSlots(newSlots);
                      localStorage.setItem('dnd_campaign_saves', JSON.stringify(newSlots));
                      addToast("Spielstand erfolgreich importiert");
                  } else {
                      addToast("Fehler: Ungültiges Dateiformat", "error");
                  }
              }
          } catch (e) {
              console.error("Error parsing imported file", e);
              addToast("Fehler beim Lesen der Datei", "error");
          }
      };
      reader.readAsText(file);
  };

  const handleClimateZoneChange = (zoneId) => {
    setClimateZone(zoneId);
    const newWeather = generateNewWeather(zoneId, currentDate);
    setCurrentWeather(newWeather);
    addToast("Klimazone geändert");
  };

  const formatEffects = (effects) => {
    return '';
  };
  
  const handleUpdateEvent = (id, newDescription) => {
      setEvents(prev => prev.map(e => e.id === id ? { ...e, description: newDescription } : e));
      addToast("Ereignis aktualisiert");
  };

  const handleDeleteEvent = (id) => {
      setEvents(prev => prev.filter(e => e.id !== id));
      addToast("Ereignis gelöscht");
  };

  const handleAddEvent = useCallback((description, minutes) => {
    if (!currentWeather) return;

    const oldDate = new Date(currentDate.getTime());
    const newDate = new Date(oldDate.getTime() + minutes * 60 * 1000);

    let weatherStateForEvent = { ...currentWeather };
    // Initialize nextChangeHour if it doesn't exist (backward compatibility)
    if (typeof weatherStateForEvent.nextChangeHour === 'undefined') {
        weatherStateForEvent.nextChangeHour = weatherStateForEvent.date.getHours() + (Math.floor(Math.random() * 4) + 2);
    }
    
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
        // Determine the next time the weather logic needs to check for changes
        // We check at the top of every hour to update temperature, but only change TYPE at nextChangeHour
        const currentHour = weatherTime.getHours();
        
        // Handle Trend Expiration
        if (weatherStateForEvent.trendDuration > 0) {
             weatherStateForEvent.trendDuration -= 1;
             if (weatherStateForEvent.trendDuration <= 0) {
                 weatherStateForEvent.trendTemp = 0;
                 // We don't log "Trend expired" to reduce noise, but it will reflect in temp
             }
        }

        let nextBoundary = new Date(weatherTime.getTime());
        
        // Advance to next hour
        nextBoundary.setHours(currentHour + 1, 0, 0, 0);
        
        // Check if we hit the randomized weather change time
        const isWeatherChangeTime = nextBoundary.getHours() >= weatherStateForEvent.nextChangeHour;
        
        const effectiveEndDate = nextBoundary > endOfThisChunk ? endOfThisChunk : nextBoundary;

        if (effectiveEndDate.getTime() === nextBoundary.getTime() && isWeatherChangeTime) {
            const tempStateAtBoundaryOldWeather = updateTemperatureForHour(weatherStateForEvent, nextBoundary.getHours(), climateZone, nextBoundary);
            const tempAtBoundary = tempStateAtBoundaryOldWeather.temperature;
            
            // Use generation logic to find new weather type based on continuity
            const nextWeatherStateRaw = generateNewWeather(climateZone, nextBoundary, weatherStateForEvent, nextBoundary.getHours());
            
            if (nextWeatherStateRaw.description !== weatherStateForEvent.description) {
                 const effectText = formatEffects(nextWeatherStateRaw.effects);
                 weatherDescriptions.push(`Das Wetter schlägt um: ${nextWeatherStateRaw.description} bei ${nextWeatherStateRaw.temperature}°C.${effectText}`);
                 weatherStateForEvent = nextWeatherStateRaw;
            } else {
                 // Weather type stayed the same, but extend the duration
                 weatherStateForEvent = nextWeatherStateRaw;
                 // If temp changed significantly due to new random base, maybe log it? (Skipping for now to reduce noise)
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
          events: !dayHasPassed ? [...events].sort((a, b) => Number(b.id) - Number(a.id)) : []
        };
        setArchivedDays(prev => [dayToArchive, ...prev]);
        
        if (!dayHasPassed) {
          setEvents([]);
        }

        const endOfDayWeather = updateTemperatureForHour(weatherStateForEvent, 23, climateZone, endOfCurrentDay);
        const midnight = new Date(timeIterator);
        midnight.setHours(24, 0, 0, 0);
        
        // Generate new day's weather based on end of previous day
        weatherStateForEvent = generateNewWeather(climateZone, midnight, endOfDayWeather, 0);
        
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
    addToast("Zeit vorangeschritten");
  }, [currentDate, events, climateZone, currentWeather, formatTimeString, formatDateString, setCurrentDate, addToast]);
  
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
        addToast("Ungültiges Datum", "error");
        return;
    }
    setCurrentDate(newDate);
    setEvents([]);
    const newWeather = generateNewWeather(climateZone, newDate);
    setCurrentWeather(newWeather);
    setIsSetDateModalOpen(false);
    addToast("Datum manuell gesetzt");
  };

  if (!currentWeather) {
    return React.createElement("div", { className: "bg-stone-900 min-h-screen flex items-center justify-center text-amber-200 font-medieval text-2xl" }, "Lade Kampagne...");
  }
  
  const activeSave = saveSlots.find(s => s.id === activeSaveId);

  return React.createElement("div", { className: "min-h-screen bg-cover bg-center bg-fixed text-amber-50", style: { backgroundImage: "url('https://picsum.photos/seed/dndbg/1920/1080')" } },
    React.createElement("div", { className: "min-h-screen bg-black bg-opacity-60 backdrop-blur-sm flex flex-col" },
      React.createElement(Header, {
        dateString: formatDateString(currentDate),
        timeString: formatTimeString(currentDate),
        onReset: () => setIsResetModalOpen(true),
        weather: currentWeather,
        climateZone: climateZone,
        onClimateZoneChange: handleClimateZoneChange,
        onOpenSetDateModal: () => setIsSetDateModalOpen(true),
        activeSaveName: activeSave?.name || null,
        onOpenSaveManager: () => setIsSaveManagerOpen(true),
        sunlightData: sunlightData,
        currentDate: currentDate,
        formatTimeString: formatTimeString
      }),
      React.createElement("main", { className: "flex-grow container mx-auto p-4 flex flex-col lg:flex-row gap-8" },
        React.createElement("div", { className: "lg:w-2/3 xl:w-3/4" },
          React.createElement(Timeline, { 
              events: events, 
              archivedDays: archivedDays, 
              currentDate: currentDate, 
              sunlightData: sunlightData,
              onEditEvent: handleUpdateEvent,
              onDeleteEvent: handleDeleteEvent
          })
        ),
        React.createElement("div", { className: "lg:w-1/3 xl:w-1/4" },
          React.createElement(WeatherLegend, { currentWeather: currentWeather })
        )
      ),
      React.createElement(TimeControls, { onAddEvent: handleAddEvent, onOpenDowntimeModal: () => setIsDowntimeModalOpen(true) }),
      React.createElement(DowntimeModal, {
        isOpen: isDowntimeModalOpen,
        onClose: () => setIsDowntimeModalOpen(false),
        onConfirm: handleDowntime
      }),
      React.createElement(SetDateModal, {
        isOpen: isSetDateModalOpen,
        onClose: () => setIsSetDateModalOpen(false),
        onConfirm: handleSetDate,
        currentDate: currentDate
      }),
      React.createElement(ResetModal, {
        isOpen: isResetModalOpen,
        onClose: () => setIsResetModalOpen(false),
        onConfirm: handleConfirmReset
      }),
      React.createElement(SaveManagerModal, {
        isOpen: isSaveManagerOpen,
        onClose: () => setIsSaveManagerOpen(false),
        saveSlots: saveSlots,
        activeSaveId: activeSaveId,
        onLoad: handleLoadSave,
        onNew: handleNewSave,
        onRename: handleRenameSave,
        onDuplicate: handleDuplicateSave,
        onDelete: openDeleteModal,
        onExport: handleExportSave,
        onImport: handleImportSave
      }),
      React.createElement(DeleteSaveModal, {
        isOpen: isDeleteSaveModalOpen,
        onClose: () => setIsDeleteSaveModalOpen(false),
        onConfirm: handleConfirmDeleteSave,
        saveName: saveToDelete?.name || ''
      })
    )
  );
};

const App = () => {
    return React.createElement(ToastProvider, null,
        React.createElement(AppContent, null)
    );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(App, null)
  )
);

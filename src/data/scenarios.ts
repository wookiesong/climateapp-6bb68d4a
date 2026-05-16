export interface YearData {
  year: number;
  total_gross_kt: number;
  energy_kt: number;
  industry_kt: number;
  transport_kt: number;
  buildings_kt: number;
  agriculture_kt: number;
  waste_kt: number;
  coal_pct: number;
  nuclear_pct: number;
  renewables_pct: number;
  solar_pv_pct: number;
  wind_onshore_pct: number;
  grid_ci_gco2_kwh: number;
  generation_twh: number;
  bev_share_pct: number;
  steel_eaf_share: number;
}

export const BAU_DATA: YearData[] = [
  { year: 2023, total_gross_kt: 707200, energy_kt: 248155, industry_kt: 268743, transport_kt: 97826, buildings_kt: 45503, agriculture_kt: 22537, waste_kt: 18172, coal_pct: 31.08, nuclear_pct: 30.34, renewables_pct: 8.96, solar_pv_pct: 5.58, wind_onshore_pct: 0.5, grid_ci_gco2_kwh: 416.9, generation_twh: 595.0, bev_share_pct: 2.0, steel_eaf_share: 0.33 },
  { year: 2025, total_gross_kt: 716691, energy_kt: 258830, industry_kt: 269197, transport_kt: 97375, buildings_kt: 45002, agriculture_kt: 22423, waste_kt: 17524, coal_pct: 30.19, nuclear_pct: 29.38, renewables_pct: 9.68, solar_pv_pct: 5.7, wind_onshore_pct: 0.79, grid_ci_gco2_kwh: 415.4, generation_twh: 623.0, bev_share_pct: 4.29, steel_eaf_share: 0.34 },
  { year: 2030, total_gross_kt: 742639, energy_kt: 287292, industry_kt: 270650, transport_kt: 96268, buildings_kt: 43758, agriculture_kt: 22139, waste_kt: 15994, coal_pct: 27.97, nuclear_pct: 26.97, renewables_pct: 11.49, solar_pv_pct: 5.99, wind_onshore_pct: 1.5, grid_ci_gco2_kwh: 411.7, generation_twh: 697.9, bev_share_pct: 10.0, steel_eaf_share: 0.36 },
  { year: 2035, total_gross_kt: 772131, energy_kt: 316511, industry_kt: 273495, transport_kt: 95439, buildings_kt: 42472, agriculture_kt: 21918, waste_kt: 15552, coal_pct: 26.96, nuclear_pct: 25.96, renewables_pct: 12.98, solar_pv_pct: 6.74, wind_onshore_pct: 1.75, grid_ci_gco2_kwh: 406.0, generation_twh: 779.5, bev_share_pct: 16.0, steel_eaf_share: 0.37 },
  { year: 2040, total_gross_kt: 804273, energy_kt: 348359, industry_kt: 276821, transport_kt: 94104, buildings_kt: 41197, agriculture_kt: 21700, waste_kt: 15131, coal_pct: 25.95, nuclear_pct: 24.95, renewables_pct: 14.47, solar_pv_pct: 7.49, wind_onshore_pct: 2.0, grid_ci_gco2_kwh: 400.4, generation_twh: 870.0, bev_share_pct: 23.0, steel_eaf_share: 0.38 },
  { year: 2045, total_gross_kt: 842014, energy_kt: 384341, industry_kt: 279915, transport_kt: 93986, buildings_kt: 39934, agriculture_kt: 21518, waste_kt: 15133, coal_pct: 25.2, nuclear_pct: 24.22, renewables_pct: 15.8, solar_pv_pct: 8.15, wind_onshore_pct: 2.22, grid_ci_gco2_kwh: 394.8, generation_twh: 973.4, bev_share_pct: 27.5, steel_eaf_share: 0.39 },
  { year: 2050, total_gross_kt: 883544, energy_kt: 423893, industry_kt: 283408, transport_kt: 93661, buildings_kt: 38681, agriculture_kt: 21338, waste_kt: 15141, coal_pct: 24.46, nuclear_pct: 23.48, renewables_pct: 17.12, solar_pv_pct: 8.81, wind_onshore_pct: 2.45, grid_ci_gco2_kwh: 389.3, generation_twh: 1088.9, bev_share_pct: 32.0, steel_eaf_share: 0.40 },
];

export const NDC_DATA: YearData[] = [
  { year: 2023, total_gross_kt: 707200, energy_kt: 248155, industry_kt: 268743, transport_kt: 97826, buildings_kt: 45503, agriculture_kt: 22537, waste_kt: 18172, coal_pct: 31.08, nuclear_pct: 30.34, renewables_pct: 8.96, solar_pv_pct: 5.58, wind_onshore_pct: 0.5, grid_ci_gco2_kwh: 416.9, generation_twh: 595.0, bev_share_pct: 2.0, steel_eaf_share: 0.33 },
  { year: 2025, total_gross_kt: 680223, energy_kt: 241743, industry_kt: 257246, transport_kt: 93734, buildings_kt: 43214, agriculture_kt: 21966, waste_kt: 16184, coal_pct: 27.87, nuclear_pct: 31.77, renewables_pct: 12.0, solar_pv_pct: 6.71, wind_onshore_pct: 1.46, grid_ci_gco2_kwh: 385.7, generation_twh: 626.8, bev_share_pct: 5.63, steel_eaf_share: 0.36 },
  { year: 2030, total_gross_kt: 599559, energy_kt: 213968, industry_kt: 230841, transport_kt: 78532, buildings_kt: 37751, agriculture_kt: 20584, waste_kt: 12050, coal_pct: 19.61, nuclear_pct: 34.86, renewables_pct: 21.46, solar_pv_pct: 10.89, wind_onshore_pct: 3.81, grid_ci_gco2_kwh: 299.7, generation_twh: 713.9, bev_share_pct: 24.8, steel_eaf_share: 0.45 },
  { year: 2035, total_gross_kt: 480267, energy_kt: 156721, industry_kt: 201729, transport_kt: 55657, buildings_kt: 31171, agriculture_kt: 19421, waste_kt: 10021, coal_pct: 9.93, nuclear_pct: 37.24, renewables_pct: 35.77, solar_pv_pct: 17.61, wind_onshore_pct: 6.27, grid_ci_gco2_kwh: 188.7, generation_twh: 830.6, bev_share_pct: 56.06, steel_eaf_share: 0.55 },
  { year: 2040, total_gross_kt: 393098, energy_kt: 124849, industry_kt: 174976, transport_kt: 37819, buildings_kt: 23386, agriculture_kt: 18311, waste_kt: 8478, coal_pct: 5.69, nuclear_pct: 36.37, renewables_pct: 45.78, solar_pv_pct: 21.94, wind_onshore_pct: 7.51, grid_ci_gco2_kwh: 130.2, generation_twh: 958.9, bev_share_pct: 78.47, steel_eaf_share: 0.65 },
  { year: 2045, total_gross_kt: 319767, energy_kt: 99414, industry_kt: 145237, transport_kt: 26774, buildings_kt: 18210, agriculture_kt: 17253, waste_kt: 7853, coal_pct: 2.97, nuclear_pct: 33.56, renewables_pct: 54.99, solar_pv_pct: 25.4, wind_onshore_pct: 8.42, grid_ci_gco2_kwh: 89.4, generation_twh: 1112.4, bev_share_pct: 83.23, steel_eaf_share: 0.725 },
  { year: 2050, total_gross_kt: 270606, energy_kt: 89384, industry_kt: 122619, transport_kt: 16796, buildings_kt: 13391, agriculture_kt: 16244, waste_kt: 7384, coal_pct: 1.97, nuclear_pct: 28.63, renewables_pct: 62.88, solar_pv_pct: 27.64, wind_onshore_pct: 8.88, grid_ci_gco2_kwh: 69.9, generation_twh: 1278.3, bev_share_pct: 83.21, steel_eaf_share: 0.696 },
];

export const PCT50_DATA: YearData[] = [
  { year: 2024, total_gross_kt: 688662, energy_kt: 225286, industry_kt: 258681, transport_kt: 95033, buildings_kt: 43909, agriculture_kt: 22204, waste_kt: 16717, coal_pct: 29.95, nuclear_pct: 31.66, renewables_pct: 11.82, solar_pv_pct: 7.04, wind_onshore_pct: 1.22, grid_ci_gco2_kwh: 365.6, generation_twh: 616.2, bev_share_pct: 4.94, steel_eaf_share: 0.335 },
  { year: 2025, total_gross_kt: 664357, energy_kt: 217236, industry_kt: 249236, transport_kt: 92167, buildings_kt: 42303, agriculture_kt: 21858, waste_kt: 15379, coal_pct: 28.45, nuclear_pct: 32.88, renewables_pct: 14.73, solar_pv_pct: 8.47, wind_onshore_pct: 1.91, grid_ci_gco2_kwh: 341.3, generation_twh: 636.4, bev_share_pct: 8.0, steel_eaf_share: 0.343 },
  { year: 2030, total_gross_kt: 519085, energy_kt: 152751, industry_kt: 210541, transport_kt: 71331, buildings_kt: 32741, agriculture_kt: 20010, waste_kt: 10419, coal_pct: 15.64, nuclear_pct: 36.69, renewables_pct: 29.64, solar_pv_pct: 15.0, wind_onshore_pct: 5.07, grid_ci_gco2_kwh: 208.3, generation_twh: 733.3, bev_share_pct: 36.0, steel_eaf_share: 0.42 },
  { year: 2035, total_gross_kt: 392175, energy_kt: 104756, industry_kt: 170610, transport_kt: 49726, buildings_kt: 26079, agriculture_kt: 17953, waste_kt: 7744, coal_pct: 10.85, nuclear_pct: 38.58, renewables_pct: 42.46, solar_pv_pct: 21.35, wind_onshore_pct: 7.31, grid_ci_gco2_kwh: 123.0, generation_twh: 851.7, bev_share_pct: 58.0, steel_eaf_share: 0.57 },
  { year: 2040, total_gross_kt: 304333, energy_kt: 71074, industry_kt: 140467, transport_kt: 36932, buildings_kt: 19427, agriculture_kt: 16797, waste_kt: 7399, coal_pct: 6.69, nuclear_pct: 36.7, renewables_pct: 51.19, solar_pv_pct: 24.87, wind_onshore_pct: 8.71, grid_ci_gco2_kwh: 75.0, generation_twh: 947.1, bev_share_pct: 76.0, steel_eaf_share: 0.68 },
  { year: 2045, total_gross_kt: 232028, energy_kt: 40130, industry_kt: 117611, transport_kt: 26295, buildings_kt: 15041, agriculture_kt: 15863, waste_kt: 7222, coal_pct: 3.17, nuclear_pct: 33.18, renewables_pct: 59.5, solar_pv_pct: 27.87, wind_onshore_pct: 9.95, grid_ci_gco2_kwh: 38.6, generation_twh: 1038.4, bev_share_pct: 79.75, steel_eaf_share: 0.757 },
  { year: 2050, total_gross_kt: 172031, energy_kt: 15801, industry_kt: 100197, transport_kt: 14962, buildings_kt: 11075, agriculture_kt: 15175, waste_kt: 7167, coal_pct: 0.3, nuclear_pct: 27.8, renewables_pct: 67.5, solar_pv_pct: 30.0, wind_onshore_pct: 11.0, grid_ci_gco2_kwh: 14.1, generation_twh: 1123.8, bev_share_pct: 83.5, steel_eaf_share: 0.81 },
];

export const CARBON_BUDGETS = {
  budget_1_5c_kt: 6800000,
  budget_2_0c_kt: 18500000,
  baseline_2018_kt: 780140,
  baseline_2023_kt: 707200,
};

export type ScenarioKey = 'bau' | 'ndc' | '50pct';

export const SCENARIOS: Record<ScenarioKey, { label: string; data: YearData[]; color: string }> = {
  bau: { label: 'BAU (Business As Usual)', data: BAU_DATA, color: '#ef4444' },
  ndc: { label: 'NDC 2050 Carbon Neutrality', data: NDC_DATA, color: '#f59e0b' },
  '50pct': { label: '50% Reduction by 2035', data: PCT50_DATA, color: '#10b981' },
};

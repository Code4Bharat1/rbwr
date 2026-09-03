/**
 * Validated chart palette (see dataviz skill / references/palette.md).
 * Chart marks intentionally use brighter, more-saturated steps than the
 * brand's text/background navy — the brand hex fails the categorical
 * lightness/chroma floor when used as a fill. Sequential blue step 450 is
 * the standard single-series magnitude color across all charts here.
 */
export const CHART = {
  seriesBlue: "#2a78d6",
  seriesOrange: "#eb6834",
  statusGood: "#0ca30c",
  statusWarning: "#fab219",
  statusCritical: "#d03b3b",
  surface: "#fcfcfb",
  gridline: "#e1e0d9",
  axis: "#c3c2b7",
  mutedInk: "#898781",
  secondaryInk: "#52514e",
  primaryInk: "#0b0b0b",
};

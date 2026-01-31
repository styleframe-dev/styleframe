import type { Styleframe, Variable } from "@styleframe/core";

// =============================================================================
// Color Palette Data
// =============================================================================

/**
 * All available color scale names.
 * Organized by category for clarity.
 */
export const colorScales = [
	// Neutral grays
	"gray",
	"mauve",
	"slate",
	"sage",
	"olive",
	"sand",
	// Reds
	"tomato",
	"red",
	"ruby",
	"crimson",
	"pink",
	"plum",
	// Purples
	"purple",
	"violet",
	"iris",
	"indigo",
	// Blues
	"blue",
	"cyan",
	"teal",
	"jade",
	// Greens
	"green",
	"grass",
	// Warm colors
	"bronze",
	"gold",
	"brown",
	"orange",
	"amber",
	"yellow",
	// Bright colors
	"lime",
	"mint",
	"sky",
] as const;

export type ColorScale = (typeof colorScales)[number];

/**
 * Step numbers in each color scale (1-12)
 */
export const colorSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type ColorStep = (typeof colorSteps)[number];

/**
 * Light mode color values for all color scales.
 */
export const lightColors: Record<ColorScale, Record<ColorStep, string>> = {
	// Neutral grays
	gray: {
		1: "#fcfcfc",
		2: "#f9f9f9",
		3: "#f0f0f0",
		4: "#e8e8e8",
		5: "#e0e0e0",
		6: "#d9d9d9",
		7: "#cecece",
		8: "#bbbbbb",
		9: "#8d8d8d",
		10: "#838383",
		11: "#646464",
		12: "#202020",
	},
	mauve: {
		1: "#fdfcfd",
		2: "#faf9fb",
		3: "#f2eff3",
		4: "#eae7ec",
		5: "#e3dfe6",
		6: "#dbd8e0",
		7: "#d0cdd7",
		8: "#bcbac7",
		9: "#8e8c99",
		10: "#84828e",
		11: "#65636d",
		12: "#211f26",
	},
	slate: {
		1: "#fcfcfd",
		2: "#f9f9fb",
		3: "#f0f0f3",
		4: "#e8e8ec",
		5: "#e0e1e6",
		6: "#d9d9e0",
		7: "#cdced6",
		8: "#b9bbc6",
		9: "#8b8d98",
		10: "#80838d",
		11: "#60646c",
		12: "#1c2024",
	},
	sage: {
		1: "#fbfdfc",
		2: "#f7f9f8",
		3: "#eef1f0",
		4: "#e6e9e8",
		5: "#dfe2e0",
		6: "#d7dad9",
		7: "#cbcfcd",
		8: "#b8bcba",
		9: "#868e8b",
		10: "#7c8481",
		11: "#5f6563",
		12: "#1a211e",
	},
	olive: {
		1: "#fcfdfc",
		2: "#f8faf8",
		3: "#eff1ef",
		4: "#e7e9e7",
		5: "#dfe2df",
		6: "#d7dad7",
		7: "#cccfcc",
		8: "#b9bcb8",
		9: "#898e87",
		10: "#7f847d",
		11: "#60655f",
		12: "#1d211c",
	},
	sand: {
		1: "#fdfdfc",
		2: "#f9f9f8",
		3: "#f1f0ef",
		4: "#e9e8e6",
		5: "#e2e1de",
		6: "#dad9d6",
		7: "#cfceca",
		8: "#bcbbb5",
		9: "#8d8d86",
		10: "#82827c",
		11: "#63635e",
		12: "#21201c",
	},
	// Reds
	tomato: {
		1: "#fffcfc",
		2: "#fff8f7",
		3: "#feebe7",
		4: "#ffdcd3",
		5: "#ffcdc2",
		6: "#fdbdaf",
		7: "#f5a898",
		8: "#ec8e7b",
		9: "#e54d2e",
		10: "#dd4425",
		11: "#d13415",
		12: "#5c271f",
	},
	red: {
		1: "#fffcfc",
		2: "#fff7f7",
		3: "#feebec",
		4: "#ffdbdc",
		5: "#ffcdce",
		6: "#fdbdbe",
		7: "#f4a9aa",
		8: "#eb8e90",
		9: "#e5484d",
		10: "#dc3e42",
		11: "#ce2c31",
		12: "#641723",
	},
	ruby: {
		1: "#fffcfd",
		2: "#fff7f8",
		3: "#feeaed",
		4: "#ffdce1",
		5: "#ffced6",
		6: "#f8bfc8",
		7: "#efacb8",
		8: "#e592a3",
		9: "#e54666",
		10: "#dc3b5d",
		11: "#ca244d",
		12: "#64172b",
	},
	crimson: {
		1: "#fffcfd",
		2: "#fef7f9",
		3: "#ffe9f0",
		4: "#fedce7",
		5: "#facedd",
		6: "#f3bed1",
		7: "#eaacc3",
		8: "#e093b2",
		9: "#e93d82",
		10: "#df3478",
		11: "#cb1d63",
		12: "#621639",
	},
	pink: {
		1: "#fffcfe",
		2: "#fef7fb",
		3: "#fee9f5",
		4: "#fbdcef",
		5: "#f6cee7",
		6: "#efbfdd",
		7: "#e7acd0",
		8: "#dd93c2",
		9: "#d6409f",
		10: "#cf3897",
		11: "#c2298a",
		12: "#651249",
	},
	plum: {
		1: "#fefcff",
		2: "#fdf7fd",
		3: "#fbebfb",
		4: "#f7def8",
		5: "#f2d1f3",
		6: "#e9c2ec",
		7: "#deade3",
		8: "#cf91d8",
		9: "#ab4aba",
		10: "#a144af",
		11: "#953ea3",
		12: "#53195d",
	},
	// Purples
	purple: {
		1: "#fefcfe",
		2: "#fbf7fe",
		3: "#f7edfe",
		4: "#f2e2fc",
		5: "#ead5f9",
		6: "#e0c4f4",
		7: "#d1afec",
		8: "#be93e4",
		9: "#8e4ec6",
		10: "#8347b9",
		11: "#8145b5",
		12: "#402060",
	},
	violet: {
		1: "#fdfcfe",
		2: "#faf8ff",
		3: "#f4f0fe",
		4: "#ebe4ff",
		5: "#e1d9ff",
		6: "#d4cafe",
		7: "#c2b5f5",
		8: "#aa99ec",
		9: "#6e56cf",
		10: "#654dc4",
		11: "#6550b9",
		12: "#2f265f",
	},
	iris: {
		1: "#fdfdff",
		2: "#f8f8ff",
		3: "#f0f1fe",
		4: "#e6e7ff",
		5: "#dadcff",
		6: "#cbcdff",
		7: "#b8baf8",
		8: "#9b9ef0",
		9: "#5b5bd6",
		10: "#5151cd",
		11: "#5753c6",
		12: "#272962",
	},
	indigo: {
		1: "#fdfdfe",
		2: "#f7f9ff",
		3: "#edf2fe",
		4: "#e1e9ff",
		5: "#d2deff",
		6: "#c1d0ff",
		7: "#abbdf9",
		8: "#8da4ef",
		9: "#3e63dd",
		10: "#3358d4",
		11: "#3a5bc7",
		12: "#1f2d5c",
	},
	// Blues
	blue: {
		1: "#fbfdff",
		2: "#f4faff",
		3: "#e6f4fe",
		4: "#d5efff",
		5: "#c2e5ff",
		6: "#acd8fc",
		7: "#8ec8f6",
		8: "#5eb1ef",
		9: "#0090ff",
		10: "#0588f0",
		11: "#0d74ce",
		12: "#113264",
	},
	cyan: {
		1: "#fafdfe",
		2: "#f2fafb",
		3: "#def7f9",
		4: "#caf1f6",
		5: "#b5e9f0",
		6: "#9ddde7",
		7: "#7dcedc",
		8: "#3db9cf",
		9: "#00a2c7",
		10: "#0797b9",
		11: "#107d98",
		12: "#0d3c48",
	},
	teal: {
		1: "#fafefd",
		2: "#f3fbf9",
		3: "#e0f8f3",
		4: "#ccf3ea",
		5: "#b8eae0",
		6: "#a1ded2",
		7: "#83cdc1",
		8: "#53b9ab",
		9: "#12a594",
		10: "#0d9b8a",
		11: "#008573",
		12: "#0d3d38",
	},
	jade: {
		1: "#fbfefd",
		2: "#f4fbf7",
		3: "#e6f7ed",
		4: "#d6f1e3",
		5: "#c3e9d7",
		6: "#acdec8",
		7: "#8bceb6",
		8: "#56ba9f",
		9: "#29a383",
		10: "#26997b",
		11: "#208368",
		12: "#1d3b31",
	},
	// Greens
	green: {
		1: "#fbfefc",
		2: "#f4fbf6",
		3: "#e6f6eb",
		4: "#d6f1df",
		5: "#c4e8d1",
		6: "#adddc0",
		7: "#8eceaa",
		8: "#5bb98b",
		9: "#30a46c",
		10: "#2b9a66",
		11: "#218358",
		12: "#193b2d",
	},
	grass: {
		1: "#fbfefb",
		2: "#f5fbf5",
		3: "#e9f6e9",
		4: "#daf1db",
		5: "#c9e8ca",
		6: "#b2ddb5",
		7: "#94ce9a",
		8: "#65ba74",
		9: "#46a758",
		10: "#3e9b4f",
		11: "#2a7e3b",
		12: "#203c25",
	},
	// Warm colors
	bronze: {
		1: "#fdfcfc",
		2: "#fdf7f5",
		3: "#f6edea",
		4: "#efe4df",
		5: "#e7d9d3",
		6: "#dfcdc5",
		7: "#d3bcb3",
		8: "#c2a499",
		9: "#a18072",
		10: "#957468",
		11: "#7d5e54",
		12: "#43302b",
	},
	gold: {
		1: "#fdfdfc",
		2: "#faf9f2",
		3: "#f2f0e7",
		4: "#eae6db",
		5: "#e1dccf",
		6: "#d8d0bf",
		7: "#cbc0aa",
		8: "#b9a88d",
		9: "#978365",
		10: "#8c7a5e",
		11: "#71624b",
		12: "#3b352b",
	},
	brown: {
		1: "#fefdfc",
		2: "#fcf9f6",
		3: "#f6eee7",
		4: "#f0e4d9",
		5: "#ebdaca",
		6: "#e4cdb7",
		7: "#dcbc9f",
		8: "#cea37e",
		9: "#ad7f58",
		10: "#a07553",
		11: "#815e46",
		12: "#3e332e",
	},
	orange: {
		1: "#fefcfb",
		2: "#fff7ed",
		3: "#ffefd6",
		4: "#ffdfb5",
		5: "#ffd19a",
		6: "#ffc182",
		7: "#f5ae73",
		8: "#ec9455",
		9: "#f76b15",
		10: "#ef5f00",
		11: "#cc4e00",
		12: "#582d1d",
	},
	amber: {
		1: "#fefdfb",
		2: "#fefbe9",
		3: "#fff7c2",
		4: "#ffee9c",
		5: "#fbe577",
		6: "#f3d673",
		7: "#e9c162",
		8: "#e2a336",
		9: "#ffc53d",
		10: "#ffba18",
		11: "#ab6400",
		12: "#4f3422",
	},
	yellow: {
		1: "#fdfdf9",
		2: "#fefce9",
		3: "#fffab8",
		4: "#fff394",
		5: "#ffe770",
		6: "#f3d768",
		7: "#e4c767",
		8: "#d5ae39",
		9: "#ffe629",
		10: "#ffdc00",
		11: "#9e6c00",
		12: "#473b1f",
	},
	// Bright colors
	lime: {
		1: "#fcfdfa",
		2: "#f8faf3",
		3: "#eef6d6",
		4: "#e2f0bd",
		5: "#d3e7a6",
		6: "#c2da91",
		7: "#abc978",
		8: "#8db654",
		9: "#bdee63",
		10: "#b0e64c",
		11: "#5c7c2f",
		12: "#37401c",
	},
	mint: {
		1: "#f9fefd",
		2: "#f2fbf9",
		3: "#ddf9f2",
		4: "#c8f4e9",
		5: "#b3ecde",
		6: "#9ce0d0",
		7: "#7ecfbd",
		8: "#4cbba5",
		9: "#86ead4",
		10: "#7de0cb",
		11: "#027864",
		12: "#16433c",
	},
	sky: {
		1: "#f9feff",
		2: "#f1fafd",
		3: "#e1f6fd",
		4: "#d1f0fa",
		5: "#bee7f5",
		6: "#a9daed",
		7: "#8dcae3",
		8: "#60b3d7",
		9: "#7ce2fe",
		10: "#74daf8",
		11: "#00749e",
		12: "#1d3e56",
	},
};

/**
 * Dark mode color values for all color scales.
 */
export const darkColors: Record<ColorScale, Record<ColorStep, string>> = {
	// Neutral grays
	gray: {
		1: "#111111",
		2: "#191919",
		3: "#222222",
		4: "#2a2a2a",
		5: "#313131",
		6: "#3a3a3a",
		7: "#484848",
		8: "#606060",
		9: "#6e6e6e",
		10: "#7b7b7b",
		11: "#b4b4b4",
		12: "#eeeeee",
	},
	mauve: {
		1: "#121113",
		2: "#1a191b",
		3: "#232225",
		4: "#2b292d",
		5: "#323035",
		6: "#3c393f",
		7: "#49474e",
		8: "#625f69",
		9: "#6f6d78",
		10: "#7c7a85",
		11: "#b5b2bc",
		12: "#eeeef0",
	},
	slate: {
		1: "#111113",
		2: "#18191b",
		3: "#212225",
		4: "#272a2d",
		5: "#2e3135",
		6: "#363a3f",
		7: "#43484e",
		8: "#5a6169",
		9: "#696e77",
		10: "#777b84",
		11: "#b0b4ba",
		12: "#edeef0",
	},
	sage: {
		1: "#101211",
		2: "#171918",
		3: "#202221",
		4: "#272a29",
		5: "#2e3130",
		6: "#373b39",
		7: "#444947",
		8: "#5b625f",
		9: "#63706b",
		10: "#717d79",
		11: "#adb5b2",
		12: "#eceeed",
	},
	olive: {
		1: "#111210",
		2: "#181917",
		3: "#212220",
		4: "#282a27",
		5: "#2f312e",
		6: "#383a36",
		7: "#454843",
		8: "#5c625b",
		9: "#687066",
		10: "#767d74",
		11: "#afb5ad",
		12: "#eceeec",
	},
	sand: {
		1: "#111110",
		2: "#191918",
		3: "#222221",
		4: "#2a2a28",
		5: "#31312e",
		6: "#3b3a37",
		7: "#494844",
		8: "#62605b",
		9: "#6f6d66",
		10: "#7c7b74",
		11: "#b5b3ad",
		12: "#eeeeec",
	},
	// Reds
	tomato: {
		1: "#181111",
		2: "#1f1513",
		3: "#391714",
		4: "#4e1511",
		5: "#5e1c16",
		6: "#6e2920",
		7: "#853a2d",
		8: "#ac4d39",
		9: "#e54d2e",
		10: "#ec6142",
		11: "#ff977d",
		12: "#fbd3cb",
	},
	red: {
		1: "#191111",
		2: "#201314",
		3: "#3b1219",
		4: "#500f1c",
		5: "#611623",
		6: "#72232d",
		7: "#8c333a",
		8: "#b54548",
		9: "#e5484d",
		10: "#ec5d5e",
		11: "#ff9592",
		12: "#ffd1d9",
	},
	ruby: {
		1: "#191113",
		2: "#1e1517",
		3: "#3a141e",
		4: "#4e1325",
		5: "#5e1a2e",
		6: "#6f2539",
		7: "#883447",
		8: "#b3445a",
		9: "#e54666",
		10: "#ec5a72",
		11: "#ff949d",
		12: "#fed2e1",
	},
	crimson: {
		1: "#191114",
		2: "#201318",
		3: "#381525",
		4: "#4d122f",
		5: "#5c1839",
		6: "#6d2545",
		7: "#873356",
		8: "#b0436e",
		9: "#e93d82",
		10: "#ee518a",
		11: "#ff92ad",
		12: "#fdd3e8",
	},
	pink: {
		1: "#191117",
		2: "#21121d",
		3: "#37172f",
		4: "#4b143d",
		5: "#591c47",
		6: "#692955",
		7: "#833869",
		8: "#a84885",
		9: "#d6409f",
		10: "#de51a8",
		11: "#ff8dcc",
		12: "#fdd1ea",
	},
	plum: {
		1: "#181118",
		2: "#201320",
		3: "#351a35",
		4: "#451d47",
		5: "#512454",
		6: "#5e3061",
		7: "#734079",
		8: "#92549c",
		9: "#ab4aba",
		10: "#b658c4",
		11: "#e796f3",
		12: "#f4d4f4",
	},
	// Purples
	purple: {
		1: "#18111b",
		2: "#1e1523",
		3: "#301c3b",
		4: "#3d224e",
		5: "#48295c",
		6: "#54346b",
		7: "#664282",
		8: "#8457aa",
		9: "#8e4ec6",
		10: "#9a5cd0",
		11: "#d19dff",
		12: "#ecd9fa",
	},
	violet: {
		1: "#14121f",
		2: "#1b1525",
		3: "#291f43",
		4: "#33255b",
		5: "#3c2e69",
		6: "#473876",
		7: "#56468b",
		8: "#6958ad",
		9: "#6e56cf",
		10: "#7d66d9",
		11: "#baa7ff",
		12: "#e2ddfe",
	},
	iris: {
		1: "#13131e",
		2: "#171625",
		3: "#202248",
		4: "#262a65",
		5: "#303374",
		6: "#3d3e82",
		7: "#4a4a95",
		8: "#5958b1",
		9: "#5b5bd6",
		10: "#6e6ade",
		11: "#b1a9ff",
		12: "#e0dffe",
	},
	indigo: {
		1: "#11131f",
		2: "#141726",
		3: "#182449",
		4: "#1d2e62",
		5: "#253974",
		6: "#304384",
		7: "#3a4f97",
		8: "#435db1",
		9: "#3e63dd",
		10: "#5472e4",
		11: "#9eb1ff",
		12: "#d6e1ff",
	},
	// Blues
	blue: {
		1: "#0d1520",
		2: "#111927",
		3: "#0d2847",
		4: "#003362",
		5: "#004074",
		6: "#104d87",
		7: "#205d9e",
		8: "#2870bd",
		9: "#0090ff",
		10: "#3b9eff",
		11: "#70b8ff",
		12: "#c2e6ff",
	},
	cyan: {
		1: "#0b161a",
		2: "#101b20",
		3: "#082c36",
		4: "#003848",
		5: "#004558",
		6: "#045468",
		7: "#12677e",
		8: "#11809c",
		9: "#00a2c7",
		10: "#23afd0",
		11: "#4ccce6",
		12: "#b6ecf7",
	},
	teal: {
		1: "#0d1514",
		2: "#111c1b",
		3: "#0d2d2a",
		4: "#023b37",
		5: "#084843",
		6: "#145750",
		7: "#1c6961",
		8: "#207e73",
		9: "#12a594",
		10: "#0eb39e",
		11: "#0bd8b6",
		12: "#adf0dd",
	},
	jade: {
		1: "#0d1512",
		2: "#121c18",
		3: "#0f2e22",
		4: "#0b3b2c",
		5: "#114837",
		6: "#1b5745",
		7: "#246854",
		8: "#2a7e68",
		9: "#29a383",
		10: "#27b08b",
		11: "#1fd8a4",
		12: "#adf0d4",
	},
	// Greens
	green: {
		1: "#0e1512",
		2: "#121b17",
		3: "#132d21",
		4: "#113b29",
		5: "#174933",
		6: "#20573e",
		7: "#28684a",
		8: "#2f7c57",
		9: "#30a46c",
		10: "#33b074",
		11: "#3dd68c",
		12: "#b1f1cb",
	},
	grass: {
		1: "#0e1511",
		2: "#141a15",
		3: "#1b2a1e",
		4: "#1d3a24",
		5: "#25482d",
		6: "#2d5736",
		7: "#366740",
		8: "#3e7949",
		9: "#46a758",
		10: "#53b365",
		11: "#71d083",
		12: "#c2f0c2",
	},
	// Warm colors
	bronze: {
		1: "#141110",
		2: "#1c1917",
		3: "#262220",
		4: "#302a27",
		5: "#3b3330",
		6: "#493e3a",
		7: "#5a4c47",
		8: "#6f5f58",
		9: "#a18072",
		10: "#ae8c7e",
		11: "#d4b3a5",
		12: "#ede0d9",
	},
	gold: {
		1: "#121211",
		2: "#1b1a17",
		3: "#24231f",
		4: "#2d2b26",
		5: "#38352e",
		6: "#444039",
		7: "#544f46",
		8: "#696256",
		9: "#978365",
		10: "#a39073",
		11: "#cbb99f",
		12: "#e8e2d9",
	},
	brown: {
		1: "#12110f",
		2: "#1c1816",
		3: "#28211d",
		4: "#322922",
		5: "#3e3128",
		6: "#4d3c2f",
		7: "#614a39",
		8: "#7c5f46",
		9: "#ad7f58",
		10: "#b88c67",
		11: "#dbb594",
		12: "#f2e1ca",
	},
	orange: {
		1: "#17120e",
		2: "#1e160f",
		3: "#331e0b",
		4: "#462100",
		5: "#562800",
		6: "#66350c",
		7: "#7e451d",
		8: "#a35829",
		9: "#f76b15",
		10: "#ff801f",
		11: "#ffa057",
		12: "#ffe0c2",
	},
	amber: {
		1: "#16120c",
		2: "#1d180f",
		3: "#302008",
		4: "#3f2700",
		5: "#4d3000",
		6: "#5c3d05",
		7: "#714f19",
		8: "#8f6424",
		9: "#ffc53d",
		10: "#ffd60a",
		11: "#ffca16",
		12: "#ffe7b3",
	},
	yellow: {
		1: "#14120b",
		2: "#1b180f",
		3: "#2d2305",
		4: "#362b00",
		5: "#433500",
		6: "#524202",
		7: "#665417",
		8: "#836a21",
		9: "#ffe629",
		10: "#ffff57",
		11: "#f5e147",
		12: "#f6eeb4",
	},
	// Bright colors
	lime: {
		1: "#11130c",
		2: "#151a10",
		3: "#1f2917",
		4: "#29371d",
		5: "#334423",
		6: "#3d522a",
		7: "#496231",
		8: "#577538",
		9: "#bdee63",
		10: "#d4ff70",
		11: "#bde56c",
		12: "#e3f7ba",
	},
	mint: {
		1: "#0e1515",
		2: "#0f1b1b",
		3: "#092c2b",
		4: "#003a38",
		5: "#004744",
		6: "#105650",
		7: "#1e685f",
		8: "#277f70",
		9: "#86ead4",
		10: "#a8f5e5",
		11: "#58d5ba",
		12: "#c4f5e1",
	},
	sky: {
		1: "#0d141f",
		2: "#111a27",
		3: "#112840",
		4: "#113555",
		5: "#154467",
		6: "#1b537b",
		7: "#1f6692",
		8: "#197cae",
		9: "#7ce2fe",
		10: "#a8eeff",
		11: "#75c7f0",
		12: "#c2f3ff",
	},
};

/**
 * Light mode alpha (transparent) color values for all color scales.
 * Alpha colors use 8-character hex format with alpha channel.
 */
export const lightAlphaColors: Record<ColorScale, Record<ColorStep, string>> = {
	// Neutral grays
	gray: {
		1: "#00000003",
		2: "#00000006",
		3: "#0000000f",
		4: "#00000017",
		5: "#0000001f",
		6: "#00000026",
		7: "#00000031",
		8: "#00000044",
		9: "#00000072",
		10: "#0000007c",
		11: "#0000009b",
		12: "#000000df",
	},
	mauve: {
		1: "#55005503",
		2: "#2b005506",
		3: "#30004010",
		4: "#20003618",
		5: "#20003820",
		6: "#14003527",
		7: "#10003332",
		8: "#08003145",
		9: "#05001d73",
		10: "#0500197d",
		11: "#0400119c",
		12: "#020008e0",
	},
	slate: {
		1: "#00005503",
		2: "#00005506",
		3: "#0000330f",
		4: "#00002d17",
		5: "#0009321f",
		6: "#00002f26",
		7: "#00062e32",
		8: "#00083046",
		9: "#00051d74",
		10: "#00071b7f",
		11: "#0007149f",
		12: "#000509e3",
	},
	sage: {
		1: "#00804004",
		2: "#00402008",
		3: "#002d1e11",
		4: "#001f1519",
		5: "#00180820",
		6: "#00140d28",
		7: "#00140a34",
		8: "#000f0847",
		9: "#00110b79",
		10: "#00100a83",
		11: "#000a07a0",
		12: "#000805e5",
	},
	olive: {
		1: "#00550003",
		2: "#00490007",
		3: "#00200010",
		4: "#00160018",
		5: "#00180020",
		6: "#00140028",
		7: "#000f0033",
		8: "#040f0047",
		9: "#050f0078",
		10: "#040e0082",
		11: "#020a00a0",
		12: "#010600e3",
	},
	sand: {
		1: "#55550003",
		2: "#25250007",
		3: "#20100010",
		4: "#1f150019",
		5: "#1f180021",
		6: "#19130029",
		7: "#19140035",
		8: "#1915014a",
		9: "#0f0f0079",
		10: "#0c0c0083",
		11: "#080800a1",
		12: "#060500e3",
	},
	// Reds
	tomato: {
		1: "#ff000003",
		2: "#ff200008",
		3: "#f52b0018",
		4: "#ff35002c",
		5: "#ff2e003d",
		6: "#f92d0050",
		7: "#e7280067",
		8: "#db250084",
		9: "#df2600d1",
		10: "#d72400da",
		11: "#cd2200ea",
		12: "#460900e0",
	},
	red: {
		1: "#ff000003",
		2: "#ff000008",
		3: "#f3000d14",
		4: "#ff000824",
		5: "#ff000632",
		6: "#f8000442",
		7: "#df000356",
		8: "#d2000571",
		9: "#db0007b7",
		10: "#d10005c1",
		11: "#c40006d3",
		12: "#55000de8",
	},
	ruby: {
		1: "#ff005503",
		2: "#ff002008",
		3: "#f3002515",
		4: "#ff002523",
		5: "#ff002a31",
		6: "#e4002440",
		7: "#ce002553",
		8: "#c300288d",
		9: "#db002cb9",
		10: "#d2002cc4",
		11: "#c10030db",
		12: "#550016e8",
	},
	crimson: {
		1: "#ff005503",
		2: "#e0004008",
		3: "#ff005216",
		4: "#f8005123",
		5: "#e5004f31",
		6: "#d0004b41",
		7: "#bf004753",
		8: "#b6004a6c",
		9: "#e2005bc2",
		10: "#d70056cb",
		11: "#c4004fe2",
		12: "#530026e9",
	},
	pink: {
		1: "#ff00aa03",
		2: "#e0008008",
		3: "#f4008c16",
		4: "#e2008b23",
		5: "#d1008331",
		6: "#c0007840",
		7: "#b6006f53",
		8: "#af006f6c",
		9: "#c8007fbf",
		10: "#c2007ac7",
		11: "#b60074d6",
		12: "#59003bed",
	},
	plum: {
		1: "#aa00ff03",
		2: "#c000c008",
		3: "#cc00cc14",
		4: "#c200c921",
		5: "#b700bd2e",
		6: "#a400b03d",
		7: "#9900a852",
		8: "#9000a56e",
		9: "#89009eb5",
		10: "#7f0092bb",
		11: "#730086c1",
		12: "#40004be6",
	},
	// Purples
	purple: {
		1: "#aa00aa03",
		2: "#8000e008",
		3: "#8e00f112",
		4: "#8d00e51d",
		5: "#8000db2a",
		6: "#7a01d03b",
		7: "#6d00c350",
		8: "#6600c06c",
		9: "#5c00adb1",
		10: "#53009eb8",
		11: "#52009aba",
		12: "#250049df",
	},
	violet: {
		1: "#5500aa03",
		2: "#4900ff07",
		3: "#4400ee0f",
		4: "#4300ff1b",
		5: "#3600ff26",
		6: "#3100fb35",
		7: "#2d01dd4a",
		8: "#2b00d066",
		9: "#2400b7a9",
		10: "#2300abb2",
		11: "#1f0099af",
		12: "#0b0043d9",
	},
	iris: {
		1: "#0000ff02",
		2: "#0000ff07",
		3: "#0011ee0f",
		4: "#000bff19",
		5: "#000eff25",
		6: "#000aff34",
		7: "#0008e647",
		8: "#0008d964",
		9: "#0000c0a4",
		10: "#0000b6ae",
		11: "#0600abac",
		12: "#000246d8",
	},
	indigo: {
		1: "#00008002",
		2: "#0040ff08",
		3: "#0047f112",
		4: "#0044ff1e",
		5: "#0044ff2d",
		6: "#003eff3e",
		7: "#0037ed54",
		8: "#0034dc72",
		9: "#0031d2c1",
		10: "#002ec9cc",
		11: "#002bb7c5",
		12: "#001046e0",
	},
	// Blues
	blue: {
		1: "#0080ff04",
		2: "#008cff0b",
		3: "#008ff519",
		4: "#009eff2a",
		5: "#0093ff3d",
		6: "#0088f653",
		7: "#0083eb71",
		8: "#0084e6a1",
		9: "#0090ff",
		10: "#0086f0fa",
		11: "#006dcbf2",
		12: "#002359ee",
	},
	cyan: {
		1: "#0099cc05",
		2: "#009db10d",
		3: "#00c2d121",
		4: "#00bcd435",
		5: "#01b4cc4a",
		6: "#00a7c162",
		7: "#009fbb82",
		8: "#00a3c0c2",
		9: "#00a2c7",
		10: "#0094b7f8",
		11: "#007491ef",
		12: "#00323ef2",
	},
	teal: {
		1: "#00cc9905",
		2: "#00aa800c",
		3: "#00c69d1f",
		4: "#00c39633",
		5: "#00b49047",
		6: "#00a6855e",
		7: "#0099807c",
		8: "#009783ac",
		9: "#009e8ced",
		10: "#009684f2",
		11: "#008573",
		12: "#00332df2",
	},
	jade: {
		1: "#00c08004",
		2: "#00a3460b",
		3: "#00ae4819",
		4: "#00a85129",
		5: "#00a2553c",
		6: "#009a5753",
		7: "#00945f74",
		8: "#00976ea9",
		9: "#00916bd6",
		10: "#008764d9",
		11: "#007152df",
		12: "#002217e2",
	},
	// Greens
	green: {
		1: "#00c04004",
		2: "#00a32f0b",
		3: "#00a43319",
		4: "#00a83829",
		5: "#019c393b",
		6: "#00963c52",
		7: "#00914071",
		8: "#00924ba4",
		9: "#008f4acf",
		10: "#008647d4",
		11: "#00713fde",
		12: "#002616e6",
	},
	grass: {
		1: "#00c00004",
		2: "#0099000a",
		3: "#00970016",
		4: "#009f0725",
		5: "#00930536",
		6: "#008f0a4d",
		7: "#018b0f6b",
		8: "#008d199a",
		9: "#008619b9",
		10: "#007b17c1",
		11: "#006514d5",
		12: "#002006df",
	},
	// Warm colors
	bronze: {
		1: "#55000003",
		2: "#cc33000a",
		3: "#92250015",
		4: "#80280020",
		5: "#7423002c",
		6: "#7324003a",
		7: "#6c1f004c",
		8: "#671c0066",
		9: "#551a008d",
		10: "#4c150097",
		11: "#3d0f00ab",
		12: "#1d0600d4",
	},
	gold: {
		1: "#55550003",
		2: "#9d8a000d",
		3: "#75600018",
		4: "#6b4e0024",
		5: "#60460030",
		6: "#64440040",
		7: "#63420055",
		8: "#633d0072",
		9: "#5332009a",
		10: "#492d00a1",
		11: "#362100b4",
		12: "#130c00d4",
	},
	brown: {
		1: "#aa550003",
		2: "#aa550009",
		3: "#a04b0018",
		4: "#9b4a0026",
		5: "#9f4d0035",
		6: "#a04e0048",
		7: "#a34e0060",
		8: "#9f4a0081",
		9: "#823c00a7",
		10: "#723300ac",
		11: "#522100b9",
		12: "#140600d1",
	},
	orange: {
		1: "#c0400004",
		2: "#ff8e0012",
		3: "#ff9c0029",
		4: "#ff91014a",
		5: "#ff8b0065",
		6: "#ff81007d",
		7: "#ed6c008c",
		8: "#e35f00aa",
		9: "#f65e00ea",
		10: "#ef5f00",
		11: "#cc4e00",
		12: "#431200e2",
	},
	amber: {
		1: "#c0800004",
		2: "#f4d10016",
		3: "#ffde003d",
		4: "#ffd40063",
		5: "#f8cf0088",
		6: "#eab5008c",
		7: "#dc9b009d",
		8: "#da8a00c9",
		9: "#ffb300c2",
		10: "#ffb300e7",
		11: "#ab6400",
		12: "#341500dd",
	},
	yellow: {
		1: "#aaaa0006",
		2: "#f4dd0016",
		3: "#ffee0047",
		4: "#ffe3016b",
		5: "#ffd5008f",
		6: "#ebbc0097",
		7: "#d2a10098",
		8: "#c99700c6",
		9: "#ffe100d6",
		10: "#ffdc00",
		11: "#9e6c00",
		12: "#2e2000e0",
	},
	// Bright colors
	lime: {
		1: "#66990005",
		2: "#6b95000c",
		3: "#96c80029",
		4: "#8fc60042",
		5: "#81bb0059",
		6: "#72aa006e",
		7: "#61990087",
		8: "#559200ab",
		9: "#93e4009c",
		10: "#8fdc00b3",
		11: "#375f00d0",
		12: "#1e2900e3",
	},
	mint: {
		1: "#00d5aa06",
		2: "#00b18a0d",
		3: "#00d29e22",
		4: "#00cc9937",
		5: "#00c0914c",
		6: "#00b08663",
		7: "#00a17d81",
		8: "#009e7fb3",
		9: "#00d3a579",
		10: "#00c39982",
		11: "#007763fd",
		12: "#00312ae9",
	},
	sky: {
		1: "#00d5ff06",
		2: "#00a4db0e",
		3: "#00b3ee1e",
		4: "#00ace42e",
		5: "#00a1d841",
		6: "#0092ca56",
		7: "#0089c172",
		8: "#0085bf9f",
		9: "#00c7fe83",
		10: "#00bcf38b",
		11: "#00749e",
		12: "#002540e2",
	},
};

/**
 * Dark mode alpha (transparent) color values for all color scales.
 * Alpha colors use 8-character hex format with alpha channel.
 */
export const darkAlphaColors: Record<ColorScale, Record<ColorStep, string>> = {
	// Neutral grays
	gray: {
		1: "#00000000",
		2: "#ffffff09",
		3: "#ffffff12",
		4: "#ffffff1b",
		5: "#ffffff22",
		6: "#ffffff2c",
		7: "#ffffff3b",
		8: "#ffffff55",
		9: "#ffffff64",
		10: "#ffffff72",
		11: "#ffffffaf",
		12: "#ffffffed",
	},
	mauve: {
		1: "#00000000",
		2: "#f5f4f609",
		3: "#ebeaf814",
		4: "#eee5f81d",
		5: "#efe6fe25",
		6: "#f1e6fd30",
		7: "#eee9ff40",
		8: "#eee7ff5d",
		9: "#eae6fd6e",
		10: "#ece9fd7c",
		11: "#f5f1ffb7",
		12: "#fdfdffef",
	},
	slate: {
		1: "#00000000",
		2: "#d8f4f609",
		3: "#ddeaf814",
		4: "#d3edf81d",
		5: "#d9edfe25",
		6: "#d6ebfd30",
		7: "#d9edff40",
		8: "#d9edff5d",
		9: "#dfebfd6d",
		10: "#e5edfd7b",
		11: "#f1f7feb5",
		12: "#fcfdffef",
	},
	sage: {
		1: "#00000000",
		2: "#f0f2f108",
		3: "#f3f5f412",
		4: "#f2fefd1a",
		5: "#f1fbfa22",
		6: "#edfbf42d",
		7: "#edfcf73c",
		8: "#ebfdf657",
		9: "#dffdf266",
		10: "#e5fdf674",
		11: "#f4fefbb0",
		12: "#fdfffeed",
	},
	olive: {
		1: "#00000000",
		2: "#f1f2f008",
		3: "#f4f5f312",
		4: "#f3fef21a",
		5: "#f2fbf122",
		6: "#f4faed2c",
		7: "#f2fced3b",
		8: "#edfdeb57",
		9: "#ebfde766",
		10: "#f0fdec74",
		11: "#f6fef4b0",
		12: "#fdfffded",
	},
	sand: {
		1: "#00000000",
		2: "#f4f4f309",
		3: "#f6f6f513",
		4: "#fefef31b",
		5: "#fbfbeb23",
		6: "#fffaed2d",
		7: "#fffbed3c",
		8: "#fff9eb57",
		9: "#fffae965",
		10: "#fffdee73",
		11: "#fffcf4b0",
		12: "#fffffded",
	},
	// Reds
	tomato: {
		1: "#f1121208",
		2: "#ff55330f",
		3: "#ff35232b",
		4: "#fd201142",
		5: "#fe332153",
		6: "#ff4f3864",
		7: "#fd644a7d",
		8: "#fe6d4ea7",
		9: "#fe5431e4",
		10: "#ff6847eb",
		11: "#ff977d",
		12: "#ffd6cefb",
	},
	red: {
		1: "#f4121209",
		2: "#f22f3e11",
		3: "#ff173f2d",
		4: "#fe0a3b44",
		5: "#ff204756",
		6: "#ff3e5668",
		7: "#ff536184",
		8: "#ff5d61b0",
		9: "#fe4e54e4",
		10: "#ff6465eb",
		11: "#ff9592",
		12: "#ffd1d9",
	},
	ruby: {
		1: "#f4124a09",
		2: "#fe5a7f0e",
		3: "#ff235d2c",
		4: "#fd195e42",
		5: "#fe2d6b53",
		6: "#ff447665",
		7: "#ff577d80",
		8: "#ff5c7cae",
		9: "#fe4c70e4",
		10: "#ff617beb",
		11: "#ff949d",
		12: "#ffd3e2fe",
	},
	crimson: {
		1: "#f4126709",
		2: "#f22f7a11",
		3: "#fe2a8b2a",
		4: "#fd158741",
		5: "#fd278f51",
		6: "#fe459763",
		7: "#fd559b7f",
		8: "#fe5b9bab",
		9: "#fe418de8",
		10: "#ff5693ed",
		11: "#ff92ad",
		12: "#ffd5eafd",
	},
	pink: {
		1: "#f412bc09",
		2: "#f420bb12",
		3: "#fe37cc29",
		4: "#fc1ec43f",
		5: "#fd35c24e",
		6: "#fd51c75f",
		7: "#fd62c87b",
		8: "#ff68c8a2",
		9: "#fe49bcd4",
		10: "#ff5cc0dc",
		11: "#ff8dcc",
		12: "#ffd3ecfd",
	},
	plum: {
		1: "#f112f108",
		2: "#f22ff211",
		3: "#fd4cfd27",
		4: "#f646ff3a",
		5: "#f455ff48",
		6: "#f66dff56",
		7: "#f07cfd70",
		8: "#ee84ff95",
		9: "#e961feb6",
		10: "#ed70ffc0",
		11: "#f19cfef3",
		12: "#feddfef4",
	},
	// Purples
	purple: {
		1: "#b412f90b",
		2: "#b744f714",
		3: "#c150ff2d",
		4: "#bb53fd42",
		5: "#be5cfd51",
		6: "#c16dfd61",
		7: "#c378fd7a",
		8: "#c47effa4",
		9: "#b661ffc2",
		10: "#bc6fffcd",
		11: "#d19dff",
		12: "#f1ddfffa",
	},
	violet: {
		1: "#4422ff0f",
		2: "#853ff916",
		3: "#8354fe36",
		4: "#7d51fd50",
		5: "#845ffd5f",
		6: "#8f6cfd6d",
		7: "#9879ff83",
		8: "#977dfea8",
		9: "#8668ffcc",
		10: "#9176fed7",
		11: "#baa7ff",
		12: "#e3defffe",
	},
	iris: {
		1: "#3636fe0e",
		2: "#564bf916",
		3: "#525bff3b",
		4: "#4d58ff5a",
		5: "#5b62fd6b",
		6: "#6d6ffd7a",
		7: "#7777fe8e",
		8: "#7b7afeac",
		9: "#6a6afed4",
		10: "#7d79ffdc",
		11: "#b1a9ff",
		12: "#e1e0fffe",
	},
	indigo: {
		1: "#1133ff0f",
		2: "#3354fa17",
		3: "#2f62ff3c",
		4: "#3566ff57",
		5: "#4171fd6b",
		6: "#5178fd7c",
		7: "#5a7fff90",
		8: "#5b81feac",
		9: "#4671ffdb",
		10: "#5c7efee3",
		11: "#9eb1ff",
		12: "#d6e1ff",
	},
	// Blues
	blue: {
		1: "#004df211",
		2: "#1166fb18",
		3: "#0077ff3a",
		4: "#0075ff57",
		5: "#0081fd6b",
		6: "#0f89fd7f",
		7: "#2a91fe98",
		8: "#3094feb9",
		9: "#0090ff",
		10: "#3b9eff",
		11: "#70b8ff",
		12: "#c2e6ff",
	},
	cyan: {
		1: "#0091f70a",
		2: "#02a7f211",
		3: "#00befd28",
		4: "#00baff3b",
		5: "#00befd4d",
		6: "#00c7fd5e",
		7: "#14cdff75",
		8: "#11cfff95",
		9: "#00cfffc3",
		10: "#28d6ffcd",
		11: "#52e1fee5",
		12: "#bbf3fef7",
	},
	teal: {
		1: "#00deab05",
		2: "#12fbe60c",
		3: "#00ffe61e",
		4: "#00ffe92d",
		5: "#00ffea3b",
		6: "#1cffe84b",
		7: "#2efde85f",
		8: "#32ffe775",
		9: "#13ffe49f",
		10: "#0dffe0ae",
		11: "#0afed5d6",
		12: "#b8ffebef",
	},
	jade: {
		1: "#00de4505",
		2: "#27fba60c",
		3: "#02f99920",
		4: "#00ffaa2d",
		5: "#11ffb63b",
		6: "#34ffc24b",
		7: "#45fdc75e",
		8: "#48ffcf75",
		9: "#38feca9d",
		10: "#31fec7ab",
		11: "#21fec0d6",
		12: "#b8ffe1ef",
	},
	// Greens
	green: {
		1: "#00de4505",
		2: "#29f99d0b",
		3: "#22ff991e",
		4: "#11ff992d",
		5: "#2bffa23c",
		6: "#44ffaa4b",
		7: "#50fdac5e",
		8: "#54ffad73",
		9: "#44ffa49e",
		10: "#43fea4ab",
		11: "#46fea5d4",
		12: "#bbffd7f0",
	},
	grass: {
		1: "#00de1205",
		2: "#5ef7780a",
		3: "#70fe8c1b",
		4: "#57ff802c",
		5: "#68ff8b3b",
		6: "#71ff8f4b",
		7: "#77fd925d",
		8: "#77fd9070",
		9: "#65ff82a1",
		10: "#72ff8dae",
		11: "#89ff9fcd",
		12: "#ceffceef",
	},
	// Warm colors
	bronze: {
		1: "#d1110004",
		2: "#fbbc910c",
		3: "#faceb817",
		4: "#facdb622",
		5: "#ffd2c12d",
		6: "#ffd1c03c",
		7: "#fdd0c04f",
		8: "#ffd6c565",
		9: "#fec7b09b",
		10: "#fecab5a9",
		11: "#ffd7c6d1",
		12: "#fff1e9ec",
	},
	gold: {
		1: "#91911102",
		2: "#f9e29d0b",
		3: "#f8ecbb15",
		4: "#ffeec41e",
		5: "#feecc22a",
		6: "#feebcb37",
		7: "#ffedcd48",
		8: "#fdeaca5f",
		9: "#ffdba690",
		10: "#fedfb09d",
		11: "#fee7c6c8",
		12: "#fef7ede7",
	},
	brown: {
		1: "#91110002",
		2: "#fba67c0c",
		3: "#fcb58c19",
		4: "#fbbb8a24",
		5: "#fcb88931",
		6: "#fdba8741",
		7: "#ffbb8856",
		8: "#ffbe8773",
		9: "#feb87da8",
		10: "#ffc18cb3",
		11: "#fed1aad9",
		12: "#feecd4f2",
	},
	orange: {
		1: "#ec360007",
		2: "#fe6d000e",
		3: "#fb6a0025",
		4: "#ff590039",
		5: "#ff61004a",
		6: "#fd75045c",
		7: "#ff832c75",
		8: "#fe84389d",
		9: "#fe6d15f7",
		10: "#ff801f",
		11: "#ffa057",
		12: "#ffe0c2",
	},
	amber: {
		1: "#e63c0006",
		2: "#fd9b000d",
		3: "#fa820022",
		4: "#fc820032",
		5: "#fd8b0041",
		6: "#fd9b0051",
		7: "#ffab2567",
		8: "#ffae3587",
		9: "#ffc53d",
		10: "#ffd60a",
		11: "#ffca16",
		12: "#ffe7b3",
	},
	yellow: {
		1: "#d1510004",
		2: "#f9b4000b",
		3: "#ffaa001e",
		4: "#fdb70028",
		5: "#febb0036",
		6: "#fec40046",
		7: "#fdcb225c",
		8: "#fdca327b",
		9: "#ffe629",
		10: "#ffff57",
		11: "#fee949f5",
		12: "#fef6baf6",
	},
	// Bright colors
	lime: {
		1: "#11bb0003",
		2: "#78f7000a",
		3: "#9bfd4c1a",
		4: "#a7fe5c29",
		5: "#affe6537",
		6: "#b2fe6d46",
		7: "#b6ff6f57",
		8: "#b6fd6d6c",
		9: "#caff69ed",
		10: "#d4ff70",
		11: "#d1fe77e4",
		12: "#e9febff7",
	},
	mint: {
		1: "#00dede05",
		2: "#00f9f90b",
		3: "#00fff61d",
		4: "#00fff42c",
		5: "#00fff23a",
		6: "#0effeb4a",
		7: "#34fde55e",
		8: "#41ffdf76",
		9: "#92ffe7e9",
		10: "#aefeedf5",
		11: "#67ffded2",
		12: "#cbfee9f5",
	},
	sky: {
		1: "#0044ff0f",
		2: "#1171fb18",
		3: "#1184fc33",
		4: "#128fff49",
		5: "#1c9dfd5d",
		6: "#28a5ff72",
		7: "#2badfe8b",
		8: "#1db2fea9",
		9: "#7ce3fffe",
		10: "#a8eeff",
		11: "#7cd3ffef",
		12: "#c2f3ff",
	},
};

// =============================================================================
// Configuration Types
// =============================================================================

/**
 * Configuration for enabling/disabling specific color scales
 */
export type ColorScalesConfig = Partial<Record<ColorScale, boolean>>;

/**
 * Configuration options for the color variables preset
 */
export interface ColorVariablesPresetConfig {
	/**
	 * Prefix for all color variable names.
	 * @default "color"
	 */
	prefix?: string;

	/**
	 * Name of the dark theme.
	 * @default "dark"
	 */
	darkThemeName?: string;

	/**
	 * Which color scales to include. Set a scale to `false` to exclude it.
	 * By default, all scales are included.
	 */
	scales?: ColorScalesConfig;

	/**
	 * Whether to include alpha (transparent) color variants.
	 * Alpha colors use 8-character hex format with alpha channel.
	 * @default true
	 */
	includeAlpha?: boolean;

	/**
	 * Custom light mode color overrides for solid colors.
	 * Can be used to customize individual color values.
	 */
	lightOverrides?: Partial<
		Record<ColorScale, Partial<Record<ColorStep, string>>>
	>;

	/**
	 * Custom dark mode color overrides for solid colors.
	 * Can be used to customize individual color values.
	 */
	darkOverrides?: Partial<
		Record<ColorScale, Partial<Record<ColorStep, string>>>
	>;

	/**
	 * Custom light mode alpha color overrides.
	 * Can be used to customize individual alpha color values.
	 */
	alphaLightOverrides?: Partial<
		Record<ColorScale, Partial<Record<ColorStep, string>>>
	>;

	/**
	 * Custom dark mode alpha color overrides.
	 * Can be used to customize individual alpha color values.
	 */
	alphaDarkOverrides?: Partial<
		Record<ColorScale, Partial<Record<ColorStep, string>>>
	>;
}

// =============================================================================
// Result Types
// =============================================================================

/**
 * Helper type to convert a union to an intersection
 */
type UnionToIntersection<U> = (
	U extends unknown
		? (k: U) => void
		: never
) extends (k: infer I) => void
	? I
	: never;

/**
 * Type for the keys of a single solid color scale result
 * Maps step numbers to Variable instances
 */
type ColorScaleResult<TPrefix extends string, TScale extends string> = {
	[K in ColorStep as `${TPrefix}${Capitalize<TScale>}${K}`]: Variable<`${TPrefix}.${TScale}.${K}`>;
};

/**
 * Type for the keys of a single alpha color scale result
 * Maps step numbers to Variable instances with 'A' prefix (e.g., colorBlueA1)
 */
type AlphaColorScaleResult<TPrefix extends string, TScale extends string> = {
	[K in ColorStep as `${TPrefix}${Capitalize<TScale>}A${K}`]: Variable<`${TPrefix}.${TScale}.a${K}`>;
};

/**
 * Full result type for all enabled solid color scales (union to intersection)
 */
type ColorVariablesResult<
	TPrefix extends string,
	TScales extends ColorScale,
> = UnionToIntersection<
	TScales extends unknown ? ColorScaleResult<TPrefix, TScales> : never
>;

/**
 * Full result type for all enabled alpha color scales (union to intersection)
 */
type AlphaColorVariablesResult<
	TPrefix extends string,
	TScales extends ColorScale,
> = UnionToIntersection<
	TScales extends unknown ? AlphaColorScaleResult<TPrefix, TScales> : never
>;

/**
 * Default result when using all scales (solid colors only)
 */
export type DefaultColorVariablesResult = ColorVariablesResult<
	"color",
	ColorScale
>;

/**
 * Default result when using all scales with alpha colors
 */
export type DefaultColorVariablesWithAlphaResult = ColorVariablesResult<
	"color",
	ColorScale
> &
	AlphaColorVariablesResult<"color", ColorScale>;

// =============================================================================
// Main Preset Function
// =============================================================================

/**
 * Creates a complete color palette with light and dark mode support.
 *
 * This preset generates CSS variables for all 30 color scales (or a custom subset),
 * each with 12 steps following design system conventions:
 *
 * - **Steps 1-2**: App backgrounds, subtle component backgrounds
 * - **Steps 3-5**: Component backgrounds, hover/active states
 * - **Steps 6-8**: Borders and separators
 * - **Steps 9-10**: Solid backgrounds (step 9 is the "primary" color)
 * - **Steps 11-12**: Text colors with accessible contrast
 *
 * By default, alpha (transparent) color variants are also generated for each scale.
 *
 * @param s - The Styleframe instance
 * @param config - Configuration options
 * @returns An object containing all generated color variables organized by scale
 *
 * @example Basic usage with all defaults
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useColorVariablesPreset } from "@styleframe/theme";
 *
 * const s = styleframe();
 * const colors = useColorVariablesPreset(s);
 *
 * // Use solid colors in selectors
 * s.selector(".button", {
 *   backgroundColor: s.ref(colors.colorBlue9),
 *   color: s.ref(colors.colorBlue12),
 * });
 *
 * // Use alpha colors for overlays
 * s.selector(".overlay", {
 *   backgroundColor: s.ref(colors.colorBlueA3),
 * });
 * ```
 *
 * @example Using only specific color scales
 * ```typescript
 * const colors = useColorVariablesPreset(s, {
 *   scales: {
 *     blue: true,
 *     red: true,
 *     green: true,
 *     gray: true,
 *     // All others default to false when any scale is explicitly set
 *   },
 * });
 * ```
 *
 * @example Disabling alpha colors
 * ```typescript
 * const colors = useColorVariablesPreset(s, {
 *   includeAlpha: false,
 * });
 * ```
 *
 * @example Custom prefix and theme name
 * ```typescript
 * const colors = useColorVariablesPreset(s, {
 *   prefix: "c",
 *   darkThemeName: "dark-mode",
 * });
 *
 * // Variables will be named like --c--blue--9
 * // Dark theme selector will be [data-theme="dark-mode"]
 * ```
 *
 * @example Overriding specific colors
 * ```typescript
 * const colors = useColorVariablesPreset(s, {
 *   lightOverrides: {
 *     blue: { 9: "#0066cc" }, // Custom primary blue
 *   },
 *   darkOverrides: {
 *     blue: { 9: "#3399ff" }, // Custom dark mode primary blue
 *   },
 * });
 * ```
 */
export function useColorVariablesPreset<
	TPrefix extends string = "color",
	TConfig extends ColorVariablesPresetConfig = ColorVariablesPresetConfig,
>(
	s: Styleframe,
	config: TConfig & { prefix?: TPrefix } = {} as TConfig & { prefix?: TPrefix },
): DefaultColorVariablesWithAlphaResult {
	const prefix = (config.prefix ?? "color") as TPrefix;
	const darkThemeName = config.darkThemeName ?? "dark";
	const scalesConfig = config.scales;
	const includeAlpha = config.includeAlpha ?? true;
	const lightOverrides = config.lightOverrides ?? {};
	const darkOverrides = config.darkOverrides ?? {};
	const alphaLightOverrides = config.alphaLightOverrides ?? {};
	const alphaDarkOverrides = config.alphaDarkOverrides ?? {};

	// Determine which scales to include
	// If scalesConfig has any explicit `true` values, use allowlist mode (only include those set to true)
	// Otherwise, use blocklist mode (include all except those set to false)
	const hasExplicitEnabled =
		scalesConfig !== undefined &&
		Object.values(scalesConfig).some((v) => v === true);

	const enabledScales = colorScales.filter((scale) => {
		if (scalesConfig === undefined) {
			return true; // All scales enabled by default
		}
		if (hasExplicitEnabled) {
			// Allowlist mode: only include scales explicitly set to true
			return scalesConfig[scale] === true;
		}
		// Blocklist mode: include all except those explicitly set to false
		return scalesConfig[scale] !== false;
	});

	// Result accumulator
	const result: Record<string, Variable<string>> = {};

	// Create light mode solid color variables (on :root)
	for (const scale of enabledScales) {
		const colors = lightColors[scale];
		const overrides = lightOverrides[scale] ?? {};

		for (const step of colorSteps) {
			const variableName = `${prefix}.${scale}.${step}`;
			const colorValue = overrides[step] ?? colors[step];

			const variable = s.variable(variableName, colorValue, { default: true });

			// Generate export key: colorBlue1, colorBlue2, etc.
			const exportKey = `${prefix}${capitalize(scale)}${step}`;
			result[exportKey] = variable;
		}
	}

	// Create light mode alpha color variables (on :root)
	if (includeAlpha) {
		for (const scale of enabledScales) {
			const colors = lightAlphaColors[scale];
			const overrides = alphaLightOverrides[scale] ?? {};

			for (const step of colorSteps) {
				const variableName = `${prefix}.${scale}.a${step}`;
				const colorValue = overrides[step] ?? colors[step];

				const variable = s.variable(variableName, colorValue, {
					default: true,
				});

				// Generate export key: colorBlueA1, colorBlueA2, etc.
				const exportKey = `${prefix}${capitalize(scale)}A${step}`;
				result[exportKey] = variable;
			}
		}
	}

	// Create dark mode theme with overridden values
	s.theme(darkThemeName, (ctx) => {
		// Override solid colors in dark theme
		for (const scale of enabledScales) {
			const colors = darkColors[scale];
			const overrides = darkOverrides[scale] ?? {};

			for (const step of colorSteps) {
				const colorValue = overrides[step] ?? colors[step];

				// Get the variable reference and override its value in dark theme
				const exportKey = `${prefix}${capitalize(scale)}${step}`;
				const variable = result[exportKey];
				if (variable) {
					ctx.variable(variable, colorValue);
				}
			}
		}

		// Override alpha colors in dark theme
		if (includeAlpha) {
			for (const scale of enabledScales) {
				const colors = darkAlphaColors[scale];
				const overrides = alphaDarkOverrides[scale] ?? {};

				for (const step of colorSteps) {
					const colorValue = overrides[step] ?? colors[step];

					// Get the variable reference and override its value in dark theme
					const exportKey = `${prefix}${capitalize(scale)}A${step}`;
					const variable = result[exportKey];
					if (variable) {
						ctx.variable(variable, colorValue);
					}
				}
			}
		}
	});

	return result as DefaultColorVariablesWithAlphaResult;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Capitalizes the first letter of a string
 */
function capitalize<T extends string>(str: T): Capitalize<T> {
	return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}

// =============================================================================
// Convenience Exports
// =============================================================================

/**
 * Minimal set of essential color scales for smaller bundle sizes.
 * Includes: gray, blue, red, green, amber, orange
 */
export const essentialColorScales: ColorScalesConfig = {
	gray: true,
	blue: true,
	red: true,
	green: true,
	amber: true,
	orange: true,
};

/**
 * All neutral gray scales.
 * Useful when you want grays but customized for different contexts.
 */
export const neutralColorScales: ColorScalesConfig = {
	gray: true,
	mauve: true,
	slate: true,
	sage: true,
	olive: true,
	sand: true,
};

import { config } from "@tamagui/config/v3";
import { createFont, createTamagui } from "tamagui";

const poppinsFont = createFont({
  family: "Poppins, sans-serif",
  weight: {
    400: "normal",
    700: "bold",
  },
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 20,
    5: 24,
    6: 32,
    7: 40,
    8: 48,
    9: 64,
  },
  lineHeight: {
    1: 18,
    2: 20,
    3: 22,
    4: 26,
    5: 30,
    6: 38,
    7: 46,
    8: 54,
    9: 72,
  },
  letterSpacing: {
    1: 0,
    2: 0.5,
  },
  style: {
    normal: "normal",
    italic: "italic",
  },
});

const customConfig = {
  ...config,
  fonts: {
    ...config.fonts,
    body: poppinsFont,
    heading: poppinsFont,
  },
};

const tamaguiConfig = createTamagui(customConfig);

// this makes typescript properly type everything based on the config
type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;

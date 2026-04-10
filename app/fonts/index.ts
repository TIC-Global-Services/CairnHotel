import localFont from "next/font/local";

export const clashDisplay = localFont({
  src: [
    {
      path: "./ClashDisplay-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./ClashDisplay-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./ClashDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./ClashDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./ClashDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
});

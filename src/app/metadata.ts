import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Immigration Case Assessment",
  description:
    "Get an assessment of your immigration case from experienced attorneys",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

import type { Dictionary } from "@/i18n";

export const en: Dictionary = {
  meta: {
    title: "Jingle Plan — Christmas advent calendar to review your year",
    description:
      "31 days of tasks for reflection, planning and inspiration. Review your year and plan the next one with Jingle Plan.",
    ogLocale: "en_US",
  },
  nav: { home: "Jingle Plan — back to top", language: "Language" },
  hero: {
    eyebrow: "Christmas yearly planner",
    titleBefore: "31 days to ",
    titleHighlight: "review your year",
    titleAfter: " and plan the next one",
    lead: "Your Christmas advent calendar with tasks for reflection, planning and inspiration.",
    note: "Free to install\nFull access with Jingle Plan+, {price} per year",
  },
  calendar: {
    title: "December",
    label: "Advent calendar preview",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  stores: {
    appStoreName: "App Store",
    appStoreAlt: "Download on the App Store",
    androidSmall: "Download for",
    androidName: "Android",
    androidApkName: "Android (APK)",
    androidShort: "Android",
    comingSoon: "Coming soon",
  },
  how: {
    title: "How Jingle Plan works",
    subtitle: "Three steps from the first to the last day of December.",
    steps: [
      {
        when: "From December 1",
        title: "Open a task every day",
        text: "Every day of December brings a new task and a festive track. A few minutes to pause, remember your wins and dream a little.",
      },
      {
        when: "Through the month",
        title: "Review your year and shape your plans",
        text: "Look at different areas of life: health, relationships, rest, work. Write down your insights, save important moments in your album and build plans for the next year.",
      },
      {
        when: "December 31",
        title: "Get your result",
        text: "You enter the New Year with your own story of the year: a review, memories and ready plans.",
      },
    ],
  },
  benefits: {
    title: "Why Jingle Plan",
    subtitle: "Pick a feature to see how it looks in the app.",
    screenAlt: "Jingle Plan app screen",
    items: [
      { id: "calendar", image: "home", title: "Advent calendar", text: "A new task every day of December" },
      { id: "summary", image: "summary", title: "Year in review", text: "Reflect on key events and achievements" },
      { id: "plans", image: "plans", title: "Plans for the year", text: "Goals across different areas of life" },
      { id: "album", image: "album", title: "Memory album", text: "Photos and stories of your year" },
      { id: "mood", image: "day", title: "Christmas mood", text: "A festive track and mood-lifting tasks" },
      { id: "progress", image: "progress", title: "Progress", text: "Track the tasks you completed" },
    ],
  },
  outcome: {
    title: "End the year with gratitude. Start the new one inspired",
    text: "By the end of December you will have more than completed tasks: your own story of the year — achievements, memories, insights and concrete plans for the future.",
    screens: { progress: "Progress", summary: "Summary", plans: "Plans" },
  },
  download: {
    title: "Download Jingle Plan",
    text: "Pick your phone and start December with a plan. The app is free to install, and full access comes with a yearly Jingle Plan+ subscription for {price}.",
    platforms: {
      ios: { label: "iPhone and iPad", text: "Install from the App Store" },
      android: { label: "Android", text: "Download the APK file from our website" },
    },
    subscriptionTitle: "About the subscription.",
    subscriptionText:
      "Jingle Plan+ is yearly access for {price} that renews automatically. Payment is charged to your Apple ID or Google Play account; cancel at least 24 hours before the period ends. The final price depends on your country and taxes.",
    apk: {
      version: "Version",
      size: "Size",
      sha: "SHA-256",
      unavailable: "The APK will be available shortly.",
      installTitle: "How to install the APK",
      installSteps: [
        "Open the downloaded file on your phone.",
        "Allow installation from this source if Android asks.",
        "Tap Install and open Jingle Plan.",
      ],
      mb: "MB",
    },
  },
  footer: {
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    support: "Contact us",
    instagram: "Instagram",
    cookies: "Cookie settings",
    copyright: "Jingle Plan. All rights reserved.",
  },
  consent: {
    text: "We use cookies for analytics and advertising only with your consent.",
    accept: "Accept",
    decline: "Decline",
    label: "Cookie consent",
  },
};

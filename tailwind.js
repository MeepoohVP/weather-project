//tailwind config
tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        fontFamily: {
          Kanit: "Kanit",
        },
        colors: {
          SkyBlue: "#9BDCFF",
          Zinc: "#fafafa",
          NightSky: "#2E4482",
          OrangePastel: "#F7CC84",
          GrayPastel: "#e8e8e8",
          PurpleDark:'#1A0033',
          S:'#4b6cb7',
          B:'#182848',
        },
        dropShadow: {
          "3xl": "5px 35px 35px rgba(0, 0, 0, 0.25)",
          "4xl": [
            "0 35px 35px rgba(0, 0, 0, 0.25)",
            "0 45px 65px rgba(0, 0, 0, 0.15)",
          ],
        },
      },
    },
  };
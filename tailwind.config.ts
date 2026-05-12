import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        plum: "#4b235f",
        orchid: "#a855f7",
        roseglow: "#f472b6",
        honey: "#f4c95d",
        mintnight: "#1f7a76",
        paper: "#fff8f2"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(82, 38, 113, 0.16)"
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at 20% 20%, rgba(244,114,182,.22), transparent 30%), radial-gradient(circle at 84% 10%, rgba(244,201,93,.20), transparent 32%), linear-gradient(135deg, #fff8f2 0%, #f8e7ff 48%, #fff4df 100%)"
      }
    }
  },
  plugins: []
};

export default config;

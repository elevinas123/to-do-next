/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        "1/4": "25vw",  // This sets the 'w-1/4' class to use 25% width
        "1/5": "20vw",  // This sets the 'w-1/4' class to use 25% width
        "1/6": "16.6vw",  // This sets the 'w-1/4' class to use 25% width
        "10vw": "10vw",
        "15vw": "15vw",
        "20vw": "20vw",
        "30vw": "30vw",
        "40vw": "40vw",
        "50vw": "50vw",
        "60vw": "60vw",
        "70vw": "70vw",
        "80vw": "80vw",
        "90vw": "90vw",
        "100vw": "100vw",
      },
      height: {
        "1/4": "25vh",  // This sets the 'w-1/4' class to use 25% width
        "1/5": "20vh",  // This sets the 'w-1/4' class to use 25% width
        "1/6": "16.6vh",  // This sets the 'w-1/4' class to use 25% width
        "10vh": "10vh",
        "15vh": "15vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
      },
      textDecorationStyle: {
        'custom': 'dashed',
      },
      textDecorationThickness: {
        'custom': '4px',
      },
    },
    keyframes: {
      rollout: {
        '0%': { transform: 'scale(0.95)', opacity: 0 },
        '100%': { transform: 'scale(1)', opacity: 1 },
      },
    },
    animation: {
      rollout: 'rollout 0.3s ease-out',
    },
  },
  daisyui: {
    themes: [
      {
        todoTheme: {
          "primary": "#f7edf0ff",
          "secondary": "#f4cbc6ff",
          "accent": "#f4afabff",
          "neutral": "#f4eea9ff",
          "base-100": "#f4f482ff",
          "base-200": "#86b59eff",
        },
      },
      
    ],
  },
  plugins: [require("daisyui")],
  variants: {
    extend: {
      backgroundColor: ['after'],
      width: ['after'],
      height: ['after'],
      position: ['after'],
      inset: ['after'],
      content: ['after'],
      textDecorationStyle: ['responsive', 'hover'],
      textDecorationThickness: ['responsive', 'hover'],
    },
  },
}

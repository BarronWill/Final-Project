/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      'dark-blue': '#012970',
      'blue': '#023da3e1',
      'light-blue': '#BACDE5',
      'stone-white': '#F8FAF9',
      'cloud-grey' : '#DAD8D4',
      'light-green': '#C6EFBE',
      'dark-green': '#43CD80',
      'light-yellow': '#EFE1BE',
      'yellow': '#FEEF26',
      'light-red': '#EFCDBE',
      'red': '#E12527',
      'orange': '#FEAE35',
      'black': '#000000',
      'white': '#FFFFFF',
      'inherit': 'inherit'
    },
    fontSize:{
      'header': '1.728rem',
      'subheader': '1.44rem',
      'body': '1rem',
      'caption': '0.833rem',
      'tiny': '0.694rem',
      'inherit': 'inherit'
    },

    borderColor:{
      'transparent': 'transparent',
      'blue': '#023da3e1',
      'cloud-grey': '#DAD8D4',
      'black': '#000000',
      'dark-blue': '#012970',
      'inherit': 'inherit'
      
    },
    extend: {
      boxShadow: {
        'custom-blue': '0px 0px 20px #DAD8D4',
      },
      width:{
        'sidebar': '250px',
      },
      inset:{
        'sidebar': '260px',
      },
      spacing:{
        'sidebar': '250px',
      },
    },
  },
  plugins: [],
}


export const getFlag = (code) =>
  `<img src="https://flagcdn.com/w80/${code.slice(0, 2).toLowerCase()}.png"
     alt="${code} flag" class="flag" />`;

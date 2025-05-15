const mediaSize = {
  isXl: false,
  isLgm: false,
  isLg: false,
  isMd: false,
  isSm: false,
  isSsm: false,
};

function updateMediaFlags() {
  const width = window.innerWidth;
  mediaSize.isXl = width <= 1520;
  mediaSize.isLgm = width <= 1220;
  mediaSize.isLg = width <= 991;
  mediaSize.isMd = width <= 767;
  mediaSize.isSm = width <= 575;
  mediaSize.isSsm = width <= 380;
}

updateMediaFlags();

window.addEventListener("resize", updateMediaFlags);

export default mediaSize;

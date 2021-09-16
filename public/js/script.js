document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log(window.location.href)
    if(window.location.href.includes("localhost")) return

    if (location.protocol !== 'https:') {
      location.replace(
        `https:${location.href.substring(location.protocol.length)}`
      );
    }
  },
  false
);

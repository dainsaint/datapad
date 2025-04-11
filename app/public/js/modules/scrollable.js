export default function initScrollables() {
  const scrollables = document.querySelectorAll(".js-scrollable");
  scrollables.forEach(scrollable => {
    scrollable.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  })
};
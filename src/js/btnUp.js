import throttle from 'lodash.throttle';

const upBtn = document.querySelector('[data-btn-up]');
        
window.addEventListener('scroll', throttle(hideElemOnScroll(upBtn), 250));
upBtn.addEventListener('click', pageUpOnClick);

function hideElemOnScroll(elem) {
  return function hideOnScroll(el) {
    if (pageYOffset < document.documentElement.clientHeight) {
      elem.classList.add('visually-hidden');
    } else {
      elem.classList.remove('visually-hidden');
    }
  };
}




// function handleScroll() {
//   const scrollableHeight =
//     document.documentElement.scrollHeight - document.documentElement.clientHeight;

//   if (document.documentElement.scrollTop / scrollableHeight > 0.3) {
//     if (!scrollBtn.classList.contains('show-scroll-btn'))
//       scrollBtn.classList.add('show-scroll-btn');
//   } else {
//     if (scrollBtn.classList.contains('show-scroll-btn'))
//       scrollBtn.classList.remove('show-scroll-btn');
//   }
// }

// const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// scrollBtn.addEventListener('click', scrollToTop);

// const upBtn = document.querySelector('[data-up-btn]');

// window.addEventListener('scroll', throttle(hideElOnScroll(upBtn), 250));
// upBtn.addEventListener('click', toPageTopOnClick);

// function hideElOnScroll(el) {
//   return function hideOnScroll(e) {
//     if (pageYOffset < document.documentElement.clientHeight) {
//       el.classList.add('visuallyhidden');
//     } else {
//       el.classList.remove('visuallyhidden');
//     }
//   };
// }

function pageUpOnClick() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

//export { pageUpOnClick };
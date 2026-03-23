(function () {
  // Product data map
  const productsMap = {
    "products": {
      "name": "Products",
      "categories": [
        { "name": "Makita DUC150Z 18V Pruning Saw", "img": "/media/catalog/product/m/a/makita-duc150z-18v-lxt-brushless-pruning-saw.jpg", "href": "/makita-duc150z-18v-lxt-brushless-pruning-saw", "basePrice": 131.38, "newProduct": true },
        { "name": "Makita DUR190URT8 18V Cutter", "img": "/media/catalog/product/m/a/makita-dur190urt8-18v-liion-lxt-brushless-brush-cutter-cw-5ah-battery-charger-10.jpg", "href": "/makita-dur190urt8-18v-liion-lxt-brushless-brush-cutter-cw-5ah-battery-charger", "basePrice": 120.43, "springDeal": true },
        { "name": "Makita DLM330RT 18V Lawn Mower", "img": "/media/catalog/product/d/l/dlm330_d1ck.jpg", "href": "/makita-dlm330rt-18v-lxt-lawn-mower-with-5ah-battery-rapid-charger", "basePrice": 160.27, "newProduct": true },
        { "name": "Makita DHP490Z 18V Combi Drill", "img": "/media/catalog/product/m/a/makita-dhp490z-18v-lxt-brushless-combi-drill-body-only.jpg", "href": "/makita-dhp490z-18v-lxt-brushless-combi-drill-body-only", "basePrice": 65.00, "fromPrice": true, "newProduct": true },
        { "name": "Makita DGA452Z 18V Angle Grinder", "img": "/media/catalog/product/m/a/makita-dga452z-18v-liion-grinder-body-only.jpg", "href": "/makita-dga452z-18v-liion-grinder-body-only", "basePrice": 55.02, "springDeal": true },
        { "name": "Makita DUP181Z 18V Pruning Shears", "img": "/media/catalog/product/b/5/b5200739-makita-dup181z-18v-lxt-brushless-pruning-shears_a1.jpg", "href": "/makita-dup181z-18v-lxt-brushless-pruning-shears-body-only", "basePrice": 111.77, "newProduct": true },
        { "name": "Makita DLX2549TJ 18V Brushless Twin Kit", "img": "/media/catalog/product/m/a/makita-dlx2549tj-lxt-brushless-twin-kit-inc-2-x-5ah-batteries-and-dc18rc-charger-lifestyle_1.jpg", "href": "/makita-dlx2549tj-lxt-brushless-twin-kit-inc-2-x-5ah-batteries-dc18rc-charger", "basePrice": 312.29, "springDeal": true },
        { "name": "Makita BL1890 18V 9.0Ah Battery", "img": "/media/catalog/product/m/a/makita-bl1890-lxt-18v-90ah-liion-battery.jpg", "href": "/makita-bl1890-lxt-18v-90ah-liion-battery", "basePrice": 84.00, "springDeal": true },
        { "name": "Makita DUH506RT 18V Hedge Trimmer", "img": "/media/catalog/product/m/a/makita-duh506rt-18v-lxt-brushless-hedge-trimmer-cw-5ah-battery-rapid-charger-lifestyle-2.jpg", "href": "/makita-duh506rt-18v-lxt-brushless-hedge-trimmer-cw-5ah-battery-rapid-charger", "basePrice": 134.23, "newProduct": true },
        { "name": "Makita BL1850B 18V 5Ah Battery", "img": "/media/catalog/product/m/a/makita-bl1850b-18v-5ah-battery-lifestyle.jpg", "href": "/makita-bl1850b-5ah-battery", "basePrice": 49.50, "springDeal": true },
        { "name": "Makita UR3000/2 240V Line Trimmer", "img": "/media/catalog/product/m/a/makita-ur3000-2-240v-electric-linetrimmer-a1.jpg", "href": "/makita-ur30002-240v-electric-linetrimmer", "basePrice": 41.95, "springDeal": true },
        { "name": "Makita BL1860B 18V 6Ah Battery", "img": "/media/catalog/product/m/a/makita-bl1860b-18v-6ah-battery-lifestyle_1.jpg", "href": "/makita-bl1860b-1974224-18v-6ah-battery", "basePrice": 64.55, "springDeal": true },
        { "name": "Makita BKP180Z 18V Planer", "img": "/media/catalog/product/m/a/makita-dkp180z-18v-lxt-cordless-planer-body-only-lifestyle_1.jpg", "href": "/makita-bkp180z-18-volt-planer-body-only", "basePrice": 106.10, "springDeal": true },
        ]
    }
  };

  // Generic carousel initialization function
  function initializeCarousel({
    containerId,
    cardSelector,
    prevBtnId,
    nextBtnId,
    bottomBtnsSelector,
    skip = 0,
  }) {
    const scrollContainer = document.getElementById(containerId);
    const cards = scrollContainer ? Array.from(scrollContainer.querySelectorAll(cardSelector)) : [];
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const bottomButtonsContainer = document.querySelector(bottomBtnsSelector);
    const bottomButtons = bottomButtonsContainer ? bottomButtonsContainer.querySelectorAll('button') : [];
    const step = Math.max(1, (Number.isFinite(skip) ? Math.floor(skip) : 0) + 1);
    
    function getCurrentIndex() {
      const containerCenter = scrollContainer.scrollLeft + scrollContainer.offsetWidth / 2;
      let closest = 0, minDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(containerCenter - cardCenter);
        if (dist < minDist) {
          closest = i;
          minDist = dist;
        }
      });
      return closest;
    }
    
    function snapToCard(idx) {
      if (!cards.length) return;
      let targetIdx = Math.max(0, Math.min(idx, cards.length - 1));
      if (targetIdx == skip) {
        targetIdx = 0;
      }
      const card = cards[targetIdx];
      const targetLeft = card.offsetLeft - (scrollContainer.clientWidth - card.clientWidth) / 2;
      scrollContainer.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
    
    function go(direction) {
      const current = getCurrentIndex();
      snapToCard(current + direction * step);
    }
    
    prevBtn?.addEventListener('click', () => go(-1));
    nextBtn?.addEventListener('click', () => go(1));
    
    if (bottomButtons.length === 2) {
      bottomButtons[0].addEventListener('click', () => go(-1));
      bottomButtons[1].addEventListener('click', () => go(1));
    }
    
    if (containerId === 'BoschScrollContainerNew') {
      window.addEventListener("resize", () => { snapToCard(getCurrentIndex()); });
      document.addEventListener("DOMContentLoaded", () => { snapToCard(getCurrentIndex()); });
    }
  }

  // Makita product carousel initialization
  function initializeMakitaCarousel() {
    let products = Object.keys(productsMap);
    const carousels = [];
    const prevButtons = [];
    const nextButtons = [];
    const carouselContainers = [];
    const carouselIndexMap = {};

    products = products.filter(material => {
      const exists = productsMap[material] && document.getElementById(`makita-product-carousel`);
      if (!exists) console.warn(`Carousel for ${material} not found or missing in productsMap`);
      return exists;
    });

    products.forEach((material, index) => {
      const section = document.getElementById(`makita-product-carousel`);
      if (!section) return;

      const carousel = section.querySelector('.makita-product-carousel');
      const container = section.querySelector('.makita-product-carousel-container');
      const prevBtnSide = section.querySelector('#MakitaPrevBtn');
      const nextBtnSide = section.querySelector('#MakitaNextBtn');
      const prevBtnBottom = section.querySelector('.makita-bottom-buttons .prevBtn');
      const nextBtnBottom = section.querySelector('.makita-bottom-buttons .nextBtn');

      if (!carousel || !container) return;

      carousels.push(carousel);
      carouselContainers.push(container);
      carouselIndexMap[material] = 0;

      prevButtons.push({ side: prevBtnSide, bottom: prevBtnBottom });
      nextButtons.push({ side: nextBtnSide, bottom: nextBtnBottom });

      carousel.innerHTML = '';

      const category = productsMap[material];
      const uniqueProducts = category.categories.filter(
        (product, idx, self) => idx === self.findIndex(p => p.href === product.href)
      );

      uniqueProducts.forEach(product => {
        const item = document.createElement('div');
        item.className = 'makita-product-carousel-item';
        
        const newProductHtml = product.newProduct ? `
          <div class="new-product-spring-deal-circle">
            <div class="new-product-spring-deal-text">
              <span class="new-product-spring-deal">NEW<br>ITEM</span>
            </div>
          </div>
        ` : '';

        const springDealHtml = product.springDeal ? `
          <div class="new-product-spring-deal-circle">
            <div class="new-product-spring-deal-text">
              <span class="new-product-spring-deal">SPRING<br>DEAL</span>
            </div>
          </div>
        ` : '';
        
        const priceHtml = `
          <div x-data="{ basePrice: ${product.basePrice} }">
            <p class="mx-auto text-center text-sm">
              Only £<span x-text="(basePrice * ($store.vatSwitch.state ? 1.20 : 1)).toFixed(2)"></span> 
              <span x-text="$store.vatSwitch.state ? 'Inc VAT' : 'Ex VAT'"></span>
            </p>
          </div>
        `;
        
        item.innerHTML = `
<form class="makita-product-carousel-item-content w-full" style="position: relative;">
  ${newProductHtml}
  ${springDealHtml}
  <img src="${product.img}" alt="${product.name}" title="${product.name}" class="makita-product-carousel-item-image">
  <div class="makita-product-carousel-item-details w-full">
    <div class="flex flex-row items-center gap-4 justify-start" style="padding: 8px; padding-left: 0px; min-height: 50px;">
      <p class="truncate-2-lines text-base font-semibold pb-2 mx-auto text-center w-4/5">
        ${product.name}
      </p>
    </div>
    
    ${priceHtml}

    <div class="pt-2 pb-2 flex z-50 makita-deals-shop-now" style="margin: 0 auto;">
      <a href="${product.href}" class="py-2 w-full makita-deals-shop-now-btn justify-center text-sm rounded uppercase font-bold focus:border-primary focus:outline-none focus:ring-0 mr-auto" aria-label="SHOP NOW">
        <svg class="w-6 h-auto flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 328.8"><path d="M387.61,142.63h-116.59l-27.11-61.22c3.52-3.46,4.83-8.84,2.9-13.69l-21.21-53.51c-5.22-11.89-17.75-17.11-26.2-12.32l-1.1-.44c-10.5-4.17-20.52,1.02-24.69,11.53l-21.21,53.5c-1.9,4.8-.64,10.1,2.77,13.55l-.26,.18-27.57,62.42H12.45c-.26,0-.52,0-.77,.02-6.5,.29-11.68,4.32-11.68,9.19v6.79c0,5.07,5.99,9.49,12.83,9.49h3.52l52.04,148.59c2.54,7.25,9.38,12.11,17.07,12.11h220.59c7.4,0,14.06-4.52,16.8-11.4l59.16-148.73h5.64c.29,0,.58,0,.86-.03,6.45-.39,11.49-5.17,11.49-10.02v-6.79c0-5.05-5.57-9.19-12.39-9.2Zm-122.93,60.13h-55.65v-34.72h61.02l-5.38,34.72Zm-7.75,50.05h-47.9v-32.17h52.88l-4.98,32.17Zm-119.42-32.17h53.04l-.06,32.17h-48.18l-4.81-32.17Zm33.86-132.76l.09-.5c5.78,1.02,11.72-2.13,13.97-7.79l13.92-35.1,14.41,36.34c2.13,5.36,7.57,8.47,13.06,7.91h0s.06,.17,.09,.28c0,.03,.02,.06,.02,.08,0,0,0,.02,0,.02l24.7,53.53h-104.82l24.55-54.76Zm19.28,80.16l-.06,34.72h-55.76l-5.2-34.72h61.01Zm-146.03,0H111.83l5.05,34.72H56.87l-12.25-34.72Zm19.4,52.6h55.46l4.69,32.17h-49.17l-10.98-32.17Zm29.87,84.25l-12.26-34.21h45.13l4.98,34.21h-37.84Zm56.22,0l-5.12-34.21h45.46l-.06,34.21h-40.28Zm58.91,0v-34.21h45.13l-5.3,34.21h-39.83Zm90.13,0h-32.17l5.39-34.21h39.54l-12.76,34.21Zm20.42-52.08h-44.38l5.08-32.17h52.59l-13.28,32.17Zm21.45-50.05h-57.94l5.47-34.72h66.76l-14.29,34.72Z"></path></svg>
        <span class="ml-2 inline text-nowrap">SHOP NOW</span>
      </a>
    </div>
  </div>
</form>`;
        carousel.appendChild(item);
      });

      if (uniqueProducts.length <= 1) {
        if (prevBtnSide) prevBtnSide.classList.add('hidden');
        if (nextBtnSide) nextBtnSide.classList.add('hidden');
        if (prevBtnBottom) prevBtnBottom.classList.add('hidden');
        if (nextBtnBottom) nextBtnBottom.classList.add('hidden');
      }
    });

    function getVisibleItems() {
      if (window.innerWidth <= 350) return 1.1;
      if (window.innerWidth <= 600) return 1.3;
      if (window.innerWidth <= 880) return 2;
      if (window.innerWidth <= 1280) return 3;
      return 4;
    }

    function getMaxIndex(material) {
      const uniqueCount = productsMap[material].categories.filter(
        (product, idx, self) => idx === self.findIndex(p => p.href === product.href)
      ).length;
      return Math.max(uniqueCount - getVisibleItems(), 0);
    }

    function updateCarousel(material) {
      const idx = products.indexOf(material);
      const carousel = carousels[idx];
      if (!carousel) return;

      const items = carousel.querySelectorAll('.makita-product-carousel-item');
      if (!items.length) return;

      const visibleItems = getVisibleItems();
      const maxIndex = getMaxIndex(material);
      
      carouselIndexMap[material] = Math.max(0, Math.min(carouselIndexMap[material], maxIndex));

      const itemWidthPercent = 100 / visibleItems;
      items.forEach(item => {
        item.style.flex = `0 0 ${itemWidthPercent}%`;
        item.style.maxWidth = `${itemWidthPercent}%`;
      });

      const itemWidthPx = items[0].getBoundingClientRect().width;
      const totalWidth = itemWidthPx * items.length;
      const containerWidth = carousel.parentElement.getBoundingClientRect().width;
      const maxTranslate = Math.max(totalWidth - containerWidth, 0);

      let translateX = carouselIndexMap[material] * itemWidthPx;
      translateX = Math.max(0, Math.min(Math.round(translateX), maxTranslate));

      carousel.style.transform = `translateX(-${translateX}px)`;
    }

    function nextProduct(material) {
      const maxIndex = getMaxIndex(material);
      const currentIndex = carouselIndexMap[material];
      
      if (currentIndex < maxIndex) {
        carouselIndexMap[material] = Math.min(currentIndex + 1, maxIndex);
        updateCarousel(material);
      }
    }

    function prevProduct(material) {
      const currentIndex = carouselIndexMap[material];
      
      if (currentIndex > 0) {
        carouselIndexMap[material] = Math.max(currentIndex - 1, 0);
        updateCarousel(material);
      }
    }

    products.forEach((material, index) => {
      const prevBtns = prevButtons[index];
      const nextBtns = nextButtons[index];
      const carouselContainer = carouselContainers[index];

      if (prevBtns.side) prevBtns.side.addEventListener('click', () => prevProduct(material));
      if (nextBtns.side) nextBtns.side.addEventListener('click', () => nextProduct(material));
      if (prevBtns.bottom) prevBtns.bottom.addEventListener('click', () => prevProduct(material));
      if (nextBtns.bottom) nextBtns.bottom.addEventListener('click', () => nextProduct(material));

if (carouselContainer) {
  let touchStartX = 0;
  let touchStartTime = 0;
  let isSwiping = false;
  let hasMoved = false;

  carouselContainer.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartTime = Date.now();
    isSwiping = false;
    hasMoved = false;
  });
  
  carouselContainer.addEventListener('touchmove', e => {
    hasMoved = true;
    
    if (isSwiping) {
      e.preventDefault();
      return;
    }
    
    const touchMoveX = e.touches[0].clientX;
    const swipeDistance = touchStartX - touchMoveX;
    const swipeThreshold = window.innerWidth * 0.25;
    const maxIndex = getMaxIndex(material);
    const currentIndex = carouselIndexMap[material];
    
    if ((swipeDistance > 0 && currentIndex >= maxIndex) || 
        (swipeDistance < 0 && currentIndex <= 0)) {
      e.preventDefault();
      return;
    }
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        if (currentIndex < maxIndex) {
          isSwiping = true;
          e.preventDefault();
          nextProduct(material);
        }
      } else {
        if (currentIndex > 0) {
          isSwiping = true;
          e.preventDefault();
          prevProduct(material);
        }
      }
    }
  }, { passive: false });
  
  carouselContainer.addEventListener('touchend', e => {
    if (!hasMoved) {
      isSwiping = false;
      return;
    }
    
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;
    const swipeTime = Date.now() - touchStartTime;
    const maxIndex = getMaxIndex(material);
    const currentIndex = carouselIndexMap[material];
    
    if (!isSwiping && Math.abs(swipeDistance) > 50 && swipeTime < 300) {
      if (swipeDistance > 0 && currentIndex < maxIndex) {
        nextProduct(material);
      } else if (swipeDistance < 0 && currentIndex > 0) {
        prevProduct(material);
      }
    }
    
    setTimeout(() => {
      const finalIndex = carouselIndexMap[material];
      carouselIndexMap[material] = Math.max(0, Math.min(finalIndex, maxIndex));
      updateCarousel(material);
    }, 100);
    
    isSwiping = false;
    hasMoved = false;
  });
  
  carouselContainer.style.touchAction = 'pan-y pinch-zoom';
}

});

    function updateCarousels() {
      products.forEach(material => updateCarousel(material));
    }

    window.addEventListener('resize', updateCarousels);
    updateCarousels();
  }

  // Initialize all carousels on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize generic carousels
    initializeCarousel({
      containerId: 'CategoryScrollContainer',
      cardSelector: '.inline-block',
      prevBtnId: 'CategoryPrevBtn',
      nextBtnId: 'CategoryNextBtn',
      bottomBtnsSelector: '.category-buttons'
    });

    initializeCarousel({
      containerId: 'BoschScrollContainerNew',
      cardSelector: '.bosch-card-new',
      prevBtnId: 'BoschNewPrevBtn',
      nextBtnId: 'BoschNewNextBtn',
      bottomBtnsSelector: '.bosch-bottom-buttons-new',
      skip: 1,
    });

    initializeCarousel({
      containerId: 'HomePageScrollContainer',
      cardSelector: '.inline-block',
      prevBtnId: 'HomePagePrevBtn',
      nextBtnId: 'HomePageNextBtn',
      bottomBtnsSelector: '.home-page-bottom-buttons'
    });

    // Initialize Makita carousel
    initializeMakitaCarousel();

   // Fade animations
    if (window.innerWidth >= 767) {
      const fadeFromTopItems = document.querySelectorAll(".fade-from-top");
      const fadeTopObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
      );
      fadeFromTopItems.forEach((el) => fadeTopObserver.observe(el));
      
      const fadeFromSideItems = document.querySelectorAll(".fade-from-side");
      const fadeSideObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px -50px 0px 0px" }
      );
      fadeFromSideItems.forEach((el) => fadeSideObserver.observe(el));
    } else {
     
      document.querySelectorAll(".fade-from-top, .fade-from-side").forEach((el) => {
        el.classList.add("visible");
      });
    }
    }); 

  // Category scroll reset on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1430) {
      const container = document.getElementById('CategoryScrollContainer');
      if (container) {
        container.scrollLeft = 0;
        container.scrollTop = 0;
      }
    }
  });
})();

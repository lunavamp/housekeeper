import {init, onClick, onClickHash, onReady, vAnimRun} from './cfjs'

init({
	loadedAnimAfter: '.header',
	onScrollThrottle:10,
});
onReady(()=>{
	vAnimRun('.footer', ()=>vAnimRun('#start'))
})


// onClick('header-burger', ()=>{
// 	bc.toggle('header-menu-active');
// });

onClick(/modal-(active|close)-(.+)/, (e, [query, action]) => {
	bc.toggle(query, action === 'active');
	gtag('event', action)
});


onClick(/(overlay|close-modal)/, () => {
	bc.forEach(name => {
		if (name.includes('modal-active')) {
			bc.remove(name)
			const md = $("."+name.replace('-active-', '-'));
			md.classList.forEach(clName => {
				if(clName.startsWith('is-')){
					setTimeout(()=>{
						md.classList.remove(clName)
					}, 300)
				}
			})
			gtag('event', name.replace('active', 'close'))
		}
	})
})

onClickHash(()=>{
	bc.remove('header-menu-active')
})


// ---------- Языки ----------
const languageSelect = document.getElementById('language-select');
const langElements = document.querySelectorAll('.lang');

function setLanguage(lang) {
  langElements.forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      el.innerHTML = text;
    }
  });
}

// Автоматическое определение языка браузера (упрощённый пример)
function detectBrowserLanguage() {
  const userLang = navigator.language.slice(0, 2).toLowerCase();
  if (['en', 'ru', 'es'].includes(userLang)) {
    return userLang;
  }
  return 'en';
}

// При загрузке страницы – ставим язык
const initialLang = detectBrowserLanguage();
languageSelect.value = initialLang;
setLanguage(initialLang);

// При смене языка
languageSelect.addEventListener('change', () => {
  setLanguage(languageSelect.value);
});

// ---------- Мобильное меню ----------
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
});

// Закрываем меню при клике на ссылку (для удобства)
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
  });
});

// ---------- FAQ раскрытие ----------
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// ---------- Кнопка отправки заявки ----------
const sendApplicationBtn = document.getElementById('send-application');
const contactOptions = document.getElementById('contact-options');
const whatsappLink = document.getElementById('whatsapp-link');
const telegramLink = document.getElementById('telegram-link');

sendApplicationBtn.addEventListener('click', () => {
  // Тут можете сформировать текст сообщения на основе введённых данных
  const name = document.getElementById('contact-name').value;
  const phone = document.getElementById('contact-phone').value;
  const city = document.getElementById('contact-city').value;
  const experience = document.getElementById('contact-experience').value;

  // Пример: передаём текст напрямую в ссылку WhatsApp/Telegram
  const message = encodeURIComponent(
    `New application:\nName: ${name}\nPhone: ${phone}\nCity: ${city}\nExperience: ${experience}`
  );

  whatsappLink.href = `https://wa.me/1234567890?text=${message}`; 
  telegramLink.href = `https://t.me/username?text=${message}`;

  // Показываем блок выбора мессенджера
  contactOptions.style.display = 'flex';
});

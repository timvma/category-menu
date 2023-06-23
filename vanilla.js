const openMenuButton = document.querySelector('.menu__open');
const backButton = document.querySelector('.menu__previous');
const menu = document.getElementById('menu');
const menuLinksContainer = document.querySelector('.menu__container');

const menus = [
  { parent: "main", handle: "basketball", name: "BASKETBALL" },
  { parent: "basketball", handle: "basketball-ball", name: "Ball" },
  { parent: "basketball", handle: "basketball-bag", name: "Bag" },
  { parent: "basketball-ball", handle: "basketball-ball-5", name: "Size 5", link: "/" },
  { parent: "basketball-bag", handle: "basketball-bag-30l", name: "30L", link: "/" },
  { parent: "basketball-bag", handle: "basketball-bag-big", name: "Big" },
  { parent: "basketball-bag", handle: "basketball-bag-small", name: "Small"},
  { parent: "basketball-bag-small", handle: "basketball-bag-small-15", name: "15L"},

  { parent: "main", handle: "soccer", name: "SOCCER" },
  { parent: "main", handle: "volleyball", name: "VOLLEYBALL" },
  { parent: "main", handle: "handball", name: "HANDBALL" },
  { parent: "main", handle: "others", name: "OTHERS" },

  { parent: "soccer", handle: "soccer-ball", name: "Ball" },
  { parent: "soccer-ball", handle: "soccer-ball-5", name: "30L", link: "/" }
];

const history = ['main'];

function navigate(list) {
  history.push(list.handle);
  updateMenu();
}

function back() {
  if (history[history.length - 1] === 'main') {
    menu.classList.toggle('menu--active');
  } else {
    history.pop();
    updateMenu();
  }
}

async function updateMenu() {
  const currentMenuHandle = history[history.length - 1];

  if (currentMenuHandle === 'main') 
    menu.classList.remove('menu--hide');
  else 
    menu.classList.add('menu--hide');
  
 let hello = setTimeout(() => {
  
  }, 5000);
  
  let wee = await hello;

  menuLinksContainer.innerHTML = '';

  const fragment = document.createDocumentFragment();
  const currentLists = menus.filter(menu => menu.parent === currentMenuHandle);
  let delay = 1
  currentLists.forEach(({ name, link }) => {
    const menuLink = document.createElement('div');
    menuLink.className = 'menu__links menu__links--loading';

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link;
      anchor.textContent = name;
      menuLink.appendChild(anchor);
    } else {
      const span = document.createElement('span');
      span.textContent = name;
      menuLink.appendChild(span);
    }

    fragment.appendChild(menuLink);
    
    setTimeout(() => {
      menuLink.classList.remove('menu__links--loading')
    }, 100 * delay);
    
    delay++
  });

  menuLinksContainer.appendChild(fragment);
 
}

openMenuButton.addEventListener('click', () => menu.classList.toggle('menu--active'));
backButton.addEventListener('click', back);

menu.addEventListener('click', (event) => {
  const span = event.target.closest('span');
  if (span) {
    const list = menus.find(menu => menu.name === span.textContent);
    navigate(list);
  }
});

updateMenu();

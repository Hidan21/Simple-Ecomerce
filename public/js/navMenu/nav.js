export const btnMenu = document.querySelector('.btn-menu');
export const menuList = document.querySelector('.menu-list');
const menulink = document.querySelectorAll('.menu-list a');

btnMenu.addEventListener('click', activarMenu);

function activarMenu() {
  menuList.classList.toggle('mostrar');
  menulink.forEach((todosLosA, i) => {
    todosLosA.addEventListener('click', () => {
      menuList[i] = menuList.classList.remove('mostrar');
    });
  });
}

export { activarMenu };

'use strict';

const hamburger = document.querySelector('.hamburger');
// const leftMenu = document.querySelector('.menu');
const leftMenu = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-hamburger');
const close = document.querySelector('.header-content');

const anhors = document.querySelectorAll('a[href*="#"]');

const count = document.querySelectorAll('.count');

const projectsPortfolio = document.querySelector('.projects');
const projectItem = document.querySelectorAll('.project-item');
const projectItemHover = document.querySelector('.project-item-hover');


class DBConnect {
    getData = async (url) => {
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Failed to access data ${url}`)
        }
    }
    getDbData = async () => {
        return await this.getData('db/db.json')
    }
}

// const dbConnect = new DBConnect();


/* FUNCTIONS */
const openMenu = () => leftMenu.classList.toggle('show');
const closeMenu = ev => {
    if (ev.target.closest('.header-content')) {
        leftMenu.classList.remove('show');
    }

}

const smoothScroll = () => {
    for (let anhor of anhors) {
        anhor.addEventListener('click', ev => {
            ev.preventDefault();
            const blockId = anhor.getAttribute('href');
            document.querySelector('' + blockId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        })
    }
}

const counterBlock = () => {
    for (let i of count) {
        const numberTop = i.getBoundingClientRect().top;
        let start = +i.innerHTML;
        let end = +i.dataset.count;

        window.addEventListener('scroll', function onScroll() {
            if (window.pageYOffset > numberTop - window.innerHeight / 1) {
                this.removeEventListener('scroll', onScroll);
                let interval = setInterval(() => {
                    i.innerHTML = ++start;
                    if (start === end) {
                        clearInterval(interval);
                    }
                }, 5)
            }

        });
    }
}

const navigationFixed = () => {
    const show = document.querySelector('.scroll-menu')
    window.addEventListener('scroll', function onScroll() {
        if (window.pageYOffset > window.innerHeight / 1) {
            show.classList.add('scroll-menu-show');
        } else {
            show.classList.remove('scroll-menu-show');
        }
    })
}


function sliderCreate(element, params) {
    let sliderCont = element.querySelector('.slides');
    let sliderItem = element.querySelectorAll('.slider-item');
    const block = document.querySelector('.delelopers-block');
    let indent = sliderItem.length;
    sliderCont.style.width = (indent * 100) + "%";

    let index = 0;
    let nextSlide;
    let prevSlide;
    let interval;

    let scrollSliderFunc = function (n) {
        index += n;
        if (index <= -(indent) * 100) {
            index = 0;
        } else if (index > 0) {
            index = -(indent - 1) * 100;
        }
        sliderCont.style.left = `${index}%`;
        if (params.dots) {
            showActivDots(-index / 100);
        }

        function showActivDots(currIndexSlide) {
            let dotsItem = block.getElementsByClassName('slider-dots_item');

            for (let i = 0; i < dotsItem.length; i++) {
                dotsItem[i].className = dotsItem[i].className.replace(" active", "");
            }
            dotsItem[currIndexSlide].className += " active";
        }
    }

    if (params.autoPlay) {
        let interval = setInterval(function () {
            scrollSliderFunc(-100)
        }, 4000);

        element.addEventListener('mouseover', function () {
            clearInterval(interval);
        });

        element.addEventListener('mouseout', function () {
            interval = setInterval(function () {
                scrollSliderFunc(-100)
            }, 4000);
        });
    }

    if (params.dots) {
        let dots = document.createElement('div');
        dots.className = 'slider-dots';
        block.appendChild(dots);

        for (let i = 0; i < sliderItem.length; i++) {
            let createDot = document.createElement('span');
            dots.appendChild(createDot);
            createDot.className = 'slider-dots_item';
        }

        let dotsItem = block.getElementsByClassName('slider-dots_item');
        dotsItem[0].classList.add('active');
        for (let dot of dotsItem) {
            dot.classList.remove('active');
        }
        dotsItem[-index / 100].classList.add('active');

        let dotScrollFunc = function (n) {
            scrollSliderFunc(index = -(n * 100 / 2));
        }

        dots.addEventListener('click', function (e) {
            for (let i = 0; i < dotsItem.length; i++) {
                if (e.target.classList.contains('slider-dots_item') && e.target == dotsItem[i]) {
                    dotScrollFunc(i);
                }
            }
        });
    }
}

sliderCreate(document.querySelector('.developers-slider'), {
    dots: true,
    autoPlay: true,
});


const createProject = data => {
    data.results.forEach(item => {
        const {title, img, category, id} = item
        const card = document.createElement('div');
        card.classList.add('project-item');
        card.dataset.category = `${category}`
        card.style.backgroundImage = `url(${img})`;
        card.innerHTML = `
                <div class="project-item-hover">
                    <h3 class="hover-title">${title}</h3>
                    <button id="modal ${id}"
                            class="hover-button modal-open"
                            data-open-modal="">Подробнее ...
                    </button>
                </div>
        `
        console.log(card);
        projectsPortfolio.appendChild(card);
    })
}


// const modalWindow = () => {
//     const element = document.querySelector('.modal-overlay');
//     const elItem = document.querySelector('.modal');
//     // const target = ev.target;
//
//     // data.results.forEach(item => {
//     //     const {title, description, author, link} = item
//     //     const modalContent = document.createElement('div');
//     //     modalContent.className = 'modal-content';
//     //     modalContent.innerHTML = `
//     //                 <h3 class="modal-title">${title}</h3>
//     //                 <div class="description">
//     //                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dignissimos doloremque esse in
//     //                     ipsam, optio pariatur quos ullam. Asperiores dicta dolorem excepturi ipsa maiores nobis non
//     //                     provident quam ratione temporibus.
//     //                 </div>
//     //                 <div class="link">Link to site</div>
//     //                 <div class="author">Author: Author Name</div>`
//     //     elItem.appendChild(modalContent);
//     // });
//
//
//     // projectsPortfolio.addEventListener('click', ev => {
//     //     ev.preventDefault();
//     //     const target = ev.target;
//     //     const projectEl = target.closest('.hover-button');
//     //
//     //     if(projectEl){
//     //         new DBConnect().getDbData(projectEl.id)
//     //             .then(({title, description, author, link}) => {
//     //                 modalTitle.textContent = title;
//     //                 modalDesc.textContent = description;
//     //                 modalLink.textContent = link;
//     //                 modalAuthor.textContent = author;
//     //                 console.log(projectEl.title)
//     //             })
//     //             .then(() => {
//     //                 element.classList.add('active');
//     //                 elItem.classList.add('active');
//     //             })
//     //     }
//     //
//     //     // if (projectEl) {
//     //     //     element.classList.add('active');
//     //     //     elItem.classList.add('active');
//     //     // }
//     // })
//
//     element.addEventListener('click', ev => {
//         const target = ev.target;
//         if (target.closest('.close-modal') || target.classList.contains('modal-overlay')) {
//             element.classList.remove('active');
//             elItem.classList.remove('active')
//         }
//     })
// }
//MODAL
const modalTitle = document.querySelector('.modal-title');
const modalDesc = document.querySelector('.description');
const modalAuthor = document.querySelector('.author');
const modalLink = document.querySelector('.link');

projectsPortfolio.addEventListener('click', ev => {
    const element = document.querySelector('.modal-overlay');
    const elItem = document.querySelector('.modal');
    ev.preventDefault();
    const target = ev.target;
    const projectEl = target.closest('.hover-button');

    if(projectEl){
        dbConnect.getDbData(projectEl.id)
            .then(({
                       title,
                       description,
                       author,
                       link
            }) => {
                modalTitle.textContent = title;
                modalDesc.textContent = description;
                modalLink.href = link;
                modalAuthor.textContent = author;
                console.log(projectEl.title)
            })
            .then(() => {
                element.classList.add('active');
                elItem.classList.add('active');
            })
    }
    element.addEventListener('click', ev => {
        const target = ev.target;
        if (target.closest('.close-modal') || target.classList.contains('modal-overlay')) {
            element.classList.remove('active');
            elItem.classList.remove('active')
        }
    })
})


/* ВЫЗОВЫ ФУНКЦИЙ */
smoothScroll();
navigationFixed();
counterBlock();
// modalWindow()

const dbConnect = new DBConnect();
dbConnect.getDbData().then(createProject);

/* СОБЫТИЯ */
hamburger.addEventListener('click', openMenu);
close.addEventListener('click', closeMenu);

// Отписки
// hamburger.removeEventListener('click', openMenu)
// close.removeEventListener('click', closeMenu)

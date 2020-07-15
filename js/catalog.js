'use strict';

const projectFilters = ()  => {

    // const getProjects = (filter) => {
    //     fetch('db/db.json')
    //         .then(response => response.json())
    //         .then(filter)
    // }
    //
    // const choiceCategory = e => {
    //     e.preventDefault();
    //     if (e.target.classList.contains('tabs-item')) {
    //         const category = e.target.dataset.category;
    //         console.log(category)
    //         getProjects(createProject, projrct => projrct.filter(item => item.category.includes(category)));
    //     }
    // }
    //
    //
    // getProjects(createProject);

    let catalogSection = document.querySelector('.portfolio');

    if (catalogSection === null) {
        return;
    }

    let removeChildren = function(item) {
        while (item.firstChild) {
            item.removeChild(item.firstChild);
        }
    };

    let updateChildren = function(item, children) {
        removeChildren(item);
        for (let i = 0; i < children.length; i += 1) {
            item.appendChild(children[i]);
        }
    };

    let catalog = catalogSection.querySelector('.projects');
    let catalogNav = catalogSection.querySelector('.tabs');
    let catalogItems = catalogSection.querySelectorAll('.project-item');

    catalogNav.addEventListener('click', function(e) {
        let target = e.target;
        let item = myLib.closestItemByClass(target, 'tabs-list-item');
        // let catalogItems = catalogSection.querySelectorAll('.project-item');

        if (item === null || item.classList.contains('is-active')) {
            return;
        }

        e.preventDefault();
        let filterValue = item.getAttribute('data-filter');
        let previousBtnActive = catalogNav.querySelector('.tabs-list-item.is-active');

        previousBtnActive.classList.remove('is-active');
        item.classList.add('is-active');

        if (filterValue === 'all') {
            updateChildren(catalog, catalogItems);
            return;
        }

        let filteredItems = [];
        for (let i = 0; i < catalogItems.length; i += 1) {
            let current = catalogItems[i];
            if (current.getAttribute('data-category') === filterValue) {
                filteredItems.push(current);
            }
        }

        updateChildren(catalog, filteredItems);
    });
};

projectFilters();

// const dbConnect = new DBConnect();
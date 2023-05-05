export function AddLocationsMenu({menuElement, openModal, map}) {

    let isDropdownOpen = false;
    const template = /*html*/`
        <div data-testid="menu-dropdown" class="dropdown">
            <div class="dropdown-trigger">
                <button data-testid="menu-trigger" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Opciók</span>
                    <span class="icon is-small">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                    </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <a data-testid="current-location" class="dropdown-item">
                Mostani helyzet
                </a>
                <a data-testid="custom-location" class="dropdown-item">
                Kijelölöm a térképen
                </a>
                <a data-testid="custom-location" class="dropdown-item">
                Szerkesztem a térképen
                </a>
            </div>
        </div>
    </div>
    `

    function toggleDropdown() {
        if(isDropdownOpen){
            getMenuDropdown().classList.remove('is-active')
        } else {
            getMenuDropdown().classList.add('is-active')
        }
        isDropdownOpen = !isDropdownOpen;

    }

    function getMenuDropdown() {
        return menuElement.querySelector("[data-testid='menu-dropdown']");
    }

    function openModalForCurrentLocation() {
        toggleDropdown();
        let { _lastCenter } = map.locate();
        openModal({ coordinatesData: _lastCenter});
    }

    function removeCustomLocationOnClick() {
        map.off('click', setupCustomLocationrOnClick);
    }

    function setupCustomLocationrOnClick(event) {
        console.log('event', event);
        openModal({ coordinatesData: event.latlng, before_closeFn: removeCustomLocationOnClick});
    }

    function openModalForCustomLocation() {
        map.on('click', setupCustomLocationrOnClick)
        toggleDropdown();

    }

    function render(){
        menuElement.innerHTML = template;
        menuElement.querySelector("[data-testid='menu-trigger']").addEventListener('click', toggleDropdown);
        menuElement.querySelector("[data-testid='current-location']").addEventListener('click', openModalForCurrentLocation);
        menuElement.querySelector("[data-testid='custom-location']").addEventListener('click', openModalForCustomLocation);
        return menuElement;
    }

    return {
        render,
    }
}


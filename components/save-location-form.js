import { Location } from "domain";

export function SaveLocationModal({ api, modalElement, addMarker, closeMarker, getMarkers, mushrooms}) {
    let _coordinates;
    let _id;
    let before_close;
    let icon;

    const template = /*html*/`
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">Mentsd el ahol vagy</p>
            <button data-testid="close" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">

            <div class="field">
                <label class="label">Gomba neve</label>
                <div class="control">
                    <input class="input add-current-location-modal_input" type="text" list="gombak">
                    <datalist id="gombak">
                    </datalist>
                </div>
            </div>
            <div class="field">
                <label class="label">Jegyzet</label>
                <div class="control">
                    <textarea class="input add-note-modal_input"></textarea>
                </div>
            </div>
            <div class="field">
                <div class="label">Icon hozzáadása</div>
                <div class="control">
                    <div class="mushroom-picker">
                    </div>
                </div>
            </div>
            <!-- Content ... -->
            </section>
            <footer class="modal-card-foot">
            <button data-testid="save-location" class="button is-success">Mentés</button>
            <button data-testid="close" class="button">Bezárás</button>
            </footer>
        </div>
    `

    function saveLocation() {
        let name = modalElement.querySelector('.add-current-location-modal_input').value
        let note = modalElement.querySelector('.add-note-modal_input').value
        const location = Location({ name, note, ..._coordinates });
        if(_id) location.id = _id;
        if(icon) location.icon = icon;
        if(location.lat === undefined | location.lat == null) alert('Location lat has not been added')
        api.saveLocation(location).then((location) => {
            addMarker(location);
            closeMarker(location.id)
            modalElement.close();
        });

    }

    function openModal({coordinatesData, before_closeFn, name = '', id = undefined, note = ''}) {
        const input = modalElement.querySelector('.add-current-location-modal_input')
        const noteInput = modalElement.querySelector('.add-note-modal_input')
        noteInput.value = note;
        input.value = name;
        autoSetActiveMushrooms(input);
        _coordinates = coordinatesData;
        _id = id,
        before_close = before_closeFn;
        updateMushroomDatalist()
        modalElement.showModal();
        modalElement.classList.add('is-active');
    }

    function updateMushroomDatalist() {
        const mushroomDataList = document.querySelector('#gombak');
        const optionNodes = getMarkers().map((marker) => {
            const option = document.createElement('option');
            option.value = marker.name;
            return option;
        });
        mushroomDataList.replaceChildren(...optionNodes);
    }

    function autoSetActiveMushrooms(mushroomInput) {
        const mushroomDataList = document.querySelector('#gombak');
        setActiveMushroomByMarkerName(mushroomInput.value, mushroomDataList)
        mushroomInput.addEventListener('input', (event) => {
            const name = event.target.value;
            setActiveMushroomByMarkerName(name, mushroomDataList)
        });
    }

    function setActiveMushroomByMarkerName(name, list) {
        const selectedOption = Array.from(list.options).find(option => option.value === name);
        if (selectedOption) {
            const marker = getMarkers().find(marker => marker.name === name);
            setActiveMushroom({ target: { name: marker.icon_name } } );
        }
    }

    function appendMushrooms(params) {
        const picker = modalElement.querySelector('.mushroom-picker');
        mushrooms.forEach((mushroom) => {
            const el = createMushroomElement(mushroom);
            el.addEventListener('click', setActiveMushroom)
            picker.appendChild(el);
        })
    }

    function setActiveMushroom(event) {
        icon = event.target.name;
        [...modalElement.querySelectorAll('img')].map((el) => {
            if(el.name != event.target.name){
                el.classList.remove('selected');
            } else {
                el.classList.add('selected');
            }
        })
    }

    function createMushroomElement(path) {
    const innerHTML = `<figure class="image is-64x64">
            <img name=${path.split('.')[0]} class="is-rounded" src="assets/${path}">
        </figure>
    `
    const div = document.createElement('div');
    div.innerHTML = innerHTML;
    return div;
    }

    function closeModal() {
        modalElement.classList.remove('is-active');
        if(typeof before_close == 'function') before_close();
        modalElement.close()
    }

    function render(){
        modalElement.innerHTML = template;
        modalElement.querySelector("[data-testid='save-location']").addEventListener('click', saveLocation);
        modalElement.querySelectorAll("[data-testid='close']").forEach((element) => {
            element.addEventListener('click', closeModal);
        })
        appendMushrooms();
        setActiveMushroom({target: document.querySelector('img[name="default"]')});
        return modalElement;
    }

    return {
        render,
        openModal,
    }
}


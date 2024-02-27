import { Location } from "domain";

export function SaveLocationModal({ api, modalElement, addMarker, closeMarker, getMarkers}) {
    let _coordinates;
    let _id;
    let before_close;

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
                    <option value="Internet Explorer">
                    <option value="Firefox">
                    <option value="Chrome">
                    <option value="Opera">
                    <option value="Safari">
                </datalist>
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
        const location = Location({ name, ..._coordinates });
        if(_id) location.id = _id;
        api.saveLocation(location).then((location) => {
            addMarker(location);
            closeMarker(location.id)
            modalElement.close();
        });
    }

    function openModal({coordinatesData, before_closeFn, name = '', id = undefined}) {
        modalElement.querySelector('.add-current-location-modal_input').value = name;
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
        return modalElement;
    }

    return {
        render,
        openModal,
    }
}


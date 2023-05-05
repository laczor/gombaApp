import { Location } from "domain";

export function SaveLocationModal({ api, modalElement, addMarker}) {
    let coordinates;
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
                    <input class="input add-current-location-modal_input" type="text" placeholder="Text input">
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
        const location = Location({ name, ...coordinates });
        console.log(location)
        api.saveLocation(location).then((location) => {
            addMarker(location);
            modalElement.close();
        });
    }

    function openModal({coordinatesData, before_closeFn}) {
        coordinates = coordinatesData;
        before_close = before_closeFn;
        console.log(before_close)
        modalElement.showModal();
        modalElement.classList.add('is-active');
    }

    function closeModal() {
        modalElement.classList.remove('is-active');
        console.log(before_close);
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


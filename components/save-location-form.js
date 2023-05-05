import { Location } from "domain";

export function SaveLocationModal({ api, map, modalElement}) {
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
        let { _lastCenter } = map.locate();
        const location = Location({ name, ..._lastCenter });
        console.log(location)
        api.saveLocation(location).then((location) => {
            modalElement.close();
        });
    }

    function closeModal() {
        modalElement.classList.remove('is-active');
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
    }
}


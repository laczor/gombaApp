export function SaveLocationModal({ api, map}) {
    const template = /*html*/`
            <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">Mentsd el ahol vagy</p>
            <button class="delete" onclick="closeModal(ADD_CURRENT_LOCATION_MODAL)" aria-label="close"></button>
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
            <button class="button is-success" onclick="saveLocation({ name: ADD_CURRENT_LOCATION_MODAL_INPUT.value })">Mentés</button>
            <button class="button" onclick="closeModal(ADD_CURRENT_LOCATION_MODAL)">Bezárás</button>
            </footer>
        </div>
    `

    function render(element){
        element.innerHTML = template;
        window.ADD_CURRENT_LOCATION_MODAL_INPUT = element.querySelector('.add-current-location-modal_input');
        return element;
    }


    return {
        render,
    }
}


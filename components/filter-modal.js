export function FilterModal({ markers, filterModalElement}) {
    let _names = [];
    let _months = [];

    const template = /*html*/`
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">Szűrés</p>
            <button data-testid="close" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">

            <div class="field">
                <label class="label">Gomba neve</label>
                <div class="control">
                    <div class="select is-multiple" style="width: 100%;">
                    <select data-testid="filter-modal-name" multiple style="width: 100%;"></select>
                    </div>
                </div>
            </div>
            <div class="field">
                <label class="label">Válasszon Hónapot</label>
                <div class="control">
                    <div class="select is-multiple" style="width: 100%;">
                        <select data-testid="filter-modal-month" multiple style="width: 100%;">
                            <option value="1">Január</option>
                            <option value="2">Február</option>
                            <option value="3">Március</option>
                            <option value="4">Április</option>
                            <option value="5">Május</option>
                            <option value="6">Június</option>
                            <option value="7">Július</option>
                            <option value="8">Augusztus</option>
                            <option value="9">Szeptember</option>
                            <option value="10">Október</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                </div>
            </div>
            <!-- Content ... -->
            </section>
            <footer class="modal-card-foot">
            <button data-testid="save-filter" class="button is-success">Mentés</button>
            <button data-testid="clear" class="button">Mutasd mindet</button>
            <button data-testid="close" class="button">Bezárás</button>
            </footer>
        </div>
    `

    function closeModal() {
        filterModalElement.classList.remove('is-active');
        filterModalElement.close()
    }
    function name(params) {

    }

    function openModal() {
        setMonthValues(_months);
        updateFilterSelect();
        setSelectedNames(_names);
        filterModalElement.showModal();
        filterModalElement.classList.add('is-active');
    }

    function render(){
        filterModalElement.innerHTML = template;
        filterModalElement.querySelector("[data-testid='save-filter']").addEventListener('click', aplyFilters);
        filterModalElement.querySelector("[data-testid='clear']").addEventListener('click', clearData);
        filterModalElement.querySelectorAll("[data-testid='close']").forEach((element) => {
            element.addEventListener('click', closeModal);
        })
        return filterModalElement;
    }

    function aplyFilters() {
        const names = getSelectedNames();
        const months = Array.from(getMonthInput().selectedOptions).map(option => option.value);
        _names = names;
        _months = months;
        const filters = [filterForNames(names), extractMonth(months)]
        markers.filter(filters);
        filterModalElement.classList.remove('is-active');
        filterModalElement.close()
    }

    function getSelectedNames() {
        return [...getMushroomNameInput().selectedOptions].map((option) => option.value.toLowerCase() );
    }

    function getMushroomNameInput() {
        return filterModalElement.querySelector("[data-testid='filter-modal-name']");
    }

    function getMonthInput() {
        return filterModalElement.querySelector("[data-testid='filter-modal-month']");
    }

    function clearData() {
        const mushroomNameInput = getMushroomNameInput();
        const monthInputInput = getMonthInput();
        [ mushroomNameInput, monthInputInput ].map((input) => {
            [...input.options].forEach((option) => { option.selected = false; })
        })
    }

    function setMonthValues(selectedValues) {
        const monthInput = getMonthInput();
        for (var i = 0; i < monthInput.options.length; i++) {
            monthInput.options[i].selected = selectedValues.includes(monthInput.options[i].value);
        }
    }

    function updateFilterSelect() {
        const select = getMushroomNameInput()
        const options = markers.getMarkers().map((marker) => {
            const  option = document.createElement('option');

            option.value = marker.name;
            option.textContent = marker.name;
            return option;
        })
        select.replaceChildren(...options);
    }

    function setSelectedNames(names) {
        [...getMushroomNameInput().options].forEach((option) => {
            if(names.includes(option.value.toLowerCase())) {
                option.selected = true;
            }
        })
    }

    return {
        render,
        openModal,
    }
}

function filterForNames(names) {
    return (marker) => {
        if(names.length === 0) return true;
        return names.includes(marker.name.toLowerCase());
    }
}

function extractMonth(months) {
    return (marker) => {
            if(months.length === 0) return true;
            return months.includes(String(marker.month));
    }
}

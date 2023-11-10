export function FilterModal({ markers, filterModalElement}) {
    let _name = '';
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
                    <input data-testid="filter-modal-name" class="input" type="text">
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
            <button data-testid="close" class="button">Bezárás</button>
            </footer>
        </div>
    `

    function closeModal() {
        filterModalElement.classList.remove('is-active');
        filterModalElement.close()
    }

    function openModal() {
        getNameInput().value = _name;
        setMonthValues(_months);
        filterModalElement.showModal();
        filterModalElement.classList.add('is-active');
    }

    function render(){
        filterModalElement.innerHTML = template;
        filterModalElement.querySelector("[data-testid='save-filter']").addEventListener('click', aplyFilters);
        filterModalElement.querySelectorAll("[data-testid='close']").forEach((element) => {
            element.addEventListener('click', closeModal);
        })
        return filterModalElement;
    }

    function aplyFilters() {
        const name = getNameInput().value;
        const months = Array.from(getMonthInput().selectedOptions).map(option => option.value);
        _name = name;
        _months = months;
        const filters = [filterForName(name), extractMonth([months])]
        markers.filter(filters);
        filterModalElement.classList.remove('is-active');
        filterModalElement.close()
    }

    function getNameInput() {
        return filterModalElement.querySelector("[data-testid='filter-modal-name']");
    }

    function getMonthInput() {
        return filterModalElement.querySelector("[data-testid='filter-modal-month']");
    }

    function setMonthValues(selectedValues) {
        const monthInput = getMonthInput();
        for (var i = 0; i < monthInput.options.length; i++) {
            monthInput.options[i].selected = selectedValues.includes(monthInput.options[i].value);
        }
    }

    return {
        render,
        openModal,
    }
}

function filterForName(name) {
    return (marker) => {
        return marker.name.toLowerCase().includes(name.toLowerCase());
    }
}

function extractMonth(months) {
    return (marker) => {
            const result = months.find((month) => String(month) === String(marker.month))
            return result ? true : false;
    }
}

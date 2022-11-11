document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btn__clear_form").addEventListener("click", (ev) => {
        ev.preventDefault();
        document.querySelector("#form").reset();
    })

    document.querySelector("#btn__add").addEventListener("click", (ev) => {
        let obj = getObject();

        if (!obj.validate())
            return alert("Invalid data!");

        ParkingDto.insert(obj);
    })

    document.querySelector("#btn__view_all").addEventListener("click", (ev) => {
        ParkingDto.get(generateTableData);
    })

    document.querySelector("#btn__delete_by_id").addEventListener("click", (ev) => {
        let select = document.querySelector("#select__id_to_delete");
        if (select.selectedOptions[0]) {
            id = select.selectedOptions[0].value;
            ParkingDto.deleteById(id);

            window.location.reload();
        }

    })

    document.querySelector("#btn__create_new_field").addEventListener("click", (ev) => {
        let divNewField = document.querySelector("#div__create_new_field");
        divNewField.classList.remove("hidden");

        document.querySelector("#button__add_new_field").addEventListener("click", (ev) => {
            processNewField();
        })

    })

    document.querySelector("#btn__view_min_max").addEventListener("click", (ev) => {
        ParkingDto.getMaxAndMinParkingTime(generateTableData);
    })


});



function processNewField() {
    let fieldName = document.querySelector("#new_field__name").value;

    if (!fieldName) { return alert("Can't be created with empty name!") }
    let fieldType = document.querySelector("#new_field_type").selectedOptions[0].value;

    formFields.push(
        {
            label: {
                class: "label__title",
                for: fieldName.toLowerCase(),
                text: fieldName,
                require: false,
            },
            input: {
                type: fieldType,
                id: fieldName.toLowerCase(),
                placeholder: fieldName,
                required: false,
                pattern: null,
            }
        }
    )

    generateFormsFields();
}

let formFields = [
    {
        label: {
            class: "labelForm",
            for: "name",
            text: "Your full name:",
            require: true,
        },
        input: {
            type: "text",
            id: "name",
            placeholder: "Full Name",
            required: true,
            pattern: "[A-Za-zА-Яа-я ]+"
        }
    },

    {
        label: {
            class: "labelForm",
            text: "Car company:",
            require: true,
        },
        input: {
            type: "select",
            id: "select-option",
            required: true,
            name: "select",
            options: [
                {
                    value: "Toyota",
                    name: "Toyota",
                },
                {
                    value: "Vol",
                    name: "Volkswagen",
                },
                {
                    value: "Ford",
                    name: "Ford",
                },
                {
                    value: "Honda",
                    name: "Honda",
                },
                {
                    value: "Fiat",
                    name: "Fiat",
                },
                {
                    value: "Nissan",
                    name: "Nissan",
                },
                {
                    value: "Mercedes",
                    name: "Mercedes",
                },
                {
                    value: "BMW",
                    name: "BMW",
                },
                {
                    value: "Other",
                    name: "Other",
                }
            ]
        }
    },

    {
        label: {
            class: "labelForm",
            for: "number",
            text: "Car number:",
            require: true,
        },
        input: {
            type: "text",
            id: "number",
            placeholder: "1234 AB-7",
            required: true,
        }
    },

    {
        label: {
            class: "labelForm",
            for: "time",
            text: "Parking time:",
            require: true,
        },
        input: {
            type: "time",
            id: "time",
            placeholder: "time",
            min: "1",
            max: "168",
            required: true,
            pattern: null
        }
    },
]

function init() {
    ParkingDto.getAllId(generateSelectValues);
    generateFormsFields(formFields);
}
document.addEventListener("DOMContentLoaded", init);


function generateFormsFields(fields) {
    let formContent = document.querySelector("#form");
    if (!fields) {
        fields = formFields;
        formContent.innerHTML = ""
    }

    for (const field of fields) {
        const labelData = field.label;
        const inputData = field.input;
        let input;

        const label = generateLabelForInput(labelData.class, labelData.for, labelData.text);
        if (inputData.type == "select") {
            input = generateSelect(inputData.id, inputData.required, inputData.name, inputData.options)
        } else {
            input = generateInput(inputData.type, inputData.id, inputData.placeholder, inputData.pattern)
        }

        let div = document.createElement('div');
        div.appendChild(label);
        div.appendChild(input);
        formContent.appendChild(div);
    }
}

function generateSelectValues(ids) {
    let select = document.querySelector("#select__id_to_delete");

    for (let id of ids) {
        let opt = document.createElement("option");
        opt.value = id;
        opt.innerHTML = id;

        select.appendChild(opt);
    }
}

function generateSelect(id, required, name, options) {
    let select = document.createElement("select");
    select.id = id;
    select.required = required;
    select.name = name;

    for (let option of options) {
        let opt = document.createElement("option");

        opt.value = option.value;
        opt.innerHTML = option.name;

        select.appendChild(opt);
    }

    return select;
}

function generateLabelForInput(labelClass, labelFor, inner) {
    const label = document.createElement("label");
    label.setAttribute("for", labelFor);
    if (labelClass)
        label.classList.add(labelClass);
    if (inner)
        label.innerHTML = inner;

    return label;
}

function generateInput(type, id, placeholder, pattern) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;

    if (pattern)
        input.pattern = pattern;
    if (placeholder)
        input.placeholder = placeholder;

    return input;
}



function generateTableData(parkings) {
    const tbl = document.querySelector("#result__table");
    tbl.innerHTML = "";
    tbl.classList.remove("hidden");

    const tblHead = document.createElement('thead');
    const tblBody = document.createElement('tbody');

    let heads = ["ID", "Full name", "Car company", "Car number", "Parking time"];

    for (let parking of parkings) {
        const dataRow = document.createElement('tr');
        const cellId = generateTableTD(parking.id);
        const callFullName = generateTableTD(parking.full_name);
        const cellCompany = generateTableTD(parking.company);
        const callCarNumber = generateTableTD(parking.car_number);
        const cellParkingTime = generateTableTD(parking.parking_time);

        dataRow.appendChild(cellId);
        dataRow.appendChild(callFullName);
        dataRow.appendChild(cellCompany);
        dataRow.appendChild(callCarNumber);
        dataRow.appendChild(cellParkingTime);


        if (parking.additional_fields.length > 2) {
            let value = JSON.parse(parking.additional_fields);
            heads.push(value[0].name);
            const cell_additional = generateTableTD(value[0].value);
            dataRow.appendChild(cell_additional);
        }

        tblBody.appendChild(dataRow);
    }

    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);

    const headRow = document.createElement('tr');
    for (let i = 0; i < heads.length; i++) {
        const head = document.createElement('th');
        const headText = document.createTextNode(heads[i]);

        head.appendChild(headText);
        headRow.appendChild(head);
    }
    tblHead.appendChild(headRow);
}

const generateTableTD = function (text) {
    var td = document.createElement('td');
    var tdText = document.createTextNode(text);
    td.appendChild(tdText);

    return td;
}

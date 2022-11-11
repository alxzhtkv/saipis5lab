class Parking {
    constructor(fullName, company, carNumber, parkingTime) {
        this.fullName = fullName;
        this.company = company;
        this.carNumber = carNumber;
        this.parkingTime = parkingTime;
        this.additionalFields = [];
    }

    setAdditionalFields(additionalFields) {
        this.additionalFields = additionalFields;
    }

    validate() {
        if (!this.onlyLettersAndSpace(this.fullName))
            return false;
        
        return true;
    }

    onlyLettersAndSpace(str) {
        return /^[a-zA-ZА-Яа-я ]+$/.test(str);
    }   
}


const getObject = function () {
    let parking = new Parking(
        document.querySelector("#name").value,
        document.querySelector("#select-option").value,
        document.querySelector("#number").value,
        document.querySelector("#time").value,
    );

    let additionalFields = []
    for (let i = 4; i < formFields.length; i++){
        let input = formFields[i].input;
        let value = document.querySelector("#" + input.id).value;
        additionalFields.push({name: input.placeholder, value: value})
    }

    parking.setAdditionalFields(additionalFields);
    return parking;
}
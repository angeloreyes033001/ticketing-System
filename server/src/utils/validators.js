const isEmpty = (fields,message="required") => {
    if (typeof fields == 'string') {
        if (fields == '') {
            return { isEmpty: true, errorMessage: message };
        }
    }
}

const checkMultiEmpty = (dataArray) => {
    const data = Object.entries(dataArray);

    for (let i = 0; i < data.length; i++) {
        const [key, value] = data[i];
        const validate = isEmpty(value);
        if(typeof value === 'string'){
            if (validate) {
                return { status: false, error: key, message: validate.errorMessage };
            }
        }
    }

    return { status: true };
}

module.exports = {
    checkMultiEmpty,
    isEmpty
}
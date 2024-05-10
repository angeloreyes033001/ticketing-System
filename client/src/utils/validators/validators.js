
const patterns = {
    STRING: /^[A-Za-z\s]+$/,
    NUMBER: /^[0-9]+$/,
    STRINGNOSPACE: /^[A-Za-z]+$/
}

export const isEmpty = (field)=>{

    if(field == ''){
        return true;
    }
}

export const onlyString = (field)=>{

    const pattern = patterns.STRING;

    if(pattern.test(field)){
        return true;
    }

}

export const onlyNumeric = (field)=>{

    const pattern = patterns.NUMBER;

    if(pattern.test(field)){
        return true;
    }

}
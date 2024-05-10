
const TryCatchError = (error)=>{
    if(error instanceof TypeError){
        console.error(`Error occurred TypeError: ${error.message}`);
    }
    else if(error instanceof ReferenceError){
        console.error(`Error occurred ReferenceEror: ${error.message}`);
    }
    else{
        console.error(`Error occurred: ${error.message}`);
    }
}

module.exports = {
    TryCatchError,
}
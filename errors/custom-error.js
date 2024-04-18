class CustomAPIErros extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}


const createCustomErrors = (msg,statusCode) =>{
    return new CustomAPIErros(msg,statusCode)
}


module.exports={
    createCustomErrors,CustomAPIErros
}
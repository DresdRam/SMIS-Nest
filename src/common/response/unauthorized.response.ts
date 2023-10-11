export function unauthorized(){
    return {
        statusCode: 401,
        message: "Unauhtorized Request."
    }
}

export function noAuthToken(){
    return {
        statusCode: 401,
        message: "Didn't Provide an Access Token."
    }
}
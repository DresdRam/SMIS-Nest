export function unauthorized(){
    return {
        statusCode: 403,
        message: "Unauhtorized Request."
    }
}
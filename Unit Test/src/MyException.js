export class MyException extends Error {

}

export const callMe = (name) => {
    if (name === "Gayuh") {
        throw new MyException("Error ges");
    } else {
        return "Oke";
    }
}
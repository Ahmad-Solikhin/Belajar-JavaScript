const sayHello = (name) => {
    if (name) {
        return `Hello ${name}`;
    }

    throw new Error("Name is mandatory");
}

export default sayHello;
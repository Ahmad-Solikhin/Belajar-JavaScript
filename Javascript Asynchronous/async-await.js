const token = ~~[Math.random() * 12314];

const pictures = ["1.jpg", "2.png"];

function login(username) {
    console.log("Data validation......")
    return new Promise((success, failed) => {
        setTimeout(() => {
            if (username !== 'gayuh') failed("Wrong data");
            success({token, username});
        }, 200);
    });
}

function getUser(token) {
    console.log("Token validation......")
    return new Promise((success, failed) => {
        setTimeout(() => {
            if (!token) failed("Wrong token");
            success({apiKey: "apiKey123"});
        }, 100);
    });
}

function getPictures(apiKey) {
    console.log("Pictures processing......")
    return new Promise((success, failed) => {
        setTimeout(() => {
            if (apiKey) success({pictures});
            failed("Wrong apiKey");
        }, 1500)
    });
}

const getUserDisplay = async () => {
    try {
        const token = await login("gayuh");
        console.log(token);

        const apiKey = await getUser(token.token);
        console.log(apiKey);

        const picture = await getPictures(apiKey.apiKey);
        console.log(picture);

        return picture;
    } catch (e) {
        console.log(e);
    }
}

const display = getUserDisplay();
display.then(response => {
    console.log("     ");
    response.pictures.map(res => console.log("Haiyaa " + res));
});
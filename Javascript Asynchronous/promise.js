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

const user = login("gayuh");
user.then(response => {
    console.log(response);

    const apikey = getUser(response.token);
    apikey.then(response => {
        console.log(response);

        const picture = getPictures(response.apiKey);
        picture.then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error);
        })
    }).catch(error => {
        console.log(error);
    })
}).catch(error => {
    console.log(error);
})
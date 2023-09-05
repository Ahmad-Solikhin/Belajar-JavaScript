const axiosRequest = require('axios');

const testOk = async () => {
    try {
        const response = await axiosRequest.get("https://httpstat.us/200");
        console.log(response.data);
    }catch (error){
        console.log(`ERROR ${error}`);
    }
}

testOk();

const testBadRequest = async () => {
    try {
        const response = await axiosRequest.get("https://httpstat.us/400");
        console.log(response);
    }catch (error){
        console.log(`ERROR ${error}`);
    }
}

testBadRequest();
const testServerError = async () => {
    try {
        const response = await axiosRequest.get("https://httpstat.us/500");
        console.log(response);
    }catch (error){
        console.log(`ERROR ${error}`);
    }
}

testServerError();
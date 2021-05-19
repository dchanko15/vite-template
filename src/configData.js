import axios from "axios";

let globalState = {
    apiUrl: import.meta.env.BASE_URL+"api/",
    baseUrl: import.meta.env.BASE_URL,
    activityId: import.meta.env.VITE_APP_ACTIVITYID,
    showDetails: import.meta.env.VITE_APP_SHOWDETAILS,
    userRole: 0,
};


async function loadConfigData() {
    try {
        let d = +(new Date());
        let response = await axios.get(import.meta.env.BASE_URL + "config.json?t=" + d);
        let t = Object.assign(globalState, response.data);
        return t;
    } catch (e) {
        console.error(e.message);
    }
}

export default loadConfigData





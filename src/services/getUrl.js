// export const apiUrl = "http://localhost:9200/mb_lab/";
export const apiUrl = import.meta.env.VITE_API_URL;


const getUrl = (type) => {
    console.log('มา getUrl')
    let url = "";
    if (type === "mu_auth") url = "http://localhost:3000";  // mahidol
    //if (type === "api") url = "http://localhost:9100";  // backend 
    if (type === "api") url = import.meta.env.VITE_API_URL  // backend seagames


    // if (type === "mu_auth") url = "https://mb.mahidol.ac.th/mbenter";  // mahidol
    // if (type === "api") url = "https://mb.mahidol.ac.th/mbpsapi";  // backend
    console.log('url : ' , url)
    return url;
}
export const getWebUrl = getUrl;
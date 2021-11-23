let APIURL = "";

switch(window.location.hostname) {
    case "localhost" || "127.0.0.1":
        APIURL = "http://localhost:5000"
        break;
    case "adventure-journal-client.herokuapp.com":
        APIURL = "https://adventure-journal-server.herokuapp.com"
} 

export default APIURL;
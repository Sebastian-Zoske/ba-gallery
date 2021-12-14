import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    "Content-type": "application/json",
    Authorization: "Client-ID Jyw2gTT8lCP_8oDD-IXEguDY84eLZVcLRwyHqgqdITE",
  },
});

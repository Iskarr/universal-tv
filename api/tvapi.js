const baseURL = "https://tv.9st.one";
const guideURL = "/qg";
class TVAPI {
  qgRaw(url, cb) {
    fetch(baseURL + guideURL + url)
      .then((response) => response.json())
      .then((json) => cb(json))
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
  getBaseURL() {
    return baseURL;
  }
}
export let tvapi = new TVAPI();

//API
/* ((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyCe81VBQpqKR2b9ADbrm0bzIGbcGheDffo",
});
 */
//variables
const startBtn = document.querySelector(".arrow");
const input = document.querySelector(".inputip");
const ipAdress = document.querySelector('#ip-adress')
const location = document.querySelector('#location')
const timezone = document.querySelector('#timezone')
const isp = document.querySelector('#isp')
let map;
let IPAdress;

//API functions

// IPify API
//deafult
async function getIP() {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_bwCyKVGl1ktUDb9dyv6UZ2XykXFVz`
  );
  const jsonData = await response.json();
  console.log(jsonData);
}
//input
async function getIPP() {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_bwCyKVGl1ktUDb9dyv6UZ2XykXFVz&ipAddress=${IPAdress}`
  );
  const jsonData = await response.json();
  console.log(jsonData);
}

// google map API
async function initMap() {
  const position = { lat: 50.04132, lng: 21.99901 };
  const { Map } = await google.maps.importLibrary("maps");
  const iconLocation = "/src/img/icon-location.svg";

  map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: position,
    mapTypeId: "hybrid",
    streetViewControl: false,
  });

  new google.maps.Marker({
    position: position,
    map,
    icon: iconLocation,
  });
  map.setTilt(45);
}

initMap();


//functions
const defaultOutput = () => {
    
}
const search = () => {
  console.log(input.value);
};

//listeners
startBtn.addEventListener("click", search);

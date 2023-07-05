
//API google
((g) => {
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
 

//variables
const startBtn = document.querySelector(".arrow");
const input = document.querySelector(".input-ip");
const ipadress = document.querySelector(".ipadress");
const adress = document.querySelector(".adress");
const timezoneP = document.querySelector(".timezone");
const ispP = document.querySelector(".isp");

let map;
let IPAdress;
let latCord;
let lngCord;


//IPify API
async function getIP(IPAdress) {

  try {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_bwCyKVGl1ktUDb9dyv6UZ2XykXFVz${IPAdress}`
  );
  const jsonData = await response.json();

  const ip = jsonData.ip;
  const isp = jsonData.isp;
  const city = jsonData.location.city;
  const country = jsonData.location.country;
  const postalCode = jsonData.location.postalCode;
  const timezone = jsonData.location.timezone;
  latCord = jsonData.location.lat;
  lngCord = jsonData.location.lng;

    ipadress.textContent=ip
    adress.textContent=`${city}, ${country} ${postalCode}`
    timezoneP.textContent=`UTC ${timezone}`
    ispP.textContent= isp

    initMap();
  } catch(err) {
    alert(err);
  }
}

// google map API
async function initMap() {
    const position = { lat: latCord, lng: lngCord };
    const { Map } = await google.maps.importLibrary("maps");
    const iconLocation = "/src/img/icon-location.svg";
  
    map = new Map(document.getElementById("map"), {
      zoom: 10,
      center: position,
      mapTypeId: "hybrid",
      streetViewControl: false,
      disableDefaultUI: true,
      zoomControl: true,
    });
  
    new google.maps.Marker({
      position: position,
      map,
      icon: iconLocation,
    });
    map.setTilt(45);
  }
  

//functions
const search = () => {
  const IPAdress = `&domain=${input.value}`;
  getIP(IPAdress);
};

//listeners
startBtn.addEventListener("click", search);
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter'){
    search()
  }
})
getIP('')

const map = L.map('map').setView([22.9074872, 79.07306671], 5)
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="mailto:ms77grz@gmail.com">developer</a>'

const tLayer = L.tileLayer(tileUrl, { attribution })
tLayer.addTo(map)

function generateList() {
  const ul = document.querySelector('.list')
  storeList.forEach((shop) => {
    const li = document.createElement('li')
    const div = document.createElement('div')
    const a = document.createElement('a')
    const p = document.createElement('p')
    a.addEventListener('click', () => {
      flyToStore(shop)
    })

    div.classList.add('shop-item')
    a.innerText = shop.properties.name
    a.href = '#'
    p.innerText = shop.properties.address

    div.appendChild(a)
    div.appendChild(p)
    li.appendChild(div)
    ul.appendChild(li)
  })
}

generateList()

function makePopupContent(shop) {
  return `
    <div>
      <h4>${shop.properties.name}</h4>
      <p>${shop.properties.address}</p>
      <div class="phone-number">
        <a href="tel:${shop.properties.phone}">${shop.properties.phone}</a>
      </div>
    </div>
  `
}

function onEachFeature(feature, layer) {
  layer.bindPopup(makePopupContent(feature), {
    closeButton: false,
    offset: L.point(0, -8),
  })
}

const markerIcon = L.icon({
  iconUrl: './marker.png',
  iconSize: [30, 40],
})

const shopsLayer = L.geoJSON(storeList, {
  onEachFeature,
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: markerIcon })
  },
})

shopsLayer.addTo(map)

function flyToStore(store) {
  const [lat, lng] = [...store.geometry.coordinates].reverse()
  map.flyTo([lat, lng], 15, {
    animate: false, // fast render
    // duration: 3, // if animate: true
  })
  setTimeout(() => {
    L.popup({ closeButton: false, offset: L.point(0, -8) })
      .setLatLng([lat, lng])
      .setContent(makePopupContent(store))
      .openOn(map)
  }, 1000) // 3000 if animate: true and duration: 3
}

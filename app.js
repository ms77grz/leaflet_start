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

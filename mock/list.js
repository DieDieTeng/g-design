const labels = ['特惠', '火热', '新品']
const title = ['宝山1号', '浅水湾', '世纪花园', '栗村', '书香门第']
const descriptions = [
  '地铁好房，交通便利',
  '全新精装修，领包入住',
  '交通便利，押一付一',
  '全新精装修，地铁好房，交通便利'
]
const address = [
  '宝山1号',
  '上海浅水湾',
  '上海世纪花园',
  '上海栗村',
  '上海书香门第'
]
const units = ['月', '季度', '年']
const types = ['1室1厅', '2室1厅', '3室2厅']
const time = [2, 1, 0]

const distance = []
for (let i = 0; i < 7; i++) {
  distance.push(2 + i * 3)
}

const prices = []
for (let i = 0; i < 20; i++) {
  prices.push(1600 + i * 500)
}

const repeat = (len) => {
  const arr = Array(len)
  Array.from(arr.keys()).forEach((i) => {
    arr[i] = {
      id: i,
      data: {
        img: '../../static/images/1 (' + randomIndex(9) + ').jpg',
        label: labels[randomIndex(labels.length)],
        title:
          title[randomIndex(title.length)] +
          ' | ' +
          descriptions[randomIndex(descriptions.length)],
        address: address[randomIndex(address.length)],
        price: prices[randomIndex(prices.length)],
        unit: units[randomIndex(units.length)],
        distance: distance[randomIndex(distance.length)],
        time: time[randomIndex(time.length)],
        type: types[randomIndex(types.length)]
      }
    }
  })

  return arr
}

const randomIndex = (max) => {
  return Math.floor(Math.random() * max)
}

export { repeat, labels, prices, units, distance }

// heroes_api
const http = require('http')

next_id = 7

heroes = {
    '1': {'name':'hero1', 'id': 1},
    '2': {'name':'hero2', 'id': 2},
    '3': {'name':'hero3', 'id': 3},
    '4': {'name':'hero4', 'id': 4},
    '5': {'name':'hero5', 'id': 5},
    '6': {'name':'hero6', 'id': 6},
}

const s = new http.createServer((req,res) => {
    if(req.method === 'GET') {
    console.log(req.url)
    if(req.url === '/heroes') {
      const body = JSON.stringify(Object.values(heroes))
      res.writeHead(200,'OK',{'Content-Type': 'application/json', 'Content-Length': body.length,'Access-Control-Allow-Origin': '*'})
      res.end(body)
    } else {
      const id = req.url.slice(1)
      const body = JSON.stringify(heroes[id])
      res.writeHead(200,'OK',{'Content-Type': 'application/json', 'Content-Length': body.length,'Access-Control-Allow-Origin': '*'})
      res.end(body)
    }
  }

  if(req.method === 'PUT') {
      let data = ''
      req.on('data', chunk => data += chunk.toString())
      req.on('end', () => {
          const h = JSON.parse(data)
          console.log('PUT', h)
          heroes[h.id] = h;
          res.writeHead(200,'OK')
          res.end()
      }
      )
  }

  if(req.method === 'DELETE') {
    const id = req.url.slice(1)
    delete heroes[id]
    res.writeHead(200,'OK')
    res.end()
}

  if(req.method === 'POST') {
    let data = ''
    req.on('data', chunk => data += chunk.toString())
    req.on('end', () => {
        const h = JSON.parse(data)
        h.id = next_id
        next_id++
        console.log('POST', h)
        heroes[h.id] = h;
        const body = JSON.stringify(h)
        res.writeHead(200,'OK',{'Content-Type': 'application/json', 'Content-Length': body.length,'Access-Control-Allow-Origin': '*'})
        res.end(body)
    }
    )
}

  if(req.method === 'OPTIONS') {
    res.writeHead(200,'OK',{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE','Access-Control-Allow-Headers':'Content-Type'})
    res.end()
  }
})
s.listen(9090,'0.0.0.0')
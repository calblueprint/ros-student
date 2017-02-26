class Request {
  initialize(type, route, content='application/json') {
    const request = new XMLHttpRequest()
    request.open(type, route)
    request.setRequestHeader('Accept', content)
    request.setRequestHeader('Content-Type', content)

    const header = document.querySelector('meta[name="csrf-token"]')
    if (header) {
      request.setRequestHeader('X-CSRF-Token', header.content)
    }
    return request
  }

  download(response, encoding, fileName) {
    const a = document.createElement('a')
    a.href = `${encoding}, ${encodeURIComponent(response)}`
    a.target = '_blank'
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  delete(route, resolve, reject) {
    const request = this.initialize('DELETE', route)
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && resolve) {
          resolve(JSON.parse(request.response))
        } else if (request.status === 204 && resolve) {
          resolve()
        }
      }
    }
    request.send()
  }

  get(route, resolve, reject) {
    const request = this.initialize('GET', route)
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && resolve) {
          resolve(JSON.parse(request.response))
        } else if (reject) {
          reject(JSON.parse(request.response))
        }
      }
    }
    request.send()
  }

  post(route, params, resolve, reject) {
    const request = this.initialize('POST', route)
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && resolve) {
          resolve(JSON.parse(request.response))
        } else if (reject) {
          reject(JSON.parse(request.response))
        }
      }
    }
    request.send(JSON.stringify(params))
  }

  update(route, params, resolve, reject) {
    const request = this.initialize('PATCH', route)
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && resolve) {
          resolve(JSON.parse(request.response))
        } else if (reject) {
          reject(JSON.parse(request.response))
        }
      }
    }
    request.send(JSON.stringify(params))
  }

  csv(route, resolve, reject) {
    const request = this.initialize('GET', route, 'text/csv')
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          this.download(request.response, 'data:attachment/csv', 'download.csv')
        }
      }
    }
    request.send()
  }

  json(route, resolve, reject, fileName='download.json') {
    const request = this.initialize('GET', route)
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          this.download(
            JSON.stringify(JSON.parse(request.response), null, 2),
            'data:attachment/json',
            fileName,
          )
        }
      }
    }
    request.send()
  }
}

export default new Request()

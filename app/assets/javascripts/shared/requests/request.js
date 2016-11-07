class Request {
  initialize(type, route, content='application/json') {
    const request = new XMLHttpRequest();
    request.open(type, route);
    request.setRequestHeader('Accept', content);
    request.setRequestHeader('Content-Type', content);
    request.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    return request;
  }

  delete(route, resolve, reject) {
    const request = this.initialize('DELETE', route);
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && resolve) {
          resolve(JSON.parse(request.response));
        } else if (request.status === 204 && resolve) {
          resolve();
        }
      }
    };
    request.send();
  }

  get(route, resolve, reject) {
    const request = this.initialize('GET', route);
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && resolve) {
          resolve(JSON.parse(request.response));
        }
      }
    };
    request.send();
  }

  post(route, params, resolve, reject) {
    const request = this.initialize('POST', route);
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && resolve) {
          resolve(JSON.parse(request.response));
        } else if (reject) {
          reject(JSON.parse(request.response));
        }
      }
    };
    request.send(JSON.stringify(params));
  }

  update(route, params, resolve, reject) {
    const request = this.initialize('PATCH', route);
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && resolve) {
          resolve(JSON.parse(request.response));
        } else if (reject) {
          reject(JSON.parse(request.response));
        }
      }
    };
    request.send(JSON.stringify(params));
  }

  csv(route, resolve, reject) {
    var request = this.initialize('GET', route, 'text/csv')
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var a = document.createElement('a')
          var encoding = 'data:attachment/csv'
          a.href = `${encoding}, ${encodeURIComponent(request.response)}`
          a.target = '_blank'
          a.download = `download.csv`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
      }
    }
    request.send()
  }

}

export default new Request()

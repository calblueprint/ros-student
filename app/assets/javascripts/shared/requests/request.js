const BASE_API = '/api'

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
    const request = this.initialize('DELETE', `${BASE_API}/${route}`);
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
    const request = this.initialize('GET', `${BASE_API}/${route}`);
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
    const request = this.initialize('POST', `${BASE_API}/${route}`);
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 201 && resolve) {
          resolve(JSON.parse(request.response));
        } else if (reject) {
          reject(JSON.parse(request.response));
        }
      }
    };
    request.send(JSON.stringify(params));
  }

  update(route, params, resolve, reject) {
    const request = this.initialize('PATCH', `${BASE_API}/${route}`);
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 201 && resolve) {
          resolve(JSON.parse(request.response));
        } else if (reject) {
          reject(JSON.parse(request.response));
        }
      }
    };
    request.send(JSON.stringify(params));
  }
}

export default new Request()

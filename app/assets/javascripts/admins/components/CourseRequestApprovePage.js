import React from 'react'
import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

class CourseRequestApprovePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      requests: [],
    }
    this.getRequests()
  }

  getRequests() {
    const path = APIRoutes.getRequestsPath()

    request.get(path, (response) => {
      console.log(response)
      this.setState({ requests: response.requests })
    }, (error) => {
      console.log("error")
    })
  }

  renderRequests() {
    return this.state.requests.map((value) => {
      return value.course_requests.map((course_request) => {
        return (
          <div>
            <li key={value.id}>{"Request id:"+value.id+" ;Request State:"+value.state}</li>
            <li>{"Course_id associated with request:"+course_request.id+"; "}</li>
          </div>
        )
      })
    })
  }

  render() {
    return (
      <div>
        {this.renderRequests()}
      </div>
    )
  }
}

export default CourseRequestApprovePage

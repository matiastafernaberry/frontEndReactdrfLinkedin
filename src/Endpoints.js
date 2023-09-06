import axios from "axios";

export async function getToken(data) {
    let token = ""
    let result = ""
    await axios.request({
      method: "POST",
      url: `http://127.0.0.1:8000/api/token/`,
      data: {
        "password": data.password,
        "username": data.username
      }
    }).then(res => {
      result = res
      token = res.data.access;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', res.data.refresh);
    }).catch(error => {
      result = error
      console.log(error.response.status)
      console.log(error.response.data.detail)
      console.error(error);
    });
    return result
  }

  export async function getData(token) {
    let data =  {}
    await axios.request({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: `http://localhost:8000/api/v1/employees/`
    }).then(res => {
      console.log(res.data.results)
      data = res.data.results
    }).catch(error => {
        console.error('There was an error!', error);
    });
    return data
  }

  export async function deleteItem(token, id) {
    let data =  {}
    await axios.request({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "DELETE",
        url: "http://localhost:8000/api/v1/employees/" + id + "/"
    }).then(res => {
        data = res.data.results
    }).catch(error => {
        console.error('There was an error!', error);
    });
    return data
  }
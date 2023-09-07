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
      },
      withCredentials: true
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
        url: `http://localhost:8000/api/v1/employees/`,
        withCredentials: true
    }).then(res => {
        console.log(res.data.results)
        data = res.data.results
    }).catch(error => {
        console.error('There was an error!', error);
    });
    return data
}

export async function updateData(token, data, id) {
    let result =  {}
    await axios.request({
        headers: {
        Authorization: `Bearer ${token}`
        },
        method: "PUT",
        url: `http://localhost:8000/api/v1/employees/` + id + "/",
        data: data
    }).then(res => {
        console.log(res.data.results)
        data = res.data.results
    }).catch(error => {
        console.error('There was an error!', error);
    });
    return result
}

export async function addData(token, data) {
    let result =  {}
    await axios.request({
        headers: {
        Authorization: `Bearer ${token}`
        },
        method: "POST",
        url: `http://localhost:8000/api/v1/employees/`,
        data: data
    }).then(res => {
        console.log(res.data.results)
        data = res.data.results
    }).catch(error => {
        console.error('There was an error!', error);
    });
    return result
}

export async function getSingleData(token, id) {
    let data =  {}
    await axios.request({
        headers: {
        Authorization: `Bearer ${token}`
        },
        method: "GET",
        url: "http://localhost:8000/api/v1/employees/" + id + "/"
    }).then(res => {
        console.log(res.data.results)
        data = res.data
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
import axios from "axios";


var BASE_URL = "http://127.0.0.1:8000"


export async function GetToken(data) {
    let token = ""
    let result = ""
    await axios.request({
      method: "POST",
      url: BASE_URL + "/api/token/",
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

export async function GetData(token) {
    let data =  {}
    await axios.request({
        headers: {
        Authorization: `Bearer ${token}`
        },
        method: "GET",
        url: BASE_URL + "/api/v1/employees/",
        withCredentials: true
    }).then(res => {
        console.log(res.data.results)
        data = res.data.results
    }).catch(error => {
        console.error('There was an error!', error);
        console.log(error.code)
    });
    return data
}

export async function UpdateData(token, data, id) {
    let result =  {}
    await axios.request({
        headers: {
        Authorization: `Bearer ${token}`
        },
        method: "PUT",
        url: BASE_URL + "/api/v1/employees/" + id + "/",
        data: data
    }).then(res => {
        console.log(res.data.results)
        data = res.data.results
    }).catch(error => {
        console.error('There was an error!', error);
    });
    return result
}

export async function AddData(token, data) {
    let result =  {}
    await axios.request({
        headers: {
        Authorization: `Bearer ${token}`
        },
        method: "POST",
        url: BASE_URL + "/api/v1/employees/",
        data: data
    }).then(res => {
        console.log(res.data.results)
        data = res.data.results
    }).catch(error => {
        console.error('There was an error!', error);
    });
    return result
}

export async function GetSingleData(token, id) {
    let data =  {}
    await axios.request({
        headers: {
        Authorization: `Bearer ${token}`
        },
        method: "GET",
        url: BASE_URL + "/api/v1/employees/" + id + "/"
    }).then(res => {
        console.log(res.data.results)
        data = res.data
    }).catch(error => {
        console.error('There was an error!', error);
    });
    return data
}

export async function DeleteItem(token, id) {
    let data =  {}
    await axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "DELETE",
        url: BASE_URL + "/api/v1/employees/" + id + "/"
    }).then(res => {
        data = res.data.results
    }).catch(error => {
        console.error('There was an error!', error);
    });
    return data
}
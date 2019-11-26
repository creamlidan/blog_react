import axios from 'axios'
import qs from 'qs'
import { message } from 'antd';

//处理post跨域
axios.defaults.withCredentials=true;

//发送请求
axios.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data);
  return config;
}, function(error) {
  return Promise.reject(error);
});

//收到请求回来的数据
axios.interceptors.response.use(function(response){
  return response  
},function(error){
  return Promise.reject(error)  
});

export const label ={
  labelList(keyword){
    let url= "/api/label/labelList";
    return axios.get(url,{
      params:{
        keyword
      }
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  }
}
export const classify ={
  classifyList(keyword){
    let url= "/api/classify/classifyList";
    return axios.get(url,{
      params:{
        keyword
      }
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  }
}

export const article = {
  articleList(){
    let url= "/api/article/articleList";
    return axios.get(url).then(res=>{
          return requestHandle(res);
      }).catch(function (error) {
          return requestHandle(error.response);
      });
  },
  filtrateList(data){
    let url= "/api/article/filtrateList";
    return axios.post(url,data).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  }
  
}
export const project ={
  projectList(keyword,project_status){
    let url= "/api/project/projectList";
    return axios.get(url,{
      params:{
        keyword,
        project_status
      }
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  }
}
//处理接收到的数据参数
const requestHandle = res => {
  let $data = res.data
  if($data.code == 400){
    if($data.data && $data.data.message){
		message.error($data.data.message);
    }else if($data.info){
    	message.error($data.info);
    }
  }
  return $data;
}
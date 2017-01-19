/*
 * @Author: enzo
 * @Date:   2016-11-21 10:41:27
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-12-28 18:09:04
 */

import axios from "axios";
import path from "path";
import querystring from 'querystring';

/**
 * 请求数据配置
 */
const requestInstance = axios.create({
    timeout: global._appConfig.timeout || 10000
});

requestInstance.interceptors.response.use(function(response) {
    global.log_info('response data' + JSON.stringify(response.data));
    return response;
}, function(error) {
    global.log_error('err' + error);
});


export default class Client {

    constructor() {
        //租赁服务soa
        this.host =global._appConfig['rentSOA'];
        // 封装api地址
        this.actions = {};
    }

    /**
     * 单独抽出request方法
     * 当子类覆盖fetch时调用该方法进行数据请求
     * @return Promise
     */
    request(param = {}) {
        return requestInstance(param);
    }
    /**
     * 合并请求
     * @return Promise
     */
    combineRequest() {

    }
    /**
     * 序列化参数
     * this.serializeData(param)
     */
    serializeData(params) {
        return querystring.stringify(params.data || params);
    }
    /**
     * 基本的请求数据结构
     */
    async fetch(data) {
        let soaUrl = data.url && this.actions[data.url];
        //可以通过data.host覆盖全局host，方便做单元测试
        const param = {
            method: data.method || 'get',
            url: `${data.host||this.host}${soaUrl}`,
            params: data.params,
            data: data.data
        };
        if( data.method=='post'){
            Object.assign(param,{
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            });
        }
        global.log_info('params data is -- ' + JSON.stringify(param));
        return await this.request(param)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                global.throw(error, 500);
            });
    }
}
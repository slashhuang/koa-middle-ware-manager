/**
 * Created by huangxiaogang on 17/1/11.
 * 楼栋信息
 */
import Client from '../../request.js';
import {  M_buildingList } from './mock.js';
class CommonApi extends Client{
    constructor(){
        super();
        this.actions = {
            buildingList : '/common/buildingList.action'
        }
    }
}
let apiInstance = new CommonApi();
//根据子划分Id查询楼栋信息

let S_buildingList = async function(params){
    return apiInstance.fetch({
        url:'buildingList',
        method:'get',
        params
    },{
        mock: M_buildingList['data']
    })
};
module.exports = {
    S_buildingList
};
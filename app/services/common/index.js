/**
 * Created by huangxiaogang on 17/1/9.
 * 服务导出
 */

import City_Town from './CityList.js';
import Building_Room from './RoomList.js';
import BuildingList from './BuildingList.js';
import EstateDetail from './EstateDetail.js';
module.exports = {
    ...City_Town,
    ...Building_Room,
    ...BuildingList,
    ...EstateDetail
};
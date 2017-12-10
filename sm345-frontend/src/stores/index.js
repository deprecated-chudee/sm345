import RoomListStore from './RoomListStore';
import ViewStateStore from './ViewStateStore';
import ExcelStore from './ExcelStore';

const roomListStore = window.roomListStore = new RoomListStore();
const viewStateStore = window.viewStateStore = new ViewStateStore();
const excelStore = window.excelStore = new ExcelStore();

export default {
    roomListStore,
    viewStateStore,
    excelStore
}
import RoomListStore from './RoomListStore';
import ViewStateStore from './ViewStateStore';
import ExcelStore from './ExcelStore';
import RoomStore from './RoomStore';

const roomListStore = window.roomListStore = new RoomListStore();
const viewStateStore = window.viewStateStore = new ViewStateStore();
const excelStore = window.excelStore = new ExcelStore();
const roomStore = window.roomStore = new RoomStore();

export default {
    roomListStore,
    viewStateStore,
    excelStore,
    roomStore
}
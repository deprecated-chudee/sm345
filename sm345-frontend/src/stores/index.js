import RoomListStore from './RoomListStore';
import ViewStateStore from './ViewStateStore';
import ExcelStore from './ExcelStore';
import RoomStore from './RoomStore';
import StudentStore from './StudentStore';
import AuthStore from './AuthStore';

const roomListStore = window.roomListStore = new RoomListStore();
const viewStateStore = window.viewStateStore = new ViewStateStore();
const excelStore = window.excelStore = new ExcelStore();
const roomStore = window.roomStore = new RoomStore();
const studentStore = window.studentStore = new StudentStore();
const authStore = window.authStore = new AuthStore();

export default {
    roomListStore,
    viewStateStore,
    excelStore,
    roomStore,
    studentStore,
    authStore
}
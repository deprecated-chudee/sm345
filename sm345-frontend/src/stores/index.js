import RoomListStore from './RoomListStore';
import ViewStateStore from './ViewStateStore';

const roomListStore = window.roomListStore = new RoomListStore();
const viewStateStore = window.viewStateStore = new ViewStateStore();
// export { default as RootModel } from './RootModel';
// export { default as RoomListModel } from './RoomListModel';
// export { default as RoomModel } from './RoomModel';

export default {
    roomListStore,
    viewStateStore
}
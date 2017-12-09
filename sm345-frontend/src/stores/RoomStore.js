
import { observable } from "mobx";

export default class RoomStore {
  id = Math.random();
  @observable mentor;
  @observable teamname;
  @observable subject;
  @observable description;
  @observable link;
  @observable semester;
  @observable thumbnail;
  @observable credentialFile;

  constructor(info) {
    this.mentor = info.mentor;
    this.teamname = info.teamname;
    this.subject = info.subject;
    this.description = info.description;
    this.link = info.link;
  }
}
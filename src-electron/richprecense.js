import client from "discord-rich-presence";

export class Precense{
  /**
   * @param {string} login This is the Client ID
   * */
  constructor(login){
    this.Precense = client(login);
    this.state = "Loading Client...";
    this.details = "WiiUMC with Quasar running in Electron";
    this.startTimestamp = Date.now();
  }
  /**
   * @param {string} state The name of activity
   * */
  changeState(){
    this.Precense.updatePresence({
      state: this.state,
      details: this.details,
      startTimestamp: this.startTimestamp
    });
  }

  setState({state, details, startTimestamp}){
    this.state = state;
    this.startTimestamp = startTimestamp || Date.now();
    this.details = details;
    this.changeState();
  }
}

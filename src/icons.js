import {
  MdHighlightOff,
  MdAccountCircle,
  MdKeyboardArrowDown,
  MdPermContactCalendar,
  MdAddCircleOutline,
  MdAssignment,
  MdPowerSettingsNew,
  MdLibraryAdd,
  MdSend,
  MdNotStarted
} from "react-icons/md";
import { BsLightbulbOff,BsLightbulb} from "react-icons/bs"
import { FcOk, FcApprove } from "react-icons/fc";

export const icons = {
  account: <MdAccountCircle />,
  arrowDown: <MdKeyboardArrowDown />,
  calendar: <MdPermContactCalendar />,
  add: <MdAddCircleOutline size="lg"/>,
  close: <MdHighlightOff />,
  task: <MdAssignment size={30}/>,
  signOut: <MdPowerSettingsNew />,
  contribute: <MdLibraryAdd size={30}/>,
  ok: <FcOk />,
  fcApprove: <FcApprove />,
  send: <MdSend />,
  darkThemeIcon: <BsLightbulbOff />,
  lightThemeIcon: <BsLightbulb />,
  expandIcon: <MdNotStarted size={20} />

};

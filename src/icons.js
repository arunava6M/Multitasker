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
import { BsFillMoonFill,BsFillSunFill} from "react-icons/bs"
import { FcOk, FcApprove } from "react-icons/fc";

export const icons = {
  account: <MdAccountCircle />,
  arrowDown: <MdKeyboardArrowDown />,
  calendar: <MdPermContactCalendar />,
  add: <MdAddCircleOutline size="lg"/>,
  close: <MdHighlightOff />,
  task: <MdAssignment size={20}/>,
  signOut: <MdPowerSettingsNew />,
  contribute: <MdLibraryAdd size={20}/>,
  ok: <FcOk />,
  fcApprove: <FcApprove />,
  send: <MdSend />,
  darkThemeIcon: <BsFillMoonFill />,
  lightThemeIcon: <BsFillSunFill />,
  expandIcon: <MdNotStarted size={20} />

};

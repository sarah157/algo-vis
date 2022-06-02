import { useDispatch, useSelector } from "react-redux";
import { Speed, speedToDelay } from "../../constants";
import { capitalize } from "../../helpers";
import { AppDispatch, RootState } from "../../store";
import { setSpeed } from "../../store/common-settings-slice";
import Dropdown, { Option } from "../UI/Dropdown/Dropdown";

const SpeedDropdown = () => {
    const cs = useSelector((state: RootState) => state.commonSettings);
    const dispatch = useDispatch<AppDispatch>();

    const handleChangeSpeed = (selected: string) => {
        dispatch(setSpeed(selected as Speed));
      };
      
    const speedOptions: Option[] = Object.keys(speedToDelay).map((s) => {
        return { value: s, label: `${capitalize(s)}` };
      });

    return (
        <Dropdown
        label="Speed"
        activeOptionValue={cs.speed}
        id="speed"
        options={speedOptions}
        onSelect={handleChangeSpeed}
      ></Dropdown>
    )

}

export default SpeedDropdown;
import React, { useEffect, useRef } from "react";

import { useAppDispatch } from "../hooks/hooks";

//css
import style from "./CustomCheckbox.module.css";

//extra-reducers
import { COMPLETE_TODO, INCOMPLETE_TODO } from "../store/slices/toDoSlice";

interface IProps {
  checked: boolean;
  id: string;
  status: "выполнен" | "ожидает выполнения";
}

const CustomCheckbox: React.FC<IProps> = React.memo(({ checked, id }) => {
  const dispatch = useAppDispatch();

  const prevChecked = useRef<boolean>(checked);
  const prevId = useRef<string>(id);

  const handleCheckboxChange = (id: string) => {
    if (checked) {
      dispatch(INCOMPLETE_TODO(id));
    } else {
      dispatch(COMPLETE_TODO(id));
    }
  };

  useEffect(() => {
    if (prevChecked.current !== checked) {
      console.log(`${id}: checked изменились`);
    }

    if (prevId.current !== id) {
      console.log("id изменились");
    }
  });

  return (
    <input
      type="checkbox"
      className={style.checkBox}
      defaultChecked={checked}
      onClick={() => handleCheckboxChange(id)}
    />
  );
});

export default CustomCheckbox;

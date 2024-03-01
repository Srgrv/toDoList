import React, { useEffect, useState, useRef } from "react";

import { useAppDispatch } from "../hooks/hooks";

//css
import style from "./CustomCheckbox.module.css";

//extra-reducers
import { COMPLETE_TODO, INCOMPLETE_TODO } from "../store/slices/toDoSlice";

const CustomCheckbox = React.memo(({ checked, id }) => {
  const dispatch = useAppDispatch();

  const prevChecked = useRef(checked);
  const prevId = useRef(id);

  const handleCheckboxChange = (id) => {
    // setIsChecked((isChecked) => !isChecked);
    // dispatch(COMPLETE_TODO(item._id));
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

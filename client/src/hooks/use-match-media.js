import { useState, useLayoutEffect } from "react";

const queries = [
  "(max-width: 320px",
  "(min-width: 321px) and (max-width: 480px)",
  "(min-width: 481px) and (max-width: 766px)",
  "(min-width: 767px) and (max-width: 1199px)",
  "(min-width: 1200px)",
];

export const useMatchMedia = () => {
  const mediaQueryLists = queries.map((query) => matchMedia(query));
  //  mediaQueryLists = [
  //     {
  //       matches: false,
  //       media: "(max-width: 320px",
  //       onChange: null,
  //     },
  //     {
  //       matches: false,
  //       media: "(min-width: 321px and (max-width: 480px)",
  //       onChange: null,
  //     },
  //   ];

  const getValues = () => mediaQueryLists.map((mql) => mql.matches); // функция которая вызывается и возвращает текущее значение [false, false, true, false, false]

  const [values, setValues] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));

    return () =>
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener("change", handler)
      );
  });

  return ["isMobile", "isPhone", "isTablet", "isLaptop", "isDesktop"].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index],
    }),
    {}
  );
};

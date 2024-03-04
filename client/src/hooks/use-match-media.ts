import { useState, useLayoutEffect } from "react";

interface IMatchMedia {
  isMobile: boolean;
  isPhone: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
}

const queries = [
  "(max-width: 320px",
  "(min-width: 321px) and (max-width: 480px)",
  "(min-width: 481px) and (max-width: 766px)",
  "(min-width: 767px) and (max-width: 1199px)",
  "(min-width: 1200px)",
];

export const useMatchMedia = (): IMatchMedia => {
  const mediaQueryLists = queries.map((query) => matchMedia(query));

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

  const matchMediaResult: IMatchMedia = {
    isMobile: false,
    isPhone: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
  };

  ["isMobile", "isPhone", "isTablet", "isLaptop", "isDesktop"].forEach(
    (screen, index) => {
      matchMediaResult[screen as keyof IMatchMedia] = values[index];
    }
  );

  return matchMediaResult;

  // return ["isMobile", "isPhone", "isTablet", "isLaptop", "isDesktop"].reduce(
  //   (acc, screen: string, index: number) => ({
  //     ...acc,
  //     [screen]: values[index],
  //   }),
  //   {}
  // );
};

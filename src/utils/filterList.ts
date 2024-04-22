import { filterListProps, listElmType } from "@/types";

const filterList = ({
  searchValue,
  listData,
  searchableFields,
  isCaseSensitive,
}: filterListProps) => {
  const filteredList: listElmType[] = [];

  let searchText = isCaseSensitive ? searchValue : searchValue.toLowerCase();

  listData.forEach((item) => {
    const objKeys: string[] = searchableFields?.length
      ? searchableFields
      : Object.keys(item);
    const retObj = JSON.parse(JSON.stringify(item));
    let shouldInclude = false;

    objKeys.forEach((key) => {
      const objValue = item[key];

      if (
        (typeof objValue === "string" || typeof objValue === "number") &&
        (isCaseSensitive
          ? String(objValue)
          : String(objValue).toLowerCase()
        ).includes(searchText)
      ) {
        shouldInclude = true;
      }

      if (Array.isArray(objValue)) {
        retObj[key] = objValue.filter((val: string | number) =>
          (isCaseSensitive ? String(val) : String(val).toLowerCase()).includes(
            searchText
          )
        );
        if (retObj[key].length > 0) shouldInclude = true;
      }
    });

    if (shouldInclude) filteredList.push(retObj);
  });
  return filteredList;
};

export { filterList };

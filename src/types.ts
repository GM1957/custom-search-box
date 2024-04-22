import { ReactElement } from "react";

export type SearchBoxProps = {
  list: listElmType[];
  searchableFields?: string[];
  isCaseSensitive?: boolean;
  customFilter?: (searchValue?: string, list?: listElmType[]) => listElmType[];
  isLoading?: boolean;
  fieldShowMap?: {
    [key: string]: (value: string) => string;
  };
  filteredFieldShowMap?: {
    [key: string]: (value: any, matchValue?: string) => string;
  };
  onClear?: () => void;
  inputClasses?: string;
  listContainerClasses?: string;
  listItemClasses?: string;
};

export type filterListProps = {
  searchValue: string;
  listData: listElmType[];
  searchableFields?: string[];
  isCaseSensitive?: boolean;
};

export type listElmType = {
  id: string;
  [key: string]: string | string[];
};

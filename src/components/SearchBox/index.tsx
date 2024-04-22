import { useState, useEffect, useRef, KeyboardEventHandler } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import parse from "html-react-parser";
import { debounce, filterList } from "@/utils";
import { defaultFieldShowMap, defaultFilteredFieldShowMap } from "@/constant";
import { SearchBoxProps, listElmType } from "@/types";

function SearchBox({
  list,
  searchableFields = [],
  isCaseSensitive = false,
  customFilter,
  isLoading,
  fieldShowMap = defaultFieldShowMap,
  filteredFieldShowMap = defaultFilteredFieldShowMap,
  onClear,
  inputClasses = "",
  listContainerClasses = "",
  listItemClasses = "",
}: SearchBoxProps) {
  const [listItems, setListItems] = useState<listElmType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const mouseTrackRef = useRef(-1);
  const keyboardSessionRef = useRef(0);
  const itemsLength = listItems.length;
  const searchRefVal = searchRef?.current?.value?.trim();

  useEffect(() => {
    setListItems(list);
  }, [list]);

  const clearOldHover = () => {
    if (mouseTrackRef.current > -1)
      listContainerRef.current?.children[
        mouseTrackRef.current
      ].classList.remove("bg-yellow-100");
  };

  const onMouseEnterHandler = (index: number, shouldScrollToView?: boolean) => {
    clearOldHover();
    mouseTrackRef.current = index;
    listContainerRef.current?.children[index].classList.add("bg-yellow-100");

    if (shouldScrollToView) {
      listContainerRef.current?.children[index].scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  const onMouseLeaveHandler = (index: number) => {
    clearOldHover();
    mouseTrackRef.current = -1;
    listContainerRef.current?.children[index].classList.remove("bg-yellow-100");
  };

  const keyboardSessionResetter = debounce(() => {
    keyboardSessionRef.current = 0;
  }, 1000);

  const navigationHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    keyboardSessionRef.current = 1;
    keyboardSessionResetter();
    if (e.key === "ArrowDown") {
      const newHoverIndex = mouseTrackRef.current + 1;
      onMouseEnterHandler(
        newHoverIndex > itemsLength - 1 ? 0 : newHoverIndex,
        true
      );
    }
    if (e.key === "ArrowUp") {
      const newHoverIndex = mouseTrackRef.current - 1;
      onMouseEnterHandler(
        newHoverIndex < 0 ? itemsLength - 1 : newHoverIndex,
        true
      );
    }
  };

  const onSearchHandler = debounce((e: any) => {
    const searchValue = e.target.value.trim();
    console.log("this is list", list)
    if (searchValue?.length) {
      setListItems(
        customFilter
          ? customFilter(searchValue, list)
          : filterList({
              searchValue,
              listData: list,
              searchableFields,
              isCaseSensitive,
            })
      );
    } else {
      setListItems(list);
    }
  }, 200);

  const onClearHandler = () => {
    if (onClear) {
      onClear();
    } else {
      setListItems(list);
      if (searchRef.current) {
        searchRef.current.value = "";
        searchRef.current.focus();
      }
    }
  };

  return (
    <div className="relative" onKeyDown={navigationHandler}>
      <div className="flex items-center relative w-fit shadow-md">
        <FiSearch className="absolute text-neutral-500 z-10 mx-2" />
        <input
          placeholder="Search users by ID, address, name"
          className={`relative px-8 border h-12 w-72 ${inputClasses}`}
          ref={searchRef}
          onFocus={() => {
            setIsOpen(true);
          }}
          onBlur={() => {
            setIsOpen(false);
          }}
          onChange={onSearchHandler}
        />
        <IoMdClose
          className="absolute right-0 mx-2 cursor-pointer"
          onClick={onClearHandler}
        />
      </div>

      <div
        className={`absolute w-full bg-white shadow-md max-h-72 overflow-auto ${
          isOpen ? "" : "hidden"
        } ${listContainerClasses}`}
        ref={listContainerRef}
      >
        {isLoading && (
          <div className="w-full flex h-24 justify-center items-center">
            Loading...
          </div>
        )}

        {!listItems?.length && !isLoading && (
          <div className="w-full flex h-24 justify-center items-center">
            No data found
          </div>
        )}

        {listItems.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`px-4 py-3 cursor-pointer border-b ${listItemClasses}`}
              onMouseEnter={() => {
                if (keyboardSessionRef.current === 0)
                  onMouseEnterHandler(index);
              }}
              onMouseLeave={() => {
                if (keyboardSessionRef.current === 0)
                  onMouseLeaveHandler(index);
              }}
            >
              {searchRefVal?.length
                ? Object.keys(item).map((key) =>
                    filteredFieldShowMap[key]
                      ? parse(
                          filteredFieldShowMap[key](item[key], searchRefVal)
                        )
                      : null
                  )
                : Object.keys(item).map((key) =>
                    fieldShowMap[key]
                      ? parse(fieldShowMap[key](String(item[key])))
                      : null
                  )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { SearchBox };

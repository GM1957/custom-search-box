import { textHighlighter } from "@/utils";

const defaultFilteredFieldShowMap = {
  id: (value: string, matchValue?: string) =>
    `<h4>${textHighlighter(value, matchValue || "")}</h4>`,
  name: (value: string, matchValue?: string) =>
    `<p className="text-xs italic">${textHighlighter(
      value,
      matchValue || ""
    )}</p>`,
  items: (values: string[], matchValue?: string) =>
    values?.length
      ? `<p className="text-xs py-2"><span className="h-1 w-1 bg-blue-400 text-blue-400 rounded-full mr-1">*</span>${values
          .map((value) => textHighlighter(value, matchValue || ""))
          .join()} found in items</p>`
      : "<p></p>",
  address: (value: string, matchValue?: string) =>
    `<p className="text-xs italic">${textHighlighter(
      value,
      matchValue || ""
    )}</p>`,
};

export { defaultFilteredFieldShowMap };

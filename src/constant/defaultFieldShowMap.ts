const defaultFieldShowMap = {
  id: (value: string) => `<h4>${value}</h4>`,
  name: (value: string) => `<p className="text-xs italic">${value}</p>`,
  address: (value: string) => `<p className="text-xs italic">${value}</p>`,
};

export { defaultFieldShowMap };

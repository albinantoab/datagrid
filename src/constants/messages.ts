/**
 * Creates a message from a function and arguments
 * 
 * Later, we can use this to create messages for different languages
 * 
 * @param message - The function to create the message from
 * @param args - The arguments to pass to the function
 * @returns The message
 */
export const createMessage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: (...args: any[]) => string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args?: any[]
) => {
  return message(...(args ?? []));
};

export const Messages = {
  selected: (count: number) => `${count && count > 0 ? count : 'None'} selected`,
  download: () => `Download selected`,
};

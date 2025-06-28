export const isRegexValid = (pattern: string, flags = ""): boolean => {
  try {
    new RegExp(pattern, flags);
    return true;
  } catch {
    return false;
  }
};
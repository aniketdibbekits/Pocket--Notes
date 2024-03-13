// utils.js
export const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.reduce((acc, word) => acc + word[0], "");
    return initials.toUpperCase();
  };
  
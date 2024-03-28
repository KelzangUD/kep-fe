// =================================== UPDATING DYNAMIC STATE ==================================================
export const dynamicHandle = (id, prop, value, setState) => {
  return setState((prev) => {
    const index = prev.findIndex((item) => item.id === id);
    if (index === -1) {
      return [...prev, { id, [prop]: value }];
    } else {
      const item = prev[index];
      let updatedValue;
      if (prop === 'choice' || prop === 'choice2' || prop === 'matching') {
        // Check if value is an empty array
        if (Array.isArray(value) && value.length === 0) {
          updatedValue = []; // Set choice array to empty if value is []
        } else {
          // Check if item[prop] exists and is an array
          if (Array.isArray(item[prop])) {
            // Check if choice already contains object with provided name
            const existingIndex = item[prop].findIndex(obj => obj[prop] === value[prop]);
            if (existingIndex !== -1) {
              // Update value of existing object if found
              const updatedChoice = [...item[prop]];
              updatedChoice[existingIndex] = { ...updatedChoice[existingIndex], ...value };
              updatedValue = updatedChoice;
            } else {
              // Add new object to choice array
              updatedValue = [...item[prop], value];
            }
          } else {
            // If item[prop] doesn't exist or is not an array, initialize it with the new value
            updatedValue = [value];
          }
        }
      } else {
        updatedValue = value;
      }
      return [
        ...prev.slice(0, index),
        { ...item, [prop]: updatedValue },
        ...prev.slice(index + 1),
      ];
    }
  });
};




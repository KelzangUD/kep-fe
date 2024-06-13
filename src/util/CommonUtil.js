// =================================== UPDATING DYNAMIC STATE ==================================================
export const dynamicHandle = (id, prop, value, setState) => {
  return setState((prev) => {
    const index = prev.findIndex((item) => item.id === id);
    if (index === -1) {
      return [...prev, { id, [prop]: value }];
    } else {
      const item = prev[index];
      let updatedValue;
      if (prop === "choice" || prop === "choice2" || prop === "matching") {
        // Check if value is an empty array
        if (Array.isArray(value) && value.length === 0) {
          updatedValue = []; // Set choice array to empty if value is []
        } else {
          // Check if item[prop] exists and is an array
          if (Array.isArray(item[prop])) {
            // Check if choice already contains object with provided name
            const existingIndex = item[prop].findIndex(
              (obj) => obj[prop] === value[prop]
            );
            if (existingIndex !== -1) {
              // Update value of existing object if found
              const updatedChoice = [...item[prop]];
              updatedChoice[existingIndex] = {
                ...updatedChoice[existingIndex],
                ...value,
              };
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

// ============================================= RETURN DURATION =================================
export const calculateDuration = (value) => {
  if (value === "1 Hr") {
    return 1 * 60 * 60 * 1000;
  } else if (value === "2 Hrs") {
    return 2 * 60 * 60 * 1000;
  } else if (value === "3 Hrs") {
    return 3 * 60 * 60 * 1000;
  } else {
    return 30 * 60 * 1000;
  }
};

// ========================================== LATEST RESULT ======================================
export const calculateLatestTestResults = (results) => {
  // Handle empty or non-array input
  if (!Array.isArray(results) || results.length === 0) {
    return [{
      name: null, 
      excel: 0,
      good: 0,
      average: 0,
      failed: 0,
    }];
  }
  const name = results[0]?.name;
  // Use reduce for efficient calculation and object creation (assuming all elements have score and total)
  const testResults = results.reduce((acc, result) => {
    const currentRatio = (result.score / result.total) * 100;
    if (currentRatio >= 90) {
      acc.excel++;
    } else if (currentRatio >= 70 && currentRatio < 90) {
      acc.good++;
    } else if (currentRatio >= 50 && currentRatio < 70) {
      acc.average++;
    } else {
      acc.failed++;
    }
    return acc;
  }, { excel: 0, good: 0, average: 0, failed: 0 });
  return [{
    name,
    ...testResults,
  }];
};

// ========================================== SCORE ANALYSIS ======================================
export const calculateScoreAnalysis = (results) => {
  // Handle empty or non-array input
  if (!Array.isArray(results) || results.length === 0) {
    return [
      { name: "excel", value: 0 },
      { name: "good", value: 0 },
      { name: "average", value: 0 },
      { name: "failed", value: 0 },
    ];
  }
  // Use reduce for efficient calculation
  const testResults = results.reduce((acc, result) => {
    const currentRatio = (result.score / result.total) * 100;
    if (currentRatio >= 90) {
      acc.excel++;
    } else if (currentRatio >= 70 && currentRatio < 90) {
      acc.good++;
    } else if (currentRatio >= 50 && currentRatio < 70) {
      acc.average++;
    } else {
      acc.failed++;
    }
    return acc;
  }, { excel: 0, good: 0, average: 0, failed: 0 });
  // Update values in the returned array
  return [
    { name: "excel", value: testResults.excel },
    { name: "good", value: testResults.good },
    { name: "average", value: testResults.average },
    { name: "failed", value: testResults.failed },
  ];
};


const { useState } = require("react");

export const useForceUpdate = () => {
  const [, forceUpdate] = useState(false);
  return { forceUpdate };
};

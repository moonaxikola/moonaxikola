// TODO: improve typings
export function getValueOrUndefined() {
  let conditionsValidated = false;

  const api = {
    condition: (bool: boolean) => {
      conditionsValidated = bool;
      return api;
    },

    value: <T>(value: T) => {
      return conditionsValidated ? value : undefined;
    },
  };

  return api;
}

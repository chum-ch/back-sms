/* Global variables and constants */
class Service {
  static rejectResponse(error, StatusCode = 400) {
    return { error, StatusCode };
  }

  static successResponse(data, StatusCode = 200) {
    return { data, StatusCode };
  }

  static validate(modelDefinition, modelInput) {
    const invalidArray = [];
    let error; let
      inputError;
    Object.entries(modelDefinition).forEach(([prop, def]) => {
      error = {};
      inputError = false;
      switch (def.type) {
        case 'string':
          if (!(typeof modelInput[prop] === 'string' || modelInput[prop] instanceof String)) { inputError = true; }
          break;
        case 'number':
        case 'integer':
          if (!(typeof modelInput[prop] === 'number' && !Number.isNaN(modelInput[prop]))) { inputError = true; }
          break;
        case 'array':
          if (!(modelInput[prop] && typeof modelInput[prop] === 'object' && modelInput[prop].constructor === Array)) { inputError = true; }
          break;
        case 'object':
          if (!(modelInput[prop] && typeof modelInput[prop] === 'object' && modelInput[prop].constructor === Object)) { inputError = true; }
          break;
        case 'boolean':
          if (!(typeof modelInput[prop] === 'boolean')) { inputError = true; }
          break;
        default:
          break;
      }
      if (inputError) {
        error.field = prop;
        error.expectedType = def.type;
        error.inputType = typeof modelInput[prop];
      }

      if (def.required && !modelInput[prop]) {
        inputError = true;
        error.required = def.required;
        error.value = modelInput[prop];
      }
      // If error, push it into invalidArray
      if (inputError) { invalidArray.push(error); }
    });
    return invalidArray;
  }
}

module.exports = Service;

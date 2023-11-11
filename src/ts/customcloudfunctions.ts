import { Functions, httpsCallable, HttpsCallableResult } from 'firebase/functions';

/**
 * CustomCloudFunctions class provides class-like behavior to Firebase Cloud Functions.
 */
class CustomCloudFunctions {
  private _functions: Functions;  // CloudFunctions instance.

  /**
   * Constructor to initialize CustomCloudFunctions with CloudFunctions instance.
   */
  constructor(functions: Functions) {
    this._functions = functions;
  }

  /**
   * Get the CloudFunctions instance.
   */
  get functions(): Functions {
    return this._functions;
  }

  /**
   * Set the CloudFunctions instance.
   */
  set functions(functions: Functions) {
    this._functions = functions;
  }

  /**
   * Call a specific cloud function.
   * @param function_name - Name of the cloud function.
   * @param data - Data to pass to the cloud function.
   * @returns Promise containing the result of the cloud function.
   */
  async callable(function_name: string, data: any): Promise<any> {
    const callableFunction = httpsCallable(this._functions, function_name);
    const result = await callableFunction(data);
    return result.data;
  }
}

export default CustomCloudFunctions;

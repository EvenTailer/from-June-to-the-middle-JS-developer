/**
 * The shape of a case of a practice task.
 */
export interface TaskCaseInput {
  /** The name of the function the runner calls. */
  fn: string;
  /** The arguments of the call, as JavaScript expressions. */
  input: string;
  /**
   * The expression that reads the result of the call, for a task that returns
   * an object instead of the answer itself. The value the function returned is
   * bound to the name `result`.
   */
  expect?: string;
}

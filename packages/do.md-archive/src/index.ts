import { LocalDate } from "@js-joda/core";

export { repeatTasks } from "./repeat";
export { filterTasks } from "./filter";
export { countTasks } from "./count";
export { trim } from "./trim";

export const today = (): LocalDate => {
  return LocalDate.now();
};

/**
 * # Update to redux based data model
 *
 * - Convert a string / buffer into an mdast
 * - Convert mdast into a redux datastore
 * - Perform operations
 *   - There are filtering / transforms already built
 *   - Duplicate repeated tasks
 *   - Add task IDs
 *   - Convert date shortcuts (today -> 2020-02-24)
 * - Render redux -> mdast
 * - mdast to string
 *
 * What does the API look like?
 *
 * Redux actions
 *
 * - loadTasksFromMarkdown = (markdown: string): Promise<void>
 * - createNewTask
 * - updateTask
 * - markTaskFinished
 *
 * Directly callable APIs
 * - applyTransforms = (markdown: string, transforms: {}): Promise<string>
 *
 * # Data model
 *
 * sections
 *   - id
 *   - order
 *   - title
 *   - depth
 *   - body
 * tasks
 *   - id
 *   - text
 *   - data
 *   - sectionId
 *   - parentTaskId
 *   - depth
 */
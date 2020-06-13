import { List } from 'mdast';
import {
  complexTaskListMarkdown,
  getFirstTaskFromMdast,
  markdownToMdast,
  taskListOnlyMarkdown,
  tasksWithSecondLineMarkdown,
} from '../../__fixtures__/markdown.fixtures';
import {
  getDataFromListItem,
  getTextFromListItem,
  listToTasks,
  parseMdast,
} from './parser.service';

describe('parser', () => {
  describe('fixtures', () => {
    it('Fixtures remain consistent', () => {
      expect(markdownToMdast(taskListOnlyMarkdown)).toMatchSnapshot();
      expect(markdownToMdast(tasksWithSecondLineMarkdown)).toMatchSnapshot();
    });
  });

  describe('getTextFromListItem()', () => {
    it('Gets text from a simple task #ERa2eO', () => {
      const item = getFirstTaskFromMdast(
        markdownToMdast(`- [ ] A simple task`)
      );

      expect(getTextFromListItem(item)).toEqual('A simple task');
    });

    it('Gets text from a task with 2 lines #0yybP5', () => {
      const item = getFirstTaskFromMdast(
        markdownToMdast(`- [ ] A second line task  \nWith a second line`)
      );

      expect(getTextFromListItem(item)).toEqual(
        `A second line task\nWith a second line`
      );
    });

    it('Gets text from a task with 2 lines and inline code #6Bf3LC', () => {
      const item = getFirstTaskFromMdast(
        markdownToMdast(
          '- [ ] A second line task  \nWith a second line and a by date `by:2020-02-24`'
        )
      );

      expect(getTextFromListItem(item)).toEqual(
        `A second line task\nWith a second line and a by date`
      );
    });
  });

  describe('getDataFromListItem()', () => {
    it('Returns empty object for task with no data #szIeqo', () => {
      expect(
        getDataFromListItem(
          getFirstTaskFromMdast(
            markdownToMdast(`- [ ] A simple task without any data`)
          )
        )
      ).toEqual({});
    });

    it('Fetches data correctly #szIeqo', () => {
      expect(
        getDataFromListItem(
          getFirstTaskFromMdast(
            markdownToMdast(
              '- [ ] A simple task without any data `after:2020-02-01` `by:2020-02-24` `id:def12`'
            )
          )
        )
      ).toEqual({
        after: '2020-02-01',
        by: '2020-02-24',
        id: 'def12',
      });
    });
  });

  describe('listToTasks()', () => {
    it('Converts #HetQot', () => {
      const root = markdownToMdast(taskListOnlyMarkdown);
      expect(listToTasks(root.children[0] as List)).toMatchSnapshot();
    });
  });

  describe('parseMdast()', () => {
    it('work in progress #otm70r', () => {
      expect(
        parseMdast(markdownToMdast(complexTaskListMarkdown))
      ).toMatchSnapshot();
    });
  });
});

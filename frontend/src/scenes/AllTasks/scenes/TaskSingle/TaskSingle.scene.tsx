import { Checkbox, Paper, Typography } from "@material-ui/core";
import { createSelector } from "@reduxjs/toolkit";
import { finishTask, unfinishTask } from "do.md";
import { Task } from "do.md/dist/types";
import Markdown from "markdown-to-jsx";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../../store";

const makeChildTasksSelector = () =>
  createSelector(
    [
      (state: AppState, parentId: string) => parentId,
      (state: AppState) => state.__domd.data.tasks,
    ],
    (parentId, tasks) => tasks.filter((task) => task.parentId === parentId)
  );

const TaskSingle = ({ task, depth = 0 }: { task: Task; depth?: number }) => {
  const selectChildTasks = useMemo(makeChildTasksSelector, []);
  const tasks = useSelector((state: AppState) =>
    selectChildTasks(state, task.id)
  );
  const dispatch = useDispatch<AppDispatch>();

  const dataEntries = Object.entries(task.data);
  const hasData = dataEntries.length > 0;

  return (
    <Paper
      variant={task.isSequential ? "elevation" : "outlined"}
      square
      style={{
        paddingLeft: depth * 42 + (task.isTask ? 0 : 42),
      }}
    >
      <Typography>
        <Checkbox
          checked={task.finished}
          color="default"
          onChange={(event) => {
            if (event.target.checked) {
              dispatch(finishTask(task.id));
            } else {
              dispatch(unfinishTask(task.id));
            }
          }}
        />
        <Markdown options={{ forceInline: true }}>
          {task.contentMarkdown}
        </Markdown>
        {hasData ? (
          <>
            <br />
            <span style={{ paddingLeft: 42 }} />
            {Object.entries(task.data).map(([key, value]) => (
              <span key="key">
                {key}: {value}
              </span>
            ))}
          </>
        ) : null}
      </Typography>
      {tasks.map((task) => (
        <TaskSingle key={task.id} task={task} depth={depth + 1} />
      ))}
    </Paper>
  );
};

export default TaskSingle;

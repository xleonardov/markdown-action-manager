import { Paper, Typography, CircularProgress } from "@material-ui/core";
import {
  getPackageState as getDomdState,
  makeActionableTodaySelector,
} from "do.md";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import TaskSingle from "../TaskSingle/TaskSingle.scene";

const Consecutive = () => {
  const dataLoaded = useSelector(
    (state: AppState) => getDomdState(state).data.initialDataLoadComplete
  );
  const actionableTodaySelector = useMemo(
    () => makeActionableTodaySelector(),
    []
  );
  const tasks = useSelector((state: AppState) =>
    actionableTodaySelector(state)
  );
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  if (!dataLoaded) {
    return (
      <Paper elevation={1}>
        <Typography variant="h1">Loading</Typography>
        <CircularProgress />
      </Paper>
    );
  }

  if (tasks.length === 0) {
    return (
      <Paper elevation={1}>
        <Typography variant="h1">Zero</Typography>
        <Typography>Nothing to review. Congrats.</Typography>
      </Paper>
    );
  }

  if (currentTaskIndex >= tasks.length) {
    return (
      <Paper elevation={1}>
        <Typography variant="h1">Finished</Typography>
        <Typography>Review completed. Congrats.</Typography>
      </Paper>
    );
  }

  const taskId = tasks[currentTaskIndex].id;

  return (
    <TaskSingle
      taskId={taskId}
      onDecisionMade={() => {
        setCurrentTaskIndex(currentTaskIndex + 1);
      }}
    />
  );
};

export default Consecutive;

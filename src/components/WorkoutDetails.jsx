import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import Delete from "../delete.svg";

import { useAuthContext } from "../hooks/useAuthContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();

  const url = import.meta.env.VITE_BASE_URL;
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(url + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: "DELETE_WORKOUT",
        payload: json,
      });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="" onClick={handleClick}>
        <Delete />
      </span>
    </div>
  );
};

export default WorkoutDetails;

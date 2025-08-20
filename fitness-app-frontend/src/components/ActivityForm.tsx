import React, { useState } from "react";
import { addActivity } from "../services/api";
import type { ActivityInput } from "../models/ActivityInputModel";
import BlurText from "../style_components/TextAnimations/BlurText/BlurText";

type ActivityFormProps = {
  onActivityAdded: () => void;
  ref?: React.Ref<HTMLSelectElement>;
};

const ActivityForm = ({ onActivityAdded, ref }: ActivityFormProps) => {
  const [activity, setActivity] = useState<ActivityInput>({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    startTime: new Date().toISOString().slice(0, 16), // Default to current time
    additionalMetrics: {},
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addActivity(activity);
      onActivityAdded();
      // Reset the form fields
      setActivity({ type: "RUNNING", duration: "", caloriesBurned: "", startTime: new Date().toISOString(), additionalMetrics: {} });
    } catch (error) {
      console.error(error);
    }
  };

  const activityTypes: Array<string> = ["CARDIO", "CYCLING", "OTHER", "RUNNING", "STRETCHING", "SWIMMING", "WEIGHT_TRAINING", "WALKING", "YOGA"];

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <div>
      <BlurText
        text="Add an activity:"
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-2xl md:text-4xl mb-8 md:mb-12 font-bold"
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto"
      >
        <label
          htmlFor="activiity_type"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Activity Type
        </label>
        <select
          ref={ref}
          id="activiity_type"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          value={activity.type}
          onChange={(e) => setActivity({ ...activity, type: e.target.value })}
        >
          {activityTypes.sort().map((type) => (
            <option
              key={type}
              value={type}
            >
              {type.toLowerCase().replace("_", " ")}
            </option>
          ))}
        </select>
        <br />
        <label
          htmlFor="duration"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Duration (in minutes)
        </label>
        <input
          type="number"
          id="duration"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          placeholder="10"
          required
          min={1}
          max={1440} // 24 hours in minutes
          value={activity.duration}
          onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
        />
        <br />
        <label
          htmlFor="calories_burned"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Calories Burned
        </label>
        <input
          type="number"
          id="calories_burned"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          placeholder="200"
          min={0} // Assuming calories burned cannot be negative
          required
          value={activity.caloriesBurned}
          onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
        />
        <br />
        <label
          htmlFor="start_time"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Start Time
        </label>
        <input
          type="datetime-local"
          id="start_time"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          required
          value={activity.startTime}
          onChange={(e) => {
            // setSelectedDateTime(e.target.value);
            setActivity({ ...activity, startTime: e.target.value });
          }}
        />

        <br />
        <button
          type="submit"
          className="cursor-pointer text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 shadow-lg shadow-indigo-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;

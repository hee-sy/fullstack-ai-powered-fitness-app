import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Activity } from "../models/ActivityModel";
import type { Recommendation } from "../models/RecommendationModel";
import { getActivityById, getActivityRecommendation } from "../services/api";
import { Card, TabItem, Tabs, createTheme } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { List, ListItem } from "flowbite-react";
import { renderTime } from "../utilities/TimeRenderer";

const tabTheme = createTheme({
  tablist: {
    tabitem: {
      variant: {
        default: {
          active: {
            on: "bg-gray-100 text-indigo-600",
          },
        },
      },
    },
  },
});

const parseAnalysisString = (analysis: string): Record<string, string> => {
  // Split the string into sections using a regular expression
  const sections = analysis.split(/(?<=\.|^)([A-Za-z\s]+):/);
  // Create an object to store the parsed sections
  const parsedAnalysis = sections?.reduce((acc, section, index, array) => {
    // Check if the current section is a key (matches the regex for keys)
    const keyMatch = section.match(/^([A-Za-z\s]+)$/);
    if (keyMatch) {
      const key = keyMatch[1].trim(); // Extract the key
      const value = array[index + 1]?.trim() || ""; // Get the next section as the value
      acc[key] = value; // Add the key-value pair to the result
    }
    return acc; // Return the accumulator for the next iteration
  }, {} as Record<string, string>);
  // console.log(sections);

  return parsedAnalysis || {};
};

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        if (!id) {
          console.error("Activity ID is required");
          return;
        }
        const activityResponse = await getActivityById(id);
        const recommendationResponse = await getActivityRecommendation(id);
        setActivity(activityResponse.data);
        setRecommendation(recommendationResponse.data);
      } catch (error) {
        console.error("Error fetching activity detail:", error);
      }
    };

    fetchActivityDetail();
  }, [id]);

  const parsedAnalysis = recommendation ? parseAnalysisString(recommendation.analysis) : null;

  if (!activity) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center mt-36">
      <Card className="max-w-sm">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-lg md:text-xl font-bold leading-none text-gray-900">Activity Details</h5>
        </div>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs md:text-sm font-medium text-gray-900">Type</p>
                </div>
                <div className="inline-flex items-center text-sm md:text-base font-semibold text-gray-900">{activity.type}</div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs md:text-sm font-medium text-gray-900">Duration</p>
                </div>
                <div className="inline-flex items-center text-sm md:text-base font-semibold text-gray-900">{activity.duration} minutes</div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs md:text-sm font-medium text-gray-900">Calories Burned</p>
                </div>
                <div className="inline-flex items-center text-sm md:text-base font-semibold text-gray-900">{activity.caloriesBurned} cal</div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs md:text-sm font-medium text-gray-900">Started At</p>
                </div>
                <div className="flex flex-col items-center text-sm md:text-base font-semibold text-gray-900">{renderTime(activity.startTime)}</div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs md:text-sm font-medium text-gray-900">Last Update</p>
                </div>
                <div className="inline-flex items-center text-sm md:text-base font-semibold text-gray-900">{renderTime(activity.updatedAt)}</div>
              </div>
            </li>
          </ul>
        </div>
      </Card>

      <Tabs
        aria-label="Default tabs"
        variant="default"
        className="justify-center mt-3 md:mt-6 text-gray-600 wrap-break-word hyphens-auto text-sm md:text-base"
        lang="en"
        theme={tabTheme}
      >
        <TabItem
          active
          title="Analysis"
          icon={HiUserCircle}
        >
          {parsedAnalysis ? (
            <table className="mx-2 md:mx-25 xl:mx-52 border-spacing-y-4 border-separate">
              <tbody>
                {Object.entries(parsedAnalysis).map(([key, value], i) => (
                  <tr key={key}>
                    <td className={`${i == 0 ? "" : "border-t"} border-gray-200 align-top pr-2`}>{key}</td>
                    <td className={`${i == 0 ? "" : "border-t"} border-gray-200`}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No analysis available."
          )}
        </TabItem>
        <TabItem
          title="Improvements"
          icon={MdDashboard}
        >
          <div className="mb-4 mx-2 md:mx-25 xl:mx-52 flex flex-row gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="w-1/5">Area</div>
            <div className="w-4/5">Description</div>
          </div>

          {recommendation?.improvements
            ? recommendation.improvements.map((improvement, i) => {
                // Split only at the first occurrence of `:`
                const [area, ...rest] = improvement.split(":");
                const description = rest.join(":"); // Join the remaining parts back in case there are additional colons

                return (
                  <div
                    key={i}
                    className="mb-4 mx-2 md:mx-25 xl:mx-52 flex flex-row gap-4 p-4 bg-gray-100 rounded-lg shadow-sm"
                  >
                    <div className="w-1/5">{area}</div>
                    <div className="w-4/5">{description}</div>
                  </div>
                );
              })
            : "No improvements available."}
        </TabItem>
        <TabItem
          title="Suggestions"
          icon={HiAdjustments}
        >
          <div className="mb-4 mx-2 md:mx-25 xl:mx-52 flex flex-row gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="w-1/5">Workout</div>
            <div className="w-4/5">Description</div>
          </div>

          {recommendation?.suggestions
            ? recommendation.suggestions.map((suggestion, i) => {
                // Split only at the first occurrence of `:`
                const [workout, ...rest] = suggestion.split(":");
                const description = rest.join(":"); // Join the remaining parts back in case there are additional colons

                return (
                  <div
                    key={i}
                    className="mb-4 mx-2 md:mx-25 xl:mx-52 flex flex-row gap-4 p-4 bg-gray-100 rounded-lg shadow-sm"
                  >
                    <div className="w-1/5">{workout}</div>
                    <div className="w-4/5">{description}</div>
                  </div>
                );
              })
            : "No suggestions available."}
        </TabItem>
        <TabItem
          title="Safety"
          icon={HiClipboardList}
        >
          <List className="mx-5 md:mx-25 xl:mx-52">
            {recommendation?.safety
              ? recommendation.safety.map((safety, i) => (
                  <ListItem
                    key={i}
                    className="mb-4"
                  >
                    {safety}
                  </ListItem>
                ))
              : "No safety recommendations available."}
          </List>
        </TabItem>
        <TabItem
          disabled
          title="TBC..."
        >
          Disabled content
        </TabItem>
      </Tabs>
    </div>
  );
};

export default ActivityDetail;

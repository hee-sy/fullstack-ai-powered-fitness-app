import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getActivities } from "../services/api";
import type { Activity } from "../models/ActivityModel";
import AnimatedActivityList from "../style_components/Components/AnimatedList/AnimatedActivityList";
import ShinyText from "../style_components/TextAnimations/ShinyText/ShinyText";

export const ActivityList = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
    // Optionally, you can set up a polling mechanism to refresh the activities periodically
    const intervalId = setInterval(fetchActivities, 60000); // Fetch every 60 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <>
      <ShinyText
        text="Your Activities"
        disabled={false}
        speed={3}
        className="bg-black font-bold text-4xl md:text-6xl mt-16 md:mt-24 mx-auto"
      />

      <AnimatedActivityList
        activities={activities.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())}
        onItemSelect={(activityId: string) => navigate(`/activities/${activityId}`)}
        showGradients={true}
        enableArrowNavigation={true}
        displayScrollbar={true}
        className="my-10 md:my-20 text-xs md:text-base max-w-screen"
      />
    </>
  );
};

"use client";

import { useEffect } from "react";
import { track, AnalyticsEvent } from "@/lib/analytics";

type ServiceViewTrackerProps = {
  serviceId: string;
};

/** Fires `service_view` once when a service detail page is viewed. Renders nothing. */
export default function ServiceViewTracker({ serviceId }: ServiceViewTrackerProps) {
  useEffect(() => {
    track(AnalyticsEvent.SERVICE_VIEW, { service_id: serviceId });
  }, [serviceId]);

  return null;
}

"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEventName;
  eventParams?: Record<string, string>;
  children: ReactNode;
};

/** A plain <a> that fires an analytics event on click before navigating. */
export default function TrackedLink({
  event,
  eventParams,
  onClick,
  children,
  ...anchorProps
}: TrackedLinkProps) {
  return (
    <a
      {...anchorProps}
      onClick={(e) => {
        track(event, eventParams);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

'use client'

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState, useMemo } from "react";

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const client = useStreamVideoClient();
    const { user } = useUser();

    useEffect(() => {
        const loadCalls = async () => {
            if (!client || !user?.id) return;
            setIsLoading(true);
            try {
                const { calls } = await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id] } },
                        ]
                    }
                });
                setCalls(calls);
            } catch (error) {
                console.error('Error fetching calls:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCalls();
    }, [client, user?.id]);

    const now = useMemo(() => new Date(), []);

    const endedCalls = useMemo(
        () => calls.filter(({ state: { startsAt, endedAt } }) => {
            return (startsAt && new Date(startsAt) < now) || !!endedAt;
        }),
        [calls, now]
    );

    const upcomingCalls = useMemo(
        () => calls.filter(({ state: { startsAt } }) => startsAt && new Date(startsAt) > now),
        [calls, now]
    );

    return {
        endedCalls,
        upcomingCalls,
        callRecordings: calls,
        isLoading,
    };
};

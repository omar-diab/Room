'use client'

import Loader from "@/components/loader/Loader";
import MeetingRoom from "@/components/meetingroom/MeetingRoom";
import MeetingSetup from "@/components/meetingsetup/MeetingSetup";
import { useGetCallById } from "@/hooks/userGetCallById";
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";


const Meeting = ({ params: { id } }: {params: {id: string}}) => {
  const { user, isLoaded } = useUser();
  const [ isSetupComplete, setIsSetupComplete ] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  if(!isLoaded || isCallLoading ) return <Loader/> 
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
          ): (
            <MeetingRoom/>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
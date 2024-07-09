import CallList from "@/components/callList/CallList"


const Recordings = () => {
  return (
    <section className="'flex size-full flex-col gap-10 text-white">
        <h1 className="text-3xl font-bold ">
            Recordings
        </h1>
        <CallList type='recordings'/>
    </section>
  )
}

export default Recordings
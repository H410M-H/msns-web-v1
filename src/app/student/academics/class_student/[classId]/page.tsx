import { ClassesCard } from "~/app/_components/shared/cards/ClassesCard";



type ParamProps = {
    classId:string
}
export default function Classes({params}:{params : ParamProps}) {
  return (
    <section className="h-screen text-gray-800" >
        <p> heellP :{params.classId}</p>
    </section>
  );
}

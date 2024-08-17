import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import Link from "next/link";

export const ClassesCard = async () => {
  const classesData = await api.class.getGroupedClasses();

  return (
    <section className="flex flex-col gap-4">
      {classesData.map((classProps, index) => (
        <div key={index} className="flex flex-col gap-4">
          <h1 className="text-white font-bold text-3xl bg-green-600 rounded-md shadow-lg p-4">{classProps.category}</h1>
          <div className="grid grid-cols-4 gap-3">
          {classProps.classes.map((classData, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{classData.className}</CardTitle>
                <CardDescription>{classData.classSlug}</CardDescription>
                <CardDescription>{classData.category}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link
                    href={`/student/academics/class_student/${classData.classId}`}
                  >
                    Detail
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
          </div>
          
        </div>
      ))}
    </section>
  );
};

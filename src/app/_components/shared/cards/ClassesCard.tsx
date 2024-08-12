import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import Link from "next/link";


export const ClassesCard = async () => {
  const classses = await api.class.getClasses();

  return (
    <section className="grid grid-cols-4 gap-4">
      {classses.map((classProps) => (
        <Card key={classProps.classId}>
          <CardHeader>
            <CardTitle>{classProps.className}</CardTitle>
            <CardDescription>{classProps.classSlug}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              tempore, odio unde magnam autem soluta neque asperiores doloribus
              consectetur quas.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link
                href={`/student/academics/class_student/${classProps.classId}`}
              >
                Detail
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

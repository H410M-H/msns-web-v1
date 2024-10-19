import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";

export const EmployeesCard = async () => {
	const classesData = await api.class.getGroupedClasses();

	return (
		<section className="flex flex-col gap-6 p-6">
			<Accordion type="multiple" className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
				{classesData.map((classProps, index) => (
					<AccordionItem
						key={index}
						className="font-serif transform transition-transform duration-300 hover:scale-[1.02] hover:translate-y-1 hover:shadow-3xl"
						value={classProps.category}
					>
						<AccordionTrigger className="bg-green-800 p-4 rounded-lg shadow-lg hover:shadow-lg">
							<h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-white rounded-lg shadow-lg p-4 transition-transform duration-300 hover:bg-emerald-600">
								{classProps.category}
							</h1>
						</AccordionTrigger>
						<AccordionContent>
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 bg-green-200 md:px-4 justify-items-center rounded-lg shadow-md">
								{classProps.classes.map((classProps, Index) => (
									<div key={Index} className="flex flex-col gap-2 sm:gap-4 items-center text-center py-4">
										<h2 className="text-lime-900 text-xl md:text-2xl font-bold">{classProps.className}</h2>
										<h3 className="text-pink-800 text-md md:text-2xl font-medium">{classProps.classSlug}</h3>
										<div className="flex gap-2">
											<Button asChild className="bg-green-800 text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-emerald-600">
												<Link href={`/student/academics/class_student/${classProps.classId}`}>
													Detail
												</Link>
											</Button>
										</div>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
};

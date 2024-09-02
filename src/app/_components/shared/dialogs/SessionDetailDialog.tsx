import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";

export const SessionDialog = () => {
  return (
<div className="flex items-center gap-4 p-4 bg-gray-100 rounded-md">
  {/* Select Dropdown */}
  <Select>
    <SelectTrigger className="w-[230px] transition duration-300 transform hover:scale-105 bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 hover:bg-gray-100">
      <SelectValue placeholder="Monthly Sessional Reports" />
    </SelectTrigger>
    <SelectContent className="rounded-md shadow-lg bg-white animate-slide-down">
      <SelectGroup>
        <SelectLabel className="text-gray-700 px-4 py-2">Session Months</SelectLabel>
        <SelectItem value="apple" className="hover:bg-gray-100 px-4 py-2">January</SelectItem>
        <SelectItem value="banana" className="hover:bg-gray-100 px-4 py-2">February</SelectItem>
        <SelectItem value="blueberry" className="hover:bg-gray-100 px-4 py-2">March</SelectItem>
        <SelectItem value="grapes" className="hover:bg-gray-100 px-4 py-2">April</SelectItem>
        <SelectItem value="pineapple" className="hover:bg-gray-100 px-4 py-2">May</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>

    {/* Dialog for Viewing Details */}
    <Dialog>
    <DialogTrigger asChild>
      <Button className="transition duration-300 transform hover:scale-105 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
        View Details
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-md rounded-md bg-white p-6 shadow-lg animate-fade-in">
      <DialogHeader>
        <DialogTitle className="mb-4 text-2xl font-semibold text-gray-800">
          Session Details
        </DialogTitle>
        {/* Add additional session details here */}
        <p className="text-gray-600">More information about the session can go here...</p>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</div>  
);
};

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { toast } from "~/components/ui/use-toast"
import { api } from "~/trpc/react"

const salaryAssignmentSchema = z.object({
  employeeId: z.string().min(1, "Employee is required"),
  sessionId: z.string().min(1, "Session is required"),
  baseSalary: z.number().min(10000, "Base salary must be at least 10,000 PKR"),
  increment: z.number().min(0, "Increment cannot be negative"),
})

type SalaryAssignmentSchema = z.infer<typeof salaryAssignmentSchema>

export function SalaryAssignmentForm() {
  const [isLoading, setIsLoading] = useState(false)

  const sessions = api.session.getSessions.useQuery()
  const employees = api.employee.getEmployees.useQuery()

  const form = useForm<SalaryAssignmentSchema>({
    resolver: zodResolver(salaryAssignmentSchema),
    defaultValues: {
      baseSalary: 10000,
      increment: 0,
    },
  })

  const assignSalary = api.salary.assignSalary.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Salary assigned successfully",
      })
      form.reset()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    },
    onSettled: () => setIsLoading(false),
  })

  const onSubmit = (data: SalaryAssignmentSchema) => {
    setIsLoading(true)
    assignSalary.mutate(data)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Assign Salary</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.data?.map(employee => (
                        <SelectItem 
                          key={employee.employeeId} 
                          value={employee.employeeId}
                        >
                          {employee.employeeName} - {employee.designation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sessionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a session" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sessions.data?.map(session => (
                        <SelectItem key={session.sessionId} value={session.sessionId}>
                          {session.sessionName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baseSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Salary (PKR)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="increment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Increment (PKR)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          onClick={form.handleSubmit(onSubmit)} 
          disabled={isLoading || !sessions.data || !employees.data}
          className="w-full"
        >
          {isLoading ? "Assigning..." : "Assign Salary"}
        </Button>
      </CardFooter>
    </Card>
  )
}
"use client";

import React from "react";
import { Form } from "../ui/form";
import { Label } from "../ui/label";
import { z } from "zod";
import { generateForm } from "@/lib/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormContainer from "../ui/form-container";

const SearchBuilder = () => {
  const { form, schema } = generateForm({
    schema: z.object({
      name: z.string().min(1),
    }),
  });

 

  type FormInference = z.infer<typeof schema>;

  const onSubmit = async (data: FormInference) => {
   
  };

  return (
    
      <FormContainer>
      <Form
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-4"
      >
        <Label> Search for a Trade worker near u</Label>
        <Input placeholder="plumber near u"/>
        <Button type = "submit"> Submit </Button>
        
      </Form>
      </FormContainer>
   
  );
};

export default SearchBuilder;

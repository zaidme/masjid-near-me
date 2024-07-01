"use client";

import React from "react";
import { Form } from "../ui/form";
import { Label } from "../ui/label";
import { z } from "zod";
import { generateForm } from "@/lib/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormContainer from "../ui/form-container";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


const SearchBuilder = () => {
  const { form, schema } = generateForm({
    schema: z.object({
      name: z.string().min(1),
    }),
  });

  type FormInference = z.infer<typeof schema>;

  const onSubmit = async (data: FormInference) => {};

  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
     
  );
};

export default SearchBuilder;

// components/shared/EditUserButton.tsx
"use client";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import EditUser from "@/components/shared/EditUsers";

export default function EditUserButton({ userData }: { userData: any }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Edit User</Button>
      </SheetTrigger>
      <EditUser initialData={userData} />
    </Sheet>
  );
}

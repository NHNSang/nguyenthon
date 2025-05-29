'use client'; // Add this if you're using Next.js App Router and need client-side interactivity

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import MainBtn from './main-btn';

const DownloadBrochures = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MainBtn text="Trang chủ" icon={<Download className="w-5 h-5" />} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-transparent">
        <DialogHeader>
          <DialogTitle>Download Brochures</DialogTitle>
          <DialogDescription>
            Enter your details to download our brochures. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadBrochures;
import ContactForm from "@/components/custom/forms/ContactForm";
import { navbarItems } from "@/components/custom/header/navbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useWindowSize } from "@/hooks/useWindowSize";
import { LucideMenu } from "lucide-react";
import Link from "next/link";
import React from "react";

const HambugerMenu2 = () => {
  const { isMobile } = useWindowSize();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <LucideMenu
          strokeWidth={2}
          size={30}
          className="text-white cursor-pointer hover:text-primary"
        />
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="bg-[#1E1E1E] text-white border-primary w-[300px]"
      >
        {isMobile ? (
          <>
            <SheetHeader>
              <SheetTitle className="text-2xl text-primary font-extrabold text-left border-b-white border-b-[1px] pb-2">
                NGUYÊN THỐNG JP
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
              <div className="flex flex-col space-y-8">
                {navbarItems.map((nav, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start uppercase"
                    onClick={() => setOpen(false)}
                  >
                    <Link
                      href={nav.href}
                      className="text-xl font-bold tracking-wider "
                    >
                      {nav.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <ContactForm labelOfForm="LIÊN HỆ TƯ VẤN" />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default HambugerMenu2;

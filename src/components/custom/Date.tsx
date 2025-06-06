import { parseISO, format } from "date-fns";

export default function Date({ dateString = ""}: { dateString: string }) { 
  if (!dateString) {
    return null
  }  
  const date = parseISO(dateString);
  return (
    <time
      className="text-neutral-500 text-xs"
      suppressHydrationWarning
      dateTime={dateString} >
      {format(date, "LLLL d, yyyy")}
    </time>
  );
}

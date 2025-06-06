import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import classNames from "classnames";

interface FormErrorProps {
    message?:string;
    classNames?:string | null | undefined;
};

export const FormError = ({message}:FormErrorProps) => {
    return(
        <div className={`bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive ${classNames}`}>
        <ExclamationTriangleIcon className="h-4 w-4" />
        <p>{message}</p>
    </div>
    )
}
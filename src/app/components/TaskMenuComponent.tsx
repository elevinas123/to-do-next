import Link from "next/link";
import { ItemId } from "../database/schema/ProjectSchema";

type TaskMenuComponentProps = {
    _id: ItemId;
    name: string;
};

export default function TaskMenuComponent(props: TaskMenuComponentProps) {
    return (
        <div>
            <Link href={`/project?projectId=${props._id}`}>
                <button className="hover:bg-gray-200 hover:text-black font-semibold  rounded-full p-1 pl-2 pr-2">
                    {props.name}
                </button>
            </Link>
        </div>
    );
}

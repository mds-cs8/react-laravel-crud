import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

export default function Pagenation({ links, getUser }) {
  return (
    <nav
      aria-label="Page navigation example"
      className="flex  flex-wrap"
    >
      <ul className="list-style-none flex flex-wrap">
        {links.map((link) => {
          return (
            <li key={link.label}>
              <a
                href="#"
                className={
                  link.active
                    ? "relative bg-[#023047] rounded-full bg-transparent flex justify-center items-center mb-2 mr-2 w-[30px] h-[30px] text-sm text-white font-bold transition-all duration-300 cursor-pointer hover:bg-[#023047] hover:text-white"
                    : "relative bg-[#d6bcad] rounded-full bg-transparent flex justify-center items-center mr-2 w-[30px] h-[30px] text-sm text-black font-bold transition-all duration-300 cursor-pointer hover:text-white hover:bg-[#023047]"
                }
                onClick={() => {
                  getUser(link.url);
                }}
              >
                {link.label == "&laquo; Previous" ? (
                  <ArrowLeftCircleIcon className="w-full text-white" />
                ) : link.label == "Next &raquo;" ? (
                  <ArrowRightCircleIcon className="w-full text-white" />
                ) : (
                  link.label
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

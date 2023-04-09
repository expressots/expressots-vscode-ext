import React from "react";

export interface ITabItem {
  name: string;
  number: number;
}

interface TabItemProps {
  tab: ITabItem;
  currentTab: number;
  handleChangeTab: Function;
  lastTab: boolean;
}

export const TabItem: React.FC<TabItemProps> = ({
  currentTab,
  tab,
  handleChangeTab,
  lastTab,
}) => {
  return (
    <>
      <li className="relative md:flex-1 md:flex">
        <button
          onClick={() => handleChangeTab(tab.number)}
          className="group flex items-center w-full"
        >
          <span className="px-3 py-2 flex items-center text-sm font-medium">
            {currentTab > tab.number ? (
              <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-expresso-dark rounded-full group-hover:bg-expresso-dark">
                <svg
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ) : (
              <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center border-2 border-expresso-dark rounded-full">
                <span className="text-expresso-dark">{tab.number}</span>
              </span>
            )}

            <span className="ml-4 text-sm font-medium text-expresso-dark">
              {tab.name}
            </span>
          </span>
        </button>
        {!lastTab && (
          <div
            className="hidden md:block absolute top-0 right-0 h-full w-5"
            aria-hidden="true"
          >
            <svg
              className="h-full w-full text-expresso-dark"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vectorEffect="non-scaling-stroke"
                stroke="currentcolor"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </li>
    </>
  );
};

import { ButtonTabContent } from "./ButtonTabContent";
import { ITabItem } from "./TabItem";

interface TabContentProps {
  tab: ITabItem;
  currentTab: Number;
  handleChangeTab: Function;
  handleSubmit?: Function;
}

export const TabContent: React.FC<TabContentProps> = ({
  children,
  tab,
  currentTab,
  handleChangeTab,
  handleSubmit,
}) => {
  return (
    <div
      className={`tab-content w-full relative max-w-xs ${
        currentTab === tab.number ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col h-72 py-6 px-4">
        <div className="text-center flex items-center justify-center mb-4 font-bold text-expresso-dark border-b border-expresso-dark">
          {tab.name}
        </div>
        <div className="flex justify-center">{children}</div>
        <div>
          {tab.number !== 1 && (
            <ButtonTabContent
              side="right"
              name="Back"
              handleClick={() => handleChangeTab(tab.number - 1)}
            />
          )}

          {!handleSubmit && (
            <ButtonTabContent
              side="left"
              name="Next"
              handleClick={() => handleChangeTab(tab.number + 1)}
            />
          )}

          {handleSubmit && (
            <ButtonTabContent
              side="left"
              name="Generate"
              handleClick={() => handleSubmit()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

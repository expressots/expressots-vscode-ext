import { useState } from "react";

import { requiredFields, tabs } from "./helpers";
import { TabItem } from "./components/TabItem";
import { TabContent } from "./components/TabContent";
import Loading from "./components/Loading";
import Logo from "./assets/logo-bg.png";
interface FormProps {
  [key: string]: string;
}

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<FormProps>({});
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleChangeTab = (tabNumber: number): void => {
    if (tabNumber < currentTab) {
      return setCurrentTab(tabNumber);
    }
    const field = requiredFields.find((field) => field.tab === currentTab);
    const tab = tabs.find((tab) => tab.number === currentTab);
    if (!field || !tab) {
      return setModalMessage("Tab not found");
    }
    const formKeys = Object.keys(form);
    if (!formKeys.includes(field.label) || !form[field.label]) {
      return setModalMessage(`${tab.name} is required`);
    }
    setCurrentTab(tabNumber);
  };

  const handleSubmit = (): void => {
    const formKeys = Object.keys(form);
    const emptyFields = requiredFields.filter(
      (field) => !formKeys.includes(field.label) || !form[field.label]
    );
    if (emptyFields.length > 0) {
      const emptyTab =
        tabs.find((tab) => tab.number === emptyFields[0].tab) || tabs[0];

      setModalMessage(`${emptyTab.name} is required`);
      return setCurrentTab(emptyTab.number);
    }
    setLoading(true);

    const vsCodePlugin = (global as any).acquireVsCodeApi();
    vsCodePlugin.postMessage({
      command: "createProject",
      ...form,
    });
  };

  const handleField = (label: string, value: string): void => {
    setForm({ ...form, [label]: value });
  };

  return (
    <>
      {modalMessage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-expresso-dark bg-opacity-80 flex flex-col items-center justify-center">
          <div className="w-1/3 text-center text-expresso-dark bg-white p-6 rounded">
            <p>{modalMessage}</p>
            <button
              className="btn bg-expresso-dark text-white px-2 py-1 rounded mt-4"
              onClick={() => setModalMessage("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {loading && (
        <Loading title="Expresso TS" message="Generating your project" />
      )}
      <div className="flex flex-col justify-center items-center w-full p-8 bg-expresso-green">
        <div className="w-full bg-expresso-dark rounded-md mb-4 flex items-center justify-center">
          <img
            src={Logo}
            alt="logo expresso ts"
            className="rounded-md h-20 my-6"
          />
        </div>
        <nav className="w-full">
          <ol
            role="list"
            className="border border-expresso-dark rounded-t-md divide-y divide-expresso-dark md:flex md:divide-y-0"
          >
            {tabs.map((tab) => (
              <TabItem
                key={tab.number}
                tab={tab}
                currentTab={currentTab}
                handleChangeTab={handleChangeTab}
                lastTab={tabs.length === tab.number}
              />
            ))}
          </ol>
        </nav>
        <div className="w-full border border-t-0 border-expresso-dark rounded-b-md h-72 flex justify-center items-center">
          <TabContent
            key={"step-1"}
            tab={{ name: "Project Name", number: 1 }}
            currentTab={currentTab}
            handleChangeTab={handleChangeTab}
          >
            <div className="text-center">
              <input
                type="text"
                placeholder="new-amazing-project"
                className="h-10 w-64 rounded border border-expresso-dark outline-none px-2 text-sm text-expresso-dark"
                onBlur={(e) => handleField("projectName", e.target.value)}
              />
            </div>
          </TabContent>
          <TabContent
            key={"step-2"}
            tab={{ name: "Package Manager", number: 2 }}
            currentTab={currentTab}
            handleChangeTab={handleChangeTab}
          >
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-between border border-expresso-dark rounded py-2">
                <input
                  id="npm"
                  name="package-manager"
                  type="radio"
                  className="w-2/12 focus:ring-expresso-green h-4 text-expresso-green border-gray-300 accent-expresso-dark"
                  onClick={(e) => handleField("packageManager", "npm")}
                />
                <label className="ml-3 block text-sm font-medium text-expresso-dark w-10/12">
                  NPM
                </label>
              </div>
              <div className="flex items-center justify-between border border-expresso-dark rounded py-2">
                <input
                  id="yarn"
                  name="package-manager"
                  type="radio"
                  className="w-2/12 focus:ring-expresso-green h-4 text-expresso-green border-gray-300 accent-expresso-dark"
                  onClick={(e) => handleField("packageManager", "yarn")}
                />
                <label className="ml-3 block text-sm font-medium text-expresso-dark w-10/12">
                  YARN
                </label>
              </div>
              <div className="flex items-center justify-between border border-expresso-dark rounded py-2">
                <input
                  id="pnpm"
                  name="package-manager"
                  type="radio"
                  className="w-2/12 focus:ring-expresso-green h-4 text-expresso-green border-gray-300 accent-expresso-dark"
                  onClick={(e) => handleField("packageManager", "pnpm")}
                />
                <label className="ml-3 block text-sm font-medium text-expresso-dark w-10/12">
                  PNPM
                </label>
              </div>
            </div>
          </TabContent>

          <TabContent
            key={"step-3"}
            tab={{ name: "Template", number: 3 }}
            currentTab={currentTab}
            handleChangeTab={handleChangeTab}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border border-expresso-dark rounded py-1">
                <input
                  id="non-opinionated"
                  name="template"
                  type="radio"
                  className="w-2/12 focus:ring-expresso-green h-4 text-expresso-green border-gray-300 accent-expresso-dark"
                  onClick={(e) => handleField("template", "non-opinionated")}
                />
                <label className="ml-3 block text-sm font-bold text-expresso-dark w-10/12">
                  Non-Opinionated
                  <p className="text-[10px] font-normal">
                    A simple ExpressoTS project.
                  </p>
                </label>
              </div>
              <div className="flex items-center justify-between border border-expresso-dark rounded py-1">
                <input
                  id="opinionated"
                  name="template"
                  type="radio"
                  className="w-2/12 focus:ring-expresso-green h-4 text-expresso-green border-gray-300 accent-expresso-dark"
                  onClick={(e) => handleField("template", "opinionated")}
                />
                <label className="ml-3 block text-sm font-bold text-expresso-dark w-10/12">
                  Opinionated
                  <p className="text-[10px] text-left font-normal">
                    A complete ExpressoTS project with an opinionated structure
                    and features.
                  </p>
                </label>
              </div>
            </div>
          </TabContent>
          <TabContent
            key={"step-4"}
            tab={{ name: "Location", number: 4 }}
            currentTab={currentTab}
            handleChangeTab={handleChangeTab}
            handleSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <input
                type="text"
                name="location"
                placeholder="/projects/my-project"
                className="h-10 w-64 rounded border border-expresso-dark outline-none px-2 text-sm text-expresso-dark"
                onChange={(e) => handleField("projectPath", e.target.value)}
              />
              <button className="btn border hover:bg-opacity-60 border-expresso-dark bg-expresso-blue px-2 py-1 rounded text-expresso-dark mt-3 shadow-lg">
                Select directory
              </button>
            </div>
          </TabContent>
        </div>
      </div>
    </>
  );
};

export default App;

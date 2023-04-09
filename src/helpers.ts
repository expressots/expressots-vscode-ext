import { ITabItem } from "./components/TabItem";

export const requiredFields = [
  { label: "projectName", tab: 1 },
  { label: "packageManager", tab: 2 },
  { label: "template", tab: 3 },
  { label: "projectPath", tab: 4 },
];

export const tabs: ITabItem[] = [
  { name: "Project name", number: 1 },
  { name: "Package", number: 2 },
  { name: "Template", number: 3 },
  { name: "Location", number: 4 },
];
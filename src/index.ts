import { v4 as uuidV4 } from "uuid";

let input = document.querySelector<HTMLInputElement>("#input-project");
let form = document.getElementById("project-form") as HTMLFormElement | null;

type Project = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  deadline: Date;
};

const saveProjects = () => {
  localStorage.setItem("PROJECTS", JSON.stringify(allProjects));
};

const loadProjects = (): Project[] => {
  const projectJSON = localStorage.getItem("PROJECTS");
  if (projectJSON == null) return [];
  return JSON.parse(projectJSON);
};

const addProject = (project: Project) => {
  let ul = document.querySelector<HTMLUListElement>("#projects");
  const li = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    project.completed = checkbox.checked;
    saveProjects();
  });
  checkbox.checked = project.completed;
  label.append(checkbox, project.title);
  li.append(label);
  ul?.append(li);
};

const allProjects: Project[] = loadProjects();
allProjects.forEach(addProject);

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null) return;
  const newProject = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
    deadline: new Date(),
  };

  allProjects.push(newProject);
  saveProjects();

  addProject(newProject);
  input.value = "";
});

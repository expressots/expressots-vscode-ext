import * as React from 'react';
import './App.css';

import Banner from './assets/banner.png';
class App extends React.Component {
  public render() {
    
    const vsCode = (global as any).acquireVsCodeApi();

    // TODO: REFACTOR THIS
    function handlerCreateProject() {
      vsCode.postMessage({
        command: 'createProject',
        projectName: 'test',
        packageManager: 'npm',
        projectPath: 'd:\\Projetos\\ExpressoTS\\testes',
        template: 'non-opinionated'
      });
    }

    return (
      <div className="container">
        <div id="header">
          <img src={Banner} alt="ExpressoTS" id="logo" />
        </div>
        <div id="content">
          <div id="templates">
            <h2>Templates:</h2>
            <div id="cards">
              <div>
                <input type="radio" id="non_opinionated" name="templateProject" value="non_opinionated" checked />
                <label htmlFor="non_opinionated">non_opinionated - A complete ExpressoTS project with an opinionated structure and features.</label>
              </div>
              <div>
                <input type="radio" id="opinionated" name="templateProject" value="opinionated" />
                <label htmlFor="opinionated">opinionated - A simple ExpressoTS project.</label>
              </div>
            </div>
          </div>

          <div id="right-menu">
            <div id="name">
              <label id="project-label" htmlFor="projectName">Project Name:</label>
              <input id="projectName" type="text" name="projectName" value="" required
                placeholder="Insert your project name" />
            </div>

            <fieldset id="select-manager">
              <legend>Select a package manager:</legend>
              <div>
                <input type="radio" id="npm" name="packageManager" value="npm" checked />
                <label htmlFor="npm">npm</label>
              </div>

              <div>
                <input type="radio" id="yarn" name="packageManager" value="yarn" />
                <label htmlFor="yarn">yarn</label>
              </div>

              <div>
                <input type="radio" id="pnpm" name="packageManager" value="pnpm" />
                <label htmlFor="pnpm">pnpm</label>
              </div>
            </fieldset>

            <div id="location">
              <label htmlFor="location">Location:</label>
              <div id="forminline">
                <input id="inputLocal" value="" type="text" name="location" required
                  placeholder="Select the location to save your project" />
                <button  id="buttonFilePicker">...</button>
              </div>
            </div>

            <button onClick={() => {handlerCreateProject()}} type="submit" id="createProject">Create Project</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

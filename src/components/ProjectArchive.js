import ProjectEntry from "./ProjectEntry";
import styles from "@styles/ProjectArchive.module.css";
import { Fragment } from "react";

export default function ProjectArchive(props) {
  var projectDataArray = [];

  for (var i = 0; i < props.projectData.length; i++) {
    projectDataArray.push(
      <ProjectEntry
        title={props.projectData[i].project_name}
        desc={props.projectData[i].project_description}
      />
    );
  }

  return (
    <div className={styles["archive-container"]}>
      <header className={styles["header"]}>
        <h2 className={styles["archive-title"]}>Repository Archive</h2>
        <p className={styles["archive-desc"]}>
          A running list of some of my projects
        </p>
      </header>
      <ul className={styles["archive-ul"]}>
        <ProjectEntry
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto fugit cum
        consectetur ea labore hic nemo corporis corrupti a! Saepe repudiandae et
        optio veniam fugit dignissimos deleniti."
        />
        {projectDataArray.map((project) => {
          return <Fragment key={project.props.title}>{project}</Fragment>;
        })}
      </ul>
    </div>
  );
}

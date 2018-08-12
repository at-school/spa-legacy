import React from "react";

const ProjectOutcome = () => (
  <div className="project-outcome">
    <div className="subtitle">Project Outcome Objectives and Predicted Scope</div>
    <div className="description">
      <div className="description-subitem">
        Our vision for atschool has always been to create a Learning Management
        System that would fundamentally change the way teachers and students
        communicate. We believe teachers should be free to spend the entirety of
        their time empowering students, not dealing with outdated school
        software. In effect, we decided it was time to create a system that is
        so intuitive and natural to use, that teachers wouldn't need time to
        learn it. Intelligent enough to mark the role, and automate the marking
        process. Compatible enough to be integrated with any school or
        government database. With @school we want this to be the new reality.
        Not the future of schooling but the present.
      </div>
      <div className="project-outcome-webapp">
        <div className="subtitle">Web Application</div>
        <div className="description-subitem">
          The web application is meant to be the hub for information, for
          students and teachers alike to see what stage of learning they are up
          to. The webapp centralises all traditional methods of communication
          such as emails and offers a new text based DM systems. It also
          contains the classroom dashboard where you can store class
          information. This dashboard is designed to make it easy to delineate
          homework, from assessment, announcements from reminders, also to order
          posts by importance. All communication is done in text format,
          communication in the form of video, audio and any other are not
          supported. Although such formats can be uploaded as class materials.
          The site will not incorporate a text editor for editing or creating
          documents in rich text format, users will only be able to view, upload
          or download such file formats.
        </div>
      </div>
      <div className="project-outcome-rolemarking">
        <div className="subtitle">Autonomous Role Marking</div>
        <div className="description-subitem">
          A two step authentication system to accurately and efficiently mark
          students present if they are in the classroom and have a phone or
          student ID card with them. The system will record the duration a
          students was in the classroom and track the duration they leave. The
          system will not mark students who are not in the class nor track
          productivity of students. The system is not designed for security, as
          such will not record any form of media, whether video, audio or other.
        </div>
      </div>
      <div className="project-outcome-ranking">
        <div className="subtitle">Autonomous Rankings</div>
        <div className="description-subitem">
          On completion of marking assessment, teachers simply upload the mark
          to each student and the stats associated will computed automatically.
          ie. Bernoulli distribution, standard deviation, mean, mean, median,
          mode. The system will integrated all the stats into the school
          database and have data readily available on the assessment dashboard.
          Marks will be mutable, incase of any modification of a mark due to
          scaling or moderations. The system will not mark assessment, simply
          compute statistics and upload data to various locations. The system
          will also be unable to create new tables in an existing school
          database, if this is at all necessary it will be dealt with by the IT
          department of the school.
        </div>
      </div>
    </div>
  </div>
);

export default ProjectOutcome;
